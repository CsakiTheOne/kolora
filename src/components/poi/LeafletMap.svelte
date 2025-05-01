<script lang="ts">
    import { onMount } from "svelte";
    import mapIconUser from "$lib/images/map/user.png";
    import mapIconPoi from "$lib/images/map/poi.png";
    import POI from "$lib/model/POI";
    import PoiUtils from "$lib/PoiUtils";

    let Map: any = $state(null);
    let TileLayer: any = $state(null);
    let Marker: any = $state(null);
    let Icon: any = $state(null);
    let Circle: any = $state(null);
    let Popup: any = $state(null);

    const { userLocation = [0, 0], pois = [], ...rest } = $props();

    let isLoaded = $state(false);
    let map: any = $state(null);

    onMount(async () => {
        const mod = await import("sveaflet");
        Map = mod.Map;
        TileLayer = mod.TileLayer;
        Marker = mod.Marker;
        Icon = mod.Icon;
        Circle = mod.Circle;
        Popup = mod.Popup;

        isLoaded = true;
    });
</script>

{#if !isLoaded}
    <div class="loading">Loading...</div>
{:else}
    <div {...rest}>
        <Map
            options={{
                center: [46.9, 18.3],
                zoom: 7,
            }}
            bind:instance={map}
        >
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            {#each pois as poi: POI}
                <Marker latLng={[poi.latitude, poi.longitude]}>
                    <Icon
                        options={{
                            iconUrl: mapIconPoi,
                            iconSize: [24, 24],
                        }}
                    />
                    <Popup>
                        <p>
                            {poi.name} <br />
                            <a href={poi.googleMapsLink} target="_blank">
                                Megnyitás Google Térképen
                            </a>
                        </p>
                    </Popup>
                </Marker>
                <Circle
                    latLng={[poi.latitude, poi.longitude]}
                    options={{
                        color: "#931621",
                        fillColor: "#931621",
                        fillOpacity: 0.4,
                        radius: PoiUtils.DISTANCE_TO_OPEN,
                    }}
                />
                <Circle
                    latLng={[poi.latitude, poi.longitude]}
                    options={{
                        color: "transparent",
                        fillColor: "#931621",
                        fillOpacity: 0.1,
                        radius: PoiUtils.DISTANCE_TO_VIEW,
                    }}
                />
            {/each}
            <Marker latLng={userLocation}>
                <Icon
                    options={{
                        iconUrl: mapIconUser,
                        iconSize: [16, 16],
                    }}
                />
            </Marker>
        </Map>
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
        background-color: var(--primary-variant-color) !important;
        color: var(--on-primary-variant-color) !important;
    }

    :global(.leaflet-popup-close-button) {
        color: var(--on-primary-variant-color) !important;
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
