<script lang="ts">
    import type Work from "$lib/model/Work";
    import InteractivePoem, { InteractivePoemPage } from "$lib/InteractivePoem.svelte";

    const {
        work,
    }: {
        work: Work;
    } = $props();

    let interactivePoem = $state(new InteractivePoem(work));
    let currentPage: InteractivePoemPage | undefined = $state(
        interactivePoem.pages[0],
    );
    let processedContent = $state("");

    $effect(() => {
        interactivePoem.runCommandsOnPage(currentPage);
        processedContent = currentPage?.getProcessedContent(interactivePoem) || "";
    });
</script>

<div class="work-display">
    <h3>{currentPage?.title}</h3>
    <p>{@html processedContent}</p>
    {#each currentPage?.links || [] as link}
        <button
            class="interactive-poem-link"
            onclick={() => {
                scrollTo(0, 0);
                currentPage = interactivePoem.getPageByLink(link);
            }}
            disabled={!link.condition.evaluate(interactivePoem)}
        >
            {#if !link.condition.evaluate(interactivePoem)}
                <span class="mdi mdi-lock"></span>
            {:else}
                {link.text}
            {/if}
        </button>
    {/each}
</div>

<style>
    .work-display {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

    .interactive-poem-link {
        appearance: none;
        padding: var(--spacing);
        background-color: transparent;
        color: var(--on-background-color);
        border: 2px solid var(--primary-color);
        border-radius: var(--corner-radius);
        cursor: pointer;
        text-align: left;
    }

    .interactive-poem-link:hover:not(:disabled) {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }

    .interactive-poem-link:disabled {
        border: 1px solid var(--on-background-color);
        cursor: not-allowed;
        text-align: center;
    }
</style>
