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
            if (url) {
                window.location.replace(url === "/" ? "/?source=sticker" : url);
            } else {
                errorMessage = "Nem sikerült megnyitni a QR kódot.";
            }
        });
    }

    function startWatchingLocation() {
        return navigator.geolocation.watchPosition(
            (position) => {
                getNearestPoi(position);
            },
            (error) => {
                errorMessage =
                    "Hiba történt a helymeghatározás során. Kérlek ellenőrizd a hely engedélyeket a böngésző és telefon beállításaiban.";
                openFallbackUrl();
            },
            {
                enableHighAccuracy: true,
                maximumAge: 60,
            },
        );
    }

    function getNearestPoi(position: GeolocationPosition) {
        if (!places) return;

        places.sort((a, b) => {
            const distanceA = Math.sqrt(
                Math.pow(a.latitude - position.coords.latitude, 2) +
                    Math.pow(a.longitude - position.coords.longitude, 2),
            );
            const distanceB = Math.sqrt(
                Math.pow(b.latitude - position.coords.latitude, 2) +
                    Math.pow(b.longitude - position.coords.longitude, 2),
            );
            return distanceA - distanceB;
        });
        const nearestPlace = places[0];

        const distanceMeters = PoiUtils.measureDistance(
            position.coords.latitude,
            position.coords.longitude,
            nearestPlace.latitude,
            nearestPlace.longitude,
        );

        if (distanceMeters <= distanceToOpen) {
            window.location.replace(`/poi?id=${nearestPlace.id}`);
        } else {
            openFallbackUrl();
        }
    }

    onMount(() => {
        let locationWatcher: number | null;

        rtdb.config.feeds.getDistanceToOpen().then((d) => {
            distanceToOpen = d;
        });

        firestore.pois.getAll().then((pois) => {
            places = pois;
            if (places.length === 0) {
                openFallbackUrl();
                return;
            }
            locationWatcher = startWatchingLocation();
        });

        return () => {
            if (locationWatcher) {
                navigator.geolocation.clearWatch(locationWatcher);
            }
        };
    });
</script>

<main>
    {#if errorMessage}
        <Alert>
            <p>{errorMessage}</p>
        </Alert>
    {:else}
        <p>
            <span class="mdi mdi-loading mdi-spin"></span>
            Betöltés...
        </p>
    {/if}
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
