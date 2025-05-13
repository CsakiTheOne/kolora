<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import POI from "$lib/model/POI";
    import { onMount } from "svelte";
    import FeedsMap from "../poi/FeedsMap.svelte";
    import rtdb from "$lib/firebase/rtdb";

    let loading = $state(true);

    let places: POI[] = $state([]);
    let selectedPlaceId: string | null = $state(null);
    const selectedPlace = $derived(
        places.find((p) => p.id === selectedPlaceId),
    );

    let distanceToOpen = $state(0);
    let distanceToView = $state(0);

    function loadPlaces() {
        loading = true;
        firestore.pois.getAll().then((newPlaces) => {
            places = newPlaces.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            loading = false;
        });

        rtdb.config.feeds.getDistanceToOpen().then((d) => {
            distanceToOpen = d;
        });
        rtdb.config.feeds.getDistanceToView().then((d) => {
            distanceToView = d;
        });
    }

    $effect(() => {
        loadPlaces();
        selectedPlaceId;
    });
</script>

{#if !selectedPlaceId || !selectedPlace}
    <table class="places-list">
        <thead>
            <tr>
                <th></th>
                <th>Hely neve</th>
                <th>Felfedezhető</th>
            </tr>
        </thead>
        <tbody>
            {#each places as place}
                <tr
                    onclick={() => {
                        selectedPlaceId = place.id;
                    }}
                >
                    <td>
                        <span
                            class={`mdi mdi-${!place.latitude && !place.longitude ? "null" : "map-marker"}`}
                        ></span>
                    </td>
                    <td>
                        {place.name.length > 0 ? place.name : "Névtelen"}
                    </td>
                    <td>
                        <span
                            class={`mdi mdi-${place.isDiscoverable ? "check" : "close"}`}
                        ></span>
                        {#if place.isNfcAvailable}
                            <span class="mdi mdi-nfc-variant"></span>
                        {/if}
                        {#if place.isQrAvailable}
                            <span class="mdi mdi-qrcode"></span>
                        {/if}
                    </td>
                </tr>
            {/each}
            <tr
                onclick={() => {
                    firestore.pois.add(new POI()).then((newPlaceId) => {
                        loadPlaces();
                        selectedPlaceId = newPlaceId;
                    });
                }}
            >
                <td>
                    <span class="mdi mdi-plus"></span>
                </td>
                <td colspan="3"> Új hely hozzáadása </td>
            </tr>
        </tbody>
    </table>

    <FeedsMap
        pois={places}
        style="aspect-ratio: 5 / 4;"
        overrideDistanceToOpen={distanceToOpen}
        overrideDistanceToView={distanceToView}
        enableDebugFeatures={true}
    />

    <p>Távolság megnyitáshoz (kis kör, megnyitás gomb)</p>
    <input
        type="number"
        class="outlined-input"
        value={distanceToOpen}
        oninput={(e: any) => {
            rtdb.config.feeds.setDistanceToOpen(e.target?.value).then(() => {
                distanceToOpen = e.target?.value;
            });
        }}
    />
    <p>Távolság megtekintéshez (/poi/nearby link, megtekintési jog)</p>
    <input
        type="number"
        class="outlined-input"
        value={distanceToView}
        oninput={(e: any) => {
            rtdb.config.feeds.setDistanceToView(e.target?.value).then(() => {
                distanceToView = e.target?.value;
            });
        }}
    />
{:else}
    <button class="btn" onclick={() => (selectedPlaceId = null)}>
        <span class="mdi mdi-arrow-left"></span>
        Vissza a helyekhez
    </button>
    <input
        type="text"
        disabled={loading}
        class="outlined-input"
        placeholder="Név"
        value={selectedPlace.name}
        oninput={(e: any) => {
            firestore.pois
                .set(selectedPlaceId!, {
                    ...selectedPlace,
                    name: e.target?.value,
                })
                .then(() => {
                    places = places.map((p) => {
                        if (p.id === selectedPlaceId) {
                            return {
                                ...p,
                                name: e.target?.value,
                            };
                        }
                        return p;
                    });
                });
        }}
    />

    <textarea
        disabled={loading}
        class="outlined-input"
        style="resize: none;"
        placeholder="Leírás"
        value={selectedPlace.description}
        onchange={(e: any) => {
            firestore.pois.set(selectedPlaceId!, {
                ...selectedPlace,
                description: e.target?.value,
            });
        }}
    ></textarea>

    <input
        type="text"
        disabled={loading}
        class="outlined-input"
        placeholder="Google Térkép link"
        value={selectedPlace.googleMapsLink}
        oninput={(e: any) => {
            firestore.pois
                .set(selectedPlaceId!, {
                    ...selectedPlace,
                    googleMapsLink: e.target?.value,
                })
                .then(() => loadPlaces());
        }}
    />

    <input
        type="text"
        disabled={loading}
        class="outlined-input"
        placeholder="Pozíció"
        value={`${selectedPlace.latitude},${selectedPlace.longitude}`}
        oninput={(e: any) => {
            const newValue: string = e.target?.value;
            if (newValue.includes("google.com/maps/")) {
                const lat = parseFloat(newValue.split("@")[1].split(",")[0]);
                const lon = parseFloat(newValue.split("@")[1].split(",")[1]);
                firestore.pois
                    .set(selectedPlaceId!, {
                        ...selectedPlace,
                        latitude: lat,
                        longitude: lon,
                    })
                    .then(() => loadPlaces());
                return;
            }
            firestore.pois
                .set(selectedPlaceId!, {
                    ...selectedPlace,
                    latitude: parseFloat(e.target?.value.split(",")[0]),
                    longitude: parseFloat(e.target?.value.split(",")[1]),
                })
                .then(() => loadPlaces());
        }}
    />

    <div>
        <input
            type="checkbox"
            class="switch"
            disabled={loading}
            name="isDiscoverable"
            bind:checked={selectedPlace.isDiscoverable}
            oninput={(e: any) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    isDiscoverable: e.target?.checked,
                });
            }}
        />
        Felfedezhető (ha igen, akkor a hely megjelenhet az Üzenőfalak oldalon)
        <input
            type="checkbox"
            class="switch"
            disabled={loading}
            name="isNfcAvailable"
            bind:checked={selectedPlace.isNfcAvailable}
            oninput={(e: any) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    isNfcAvailable: e.target?.checked,
                });
            }}
        />
        <span class="mdi mdi-nfc-variant"></span>
        <input
            type="checkbox"
            class="switch"
            disabled={loading}
            name="isQrAvailable"
            bind:checked={selectedPlace.isQrAvailable}
            oninput={(e: any) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    isQrAvailable: e.target?.checked,
                });
            }}
        />
        <span class="mdi mdi-qrcode"></span>
    </div>

    <div>
        <input
            type="checkbox"
            class="switch"
            disabled={loading}
            name="allowPosting"
            bind:checked={selectedPlace.allowPosting}
            oninput={(e: any) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    allowPosting: e.target?.checked,
                });
            }}
        />
        Bejegyzések engedélyezése
    </div>

    <div>
        <input
            type="checkbox"
            class="switch"
            disabled={loading}
            name="showSoonScreen"
            bind:checked={selectedPlace.showSoonScreen}
            oninput={(e: any) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    showSoonScreen: e.target?.checked,
                });
            }}
        />
        <a href="/poi/soon" target="_blank">"Hamarosan" képernyő</a> mutatása
    </div>

    <div>
        <input
            type="text"
            class="outlined-input"
            disabled={loading}
            value={selectedPlace.hint1Url}
            placeholder="1. segítség linkje"
            oninput={(e: any) => {
                firestore.pois
                    .set(selectedPlaceId!, {
                        ...selectedPlace,
                        hint1Url: e.target?.value,
                    })
                    .then(() => loadPlaces());
            }}
        />
    </div>

    <div>
        <input
            type="text"
            class="outlined-input"
            disabled={loading}
            value={selectedPlace.hint2Url}
            placeholder="2. segítség linkje"
            oninput={(e: any) => {
                firestore.pois
                    .set(selectedPlaceId!, {
                        ...selectedPlace,
                        hint2Url: e.target?.value,
                    })
                    .then(() => loadPlaces());
            }}
        />
    </div>

    <a href={`/poi?id=${selectedPlaceId}&ignoreLocation=1`} target="_blank">
        <button class="btn" style="width: 100%;">
            <span class="mdi mdi-open-in-new"></span>
            Megnyitás új lapon
        </button>
    </a>

    <button
        class="btn"
        onclick={() => {
            navigator.clipboard.writeText(
                `${window.location.origin}/poi?id=${selectedPlaceId}`,
            );
        }}
    >
        <span class="mdi mdi-content-copy"></span>
        Link másolása NFC íráshoz
    </button>

    <button
        class="btn"
        onclick={() => {
            const res = prompt(
                "Biztos törölni szeretnéd ezt a helyet? Ha igen, írd be a hely nevét!",
            );
            if (res === selectedPlace?.name) {
                firestore.pois.delete(selectedPlaceId!).then(() => {
                    loadPlaces();
                });
            }
        }}
    >
        <span class="mdi mdi-delete"></span>
        Törlés
    </button>
{/if}

<style>
    .places-list tr:has(td) {
        cursor: pointer;
    }

    .places-list tr:has(td):hover {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }

    .places-list td:has(span) {
        text-align: center;
    }
</style>
