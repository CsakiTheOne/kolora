<script lang="ts">
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import Badge from "../../components/Badge.svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import firestore from "$lib/firebase/firestore";
    import POI from "$lib/model/POI";
    import PoiUtils from "$lib/PoiUtils";
    import Backdrop from "../../components/Backdrop.svelte";

    let places: POI[] = $state([]);
    let nearestPlace: POI | null = $state(null);
    let nearestPlacePostCount: number = $state(0);
    let distance: number = $state(0);
    let isLoadingPlaces = $state(false);
    let isLoadingLocation = $state(false);
    let openedHintId: number | null = $state(null);

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
                firestore.posts.getCountByPoi(nearestPlace.id).then((count) => {
                    nearestPlacePostCount = count;
                });
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
                nearestPlacePostCount = 0;
                isLoadingLocation = false;
            },
        );
    }

    onMount(() => {
        isLoadingPlaces = true;
        firestore.pois.getAvailable().then((pois) => {
            places = pois;
            isLoadingPlaces = false;
            getNearestPoi();
        });
    });
</script>

{#if nearestPlace && openedHintId}
    <Backdrop close={() => (openedHintId = null)}>
        <img
            src={openedHintId === 1
                ? nearestPlace.hint1Url
                : nearestPlace.hint2Url}
            alt="hint"
            style="margin: calc(var(--spacing) * 2); max-width: 80vw; max-height: 80svh; object-fit: contain;"
            onclick={() => (openedHintId = null)}
            onkeydown={(e) => e.key === "Enter" && (openedHintId = null)}
            tabindex="0"
            role="button"
        />
    </Backdrop>
{/if}
<Header selectedTab="Üzenőfalak" />
<main>
    <h2>Üzenőfalak</h2>
    <p>
        A Kolora oldalán helyhez kötött üzenőfalak vannak, amiket
        meglátogathatsz és üzeneteket hagyhatsz rajtuk.
    </p>

    <div
        style="display: flex; gap: var(--spacing); flex-wrap: wrap; align-items: center; justify-content: space-between;"
    >
        <h3>Közelben</h3>
        <button class="btn" onclick={getNearestPoi}>
            <span class="mdi mdi-refresh"></span>
            Frissítés
        </button>
    </div>
    {#if isLoadingPlaces}
        <p>Helyek betöltése...</p>
    {:else if isLoadingLocation}
        <p>
            <span class="mdi mdi-crosshairs-gps"></span>
            Pozíció meghatározása...
        </p>
    {:else if nearestPlace}
        <div class="card">
            <p>
                Legközelebbi üzenőfal: {nearestPlace.name}
                {#if nearestPlacePostCount > 0}
                    <abbr
                        title="Ebbe nincsenek beleszámolva a mindenhol látszódó posztok"
                        onclick={() => {
                            alert(
                                "Ebbe nincsenek beleszámolva a mindenhol látszódó posztok",
                            );
                        }}
                    >
                        ({nearestPlacePostCount} poszt)
                    </abbr>
                {/if}
            </p>
            <div
                style="display: flex; gap: calc(var(--spacing) / 2); flex-wrap: nowrap;"
            >
                {#if nearestPlace.hint1Url}
                    <button
                        class="btn"
                        style="flex-grow: 1;"
                        onclick={() => {
                            window.open(nearestPlace!!.hint1Url, "_blank");
                        }}
                    >
                        Segítség #1
                    </button>
                {:else}
                    <p>Nem érhető el segítség a matrica megtalálásához.</p>
                {/if}
                {#if nearestPlace.hint2Url}
                    <button
                        class="btn"
                        style="flex-grow: 1;"
                        onclick={() => {
                            window.open(nearestPlace!!.hint2Url, "_blank");
                        }}
                    >
                        Segítség #2
                    </button>
                {/if}
            </div>
            {#if distance < PoiUtils.DISTANCE_TO_OPEN}
                <p>
                    Még mindig nincs meg a matrica? Már nagyon közel vagy,
                    szóval ha nem találod, itt megnyithatod:
                </p>
                <a href="/poi?id={nearestPlace.id}">
                    <button class="btn" style="width: 100%">Megnyitás</button>
                </a>
            {:else}
                <p>Menj közelebb a megtekintéshez!</p>
            {/if}
        </div>
    {:else}
        <Alert>
            <p>
                Nem sikerült meghatározni a pozíciót. Ellenőrizd a hely
                engedélyeket a telefon és böngésző beállításokban.
            </p>
        </Alert>
    {/if}

    <h3>Térkép</h3>
    <iframe
        width="100%"
        style="aspect-ratio: 5/4;"
        title="Google Maps"
        frameborder="0"
        src="https://www.google.com/maps/d/u/0/embed?mid=1wvVqV8uNIfDM3JdUyhJUrnkxLt-Mgk4&ehbc=2E312F&noprof=1"
    ></iframe>

    <h3>Technikai részletek és hibajelentés</h3>
    <h4>Matrica beolvasása</h4>
    <p>
        Ha találtál egy matricát, győződj meg róla, hogy a telefonodon be van
        kapcsolva az NFC, és közelítsd a matricához a telefonod hátulját.
        iPhone-okban általában följebb van az NFC antenna, más telefonoknál
        általában középen. Ha nem működik, próbáld levenni a telefon tokját vagy
        próbáld többször elvenni és odaérinteni a telefont kicsit más helyre.
    </p>
    <h4>Hely hozzáférés</h4>
    <p>
        Ha a matrica beolvasása után nem tudod megnyitni az üzenőfalat, akkor
        ellenőrizd a hely hozzáférés beállításait a telefonodon és a
        böngésződben. A helyhez kötött üzenőfalak csak akkor működnek, ha tudjuk
        ellenőrizni, hogy tényleg a közelben vagy.
    </p>
    <p>
        Hogy miként, s hogyan kezeljük a hely- és egyéb adataitokat, arról
        olvashattok a <a href="/data" target="_blank"
            >weboldalunk adatkezelési irányelveiben</a
        >.
    </p>
    <h4>Hibajelentés</h4>
    <p>
        Nem találod a matricát az egyik helyen? Tudod, hogy hol kellene lennie,
        de eltűnt onnan? Ott van, de valamiért nem műkdöik?
    </p>
    <p>Írj Csákinak, hogy pontosan hol és mi történt.</p>
    <p>
        <a href="mailto:jockahun@gmail.com" target="_blank">
            <span class="mdi mdi-email"></span>
            Email: jockahun@gmail.com
        </a>
    </p>
    <p>
        <a href="https://instagram.com/wholesomewarestuff" target="_blank">
            <span class="mdi mdi-instagram"></span>
            Instagram: @wholesomewarestuff
        </a>
    </p>
    <p>
        <a href="https://m.me/CsakiTheOne" target="_blank">
            <span class="mdi mdi-facebook-messenger"></span>
            Messenger: Csáki
        </a>
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
