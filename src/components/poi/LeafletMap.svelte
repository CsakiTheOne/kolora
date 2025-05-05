<script lang="ts">
    import { onMount } from "svelte";
    import mapIconUser from "$lib/images/map/user.png";
    import mapIconPoi from "$lib/images/map/poi.png";
    import POI from "$lib/model/POI";
    import PoiUtils from "$lib/PoiUtils";
    import firestore from "$lib/firebase/firestore";
    import rtdb from "$lib/firebase/rtdb";

    let sveaflet: any = $state(null);

    const {
        userLocation = [0, 0],
        pois = [],
        overrideDistanceToOpen = 0,
        overrideDistanceToView = 0,
        ...rest
    } = $props();

    let isLoaded = $state(false);
    let map: any = $state(null);
    let selectedPoi: POI | null = $state(null);
    let selectedPoiPostsCount: number = $state(0);

    let distanceToOpen = $state(0);
    let distanceToView = $state(0);

    onMount(async () => {
        sveaflet = await import("sveaflet");

        rtdb.config.feeds.getDistanceToOpen().then((d) => {
            distanceToOpen = d;
        });
        rtdb.config.feeds.getDistanceToView().then((d) => {
            distanceToView = d;
        });

        isLoaded = true;
    });
</script>

{#if !isLoaded}
    <div class="loading">Loading...</div>
{:else}
    <div>
        <div {...rest} class="leaflet-map-container">
            <sveaflet.Map
                options={{
                    center: [46.9, 18.3],
                    zoom: 7,
                }}
                bind:instance={map}
            >
                <sveaflet.TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                {#each pois as poi: POI}
                    <sveaflet.Marker
                        latLng={[poi.latitude, poi.longitude]}
                        onclick={() => {
                            selectedPoi = poi;
                            selectedPoiPostsCount = 0;
                            firestore.posts
                                .getCountByPoi(poi.id)
                                .then((count) => {
                                    selectedPoiPostsCount = count;
                                });
                        }}
                    >
                        <sveaflet.Icon
                            options={{
                                iconUrl: mapIconPoi,
                                iconSize: [24, 24],
                            }}
                        />
                        <sveaflet.Popup>
                            <h4>
                                <a href={poi.googleMapsLink} target="_blank">
                                    <span class="mdi mdi-map-marker"></span>
                                    {poi.name}
                                </a>
                            </h4>
                            <br />
                            <ul class="outlined-list">
                                {#if selectedPoiPostsCount > 0}
                                    <li>
                                        <span class="mdi mdi-comment-text"
                                        ></span>
                                        {selectedPoiPostsCount} poszt
                                    </li>
                                {/if}
                                <li
                                    style="display: flex; flex-direction: row; padding: 0;"
                                >
                                    {#if poi.hint1Url}
                                        <a
                                            href={poi.hint1Url}
                                            target="_blank"
                                            style="width: 100%; padding: calc(var(--spacing) / 2);"
                                        >
                                            Segítség #1
                                        </a>
                                    {/if}
                                    {#if poi.hint2Url}
                                        <a
                                            href={poi.hint2Url}
                                            target="_blank"
                                            style="width: 100%; padding: calc(var(--spacing) / 2);"
                                        >
                                            Segítség #2
                                        </a>
                                    {/if}
                                </li>
                            </ul>
                        </sveaflet.Popup>
                    </sveaflet.Marker>
                    <sveaflet.Circle
                        latLng={[poi.latitude, poi.longitude]}
                        options={{
                            color: "#931621",
                            fillColor: "#931621",
                            fillOpacity: 0.4,
                            radius: overrideDistanceToOpen > 0 ? overrideDistanceToOpen : distanceToOpen,
                        }}
                    />
                    <sveaflet.Circle
                        latLng={[poi.latitude, poi.longitude]}
                        options={{
                            color: "transparent",
                            fillColor: "#931621",
                            fillOpacity: 0.1,
                            radius: overrideDistanceToView > 0 ? overrideDistanceToView : distanceToView,
                        }}
                    />
                {/each}
                <sveaflet.Marker latLng={userLocation}>
                    <sveaflet.Icon
                        options={{
                            iconUrl: mapIconUser,
                            iconSize: [16, 16],
                        }}
                    />
                    <sveaflet.Popup>
                        <h4>Itt vagy most</h4>
                        <br />
                        <ul class="outlined-list">
                            <a href="https://maps.google.com" target="_blank">
                                <li>
                                    <span class="mdi mdi-map"></span>
                                    Google Térkép megnyitása
                                </li>
                            </a>
                        </ul>
                    </sveaflet.Popup>
                </sveaflet.Marker>
            </sveaflet.Map>
        </div>
        <div class="button-row">
            <button
                class="btn"
                onclick={() => {
                    map.setView(userLocation, 15);
                }}
            >
                <span class="mdi mdi-crosshairs-gps"></span>
                Hol vagyok?
            </button>
        </div>
    </div>
{/if}

<style>
    .leaflet-map-container {
        border-radius: var(--corner-radius);
        overflow: hidden;
    }

    :global(.leaflet-popup-content-wrapper) {
        max-width: 75vw;
    }

    :global(.leaflet-popup-content-wrapper, .leaflet-popup-tip) {
        background-color: var(--secondary-color) !important;
        color: var(--on-secondary-color) !important;
        border-radius: var(--corner-radius) !important;
    }

    :global(.leaflet-control-zoom) {
        background-color: var(--secondary-color) !important;
        color: var(--on-secondary-color) !important;
        border: none !important;
        border-radius: var(--corner-radius) !important;
        overflow: hidden !important;
    }

    :global(.leaflet-bar a) {
        background-color: inherit !important;
        color: inherit !important;
    }

    :global(.leaflet-popup-close-button) {
        color: var(--on-secondary-color) !important;
        scale: 1.5;
    }

    .button-row {
        display: flex;
        flex-direction: row;
        justify-content: right;
        gap: var(--spacing);
        padding-left: var(--spacing);
        padding-right: var(--spacing);
    }

    .button-row button {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: var(--corner-radius);
        border-bottom-right-radius: var(--corner-radius);
    }
</style>
