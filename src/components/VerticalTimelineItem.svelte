<script>
    const { title = "", subtitle = "", isLastItem = false, children } = $props();
</script>

<div class="timeline-item">
    <div class="indicators">
        <div class="dot"></div>
        {#if !isLastItem}
            <div class="line"></div>
        {/if}
    </div>
    <div class="content">
        <h2>{title}</h2>
        <h5>{subtitle}</h5>
        <div>
            {@render children()}
        </div>
    </div>
</div>

<style>
    .timeline-item {
        display: flex;
        flex-direction: row;
    }

    .indicators {
        flex: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--spacing) / 2);
    }

    .indicators > .dot {
        width: 1rem;
        height: 1rem;
        flex: 0;
        aspect-ratio: 1;
        background-color: var(--primary-color);
        border-radius: 50%;
        margin-top: calc(var(--spacing) / 2);
    }

    .indicators > .line {
        width: 1px;
        height: 100%;
        flex: 1;
        background-color: var(--primary-color);
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 0 var(--spacing);
    }

    .content > h2 {
        margin: 0;
        margin-bottom: calc(var(--spacing) / 3);
    }

    .content > h5 {
        margin: 0;
        margin-bottom: var(--spacing);
    }

    h2, h5 {
        text-align: left;
    }

    .content > div {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

</style>
