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

    let isOwnerLoggedIn = $state(false);
    let koloraUser = $state(new KoloraUser());
    let works: Work[] = $state([]);

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

            firestore.works.getAllByAuthor(id!!).then((newWorks) => {
                works = newWorks;
            });
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

<Header />
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
    <h3>Művek</h3>
    {#if works.length === 0}
        <p>Ennek a felhasználónak még nincsenek művei.</p>
    {:else}
        {#each works as work}
            <WorkCard {work} />
        {/each}
    {/if}
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

        <details>
            <summary>
                <h3 style="display: inline;">
                    Beállítások
                    <Badge style="translate: 0 -4px;">Ezt csak te látod</Badge>
                </h3>
            </summary>
            <div style="display: flex; flex-direction: column; padding: var(--spacing) 0; gap: var(--spacing);">
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
