<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { collection, doc, getDoc, getDocs } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";
    import firestore from "$lib/firebase/firestore";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import { getCurrentUser } from "$lib/firebase/auth";
    import SmallHeader from "../../components/SmallHeader.svelte";

    let works: Work[] = $state([]);
    let searchQuery = $state("");
    let filteredWorks = $derived(
        works.filter((work) => {
            return (
                work.status === "published" &&
                (work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    work.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    work.workType
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    work.genre
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
            );
        }),
    );
    let koloraUser = $state(new KoloraUser());

    onMount(() => {
        firestore.works.getAll().then((fetchedWorks) => {
            works = fetchedWorks;
        });

        const auth = initializeFirebase().auth;

        const authListener = auth.onAuthStateChanged((user) => {
            if (!user) return;
            firestore.users.get(user.uid).then((fetchedUser) => {
                koloraUser = fetchedUser;
            });
        });

        return () => {
            authListener();
        };
    });
</script>

<SmallHeader currentPage="Galéria" />
<main>
    <div class="sidebar">
        <h3>Művek</h3>
        <input
            type="text"
            class="outlined-input"
            placeholder="Keresés"
            bind:value={searchQuery}
        />
        {#if koloraUser && koloraUser.roles.includes(ROLES.KOLORA_MEMBER)}
            <a href="/gallery/pendings">
                <button class="btn" style="width: 100%;">
                    <span class="mdi mdi-receipt-clock"></span>
                    Várakozó művek ({works.filter(
                        (work) => work.status === "pending",
                    ).length})
                </button>
            </a>
        {/if}

        <h3>Versenyek, pályázatok, események</h3>
        <ul>
            <a href="/jam"><li>2025. 04. 11. - Költészet napi kalandozás</li></a>
        </ul>

        <h3>Dokumentáció</h3>
        <ul>
            <a href="/docs"><li>Főoldal</li></a>
            <a href="/docs/cyoa"><li>Choose your own adventure</li></a>
        </ul>
    </div>
    {#if works.length === 0}
        <p>Betöltés...</p>
    {/if}
    <div class="works-flow">
        {#each filteredWorks as work}
            <WorkCard {work} />
        {/each}
    </div>
</main>
<Footer />

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: var(--spacing);
    }

    @media (min-width: 768px) {
        main {
            flex-direction: row;
        }
    }

    .sidebar {
        flex: 1;
        width: 100%;
        max-width: 450px !important;
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
    }

    .works-flow {
        flex: 2;
        max-width: none !important;
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
        flex-wrap: wrap;
    }

    :global(.works-flow > *) {
        flex: 1;
        min-width: 300px;
    }
</style>
