<script>
    const {
        borderWidth = "4px",
        innerPaddings = "15px 35px",
        style = "",
        children,
        ...rest
    } = $props();
</script>

<div class="outer" style={`padding: ${borderWidth}; ${style}`} {...rest}>
    <div class="inner" style={`padding: ${innerPaddings};`}>
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
    }
</style>
