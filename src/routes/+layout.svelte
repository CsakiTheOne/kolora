<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import "../app.css";
    import { page } from "$app/stores";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import { onMount } from "svelte";
    import UserManager from "$lib/UserManager.svelte";
    import Snowfall from "../components/Snowfall.svelte";
    import punkFont from "$lib/fonts/Hit me, punk! 01.ttf";

    const { children } = $props();

    onMount(() => {
        const unmountUserManager = UserManager.instance.mount();

        const font = new FontFace("Hit me, punk!", `url(${punkFont})`);
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        });

        return () => {
            unmountUserManager();
        };
    });
</script>

<style>
    :global(.punk-font) {
        font-family: "Hit me, punk!", cursive;
        font-size: xxx-large;
        font-weight: normal;
        letter-spacing: 0.1rem;
    }
</style>

<Snowfall />
<ScrollToTopButton />
{@render children()}
