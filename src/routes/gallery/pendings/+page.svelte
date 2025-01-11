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
    import SmallHeader from "../../../components/SmallHeader.svelte";

    let pendingWorks: Work[] = $state([]);

    function updateWorks() {
        firestore.works.getAll().then((fetchedWorks) => {
            pendingWorks = fetchedWorks.filter(
                (work) => work.status === "pending",
            );
        });
    }

    onMount(() => {
        if (getCurrentUser()) {
            firestore.users.get(getCurrentUser()!!.uid).then((fetchedUser) => {
                if (!fetchedUser.roles.includes(ROLES.KOLORA_MEMBER)) {
                    window.history.back();
                }
            });
        }

        updateWorks();
    });
</script>

<SmallHeader path={[{ title: "Galéria", href: "/gallery" }]} currentPage="Várakozó művek" />
<main>
    <Alert icon="information">
        <p>
            Itt vannak azok a művek, amiket az emberek meg szeretnének osztani
            és nekünk, a Kolora tagoknak kell jóváhagyni.
        </p>
    </Alert>
    {#if pendingWorks.length === 0}
        <p>Jelenleg nincsenek várakozó művek.</p>
    {/if}
    <div class="works-flow">
        {#each pendingWorks as work}
            <div>
                <WorkCard {work} />
                <p
                    style="display: flex; justify-content: end; padding: var(--spacing); gap: var(--spacing);"
                >
                    <button
                        class="btn"
                        onclick={() => {
                            firestore.works.set(work.id, { status: "draft" });
                            updateWorks();
                        }}
                    >
                        <span class="mdi mdi-close"></span>
                        Elutasít
                    </button>
                    <button
                        class="btn"
                        onclick={() => {
                            firestore.works.set(work.id, {
                                status: "published",
                            });
                            updateWorks();
                        }}
                    >
                        <span class="mdi mdi-check"></span>
                        Elfogad
                    </button>
                </p>
            </div>
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
