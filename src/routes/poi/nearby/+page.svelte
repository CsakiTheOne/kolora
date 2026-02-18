<script lang="ts">
    import { onMount } from "svelte";
    import rtdb from "$lib/firebase/rtdb";

    function openFallbackUrl() {
        rtdb.config.feeds.getQrCodeFallbackUrl().then((url) => {
            console.log("Fetched fallback URL:", url);
            if (url) {
                window.location.replace(url === "/" ? "/?source=sticker" : url);
            } else {
                window.location.replace("/?source=sticker");
            }
        });
    }

    onMount(async () => {
        openFallbackUrl();
    });
</script>

<!-- LEGACY COMPONENT! MUST KEEP TO KEEP STICKERS WORKING -->
<main>
    <p>
        <span class="mdi mdi-loading mdi-spin"></span>
        Betöltés...
    </p>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100dvh;
        text-align: center;
        background: var(--primary-color);
        color: var(--on-primary-color);
    }
</style>
