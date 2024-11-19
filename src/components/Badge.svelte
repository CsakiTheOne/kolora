<script>
    const { children } = $props();
</script>

<span>
    {@render children()}
</span>

<style>
    span {
        display: inline-block;
        font-size: .7rem;
        padding: calc(var(--spacing) / 4);
        border-radius: var(--corner-radius);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        translate: 0 -2px;
    }
</style>