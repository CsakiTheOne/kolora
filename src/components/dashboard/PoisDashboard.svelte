<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import POI from "$lib/model/POI";
    import { onMount } from "svelte";

    let loading = $state(true);

    let places: POI[] = $state([]);
    let selectedPlaceId: string | null = $state(null);
    const selectedPlace = $derived(
        places.find((p) => p.id === selectedPlaceId),
    );

    function loadPlaces() {
        loading = true;
        firestore.pois.getAll().then((newPlaces) => {
            places = newPlaces.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            if (!selectedPlaceId) {
                selectedPlaceId = places[0]?.id || null;
            }
            loading = false;
        });
    }

    onMount(() => {
        loadPlaces();
    });
</script>

<select
    class="outlined-input"
    disabled={loading}
    value={selectedPlaceId}
    oninput={(e: any) => {
        selectedPlaceId = e.target?.value;
    }}
>
    {#each places as place}
        <option value={place.id}>
            {place.name.length > 0 ? place.name : "Névtelen"}
        </option>
    {/each}
</select>
<button
    class="btn text-btn"
    disabled={loading}
    onclick={() => {
        firestore.pois.add(new POI()).then((newPlaceId) => {
            loadPlaces();
            selectedPlaceId = newPlaceId;
        });
    }}
>
    <span class="mdi mdi-plus"></span>
    Új hely hozzáadása
</button>
{#if selectedPlaceId && selectedPlace}
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
            firestore.pois.set(selectedPlaceId!, {
                ...selectedPlace,
                googleMapsLink: e.target?.value,
            });
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
        <label for="allowPosting">Bejegyzések engedélyezése</label>
    </div>

    <div>
        <input
            type="checkbox"
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
        <label for="showSoonScreen">
            <a href="/poi/soon" target="_blank">"Hamarosan" képernyő</a> mutatása
        </label>
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
