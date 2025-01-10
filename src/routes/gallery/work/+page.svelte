<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
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

        firestore.works
            .get(id)
            .then((fetchedWork) => {
                work = fetchedWork;
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
        <a href={`/profile/?id=${work?.authorId}`}>{authorName}</a> - {work?.dateCreated}
    </p>
    <div class="title-row">
        <span
            class="mdi mdi-arrow-left"
            onclick={() => {
                window.history.back();
            }}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    window.history.back();
                }
            }}
            tabindex="0"
            role="button"
        ></span>
        <h2>{work?.title}</h2>
        <span
            class="mdi mdi-information"
            onclick={() => {
                alert(work?.description);
            }}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    alert(work?.description);
                }
            }}
            tabindex="0"
            role="button"
        ></span>
        <span
            class="mdi mdi-share-variant"
            onclick={() => {
                navigator.share({
                    url: window.location.href + "?id=" + work?.id,
                });
            }}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    navigator.share({
                        url: window.location.href + "?id=" + work?.id,
                    });
                }
            }}
            tabindex="0"
            role="button"
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
        gap: var(--spacing);
        justify-content: space-between;
        align-items: center;
    }

    .title-row span {
        font-size: 1.3rem;
        cursor: pointer;
        translate: 0 4px;
    }
</style>
