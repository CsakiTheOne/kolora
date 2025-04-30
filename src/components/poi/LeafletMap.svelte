<script lang="ts">
    import { onMount } from "svelte";
    import POI from "$lib/model/POI";
    import mapIconUser from "$lib/images/map/user.png";
    import mapIconPoi from "$lib/images/map/poi.png";
    import PoiUtils from "$lib/PoiUtils";

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
        const primaryColor = document
            .getElementById("map-style-helper")
            ?.computedStyleMap()
            ?.get("color")
            ?.toString();
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
                icon: L.icon({
                    iconUrl: mapIconPoi,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                }),
            })
                .addTo(map)
                .bindPopup(popup);
            L.circle([poi.latitude, poi.longitude], {
                radius: PoiUtils.DISTANCE_TO_OPEN,
                color: primaryColor,
                fillColor: primaryColor,
            }).addTo(map);
        });

        if (userLocation) {
            L.marker(userLocation, {
                icon: L.icon({
                    iconUrl: mapIconUser,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                }),
            }).addTo(map);
        }
    });
</script>

<div id="map-style-helper" style="color: var(--primary-color);"></div>
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
