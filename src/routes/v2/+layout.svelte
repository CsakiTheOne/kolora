<script>
    import "../../app-v2.css";
    import dottedBackground from "$lib/images/utils/dotted_background.png";
    import { onMount } from "svelte";

    const { children } = $props();

    onMount(() => {
        document.body.style.backgroundImage = `url(${dottedBackground})`;
    });
</script>

{@render children()}

<style>
    :global(body) {
        background-size: 16px;
    }
</style>