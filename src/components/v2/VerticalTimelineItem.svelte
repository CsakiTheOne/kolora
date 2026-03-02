<script lang="ts">
    import { hapticFeedback } from "$lib/utils.svelte";
    import ComicPanel from "./ComicPanel.svelte";

    const {
        title = "",
        subtitle = "",
        facebookLink = "",
        instagramLink = "",
        isLastItem = false,
        panelClass = "panel-base",
        children,
    } = $props();

    let thisElement: HTMLElement | null = $state(null);
</script>

<div class="timeline-item" bind:this={thisElement}>
    <button
        class="indicators"
        onclick={() => {
            thisElement?.scrollIntoView({ behavior: "smooth", block: "start" });
            hapticFeedback();
        }}
        aria-label="Scroll to this item"
    >
        <div class="dot"></div>
        {#if !isLastItem}
            <div class="line"></div>
        {/if}
    </button>

    <ComicPanel
        outerClass="timeline-panel"
        innerClass={`container-column comic-dots ${panelClass}`}
    >
        <div class="title-row">
            <h2>{title}</h2>
            {#if facebookLink}
                <a href={facebookLink} target="_blank" aria-label="Facebook link">
                    <span class="mdi mdi-facebook"></span>
                </a>
            {/if}
            {#if instagramLink}
                <a
                    href={instagramLink}
                    target="_blank"
                    aria-label="Instagram link"
                >
                    <span class="mdi mdi-instagram"></span>
                </a>
            {/if}
        </div>

        {#if subtitle}
            <h4>{subtitle}</h4>
        {/if}

        <div class="body">
            {@render children()}
        </div>
    </ComicPanel>
</div>

<style>
    .timeline-item {
        max-width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 0.75rem;
    }

    .indicators {
        appearance: none;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        min-width: 24px;
        padding: 0;
    }

    .dot {
        width: 1rem;
        height: 1rem;
        background-color: var(--kolora-color-base);
        border: 3px solid black;
        rotate: 45deg;
        transition: all 0.1s ease-out;
    }

    .timeline-item:hover .dot {
        scale: 1.1;
    }

    .line {
        width: 6px;
        min-height: 100%;
        flex: 1;
        background-color: black;
    }

    :global(.timeline-panel) {
        flex: 1;
        width: 100%;
    }

    .title-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: start;
        width: 100%;
        gap: 0.6rem;
    }

    h2 {
        display: inline-block;
        padding: 0;
        margin: 0;
        flex-grow: 1;
    }

    .title-row > a {
        display: inline-block;
        flex-shrink: 0;
        font-size: 1.3rem;
    }

    h4 {
        margin: 0;
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
</style>
