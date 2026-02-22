<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import { page } from "$app/stores";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import { onMount } from "svelte";
    import UserManager from "$lib/UserManager.svelte";
    import Snowfall from "../components/Snowfall.svelte";

    const { children } = $props();

    onMount(() => {
        // Only load app.css if the URL doesn't contain "v2"
        if (!$page.url.pathname.includes('v2')) {
            import("../app.css");
        }

        const userManager = UserManager.instance;
        const unmount = userManager.mount();

        return () => {
            unmount();
        };
    });
</script>

<Snowfall />
<ScrollToTopButton />
{@render children()}
