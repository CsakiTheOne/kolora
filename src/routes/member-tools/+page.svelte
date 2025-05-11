<script lang="ts">
    import { ROLES } from "$lib/model/KoloraUser";
    import UserManager from "$lib/UserManager.svelte";
    import { onMount } from "svelte";
    import Alert from "../../components/Alert.svelte";
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import Kiseger from "../../components/Kiseger.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import rtdb from "$lib/firebase/rtdb";

    let qrFallbackUrl = $state("");

    onMount(() => {
        rtdb.config.feeds.getQrCodeFallbackUrl().then((url) => {
            if (url) {
                qrFallbackUrl = url;
            } else {
                qrFallbackUrl = "/";
            }
        });
    });
</script>

<SmallHeader currentPage="Eszközök" />
<main>
    {#if !UserManager.instance.isLoaded}
        <p>
            <span class="mdi mdi-loading mdi-spin"></span>
            Betöltés...
        </p>
    {:else if !UserManager.instance.koloraUser?.roles?.includes(ROLES.KOLORA_MEMBER)}
        <Alert title="Sajnos ehhez az oldalhoz nincs hozzáférésed">
            <p>Ez az oldal csak Kolora tagoknak érhető el.</p>
            <p>
                Ha Kolora tag vagy, de mégis ezt látod, akkor ellenőrizd, hogy
                be vagy-e jelentkezve. Ha így sem működik, szólj Csákinak.
            </p>
        </Alert>
    {:else}
        <h2>
            <span class="mdi mdi-tools"></span>
            Eszközök és források
        </h2>
        <ul class="outlined-list">
            <a href="./design-system">
                <li>
                    <span class="mdi mdi-palette"></span>
                    Design rendszer
                </li>
            </a>
            <a href="./post-generator">
                <li>
                    <span class="mdi mdi-post"></span>
                    Poszt készítő
                </li>
            </a>
        </ul>
        <ul class="outlined-list">
            <a href="/poi/nearby">
                <li>
                    <p>
                        <span class="mdi mdi-map-marker"></span>
                        Legközelebbi üzenőfal megnyitása
                    </p>
                    <p class="text-small">
                        Mindig a hozzád legközelebb lévő üzenőfalra vezet. Ez
                        megkönnyíti a QR kódok használatát. Ha nincs a környéken
                        üzenőfal, akkor simán a főoldalra visz.
                    </p>
                </li>
            </a>
            <button
                onclick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.origin}/poi/nearby`,
                    );
                }}
            >
                <span class="mdi mdi-content-copy"></span>
                Legközelebbi üzenőfal link másolása
            </button>
            <li>
                <p>
                    Mi történjen ha valaki beolvassa a QR kódot, de nincs
                    üzenőfal a közelben?
                </p>
                <input
                    type="text"
                    class="outlined-input"
                    value={qrFallbackUrl}
                    oninput={(e: any) => {
                        qrFallbackUrl = e.target.value;
                        rtdb.config.feeds.setQrCodeFallbackUrl(qrFallbackUrl);
                    }}
                />
                <p class="text-small">
                    Írj be egy sima / jelet a főoldal megnyitásához vagy másolj
                    be bármilyen linket. pl.:
                    https://instagram.com/koloraegyesulet
                </p>
            </li>
        </ul>
        <ul class="outlined-list">
            <button
                style="text-align: left;"
                onclick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.origin}/member-tools/auto-login`,
                    );
                }}
            >
                <p>
                    <span class="mdi mdi-account"></span>
                    Kolora fiók létrehozás egyszerűen
                </p>
                <p class="text-small">
                    Ha valakinek szeretnél segíteni a Kolora fiók létrehozásban,
                    akkor csak küldd el neki a linket, amit ide kattintva
                    kimásolhatsz.
                </p>
            </button>
        </ul>

        <h2>
            <span class="mdi mdi-progress-wrench"></span>
            Építkezési terület
        </h2>
        <p>
            Itt vannak a weboldal azon részei, amelyek nincsenek készen, ezért
            még nem publikusak.
        </p>
        <ul class="outlined-list">
            <li>Jelenleg nincs fejlesztés alatt álló oldal</li>
        </ul>

        <h2>
            <span class="mdi mdi-link"></span>
            Linkek
        </h2>
        <ul class="outlined-list">
            <a
                href="https://drive.google.com/drive/folders/1akxU9BGE1xXlYTHlrtUMhzKm8Cl8E2bu?usp=sharing"
                target="_blank"
            >
                <li>
                    <span class="mdi mdi-google-drive"></span>
                    Csáki Kolorás Drive mappája
                </li>
            </a>
            <a href="https://studio.youtube.com/" target="_blank">
                <li>
                    <span class="mdi mdi-youtube-studio"></span>
                    YouTube Studio
                </li>
            </a>
            <a href="https://m.me/CsakiTheOne" target="_blank">
                <li>
                    <p>
                        <span class="mdi mdi-help"></span>
                        Hiányzik valami?
                    </p>
                    <p class="text-small">
                        Ha van olyan eszköz, link, vagy bármi, ami szerinted
                        hasznos lehet a Kolora tagoknak, szólj Csákinak és
                        iderakja.
                    </p>
                </li>
            </a>
        </ul>

        <h2>Nem használt elemek</h2>
        <p>
            "Ezek a komponensek egyszer elkészültek, de végül nem igazán
            kerültek publikusan az oldalra. Ha már vannak, gondoltam iderakom."
            - Csáki
        </p>
        <Countdown
            targetDateTime={new Date(
                new Date().getFullYear() + 1,
                2,
                20,
                5,
                30,
            )}
        />
        <Kiseger />
    {/if}
</main>
<Footer />

<style>
    button {
        width: 100%;
    }
</style>
