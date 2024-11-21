<script lang="ts">
    import type Work from "$lib/model/Work";

    const {
        work,
    }: {
        work: Work;
    } = $props();
    import InteractivePoem from "$lib/InteractivePoem";

    let interactivePoem = $state(new InteractivePoem(work));
    let currentPage = $state(interactivePoem.pages[0].title);
</script>

<div class="work-display">
    <h2>{work.title}</h2>
    <h3>{currentPage}</h3>
    <p>
        {@html interactivePoem.pages.find((page) => page.title === currentPage)?.content}
    </p>
    <button
        onclick={() => {
            const currentPageIndex = interactivePoem.pages.findIndex(
                (page) => page.title === currentPage
            );
            currentPage = interactivePoem.pages[currentPageIndex - 1].title;
        }}
    >
        Előző oldal
    </button>
    <button
        onclick={() => {
            const currentPageIndex = interactivePoem.pages.findIndex(
                (page) => page.title === currentPage
            );
            currentPage = interactivePoem.pages[currentPageIndex + 1].title;
        }}
    >
        Következő oldal
    </button>
</div>

<style>
    .work-display {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }
</style>