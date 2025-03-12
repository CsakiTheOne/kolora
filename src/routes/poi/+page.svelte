<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type POI from "$lib/model/POI";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import PoiHeader from "../../components/poi/PoiHeader.svelte";
    import type { User } from "firebase/auth";
    import type KoloraUser from "$lib/model/KoloraUser";
    import { initializeFirebase } from "$lib/firebase/firebase";

    let poiId: string | null = $state(null);
    let poi: POI | null = $state(null);

    let isLoadingLocation = $state(false);
    let isNearby = $state(false);
    let ignoreLocation = $state(false);
    let debugDistance = $state(0);

    let user: User | null = $state(null);
    let koloraUser: KoloraUser | null = $state(null);

    let postText = $state("");

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        poiId = params.get("id");
        ignoreLocation = params.get("ignoreLocation") === "1";
        isNearby = ignoreLocation;

        if (!poiId) {
            window.history.back();
            return;
        }

        firestore.pois
            .get(poiId)
            .then((res) => {
                if (!res) {
                    window.history.back();
                    return;
                }

                poi = res;

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
        <a href={poi.googleMapsLink} target="_blank">
            <button class="btn" style="width: 100%;">
                <span class="mdi mdi-map-marker"></span>
                Google Térkép megnyitása
            </button>
        </a>
        {#if poi.allowPosting}
            <div class="post-input-container">
                <textarea
                    class="outlined-input"
                    style="resize: none;"
                    placeholder="Mi jár a fejedben?"
                    value={postText}
                    onchange={(e) => {
                        postText = e.target?.value;
                    }}
                ></textarea>
                <div class="post-input-actions">
                    <button
                        class="btn"
                        onclick={() => {
                            if (!koloraUser) {
                                alert("Poszt írásához be kell jelentkezned.");
                                return;
                            }
                        }}
                    >
                        <span class="mdi mdi-attachment"></span>
                        Mű csatolása
                    </button>
                    <button
                        class="btn"
                        disabled={!postText}
                        onclick={() => {
                            if (!koloraUser) {
                                alert("Poszt küldéséhez be kell jelentkezned.");
                                return;
                            }
                            if (!postText) {
                                alert("Nem lehet üres a poszt szövege.");
                                return;
                            }
                        }}
                    >
                        <span class="mdi mdi-send"></span>
                        Küldés
                    </button>
                </div>
            </div>
        {/if}
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
