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

    $effect(() => {
        if (!selectedPlaceId || !selectedPlace) return;
        firestore.pois.set(selectedPlaceId, selectedPlace);
    });
</script>

<SmallHeader currentPage="Dashboard" />
<main>
    <div class="tabs-row">
        <button
            class={`btn ${selectedTab !== "places" && "text-btn"}`}
            onclick={() => (selectedTab = "places")}
        >
            Helyek
        </button>
    </div>
    <div class="tabs-row">
        {#each places as place}
            <button
                class={`btn ${selectedPlaceId !== place.id && "text-btn"}`}
                onclick={() => (selectedPlaceId = place.id)}
            >
                {place.name.length > 0 ? place.name : "Névtelen"}
            </button>
        {/each}
        <button
            class={`btn ${selectedPlaceId !== null && "text-btn"}`}
            onclick={() => {
                firestore.pois.add(new POI()).then((newPlaceId) => {
                    getTabData();
                });
            }}
        >
            <span class="mdi mdi-plus"></span>
        </button>
    </div>
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
            oninput={(e) => {
                firestore.pois.set(selectedPlaceId!, {
                    ...selectedPlace,
                    description: e.target?.value,
                });
            }}
        ></textarea>

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
                        longitude: parseFloat(e.target?.value.split(",")[1]),
                    })
                    .then(() => getTabData());
            }}
        />

        <a
            href="https://www.google.com/maps/search/?api=1&query={selectedPlace.latitude},{selectedPlace.longitude}"
            target="_blank"
        >
            <button class="btn" style="width: 100%;">
                <span class="mdi mdi-map-marker"></span>
                Megnyitás Google Térképen
            </button>
        </a>

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
<Footer />

<style>
    .tabs-row {
        display: flex;
        gap: var(--spacing);
        flex-wrap: nowrap;
        min-width: 100%;
        overflow-x: auto;
        padding: calc(var(--spacing) / 2);
        background-color: var(--secondary-color);
        border-radius: var(--corner-radius);
    }
</style>
