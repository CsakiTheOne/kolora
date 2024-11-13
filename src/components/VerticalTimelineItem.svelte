<script>
    const {
        title = "",
        subtitle = "",
        isLastItem = false,
        children,
    } = $props();
</script>

<div class="timeline-item">
    <div class="indicators">
        <div class="dot"></div>
        {#if !isLastItem}
            <div class="line"></div>
        {/if}
    </div>
    <div class="content">
        <h3>{title}</h3>
        <h5>{subtitle}</h5>
        <div>
            {@render children()}
        </div>
    </div>
</div>

<style>
    h3 {
        font-weight: bold;
        color: var(--primary-color);
    }

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

    .dot {
        width: 1rem;
        height: 1rem;
        flex: 0;
        aspect-ratio: 1;
        background-color: var(--primary-color);
        border-radius: 50%;
        margin-top: 3px;
        transition: all 0.1s ease-in-out;
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
        transition: all 0.1s ease-in-out;
    }

    .indicators:hover .line {
        width: 2px;
    }

    .indicators:active .line {
        width: 3px;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 0 var(--spacing);
    }

    .content > h3 {
        margin: 0;
        margin-bottom: calc(var(--spacing) / 3);
    }

    .content > h5 {
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
