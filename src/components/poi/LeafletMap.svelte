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

    let isLoaded = $state(false);

    const { userLocation = [0, 0], pois = [], ...rest } = $props();

    onMount(async () => {
        const mod = await import("sveaflet");
        Map = mod.Map;
        TileLayer = mod.TileLayer;
        Marker = mod.Marker;
        Icon = mod.Icon;
        Circle = mod.Circle;

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
                </Marker>
                <Circle
                    latLng={[poi.latitude, poi.longitude]}
                    options={{
                        color: "#931621",
                        fillColor: "#931621",
                        radius: PoiUtils.DISTANCE_TO_OPEN,
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
    </div>
{/if}
