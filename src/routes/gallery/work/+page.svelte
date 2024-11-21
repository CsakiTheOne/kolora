<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import InteractivePoemDisplay from "../../../components/WorkDisplays/InteractivePoemDisplay.svelte";
    import GalleryUtils from "$lib/GalleryUtils";

    let work: Work | null = $state(null);

    onMount(() => {
        const id = GalleryUtils.workId;
        if (!id) {
            window.history.back();
            return;
        }
        const db = initializeFirebase().firestore;
        const workRef = doc(db, "works", id);

        getDoc(workRef)
            .then((doc) => {
                work = { ...new Work(), ...doc.data() };
            })
            .catch((err) => {
                window.history.back();
            });
    });
</script>

<Header selectedTab="Galéria" />
<main>
    {#if work?.workType === "Interaktív költemény"}
        <InteractivePoemDisplay {work} />
    {:else}
        <p>
            {work?.author} - {work?.dateCreated}
        </p>
        <h2>{work?.title}</h2>
        <p>{work?.content}</p>
    {/if}
</main>
<Footer />
