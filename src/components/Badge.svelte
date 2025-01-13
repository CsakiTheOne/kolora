<script>
    const { children, ...rest } = $props();
</script>

<span {...rest}>
    {@render children()}
</span>

<style>
    span {
        display: inline-block;
        font-size: 0.7rem;
        padding: calc(var(--spacing) / 4);
        border-radius: var(--corner-radius);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
    }
</style>
