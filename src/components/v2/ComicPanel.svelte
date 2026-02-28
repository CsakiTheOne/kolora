<script>
    const { style = "", class: className = "", children, ...rest } = $props();
</script>

<section class="comic-panel {className}" {style} {...rest}>
    {@render children()}
</section>

<style>
    section {
        background-image: radial-gradient(
            rgba(0, 0, 0, 0.2) 25%,
            transparent 25%
        );
        background-position: 0 0;
        background-size: 32px 32px;
        background-color: var(--kolora-color-base);
        color: white;
        border: 4px solid black;
        padding: 1rem;
    }
</style>
