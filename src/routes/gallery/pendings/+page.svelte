<script lang="ts">
    import Work from "$lib/model/Work";
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import firestore from "$lib/firebase/firestore";
    import WorkCard from "../../../components/WorkCard.svelte";
    import Alert from "../../../components/Alert.svelte";
    import { getCurrentUser } from "$lib/firebase/auth";
    import { ROLES } from "$lib/model/KoloraUser";

    let pendingWorks: Work[] = $state([]);

    onMount(() => {
        if (getCurrentUser()) {
            firestore.users.get(getCurrentUser()!!.uid).then((fetchedUser) => {
                if (!fetchedUser.roles.includes(ROLES.KOLORA_MEMBER)) {
                    window.history.back();
                }
            });
        }

        firestore.works.getAll().then((fetchedWorks) => {
            pendingWorks = fetchedWorks.filter(
                (work) => work.status === "pending",
            );
        });
    });
</script>

<Header />
<main>
    <a href="/gallery">
        <button class="btn">
            <span class="mdi mdi-arrow-left"></span>
            Vissza a galériába
        </button>
    </a>
    <Alert icon="information">
        Itt vannak azok a művek, amiket az emberek meg szeretnének osztani és
        nekünk, a Kolora tagoknak kell jóváhagyni.
    </Alert>
    {#if pendingWorks.length === 0}
        <p>Jelenleg nincsenek várakozó művek.</p>
    {/if}
    <div class="works-flow">
        {#each pendingWorks as work}
            <WorkCard {work} />
            <p style="display: flex; justify-content: end;">
                <button class="btn">Elfogad</button>
                <button class="btn">Elutasít</button>
            </p>
        {/each}
    </div>
</main>
<Footer />

<style>
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
