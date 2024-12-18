<script>
    const { icon = "alert", title = "", children, background = "var(--primary-variant-color)", ...rest } = $props();
</script>

<div class="alert" style={`background: ${background}`} {...rest}>
    {#if title}
        <p>
            <span class="mdi mdi-{icon}"></span>
            {title}
        </p>
        <div class="content">
            {@render children()}
        </div>
    {:else}
        <div class="row">
            <span class="mdi mdi-{icon}" style="display: inline;"></span>
            <div class="content" style="display: inline;">
                {@render children()}
            </div>
        </div>
    {/if}
</div>

<style>
    .alert {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
        padding: calc(var(--spacing) / 2);
        color: var(--on-primary-variant-color);
        border-radius: var(--corner-radius);
        overflow: hidden;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: calc(var(--spacing) / 2);
    }

    .content {
        font-size: 0.85rem;
    }
</style>
