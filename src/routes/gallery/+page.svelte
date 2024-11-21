<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { collection, doc, getDoc, getDocs } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import WorkCard from "../../components/WorkCard.svelte";

    let works: Work[] = $state([]);

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
    {#if works.length === 0}
        <p>Betöltés...</p>
    {/if}
    {#each works as work}
        <WorkCard {work} />
    {/each}
</main>
<Footer />
