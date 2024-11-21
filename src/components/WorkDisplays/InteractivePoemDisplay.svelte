<script lang="ts">
    import type Work from "$lib/model/Work";
    import InteractivePoem, { InteractivePoemPage } from "$lib/InteractivePoem";

    const {
        work,
    }: {
        work: Work;
    } = $props();

    let interactivePoem = $state(new InteractivePoem(work));
    let currentPage: InteractivePoemPage | undefined = $state(interactivePoem.pages[0]);
</script>

<div class="work-display">
    <h2>{work.title}</h2>
    <h3>{currentPage?.title}</h3>
    <p>{@html currentPage?.content}</p>
    <div class="links-row">
        {#each currentPage?.links || [] as link}
            <button
                class="elevated-button"
                onclick={() => {
                    console.log(link);
                    currentPage = interactivePoem.getPageByLink(link);
                }}
            >
                {link.text}
            </button>
        {/each}
    </div>
</div>

<style>
    .work-display {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

    .links-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: var(--spacing);
        gap: var(--spacing);
        overflow-x: auto;
    }
</style>