<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type POI from "$lib/model/POI";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import PoiHeader from "../../components/poi/PoiHeader.svelte";
    import { reload, type User } from "firebase/auth";
    import type KoloraUser from "$lib/model/KoloraUser";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import Post from "$lib/model/Post";
    import { text } from "@sveltejs/kit";
    import PostDisplay from "../../components/PostDisplay.svelte";

    let poiId: string | null = $state(null);
    let poi: POI | null = $state(null);

    let isLoadingLocation = $state(false);
    let isNearby = $state(false);
    let ignoreLocation = $state(false);
    let debugDistance = $state(0);

    let user: User | null = $state(null);
    let koloraUser: KoloraUser | null = $state(null);

    let isLoadingPosts = $state(false);
    let posts: Post[] = $state([]);

    let postDraft: Post = $state(new Post());

    function loadPosts() {
        if (!poi) {
            return;
        }

        isLoadingPosts = true;
        firestore.posts
            .getAllByPoi(poi.id)
            .then((newPosts) => {
                newPosts.sort((a, b) => b.createdAt - a.createdAt);
                posts = newPosts;
                isLoadingPosts = false;
            })
            .catch(() => {
                isLoadingPosts = false;
                alert("Nem sikerült betölteni a posztokat.");
            });
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        poiId = params.get("id");
        ignoreLocation = params.get("ignoreLocation") === "1";
        isNearby = ignoreLocation;

        if (!poiId) {
            window.open("/", "_self");
            return;
        }

        firestore.pois
            .get(poiId)
            .then((res) => {
                if (!res) {
                    window.open("/", "_self");
                    return;
                }

                if (res.showSoonScreen) {
                    window.open(`/poi/soon`, "_self");
                    return;
                }

                poi = res;

                isLoadingLocation = true;

                if (ignoreLocation) {
                    isNearby = true;
                    isLoadingLocation = false;
                    loadPosts();
                    return;
                }

                isLoadingLocation = true;
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const distance = Math.sqrt(
                            Math.pow(
                                res.latitude - position.coords.latitude,
                                2,
                            ) +
                                Math.pow(
                                    res.longitude - position.coords.longitude,
                                    2,
                                ),
                        );
                        debugDistance = distance;

                        isNearby = ignoreLocation || distance < 0.005;
                        isLoadingLocation = false;
                        if (isNearby) {
                            loadPosts();
                        }
                    },
                    () => {
                        isNearby = false;
                        isLoadingLocation = false;
                        alert(
                            "Nem sikerült meghatározni a jelenlegi pozíciódat, ezért nem tudjuk betölteni a posztokat ezen a helyen.",
                        );
                    },
                );
            })
            .catch(() => {
                window.history.back();
            });

        const { auth } = initializeFirebase();

        let userListener: (() => void) | null = null;
        const authListener = auth.onAuthStateChanged((newUser) => {
            user = newUser;
            if (user) {
                firestore.users
                    .get(user.uid)
                    .then((user) => (koloraUser = user));
                firestore.users.setNameIfNotExists(user.uid, user.displayName);
                userListener = firestore.users.listen(user.uid, (user) => {
                    koloraUser = user;
                });
            } else {
                koloraUser = null;
                if (userListener) {
                    userListener();
                    userListener = null;
                }
            }
        });

        return () => {
            authListener();
        };
    });
</script>

<PoiHeader {poi} />
<main>
    {#if !poi}
        <p>Betöltés...</p>
    {:else if isLoadingLocation}
        <p>
            <span class="mdi mdi-crosshairs-gps"></span>
            Pozíció meghatározása...
        </p>
    {:else if !isNearby}
        <Alert icon="crosshairs-question">
            <p>
                Nem sikerült meghatározni a jelenlegi pozíciódat vagy túl messze
                vagy a helytől, ezért nem tudjuk betölteni az itteni posztokat.
                Ellenőrizd a hely engedélyeket és próbáld újra.
            </p>
        </Alert>
        <a href={poi.googleMapsLink} target="_blank">
            <button class="btn" style="width: 100%;">
                <span class="mdi mdi-navigation"></span>
                Hová kell mennem, hogy lássam a posztokat?
            </button>
        </a>
    {:else}
        <a href={poi.googleMapsLink} target="_blank">
            <button class="btn" style="width: 100%;">
                <span class="mdi mdi-map-marker"></span>
                Google Térkép megnyitása
            </button>
        </a>
        {#if poi.description}
            <Alert
                icon="information"
                background="var(--secondary-color)"
                style="color: var(--on-secondary-color);"
            >
                <SvelteMarkdown
                    source={poi.description}
                    renderers={{
                        link: MarkdownLink,
                    }}
                />
            </Alert>
        {/if}
        {#if poi.allowPosting}
            <div class="post-input-container">
                <textarea
                    class="outlined-input"
                    style="resize: none;"
                    placeholder="Mi jár a fejedben?"
                    value={postDraft.content}
                    oninput={(e) => {
                        postDraft = {
                            ...postDraft,
                            content: e.target?.value,
                        };
                    }}
                    maxlength="500"
                ></textarea>
                <div class="post-input-actions">
                    <button
                        class="btn"
                        onclick={() => {
                            if (!poi) {
                                alert("Nem sikerült betölteni a helyet.");
                                return;
                            }
                            if (!koloraUser) {
                                alert("Poszt írásához be kell jelentkezned.");
                                return;
                            }
                            alert("Mű csatolása még nem elérhető.");
                            //TODO: Implement attachment
                        }}
                    >
                        <span class="mdi mdi-attachment"></span>
                        Mű csatolása
                    </button>
                    <button
                        class="btn"
                        disabled={!postDraft.content}
                        onclick={() => {
                            if (!poi) {
                                alert("Nem sikerült betölteni a helyet.");
                                return;
                            }
                            if (!koloraUser) {
                                alert("Poszt küldéséhez be kell jelentkezned.");
                                return;
                            }
                            if (!postDraft.content) {
                                alert("Nem lehet üres a poszt szövege.");
                                return;
                            }
                            firestore.posts
                                .add({
                                    ...postDraft,
                                    poiId: poi.id,
                                    authorId: koloraUser.id,
                                    createdAt: Date.now(),
                                })
                                .then(() => {
                                    loadPosts();
                                    postDraft = new Post();
                                });
                        }}
                    >
                        <span class="mdi mdi-send"></span>
                        Küldés
                    </button>
                </div>
            </div>
        {/if}
        {#if isLoadingPosts}
            <p>Posztok betöltése...</p>
        {/if}
        {#each posts as post}
            <PostDisplay {post} />
        {/each}
    {/if}
</main>

<style>
    :global(body) {
        display: block;
    }

    .post-input-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--primary-variant-color);
        border-radius: var(--corner-radius);
    }

    .post-input-actions {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        gap: var(--spacing);
    }
</style>
