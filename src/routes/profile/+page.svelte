<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import Badge from "../../components/Badge.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import MarkdownStrictHtml from "../../components/markdown-renderers/MarkdownStrictHtml.svelte";
    import { deleteAccount, getCurrentUser } from "$lib/firebase/auth";
    import Divider from "../../components/Divider.svelte";

    let isOwnerLoggedIn = $state(false);
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
            >, a beágyazott YouTube videókat és a következő változókat:
            <br />
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

    {#if isOwnerLoggedIn}
        <Divider />
        <div class="outlined-card danger-zone">
            <h3>
                <span class="mdi mdi-alert"></span>
                Veszély zóna
            </h3>
            <p>Itt tudod törölni a fiókod és minden adatodat.</p>
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
