<script>
    const { title = "", children, ...rest } = $props();
</script>

<div class="alert" {...rest}>
    {#if title}
        <p>
            <span class="mdi mdi-alert"></span>
            {title}
        </p>
    {/if}
    <div class="content">
        {@render children()}
    </div>
</div>

<style>
    .alert {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
        padding: calc(var(--spacing) / 2);
        background-color: var(--primary-light-color);
        color: var(--on-primary-light-color);
        border-radius: var(--corner-radius);
        overflow: hidden;
    }

    .content {
        font-size: .85rem;
    }
</style>
