<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import ChooseYourOwnAdventureDisplay from "../../../components/WorkDisplays/ChooseYourOwnAdventureDisplay.svelte";
    import GalleryUtils from "$lib/GalleryUtils";
    import KoloraUser from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";

    let work: Work | null = $state(null);
    let authorName: string | null = $state(null);

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
                return firestore.users.get(work.authorId);
            })
            .then((user: KoloraUser) => {
                authorName = user.username;
            })
            .catch((err) => {
                window.history.back();
            });
    });
</script>

<Header selectedTab="Galéria" />
<main>
    <p>
        {authorName} - {work?.dateCreated}
    </p>
    <div class="title-row">
        <h2>{work?.title}</h2>
        <span
            class="mdi mdi-share-variant"
            onclick={() => {
                navigator.share({
                    url: window.location.href + "?id=" + work?.id,
                });
            }}
        ></span>
    </div>

    <hr />

    {#if work?.workType === "Choose your own adventure"}
        <ChooseYourOwnAdventureDisplay {work} />
    {:else}
        <p>{work?.content}</p>
    {/if}
</main>
<Footer />

<style>
    .title-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-row span {
        font-size: 1.3rem;
        padding: 0 var(--spacing);
        cursor: pointer;
    }
</style>
