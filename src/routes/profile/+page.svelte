<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";
    import GalleryUtils from "$lib/GalleryUtils";
    import Badge from "../../components/Badge.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import MarkdownStrictHtml from "../../components/markdown-renderers/MarkdownStrictHtml.svelte";
    import Alert from "../../components/Alert.svelte";
    import { deleteAccount, getCurrentUser } from "$lib/firebase/auth";
    import type Post from "$lib/model/Post";
    import PostDisplay from "../../components/poi/PostDisplay.svelte";
    import type POI from "$lib/model/POI";
    import MarkdownLinebreakParagraph from "../../components/markdown-renderers/MarkdownLinebreakParagraph.svelte";
    import AchievementTree from "../../components/AchievementTree.svelte";
    import { achievements } from "$lib/model/Achievement";
    import Divider from "../../components/Divider.svelte";

    let isOwnerLoggedIn = $state(false);
    let koloraUser = $state(new KoloraUser());
    let badges: { icon: string; text: string }[] = $state([]);
    let works: Work[] = $state([]);
    let posts: Post[] = $state([]);
    let pois: POI[] = $state([]);
    let isEditingBio = $state(false);
    let newUsername = $state("");
    let newBio = $state("");
    const compiledBio = $derived(
        koloraUser.bio
            .replaceAll("{createdAt}", koloraUser.createdAt)
            .replaceAll(
                "{visitedPlaces}",
                "" + koloraUser.visitedPlaces.length,
            ),
    );

    function updateContent() {
        firestore.works.getAllByUser(koloraUser.id).then((newWorks) => {
            works = newWorks;
        });
        firestore.posts.getAllByAuthor(koloraUser.id).then((newPosts) => {
            posts = newPosts.sort((a, b) => b.createdAt - a.createdAt);
            firestore.pois.getAll().then((newPois) => {
                pois = newPois;
            });
        });
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            window.location.href = "/404";
        }

        const { auth } = initializeFirebase();

        const authListener = auth.onAuthStateChanged((user) => {
            isOwnerLoggedIn = (user && user.uid === id) === true;
        });

        const userListener = firestore.users.listen(id!!, (user) => {
            koloraUser = user;
            badges = [];

            updateContent();

            if (user.isBanned) {
                badges = [
                    ...badges,
                    {
                        icon: "gavel",
                        text: "Bannolva",
                    },
                ];
            }
            if (user.roles.includes(ROLES.ADMIN)) {
                badges = [
                    ...badges,
                    {
                        icon: "shield-account",
                        text: "Admin",
                    },
                ];
            }
            if (user.roles.includes(ROLES.KOLORA_MEMBER)) {
                badges = [
                    ...badges,
                    {
                        icon: "account-star",
                        text: "Kolora tag",
                    },
                ];
            }
            if (user.roles.includes(ROLES.EARLY_TESTER)) {
                badges = [
                    ...badges,
                    {
                        icon: "test-tube",
                        text: "Korai tesztelő",
                    },
                ];
            }
        });

        return () => {
            authListener();
            userListener();
        };
    });
</script>

<SmallHeader currentPage="Művész profil" />
<main>
    {#if isEditingBio}
        <input
            type="text"
            class="outlined-input"
            bind:value={newUsername}
            style="font-size: larger;"
            maxlength="30"
        />
        <textarea
            class="outlined-input"
            style="resize: none; field-sizing: content; min-height: 100px;"
            bind:value={newBio}
            maxlength="1000"
        ></textarea>
        <p>
            {newBio.length} / 1000 - A bemutatkozás támogatja a
            <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank"
                >Markdown formázást</a
            >, a beágyazott YouTube videókat és a következő változókat: <br />
            - {"{createdAt}"}: Regisztrálás dátuma<br />
            - {"{visitedPlaces}"}: Látogatott helyek száma
        </p>
    {:else}
        <h2>
            <span class="mdi mdi-account-circle"></span>
            {koloraUser.username}
        </h2>
        {#if badges.length > 0}
            <div class="badges">
                {#each badges as badge}
                    <Badge>
                        <span class="mdi mdi-{badge.icon}"></span>
                        {badge.text}
                    </Badge>
                {/each}
            </div>
        {/if}
        <div class="outlined-card" style="max-width: 100%; overflow-x: hidden;">
            <SvelteMarkdown
                source={compiledBio ||
                    "*Ez a felhasználó még nem írt bemutatkozást.*"}
                renderers={{
                    link: MarkdownLink,
                    html: MarkdownStrictHtml,
                }}
            />
        </div>
    {/if}
    {#if isOwnerLoggedIn}
        <button
            class="btn"
            style="align-self: flex-end;"
            onclick={() => {
                isEditingBio = !isEditingBio;
                if (isEditingBio) {
                    newUsername = koloraUser.username;
                    newBio = koloraUser.bio;
                } else {
                    firestore.users.set(koloraUser.id, {
                        username: newUsername,
                        bio: newBio,
                    });
                }
            }}
        >
            {#if isEditingBio}
                <span class="mdi mdi-check"></span>
                Kész
            {:else}
                <span class="mdi mdi-pencil"></span>
                Név és bemutatkozás szerkesztése
            {/if}
        </button>
    {/if}

    <Divider />

    {#if isOwnerLoggedIn}
        <Alert icon="eye-off">
            <p>
                A művek és posztok a profilodon csak neked látszódnak és mások
                nem látják ezeket. A többi felhasználó csak úgy láthatja az
                alkotásaid, ha megtalálják egy üzenőfalon.
            </p>
        </Alert>
    {/if}

    <!--h3
        style="display: flex; justify-content: space-between; align-items: flex-end;"
    >
        <span>
            <span class="mdi mdi-star"></span>
            Teljesítmények
        </span>
    </h3>
    <AchievementTree
        rootAchievement={achievements[0]}
        visitedPlaces={koloraUser.visitedPlaces}
    /-->

    <h3
        style="display: flex; justify-content: space-between; align-items: flex-end;"
    >
        <span>
            <span class="mdi mdi-library-shelves"></span>
            Alkotások
        </span>
    </h3>
    {#if !isOwnerLoggedIn}
        <p>
            {#if works.length === 0}
                Ez a felhasználó még nem osztott meg műveket.
            {:else}
                Ennek a felhasználónak {works.length} műve van. Találd meg az üzenőfalakon.
            {/if}
        </p>
    {:else}
        {#if works.length === 0}
            <p>Még nincsenek műveid.</p>
        {:else}
            {#each works as work}
                <div>
                    <WorkCard {work} />
                    <p
                        style="display: flex; justify-content: end; gap: var(--spacing); align-items: center;"
                    >
                        <button
                            class="text-btn"
                            onclick={() => {
                                const input = prompt(
                                    `Biztosan törölni szeretnéd ezt a művet? Írd be a mű címét (${work.title}) a törlés megerősítéséhez.`,
                                );

                                if (input === work.title) {
                                    firestore.works
                                        .delete(work.id)
                                        .then(() => {
                                            updateContent();
                                        })
                                        .catch(() => {
                                            alert(
                                                "Hiba történt a törlés során.",
                                            );
                                        });
                                }
                            }}
                            aria-label="Mű törlése"
                        >
                            <span class="mdi mdi-delete"></span>
                        </button>
                        {#if !koloraUser.isBanned}
                            <a
                                href={`/edit/?id=${work.id}`}
                                aria-label="Mű szerkesztése"
                            >
                                <button
                                    class="text-btn"
                                    aria-label="Mű szerkesztése"
                                >
                                    <span class="mdi mdi-pencil"></span>
                                </button>
                            </a>
                        {/if}
                    </p>
                </div>
            {/each}
        {/if}
        {#if !koloraUser.isBanned}
            <button
                class="btn"
                onclick={() => {
                    window.location.href = "/edit";
                }}
            >
                <span class="mdi mdi-plus"></span>
                Új mű
            </button>
        {/if}
    {/if}
    <h3
        style="display: flex; justify-content: space-between; align-items: flex-end;"
    >
        <span>
            <span class="mdi mdi-post"></span>
            Posztok
        </span>
    </h3>
    {#if !isOwnerLoggedIn}
        <p>
            {#if posts.length === 0}
                Ez a felhasználó még nem osztott meg posztokat.
            {:else}
                Ennek a felhasználónak {posts.length} posztja van. Találd meg az
                üzenőfalakon.
            {/if}
        </p>
    {:else}
        {#each posts as post}
            <div>
                <span>{pois.find((p) => p.id === post.poiId)?.name}</span>
                <PostDisplay {post} />
            </div>
        {/each}
        <Divider />
        <div class="outlined-card danger-zone">
            <h3>
                <span class="mdi mdi-alert"></span>
                Veszély zóna
            </h3>
            <p>
                Itt tudod törölni a műveidet, posztjaid, profilod és fiókod. A
                kedvelt posztoknál továbbra is be lesz számolva a kedvelésed, de
                nem lehet hozzád kötni azt.
            </p>
            <button
                class="btn"
                onclick={() => {
                    const input = prompt(
                        "Biztosan törölni szeretnéd a fiókodat? Írd be a felhasználónevedet a törlés megerősítéséhez.",
                    );
                    const uid = getCurrentUser()?.uid;

                    if (input !== koloraUser.username || !uid) {
                        alert(
                            "A felhasználónév nem egyezik. A fiók törlése megszakítva.",
                        );
                        return;
                    }

                    Promise.all([
                        firestore.posts.deleteAllByUser(uid),
                        firestore.works.deleteAllByUser(uid),
                        firestore.users.delete(uid),
                        deleteAccount(),
                    ])
                        .then(() => {
                            alert("A fiókod törölve lett.");
                            window.location.href = "/";
                        })
                        .catch(() => {
                            alert(
                                "Hiba történt a fiók törlése során. Kérlek próbáld újra később.",
                            );
                        });
                }}
            >
                <span class="mdi mdi-delete-forever"></span>
                Fiók és minden adat törlése
            </button>
        </div>
    {/if}
</main>
<Footer />

<style>
    hr {
        border: 1px solid var(--primary-color);
    }

    .badges {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--spacing);
        overflow-x: auto;
    }

    .outlined-card {
        padding: var(--spacing);
        border: 2px solid var(--primary-color);
        border-radius: var(--corner-radius);
        background-color: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
    }

    :global(.outlined-card a) {
        color: var(--on-primary-variant-color) !important;
    }

    .danger-zone {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        border-color: red;
    }

    .danger-zone .btn {
        background-color: red;
        color: white;
    }
</style>
