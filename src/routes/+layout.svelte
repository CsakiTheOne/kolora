<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import "../app.css";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import { onMount } from "svelte";
    import UserManager from "$lib/UserManager.svelte";

    onMount(() => {
        const userManager = UserManager.instance;
        const unmount = userManager.mount();

        return () => {
            unmount();
        };
    });
</script>

<ScrollToTopButton />
<slot />
