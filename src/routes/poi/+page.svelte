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
    import PostDisplay from "../../components/poi/PostDisplay.svelte";
    import Backdrop from "../../components/Backdrop.svelte";
    import type Work from "$lib/model/Work";
    import Footer from "../../components/Footer.svelte";
    import PoiUtils from "$lib/PoiUtils";
    import UserManager from "$lib/UserManager.svelte";
    import { loginWithGoogle } from "$lib/firebase/auth";
    import LocationIndicator from "../../components/poi/LocationIndicator.svelte";

    

    let poiId: string | null = $state(null);
    let poi: POI | null = $state(null);

    let locationInterval: number | null = $state(null);
    let isLoadingLocation = $state(false);
    let isNearby = $state(false);
    let ignoreLocation = $state(false);
    let debugDistance = $state(0);

    let isVisitSent = $state(false);
    let publicWorks: Work[] = $state([]);

    let isLoadingPosts = $state(false);
    let posts: Post[] = $state([]);

    let postDraft: Post = $state({ ...new Post() });
    let isWorkSelectorDialogOpen = $state(false);

    function checkLocation(callback: () => void = () => {}) {
        if (!poi) {
            return;
        }

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
                    Math.pow(poi!!.latitude - position.coords.latitude, 2) +
                        Math.pow(
                            poi!!.longitude - position.coords.longitude,
                            2,
                        ),
                );
                debugDistance = distance;

                isNearby =
                    ignoreLocation || distance < PoiUtils.DISTANCE_TO_VIEW;
                isLoadingLocation = false;
                callback();
            },
            () => {
                isNearby = false;
                isLoadingLocation = false;
                callback();
            },
        );
    }

    function loadPosts() {
        if (!poi) {
            return;
        }

        isLoadingPosts = true;
        firestore.posts
            .getAllByPoi(poi.id)
            .then((nearPosts) => {
                firestore.posts
                    .getGlobalPosts()
                    .then((globalPosts) => {
                        const newPosts = [
                            ...new Map(
                                [...globalPosts, ...nearPosts].map((post) => [
                                    post.id,
                                    post,
                                ]),
                            ).values(),
                        ];
                        newPosts.sort((a, b) => b.createdAt - a.createdAt);
                        posts = newPosts;
                        isLoadingPosts = false;
                    })
                    .catch(() => {
                        isLoadingPosts = false;
                        alert("Nem sikerült betölteni a posztokat.");
                    });
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
            window.location.replace("/");
            return;
        }

        firestore.pois
            .get(poiId)
            .then((res) => {
                if (!res) {
                    window.location.replace("/");
                    return;
                }

                if (res.showSoonScreen) {
                    window.location.replace("/poi/soon");
                    return;
                }

                poi = res;

                checkLocation(() => {
                    if (isNearby) {
                        loadPosts();
                    } else {
                        alert(
                            "Nem sikerült meghatározni a jelenlegi pozíciódat, ezért nem tudjuk betölteni a posztokat ezen a helyen.",
                        );
                    }
                });
            })
            .catch(() => {
                window.history.back();
            });

        let locationInterval: NodeJS.Timeout | null = setInterval(() => {
            checkLocation();
        }, 60_000);

        return () => {
            if (locationInterval) {
                clearInterval(locationInterval);
                locationInterval = null;
            }
        };
    });

    $effect(() => {
        if (
            UserManager.instance.isLoggedIn &&
            poi &&
            isNearby &&
            !ignoreLocation &&
            !isVisitSent
        ) {
            firestore.users.visitPlace(
                UserManager.instance.firebaseUser!!.uid,
                poi.id,
            );
            isVisitSent = true;
        }
    });
</script>

{#if isWorkSelectorDialogOpen}
    <Backdrop close={() => (isWorkSelectorDialogOpen = false)}>
        <div class="dialog">
            <h2>Mű csatolása</h2>
            <p>Válassz egy művet, amit csatolni szeretnél a poszthoz.</p>
            {#if publicWorks.length === 0}
                <p>...</p>
            {:else}
                <select
                    class="outlined-input"
                    value={postDraft.attachmentWorkId}
                    oninput={(e: any) => {
                        postDraft = {
                            ...postDraft,
                            attachmentWorkId: e.target?.value,
                        };
                    }}
                >
                    <option value="">Válassz egy művet...</option>
                    {#each publicWorks as work}
                        <option value={work.id}>{work.title}</option>
                    {/each}
                </select>
            {/if}
            <div class="dialog-actions">
                <button
                    class="btn"
                    onclick={() => {
                        postDraft = {
                            ...postDraft,
                            attachmentWorkId: "",
                        };
                        isWorkSelectorDialogOpen = false;
                    }}
                >
                    Mégse
                </button>
                <button
                    class="btn"
                    disabled={!postDraft.attachmentWorkId}
                    onclick={() => {
                        isWorkSelectorDialogOpen = false;
                    }}
                >
                    Csatolás
                </button>
            </div>
        </div>
    </Backdrop>
{/if}

<PoiHeader {poi} />
<main>
    {#if !poi}
        <p>Betöltés...</p>
    {:else if !isNearby}
        {#if isLoadingLocation}
            <p>
                <LocationIndicator />
                Pozíció meghatározása...
            </p>
        {:else}
            <Alert icon="crosshairs-question">
                <p>
                    Nem sikerült meghatározni a jelenlegi pozíciódat vagy túl
                    messze vagy a helytől, ezért nem tudjuk betölteni az itteni
                    posztokat. Ellenőrizd a hely engedélyeket és próbáld újra.
                </p>
            </Alert>
            <a href={poi.googleMapsLink} target="_blank">
                <button class="btn" style="width: 100%;">
                    <span class="mdi mdi-navigation"></span>
                    Hová kell mennem, hogy lássam a posztokat?
                </button>
            </a>
        {/if}
    {:else}
        {#if ignoreLocation}
            <Alert icon="crosshairs-off" title="Pozíció figyelmen kívül hagyva">
                <p>
                    A pozíciód figyelmen kívül lett hagyva az oldal
                    betöltésekor, így bárhonnan megtekintheted a posztokat. Ne
                    oszd meg ennek az oldalnak a linkjét senkivel!
                </p>
            </Alert>
        {/if}
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
            {#if UserManager.instance.koloraUser && !UserManager.instance.koloraUser.isBanned}
                <div class="post-input-container">
                    <div>
                        <textarea
                            class="outlined-input"
                            style="resize: vertical; min-height: 80px;"
                            placeholder="Mi jár a fejedben?"
                            value={postDraft.content}
                            oninput={(e: any) => {
                                postDraft = {
                                    ...postDraft,
                                    content: e.target?.value ?? "",
                                };
                            }}
                            maxlength={PoiUtils.POST_CONTENT_LENGTH_LIMIT}
                        ></textarea>
                        <p style="text-align: right; font-size: 0.7rem;">
                            {postDraft.content
                                .length}/{PoiUtils.POST_CONTENT_LENGTH_LIMIT}
                        </p>
                    </div>
                    {#if postDraft.attachmentWorkId}
                        <a
                            href="/work?id={postDraft.attachmentWorkId}"
                            target="_blank"
                            style="background: var(--secondary-color); color: var(--on-secondary-color); padding: calc(var(--spacing) / 2); border-radius: var(--corner-radius);"
                        >
                            {publicWorks.find(
                                (w) => w.id === postDraft.attachmentWorkId,
                            )?.title}
                        </a>
                    {/if}
                    <div class="post-input-actions">
                        <button
                            class="btn"
                            onclick={() => {
                                if (!poi) {
                                    alert("Nem sikerült betölteni a helyet.");
                                    return;
                                }
                                if (!UserManager.instance.isLoggedIn) {
                                    alert(
                                        "Poszt írásához be kell jelentkezned.",
                                    );
                                    return;
                                }
                                firestore.works
                                    .getAllByUser(
                                        UserManager.instance.firebaseUser!!.uid,
                                    )
                                    .then((works) => {
                                        publicWorks = works;
                                    });
                                isWorkSelectorDialogOpen = true;
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
                                if (!UserManager.instance.isLoggedIn) {
                                    alert(
                                        "Poszt küldéséhez be kell jelentkezned.",
                                    );
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
                                        authorId:
                                            UserManager.instance.firebaseUser!!
                                                .uid,
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
            {:else}
                <div class="post-input-container">
                    <b>Szeretnél írni valamit erre a helyre? Jelentkezz be!</b>
                    <button class="btn" onclick={loginWithGoogle}>
                        <span class="mdi mdi-login"></span>
                        Bejelentkezés Google fiókkal
                    </button>
                </div>
            {/if}
        {/if}
        {#if isLoadingPosts}
            <p>Posztok betöltése...</p>
        {/if}
        {#each posts as post}
            <PostDisplay {post} />
        {/each}
    {/if}
</main>
<Footer />

<style>
    :global(body) {
        display: block;
    }

    .dialog {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        align-items: start;
        background: var(--secondary-color);
        color: var(--on-secondary-color);
        padding: var(--spacing);
        border-radius: var(--spacing);
        width: 100%;
        max-width: 400px;
        margin: var(--spacing) auto;
    }

    .dialog-actions {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
        justify-content: flex-end;
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
