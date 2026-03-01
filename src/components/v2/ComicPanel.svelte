<script>
    let scrollY = $state(0);

    const {
        outerStyle = "",
        innerStyle = "",
        outerClass = "",
        innerClass = "",
        children = null,
        ...rest
    } = $props();
</script>

<svelte:window bind:scrollY />

<section class="comic-panel {outerClass}" style={outerStyle} {...rest}>
    <div
        class="content comic-dots panel-base {innerClass}"
        style="background-position: 0 {scrollY}px; {innerStyle}"
    >
        {#if children}
            {@render children()}
        {/if}
    </div>
</section>

<style>
    section {
        background-color: black;
        padding: 4px;
    }

    .content {
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
</style>
