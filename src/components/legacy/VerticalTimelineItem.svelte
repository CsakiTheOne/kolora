<script>
    import { hapticFeedback } from "$lib/utils.svelte";

    const {
        title = "",
        subtitle = "",
        facebookLink = "",
        instagramLink = "",
        isLastItem = false,
        children,
    } = $props();

    let thisElement = null;
</script>

<div class="timeline-item" bind:this={thisElement}>
    <div
        class="indicators"
        onclick={() => {
            thisElement.scrollIntoView({ behavior: "smooth" });
            hapticFeedback();
        }}
        role="button"
        aria-label="Scroll to this item"
    >
        <div class="dot"></div>
        {#if !isLastItem}
            <div class="line"></div>
        {/if}
    </div>
    <div class="content">
        <div class="title-row">
            <h2>{title}</h2>
            {#if facebookLink}
                <a href={facebookLink} target="_blank">
                    <span class="mdi mdi-facebook"></span>
                </a>
            {/if}
            {#if instagramLink}
                <a href={instagramLink} target="_blank">
                    <span class="mdi mdi-instagram"></span>
                </a>
            {/if}
        </div>
        <h4>{subtitle}</h4>
        <div>
            {@render children()}
        </div>
    </div>
</div>

<style>
    .timeline-item {
        max-width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .indicators {
        flex: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing);
        translate: 0 6px;
    }

    .dot {
        width: 1rem;
        height: 1rem;
        flex: 0;
        aspect-ratio: 1;
        background-color: var(--primary-color);
        border-radius: 50%;
        transition: all 0.1s ease-out;
    }

    .timeline-item:hover .dot {
        transform: scale(1.2);
    }

    .timeline-item:hover .dot:active {
        transform: scale(0.9);
        background-color: var(--secondary-color);
    }

    .line {
        width: 1px;
        height: 100%;
        flex: 1;
        background-color: var(--primary-color);
        transition: all 0.1s ease-out;
    }

    .indicators:hover .line {
        width: 2px;
    }

    .indicators:active .line {
        width: 3px;
    }

    .title-row {
        display: flex;
        flex-direction: row !important;
        flex-wrap: nowrap;
        align-items: start;
        width: 100%;
    }

    h2 {
        display: inline-block;
        padding: 0;
        font-weight: bold;
        color: var(--primary-color);
        flex-grow: 1;
        margin: 0;
    }

    .title-row > a {
        display: inline-block;
        flex-shrink: 0;
        font-size: 1.3rem;
        padding: calc(var(--spacing) / 4) 0;
    }

    .content {
        flex: 1;
        max-width: calc(100% - 1rem);
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 0 var(--spacing);
    }

    .content > h3 {
        margin: 0;
        margin-bottom: calc(var(--spacing) / 3);
    }

    .content > h4 {
        margin: 0;
        margin-bottom: var(--spacing);
    }

    h3,
    h5 {
        text-align: left;
    }

    .content > div {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        width: 100%;
    }
</style>
