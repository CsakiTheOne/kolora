<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type POI from "$lib/model/POI";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import PoiHeader from "../../components/poi/PoiHeader.svelte";
    import Post from "$lib/model/Post";
    import PostDisplay from "../../components/poi/PostDisplay.svelte";
    import Backdrop from "../../components/Backdrop.svelte";
    import type Work from "$lib/model/Work";
    import Footer from "../../components/Footer.svelte";
    import PoiUtils from "$lib/PoiUtils";
    import UserManager from "$lib/UserManager.svelte";
    import { loginWithGoogle } from "$lib/firebase/auth";
    import LocationIndicator from "../../components/poi/LocationIndicator.svelte";
    import koloraLogo from "$lib/images/logos/kolora.png";

    let poiId: string | null = $state(null);
    let poi: POI | null = $state(null);

    let isWelcomeScreenOpen = $state(true);
    let welcomeScreenBackground: HTMLCanvasElement | null = $state(null);

    let isLoadingLocation = $state(false);
    let distanceMeters = $state(0);
    let isNearby = $state(false);
    let ignoreLocation = $state(false);

    let isVisitSent = $state(false);
    let publicWorks: Work[] = $state([]);

    let isLoadingPosts = $state(false);
    let posts: Post[] = $state([]);

    let postDraft: Post = $state({ ...new Post() });
    let isWorkSelectorDialogOpen = $state(false);

    function startWatchingLocation() {
        isLoadingLocation = true;
        return navigator.geolocation.watchPosition(
            (position) => {
                if (ignoreLocation) {
                    isNearby = true;
                    isLoadingLocation = false;
                    if (posts.length === 0) {
                        loadPosts();
                    }
                    return;
                }

                distanceMeters = PoiUtils.measureDistance(
                    poi!!.latitude,
                    poi!!.longitude,
                    position.coords.latitude,
                    position.coords.longitude,
                );

                isNearby = distanceMeters < PoiUtils.DISTANCE_TO_VIEW;

                if (isNearby && posts.length === 0) {
                    loadPosts();
                }
                isLoadingLocation = false;
            },
            (error) => {
                isNearby = false;
                isLoadingLocation = false;
            },
            {
                enableHighAccuracy: true,
                maximumAge: 120,
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
            window.location.replace("/feeds");
            return;
        }

        let elapsedTime = 0;
        const wctx = welcomeScreenBackground?.getContext("2d");
        if (!welcomeScreenBackground || !wctx) return;
        welcomeScreenBackground.width =
            welcomeScreenBackground.parentElement!!.clientWidth;
        welcomeScreenBackground.height =
            welcomeScreenBackground.parentElement!!.clientHeight;
        const welcomeAnimationInterval = setInterval(() => {
            const scale = Math.max(
                1,
                welcomeScreenBackground!!.height * 1.2 - elapsedTime,
            );
            elapsedTime += 1000 / 60;
            wctx.clearRect(
                0,
                0,
                welcomeScreenBackground!!.width,
                welcomeScreenBackground!!.height,
            );
            wctx.beginPath();
            const offset = -elapsedTime / 500;
            for (let i = 0; i < 2 * Math.PI; i += 0.1) {
                const radius =
                    56 + Math.sin(offset + i * Math.PI * 2.25) * 4 + scale;
                wctx.lineTo(
                    64 +
                        radius * Math.cos(i) +
                        welcomeScreenBackground!!.width / 2 -
                        64,
                    64 + radius * Math.sin(i) + 64,
                );
            }
            wctx.closePath();
            wctx.fillStyle = "#89013f";
            wctx.fill();
        }, 1000 / 60);

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
            })
            .catch(() => {
                window.history.back();
            });

        let locationWatcher = startWatchingLocation();

        return () => {
            if (welcomeAnimationInterval) {
                clearInterval(welcomeAnimationInterval);
            }
            if (locationWatcher) {
                navigator.geolocation.clearWatch(locationWatcher);
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

{#if isWelcomeScreenOpen}
    <div class="welcome-screen">
        <canvas
            style="position: absolute; top: 0; left: 0; z-index: 0;"
            bind:this={welcomeScreenBackground}
        >
        </canvas>
        <div class="welcome-screen-content-holder fade-in-2s">
            <img
                style="display: block; width: 72px;"
                src={koloraLogo}
                alt="Kolora logó"
            />
            <h2>Üdv a Kolora helyi üzenőfalán</h2>
            <h3>
                {#if poi}
                    <span class="mdi mdi-map-marker"></span>
                    {poi.name}
                {:else}
                    Betöltés...
                {/if}
            </h3>
            <p>
                Ez egy helyhez kötött üzenőfal, ahol verseket, kis történeteket
                és egyéb gondolatokat hagyhatsz másoknak.
            </p>
            <a href="/">
                <button class="btn">
                    Kik vagyunk? Mi az a Kolora Egyesület?
                </button>
            </a>
            <a href="/feeds">
                <button class="btn">
                    <span class="mdi mdi-map"></span>
                    Hol vannak még ilyenek?
                </button>
            </a>
            <button
                class="btn"
                onclick={() => (isWelcomeScreenOpen = false)}
                disabled={!poi || !isNearby}
            >
                {#if isLoadingLocation}
                    <LocationIndicator />
                    Pozíció meghatározása...
                {:else if !isNearby}
                    <span class="mdi mdi-crosshairs-off"></span>
                    Nem sikerült ellenőrizni a helyed vagy túl messze vagy, hogy
                    megnyisd az üzenőfalat
                {:else}
                    <span class="mdi mdi-arrow-right"></span>
                    Üzenőfal megnyitása
                {/if}
            </button>
        </div>
    </div>
{:else}
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
                        Nem sikerült meghatározni a jelenlegi pozíciódat vagy
                        túl messze vagy a helytől, ezért nem tudjuk betölteni az
                        itteni posztokat. Ellenőrizd a hely engedélyeket és
                        próbáld újra.
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
                <Alert
                    icon="crosshairs-off"
                    title="Pozíció figyelmen kívül hagyva"
                >
                    <p>
                        A pozíciód figyelmen kívül lett hagyva az oldal
                        betöltésekor, így bárhonnan megtekintheted a posztokat.
                        Ne oszd meg ennek az oldalnak a linkjét senkivel!
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
                                        alert(
                                            "Nem sikerült betölteni a helyet.",
                                        );
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
                                            UserManager.instance.firebaseUser!!
                                                .uid,
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
                                        alert(
                                            "Nem sikerült betölteni a helyet.",
                                        );
                                        return;
                                    }
                                    if (!UserManager.instance.isLoggedIn) {
                                        alert(
                                            "Poszt küldéséhez be kell jelentkezned.",
                                        );
                                        return;
                                    }
                                    if (!postDraft.content) {
                                        alert(
                                            "Nem lehet üres a poszt szövege.",
                                        );
                                        return;
                                    }
                                    firestore.posts
                                        .add({
                                            ...postDraft,
                                            poiId: poi.id,
                                            authorId:
                                                UserManager.instance
                                                    .firebaseUser!!.uid,
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
                        <b
                            >Szeretnél írni valamit erre a helyre? Jelentkezz
                            be!</b
                        >
                        <button class="btn" onclick={loginWithGoogle}>
                            <span class="mdi mdi-login"></span>
                            Bejelentkezés Google fiókkal
                        </button>
                    </div>
                {/if}
            {/if}
            {#if isLoadingPosts && posts.length === 0}
                <p>Posztok betöltése...</p>
            {/if}
            {#each posts as post}
                <PostDisplay {post} onReloadRequest={() => loadPosts()} />
            {/each}
        {/if}
    </main>
    <Footer />
{/if}

<style>
    :global(body) {
        display: block;
    }

    .welcome-screen {
        position: relative;
        width: 100vw;
        height: 100dvh;
    }

    .welcome-screen-content-holder {
        position: relative;
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing);
        padding-top: 92px;
        padding-bottom: 64px;
        z-index: 1;
    }

    .welcome-screen-content-holder :is(a, .btn) {
        width: 100%;
        max-width: 400px;
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
