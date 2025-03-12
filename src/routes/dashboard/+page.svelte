<script lang="ts">
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import { onAuthStateChanged } from "firebase/auth";
    import firebase from "firebase/compat/app";
    import { onMount } from "svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import Footer from "../../components/Footer.svelte";
    import POI from "$lib/model/POI";

    let koloraUser = $state(new KoloraUser());
    let selectedTab = $state("places");
    let places: POI[] = $state([]);
    let selectedPlaceId: string | null = $state(null);
    const selectedPlace = $derived(
        places.find((p) => p.id === selectedPlaceId),
    );

    function getTabData() {
        if (selectedTab === "places") {
            firestore.pois.getAll().then((newItems) => {
                places = newItems.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                if (places.length > 0 && !selectedPlace) {
                    selectedPlaceId = places[0].id;
                }
            });
        }
    }

    /*function updateSelectedPlace() {
        if (!selectedPlaceId || !selectedPlace) {
            return;
        }
        firestore.pois
            .set(selectedPlaceId, selectedPlace)
            .then(() => getTabData());
    }*/

    onMount(() => {
        const auth = initializeFirebase().auth;
        let userListener: (() => void) | null = null;
        const authListener = auth.onAuthStateChanged((user) => {
            if (user) {
                userListener = firestore.users.listen(
                    user.uid,
                    (newKoloraUser) => {
                        koloraUser = newKoloraUser;
                        if (
                            !koloraUser.roles.includes(ROLES.ADMIN) ||
                            !koloraUser.roles.includes(ROLES.KOLORA_MEMBER)
                        ) {
                            window.history.back();
                        } else {
                            getTabData();
                        }
                    },
                );
            } else {
                koloraUser = new KoloraUser();
                if (userListener) {
                    userListener();
                    userListener = null;
                }
            }
        });

        return () => {
            authListener();
        };
    });

    $effect(() => {
        getTabData();
        selectedTab;
    });
</script>

<SmallHeader currentPage="Dashboard" />
<div class="dashboard">
    <nav>
        <button
            class={`btn ${selectedTab !== "places" && "text-btn"}`}
            onclick={() => (selectedTab = "places")}
        >
            <span class="mdi mdi-map-marker"></span>
            Helyek
        </button>
        {#if selectedTab === "places"}
            <select
                class="outlined-input"
                value={selectedPlaceId}
                oninput={(e) => {
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
                onclick={() => {
                    firestore.pois.add(new POI()).then((newPlaceId) => {
                        getTabData();
                        selectedPlaceId = newPlaceId;
                    });
                }}
            >
                <span class="mdi mdi-plus"></span>
                Új hely hozzáadása
            </button>
        {/if}
    </nav>
    <main>
        {#if selectedTab === "places" && selectedPlaceId && selectedPlace}
            <input
                type="text"
                class="outlined-input"
                placeholder="Név"
                value={selectedPlace.name}
                oninput={(e) => {
                    firestore.pois
                        .set(selectedPlaceId!, {
                            ...selectedPlace,
                            name: e.target?.value,
                        })
                        .then(() => getTabData());
                }}
            />

            <textarea
                class="outlined-input"
                style="resize: none;"
                placeholder="Leírás"
                value={selectedPlace.description}
                onchange={(e) => {
                    firestore.pois.set(selectedPlaceId!, {
                        ...selectedPlace,
                        description: e.target?.value,
                    });
                }}
            ></textarea>

            <input
                type="text"
                class="outlined-input"
                placeholder="Google Térkép link"
                value={selectedPlace.googleMapsLink}
                oninput={(e) => {
                    firestore.pois.set(selectedPlaceId!, {
                        ...selectedPlace,
                        googleMapsLink: e.target?.value,
                    });
                }}
            />

            <input
                type="text"
                class="outlined-input"
                placeholder="Pozíció"
                value={`${selectedPlace.latitude}, ${selectedPlace.longitude}`}
                oninput={(e) => {
                    firestore.pois
                        .set(selectedPlaceId!, {
                            ...selectedPlace,
                            latitude: parseFloat(e.target?.value.split(",")[0]),
                            longitude: parseFloat(
                                e.target?.value.split(",")[1],
                            ),
                        })
                        .then(() => getTabData());
                }}
            />

            <div>
                <input
                    type="checkbox"
                    name="allowPosting"
                    checked={selectedPlace.allowPosting}
                    oninput={(e) => {
                        firestore.pois.set(selectedPlaceId!, {
                            ...selectedPlace,
                            allowPosting: e.target?.checked,
                        });
                    }}
                />
                <label for="allowPosting">Bejegyzések engedélyezése</label>
            </div>

            <a
                href={`/poi?id=${selectedPlaceId}&ignoreLocation=1`}
                target="_blank"
            >
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
                            getTabData();
                        });
                    }
                }}
            >
                <span class="mdi mdi-delete"></span>
                Törlés
            </button>
        {/if}
    </main>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-grow: 1;
        align-items: center;
    }

    .dashboard > nav {
        align-self: stretch;
        width: 250px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--secondary-color);
    }

    .dashboard > main {
        flex-grow: 1;
    }
</style>
