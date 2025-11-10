<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type POI from "$lib/model/POI";
    import PoiUtils from "$lib/PoiUtils";
    import { onMount } from "svelte";
    import Alert from "../../../components/Alert.svelte";
    import rtdb from "$lib/firebase/rtdb";

    let errorMessage = $state("");
    let places: POI[] = $state([]);

    let distanceToOpen = $state(0);

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
