<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraUser from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";

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
</main>
<Footer />
