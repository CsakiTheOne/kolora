<script>
    const { borderWidth = "4px", children, ...rest } = $props();
</script>

<div class="outer" style={`padding: ${borderWidth};`} {...rest}>
    <div class="inner">
        {@render children()}
    </div>
</div>

<style>
    .outer {
        background-color: white;
        clip-path: var(--polygon-irregular-box);
    }

    .inner {
        background-color: black;
        color: white;
        clip-path: var(--polygon-irregular-box);
        padding: 15px 35px;
    }
</style>
