<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraUser from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";
    import GalleryUtils from "$lib/GalleryUtils";
    import Badge from "../../components/Badge.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";

    let isOwnerLoggedIn = $state(false);
    let koloraUser = $state(new KoloraUser());
    let works: Work[] = $state([]);
    let isEditingBio = $state(false);
    let newBio = $state("");

    function updateWorks() {
        firestore.works.getAllByAuthor(koloraUser.id).then((newWorks) => {
            works = newWorks;
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

            updateWorks();
        });

        return () => {
            authListener();
            userListener();
        };
    });

    function editUsername() {
        const newUsername = prompt(
            "Írd be az új felhasználóneved!",
            koloraUser.username,
        );

        if (!newUsername) return;

        firestore.users.set(koloraUser.id, {
            username: newUsername,
        });
    }
</script>

<SmallHeader
    path={[{ title: "Galéria", href: "/gallery" }]}
    currentPage="Művész profil"
/>
<main>
    <h2>
        <span class="mdi mdi-account-circle"></span>
        {koloraUser.username}
        {#if isOwnerLoggedIn}
            <span
                class="mdi mdi-pencil"
                style="cursor: pointer;"
                onclick={editUsername}
                onkeypress={(e) => e.key === "Enter" && editUsername()}
                role="button"
                tabindex="0"
            ></span>
        {/if}
    </h2>
    <div
        style="background: var(--primary-variant-color); padding: var(--spacing); border-radius: var(--spacing);"
    >
        {#if isEditingBio}
            <textarea
                class="outlined-input"
                style="resize: none; field-sizing: content;"
                bind:value={newBio}
                maxlength="500"
            ></textarea>
            <p>
                A bemutatkozás támogatja a <a
                    href="https://www.markdownguide.org/cheat-sheet/"
                    target="_blank">Markdown formázást</a
                >.
            </p>
        {:else}
            <p>
                <SvelteMarkdown
                    source={koloraUser.bio ||
                        "*Ez a felhasználó még nem írt bemutatkozást.*"}
                    renderers={{ link: MarkdownLink }}
                />
            </p>
        {/if}
        {#if isOwnerLoggedIn}
            <button
                class="btn"
                style="float: right;"
                onclick={() => {
                    isEditingBio = !isEditingBio;
                    if (isEditingBio) {
                        newBio = koloraUser.bio;
                    } else {
                        firestore.users.set(koloraUser.id, {
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
                    Szerkesztés
                {/if}
            </button>
        {/if}
    </div>
    <h3
        style="display: flex; justify-content: space-between; align-items: flex-end;"
    >
        <span>Művek</span>
        {#if isOwnerLoggedIn}
            <button
                class="btn"
                onclick={() => {
                    GalleryUtils.workId = null;
                    window.location.href = "/gallery/edit";
                }}
            >
                <span class="mdi mdi-plus"></span>
                Új mű
            </button>
        {/if}
    </h3>
    {#if works.length === 0}
        <p>Ennek a felhasználónak még nincsenek művei.</p>
    {:else}
        {#each works as work}
            <WorkCard {work} />
            {#if isOwnerLoggedIn}
                <p
                    style="display: flex; justify-content: end; gap: var(--spacing); align-items: center;"
                >
                    {#if work.status === "published"}
                        <button
                            class="btn"
                            onclick={() => {
                                confirm(
                                    "Biztosan visszavonod a mű publikálását?",
                                ) &&
                                    firestore.works.set(work.id, {
                                        status: "draft",
                                    });
                                updateWorks();
                            }}
                        >
                            <span class="mdi mdi-eye-off"></span>
                            Visszahívás
                        </button>
                    {/if}
                    <button
                        class="btn"
                        onclick={() => {
                            const input = prompt(
                                `Biztosan törölni szeretnéd ezt a művet? Írd be a mű címét (${work.title}) a törlés megerősítéséhez.`,
                            );

                            if (input === work.title) {
                                firestore.works
                                    .delete(work.id)
                                    .then(() => {
                                        updateWorks();
                                    })
                                    .catch(() => {
                                        alert("Hiba történt a törlés során.");
                                    });
                            }
                        }}
                    >
                        <span class="mdi mdi-delete"></span>
                        Törlés
                    </button>
                    <a href={`/gallery/edit/?id=${work.id}`}>
                        <button class="btn">
                            <span class="mdi mdi-pencil"></span>
                            Szerkesztés
                        </button>
                    </a>
                </p>
            {/if}
        {/each}
    {/if}
    {#if isOwnerLoggedIn}
        <details>
            <summary>
                <h3 style="display: inline;">
                    Beállítások
                    <Badge style="translate: 0 -4px;">Ezt csak te látod</Badge>
                </h3>
            </summary>
            <div
                style="display: flex; flex-direction: column; padding: var(--spacing) 0; gap: var(--spacing);"
            >
                <label for="preferredMusicService">Preferált zene app</label>
                <select
                    class="outlined-input"
                    name="preferredMusicService"
                    value={koloraUser.preferredMusicService}
                    onchange={(e) => {
                        firestore.users.set(koloraUser.id, {
                            preferredMusicService: e.target.value,
                        });
                    }}
                >
                    <option>Spotify</option>
                    <option>YouTube</option>
                    <option>YouTube Music</option>
                </select>
                <p style="font-size: .8rem;">
                    A "Hallgassunk random valamit" gomb a főoldalon a te
                    preferált zene appod fogja megnyitni.
                </p>
            </div>
        </details>
    {/if}
</main>
<Footer />
