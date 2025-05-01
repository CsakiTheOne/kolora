<script lang="ts">
    import { onMount } from "svelte";
    import mapIconUser from "$lib/images/map/user.png";
    import mapIconPoi from "$lib/images/map/poi.png";
    import POI from "$lib/model/POI";
    import PoiUtils from "$lib/PoiUtils";
    import { Polyline } from "sveaflet";

    let sveaflet: any = $state(null);

    const { userLocation = [0, 0], pois = [], ...rest } = $props();

    let isLoaded = $state(false);
    let map: any = $state(null);

    onMount(async () => {
        sveaflet = await import("sveaflet");

        isLoaded = true;
    });
</script>

{#if !isLoaded}
    <div class="loading">Loading...</div>
{:else}
    <div {...rest}>
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
                <sveaflet.Marker latLng={[poi.latitude, poi.longitude]}>
                    <sveaflet.Icon
                        options={{
                            iconUrl: mapIconPoi,
                            iconSize: [24, 24],
                        }}
                    />
                    <sveaflet.Popup>
                        <h4>{poi.name}</h4>
                        <br />
                        <ul class="outlined-list">
                            <a href={poi.googleMapsLink} target="_blank">
                                <li>
                                    <span class="mdi mdi-map"></span>
                                    Megnyitás Google Térképen
                                </li>
                            </a>
                            {#if poi.hint1Url}
                                <a href={poi.hint1Url} target="_blank">
                                    <li>
                                        <span class="mdi mdi-help"></span>
                                        Segítség #1
                                    </li>
                                </a>
                            {/if}
                            {#if poi.hint2Url}
                                <a href={poi.hint2Url} target="_blank">
                                    <li>
                                        <span class="mdi mdi-help"></span>
                                        Segítség #2
                                    </li>
                                </a>
                            {/if}
                        </ul>
                    </sveaflet.Popup>
                </sveaflet.Marker>
                <sveaflet.Circle
                    latLng={[poi.latitude, poi.longitude]}
                    options={{
                        color: "#931621",
                        fillColor: "#931621",
                        fillOpacity: 0.4,
                        radius: PoiUtils.DISTANCE_TO_OPEN,
                    }}
                />
                <sveaflet.Circle
                    latLng={[poi.latitude, poi.longitude]}
                    options={{
                        color: "transparent",
                        fillColor: "#931621",
                        fillOpacity: 0.1,
                        radius: PoiUtils.DISTANCE_TO_VIEW,
                    }}
                />
                <!--sveaflet.Polyline
                        latLngs={[
                            [userLocation[0], userLocation[1]],
                            [poi.latitude, poi.longitude],
                        ]}
                        options={{
                            color: "#931621",
                            weight:
                                15 -
                                PoiUtils.measureDistance(
                                    userLocation[0],
                                    userLocation[1],
                                    poi.latitude,
                                    poi.longitude,
                                ) /
                                    180,
                            opacity: 0.5,
                        }}
                    /-->
            {/each}
            <sveaflet.Marker latLng={userLocation}>
                <sveaflet.Icon
                    options={{
                        iconUrl: mapIconUser,
                        iconSize: [16, 16],
                    }}
                />
            </sveaflet.Marker>
        </sveaflet.Map>
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
    :global(.leaflet-popup-content-wrapper, .leaflet-popup-tip) {
        background-color: var(--background-color) !important;
        color: var(--on-background-color) !important;
        border-radius: var(--corner-radius) !important;
    }

    :global(.leaflet-popup-close-button) {
        color: var(--on-primary-variant-color) !important;
        scale: 1.5;
    }

    .button-row {
        display: flex;
        flex-direction: row;
        justify-content: right;
        gap: var(--spacing);
    }

    button {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: var(--corner-radius);
        border-bottom-right-radius: var(--corner-radius);
    }
</style>
