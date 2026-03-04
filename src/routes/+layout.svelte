<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import "../app-v2.css";
    import { page } from "$app/stores";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import { onMount } from "svelte";
    import UserManager from "$lib/UserManager.svelte";
    import Snowfall from "../components/Snowfall.svelte";
    import punkFont from "$lib/fonts/Hit me, punk! 01.ttf";

    const { children } = $props();

    // Routes that use the new v2 design (no app.css needed)
    const v2Routes = ['/', '/timeline', '/contacts', '/members', '/projects'];

    onMount(() => {
        // Load punk font for v2 design
        const font = new FontFace("Hit me, punk!", `url(${punkFont})`);
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        });

        // Load legacy app.css for non-v2-design routes
        const pathname = $page.url.pathname.replace(/\/$/, '') || '/';
        const isV2Route = v2Routes.some(r => pathname === r);
        if (!isV2Route) {
            import("../app.css");
        }

        const userManager = UserManager.instance;
        const unmount = userManager.mount();

        return () => {
            unmount();
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
