<script>
    import "../../app-v2.css";
    import dottedBackground from "$lib/images/utils/dotted_background.png";
    import punkFont from "$lib/fonts/Hit me, punk! 01.ttf";
    import { onMount } from "svelte";

    const { children } = $props();

    onMount(() => {
        document.body.style.backgroundImage = `url(${dottedBackground})`;
        // Import the punk font
        const font = new FontFace("Hit me, punk!", `url(${punkFont})`);
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        });
    });
</script>

{@render children()}

<style>
    :global(body) {
        background-size: 16px;
    }

    :global(h1, .punk-font) {
        font-family: "Hit me, punk!", cursive;
        font-size: xxx-large;
        font-weight: normal;
        letter-spacing: 0.1rem;
    }
</style>
