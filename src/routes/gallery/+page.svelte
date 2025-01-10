<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { collection, doc, getDoc, getDocs } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";

    let works: Work[] = $state([]);
    let searchQuery = $state("");
    let filteredWorks = $derived(
        works.filter((work) => {
            return (
                work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                work.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                work.workType.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }),
    );

    onMount(() => {
        const db = initializeFirebase().firestore;
        const worksRef = collection(db, "works");
        
        getDocs(worksRef).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                works.push({ ...new Work(), ...doc.data() });
            });
        });
    });
</script>

<Header selectedTab="Galéria" />
<main>
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
