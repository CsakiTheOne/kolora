<script lang="ts">
    /**
     * A ComicPanel variant with a blurred background image effect.
     * Uses the same layering approach as KoloraMemberDisplay.
     */
    let scrollY = $state(0);

    const {
        backgroundUrl,
        outerStyle = "",
        innerStyle = "",
        outerClass = "",
        innerClass = "panel-blue",
        children = null,
    } = $props();
</script>

<svelte:window bind:scrollY />

<div class="comic-panel {outerClass}" style={outerStyle}>
    <div class="comic-dots {innerClass}" style="background-position: 0 {scrollY}px;"></div>
    <div
        class="background-blur"
        style="background-image: url('{backgroundUrl}');"
    ></div>
    <div class="content {innerClass}" style={innerStyle}>
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>

<style>
    .comic-panel {
        position: relative;
        width: 100%;
        padding: 4px;
        background: black;
    }

    .comic-dots,
    .background-blur {
        position: absolute;
        top: 4px;
        left: 4px;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        z-index: 0;
    }

    .background-blur {
        background-size: cover;
        background-position: center;
        filter: blur(2px);
        opacity: 0.2;
        z-index: 1;
    }

    .content {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        padding: 1rem;
        background-color: transparent;
    }
</style>
