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
                        .includes(searchQuery.toLowerCase()))
            );
        }),
    );
    let koloraUser = $state(new KoloraUser());

    onMount(() => {
        firestore.works.getAll().then((fetchedWorks) => {
            works = fetchedWorks;
        });

        if (getCurrentUser()) {
            firestore.users.get(getCurrentUser()!!.uid).then((fetchedUser) => {
                koloraUser = fetchedUser;
            });
        }
    });
</script>

<Header selectedTab="Galéria" />
<main>
    {#if koloraUser && koloraUser.roles.includes(ROLES.KOLORA_MEMBER)}
        <a href="/gallery/pendings">
            <button class="btn" style="width: 100%;">
                Várakozó művek ({works.filter(
                    (work) => work.status === "pending",
                ).length})
            </button>
        </a>
    {/if}
    <div class="filter-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Keresés"
            bind:value={searchQuery}
        />
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
    .filter-row {
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
    }

    .works-flow {
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
