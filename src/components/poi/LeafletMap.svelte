<script lang="ts">
    import type POI from "$lib/model/POI";
    import { onMount } from "svelte";

    const { userLocation, pois, ...rest } = $props();

    onMount(() => {
        const leafletCssElement = document.createElement("link");
        leafletCssElement.rel = "stylesheet";
        leafletCssElement.href =
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCssElement.integrity =
            "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        leafletCssElement.crossOrigin = "";
        document.head.appendChild(leafletCssElement);
        const leafletJsElement = document.createElement("script");
        leafletJsElement.src =
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        leafletJsElement.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        leafletJsElement.crossOrigin = "";
        document.body.appendChild(leafletJsElement);
    });

    $effect(() => {
        const map = L.map("map").setView([47, 19], 7);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        pois.forEach((poi: POI) => {
            const popup = L.popup({
                content: `${poi.name}<br/><a href="${poi.googleMapsLink}" target="_blank">Megnyitás Google Térképen</a>`,
            });
            L.marker([poi.latitude, poi.longitude], {
                title: poi.name,
            })
                .addTo(map)
                .bindPopup(popup);
        });

        if (userLocation) {
            L.marker(userLocation).addTo(map);
        }
    });
</script>

<div {...rest} id="map"></div>

<style>
    #map {
        max-height: 100svh;
    }

    :global(.leaflet-popup-content-wrapper, .leaflet-popup-tip) {
        background-color: var(--primary-variant-color) !important;
        color: var(--on-background-color) !important;
    }
</style>
