<script lang="ts">
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import Badge from "../../components/Badge.svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import firestore from "$lib/firebase/firestore";
    import POI from "$lib/model/POI";

    let places: POI[] = $state([]);
    let nearestPlace: POI | null = $state(null);
    let distance: number = $state(0);
    let isLoadingPlaces = $state(false);
    let isLoadingLocation = $state(false);

    function getNearestPoi() {
        isLoadingLocation = true;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                places.sort((a, b) => {
                    const distanceA = Math.sqrt(
                        Math.pow(a.latitude - position.coords.latitude, 2) +
                            Math.pow(
                                a.longitude - position.coords.longitude,
                                2,
                            ),
                    );
                    const distanceB = Math.sqrt(
                        Math.pow(b.latitude - position.coords.latitude, 2) +
                            Math.pow(
                                b.longitude - position.coords.longitude,
                                2,
                            ),
                    );
                    return distanceA - distanceB;
                });
                nearestPlace = places[0];
                distance = Math.sqrt(
                    Math.pow(
                        nearestPlace.latitude - position.coords.latitude,
                        2,
                    ) +
                        Math.pow(
                            nearestPlace.longitude - position.coords.longitude,
                            2,
                        ),
                );
                isLoadingLocation = false;
            },
            () => {
                nearestPlace = null;
                isLoadingLocation = false;
            },
        );
    }

    onMount(() => {
        isLoadingPlaces = true;
        firestore.pois.getAll().then((pois) => {
            places = pois;
            isLoadingPlaces = false;
            getNearestPoi();
        });
    });
</script>

<Header selectedTab="Üzenőfalak" />
<main>
    <h2>Üzenőfalak</h2>
    <h3>Közelben</h3>
    {#if isLoadingPlaces}
        <p>Helyek betöltése...</p>
    {:else if isLoadingLocation}
        <p>
            <span class="mdi mdi-crosshairs-gps"></span>
            Pozíció meghatározása...
        </p>
    {:else if nearestPlace && distance < 0.003}
        <div class="card">
            <p>Legközelebbi üzenőfal: {nearestPlace.name}</p>
            <a href="/poi?id={nearestPlace.id}">
                <button class="btn"> Megnyitás </button>
            </a>
        </div>
    {:else if nearestPlace}
        <Alert>
            <p>Legközelebbi üzenőfal: {nearestPlace.name}</p>
            <p>Menj közelebb a megttekintéséhez!</p>
        </Alert>
    {:else}
        <Alert>
            <p>Nem sikerült meghatározni a pozíciót.</p>
        </Alert>
    {/if}
    <button class="btn" onclick={getNearestPoi}>
        <span class="mdi mdi-refresh"></span>
        Frissítés
    </button>
    <h3>Térkép</h3>
    <iframe
        width="100%"
        style="aspect-ratio: 5/4;"
        title="Google Maps"
        frameborder="0"
        src="https://www.google.com/maps/d/u/0/embed?mid=1wvVqV8uNIfDM3JdUyhJUrnkxLt-Mgk4&ehbc=2E312F&noprof=1"
    ></iframe>
    <h3>Hibajelentés</h3>
    <p>
        Nem találod a matricát az egyik helyen? Tudod, hogy hol kellene lennie,
        de eltűnt onnan? Ott van, de valamiért nem műkdöik?
    </p>
    <p>
        Írj Csákinak, hogy pontosan hol és mi történt. Az elérhetőségeit <a
            href="/contacts">itt találod</a
        >.
    </p>
</main>
<Footer />

<style>
    .card {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
    }
</style>
