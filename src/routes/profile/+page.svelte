<script lang="ts">
    import { onMount } from "svelte";
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Divider from "../../components/Divider.svelte";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import MarkdownStrictHtml from "../../components/markdown-renderers/MarkdownStrictHtml.svelte";
    import {
        deleteAccount,
        getCurrentUser,
        loginWithGoogle,
        logout,
    } from "$lib/firebase/auth";
    import UserManager from "$lib/UserManager.svelte";

    let isOwnerLoggedIn = $state(false);
    let isAuthLoaded = $state(false);
    let isLoggedIn = $state(false);
    let explicitProfileId = $state<string | null>(null);
    let viewedUserId = $state<string | null>(null);
    let koloraUser = $state(new KoloraUser());
    let badges: { icon: string; text: string }[] = $state([]);
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
    const markdownRenderers = {
        link: MarkdownLink as any,
        html: MarkdownStrictHtml as any,
    };
    const firestoreAny = firestore as any;

    function startEditing() {
        newUsername = koloraUser.username;
        newBio = koloraUser.bio;
        isEditingBio = true;
    }

    function cancelEditing() {
        isEditingBio = false;
        newUsername = koloraUser.username;
        newBio = koloraUser.bio;
    }

    async function saveProfile() {
        const username = newUsername.trim().slice(0, 30);
        const bio = newBio.slice(0, 1000);
        await firestore.users.set(koloraUser.id, {
            username,
            bio,
        });
        isEditingBio = false;
    }

    function updateBadges(user: KoloraUser) {
        const nextBadges: { icon: string; text: string }[] = [];

        if (user.isBanned) {
            nextBadges.push({
                icon: "gavel",
                text: "Bannolva",
            });
        }
        if (user.roles.includes(ROLES.ADMIN)) {
            nextBadges.push({
                icon: "shield-account",
                text: "Admin",
            });
        }
        if (user.roles.includes(ROLES.KOLORA_MEMBER)) {
            nextBadges.push({
                icon: "account-star",
                text: "Kolora tag",
            });
        }
        if (user.roles.includes(ROLES.EARLY_TESTER)) {
            nextBadges.push({
                icon: "test-tube",
                text: "Korai tesztelő",
            });
        }

        badges = nextBadges;
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        explicitProfileId = params.get("id");

        const { auth } = initializeFirebase();
        let userListener: (() => void) | null = null;

        function stopUserListener() {
            if (userListener) {
                userListener();
                userListener = null;
            }
        }

        const authListener = auth.onAuthStateChanged((user) => {
            isAuthLoaded = true;
            isLoggedIn = !!user;

            const targetId = explicitProfileId || user?.uid || null;
            viewedUserId = targetId;
            isOwnerLoggedIn = !!user && !!targetId && user.uid === targetId;

            stopUserListener();

            if (!targetId) {
                koloraUser = new KoloraUser();
                badges = [];
                isEditingBio = false;
                return;
            }

            userListener = firestore.users.listen(targetId, (profileUser) => {
                koloraUser = profileUser;
                updateBadges(profileUser);
            });
        });

        return () => {
            authListener();
            stopUserListener();
        };
    });
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    {#if !isAuthLoaded}
        <ComicPanel innerClass="container-column panel-blue">
            <h1>Profil</h1>
            <p>Betöltés...</p>
        </ComicPanel>
    {:else if !viewedUserId}
        <ComicPanel innerClass="container-column panel-blue">
            <h1>Profil</h1>
            <div class="actions">
                <button class="btn" onclick={loginWithGoogle}>
                    <span class="mdi mdi-google"></span>
                    Bejelentkezés Google fiókkal
                </button>
            </div>
        </ComicPanel>
    {:else}
        <ComicPanel innerClass="container-column panel-blue">
            <h1>Profil</h1>

            <h2>
                <span class="mdi mdi-account-circle"></span>
                {koloraUser.username || "Ismeretlen felhasználó"}
            </h2>

            {#if badges.length > 0}
                <div class="badges">
                    {#each badges as badge}
                        <span class="role-badge">
                            <span class="mdi mdi-{badge.icon}"></span>
                            {badge.text}
                        </span>
                    {/each}
                </div>
            {/if}

            <div class="bio-card">
                <SvelteMarkdown
                    source={compiledBio ||
                        "*Ez a felhasználó még nem írt bemutatkozást.*"}
                    renderers={markdownRenderers}
                />
            </div>

            {#if isLoggedIn}
                <div class="actions">
                    <button class="btn secondary-btn" onclick={logout}>
                        <span class="mdi mdi-logout"></span>
                        Kijelentkezés
                    </button>
                    {#if UserManager.instance.koloraUser?.roles?.includes(ROLES.KOLORA_MEMBER)}
                        <a class="btn go-own-profile" href="/member-tools">
                            <span class="mdi mdi-toolbox"></span>
                            Kolora eszközök
                        </a>
                    {/if}
                    {#if explicitProfileId && !isOwnerLoggedIn}
                        <a class="btn go-own-profile" href="/profile">
                            <span class="mdi mdi-account"></span>
                            Saját profil
                        </a>
                    {/if}
                </div>
            {/if}
        </ComicPanel>
    {/if}

    {#if viewedUserId && isOwnerLoggedIn}
        <ComicPanel innerClass="container-column panel-purple">
            <h3>
                <span class="mdi mdi-pencil"></span>
                Profil szerkesztése
            </h3>

            {#if isEditingBio}
                <label class="field-label" for="profile-username">Felhasználónév</label>
                <input
                    id="profile-username"
                    type="text"
                    class="text-input"
                    bind:value={newUsername}
                    maxlength="30"
                />

                <label class="field-label" for="profile-bio">Bemutatkozás</label>
                <textarea
                    id="profile-bio"
                    class="bio-input"
                    bind:value={newBio}
                    maxlength="1000"
                ></textarea>

                <p class="editor-help">
                    {newBio.length} / 1000 - A bemutatkozás támogatja a
                    <a
                        href="https://www.markdownguide.org/cheat-sheet/"
                        target="_blank"
                    >Markdown formázást</a> és a beágyazott YouTube videókat.
                </p>

                <div class="actions">
                    <button class="btn" onclick={saveProfile}>
                        <span class="mdi mdi-check"></span>
                        Mentés
                    </button>
                    <button class="btn secondary-btn" onclick={cancelEditing}>
                        <span class="mdi mdi-close"></span>
                        Mégse
                    </button>
                </div>
            {:else}
                <p>Szerkesztheted a nevedet és a bemutatkozásodat.</p>
                <div class="actions">
                    <button class="btn" onclick={startEditing}>
                        <span class="mdi mdi-pencil"></span>
                        Név és bemutatkozás szerkesztése
                    </button>
                </div>
            {/if}
        </ComicPanel>

        <Divider color="var(--kolora-color-red-variant)" />

        <ComicPanel innerClass="container-column panel-red">
            <h3>
                <span class="mdi mdi-alert"></span>
                Veszély zóna
            </h3>
            <p>Itt tudod törölni a fiókod és minden adatodat.</p>
            <div class="actions">
                <button
                    class="btn delete-btn"
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
                            firestoreAny.posts.deleteAllByUser(uid),
                            firestoreAny.works.deleteAllByUser(uid),
                            firestore.users.delete(uid),
                            deleteAccount(),
                        ])
                            .then(() => {
                                alert("A fiókod törölve lett.");
                                window.location.replace("/");
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
        </ComicPanel>
    {/if}
</main>
<Footer />

<style>
    h1,
    h2,
    h3 {
        text-transform: uppercase;
    }

    .badges {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .role-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        border: 2px solid black;
        padding: 0.25rem 0.6rem;
        font-weight: bold;
        background-color: var(--kolora-color-yellow);
        color: black;
        text-transform: uppercase;
    }

    .bio-card {
        width: 100%;
        border: 2px solid black;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.2);
        overflow-x: hidden;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .field-label {
        font-weight: bold;
        text-transform: uppercase;
    }

    .text-input,
    .bio-input {
        width: 100%;
        border: 3px solid black;
        background-color: white;
        color: black;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
    }

    .text-input {
        max-width: 520px;
    }

    .bio-input {
        resize: vertical;
        min-height: 140px;
    }

    .editor-help {
        opacity: 0.95;
    }

    .secondary-btn {
        background-color: white;
        color: black;
    }

    .go-own-profile {
        text-decoration: none;
    }

    .delete-btn {
        background-color: #b3072a;
        color: white;
    }

    @media (max-width: 768px) {
        .actions > .btn {
            width: 100%;
        }
    }
</style>
