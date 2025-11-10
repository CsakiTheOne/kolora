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
            <span class="mdi mdi-link"></span>
            Linkek, források, eszközök
        </h2>
        <ul class="outlined-list">
            <a href="https://discord.gg/y9cVqnEcvg">
                <li>
                    <p>Kolora Discord szerver</p>
                    <p class="text-small">
                        Fontos linkek, forrásaink ide költöztek.
                    </p>
                </li>
            </a>
            <a
                href="https://mini-qr-code-generator.vercel.app/"
                target="_blank"
            >
                <li>
                    <p>
                        <span class="mdi mdi-qrcode"></span>
                        QR kód generátor
                    </p>
                </li>
            </a>
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
        <ul class="outlined-list">
            <button
                onclick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.origin}/poi/nearby`,
                    );
                }}
            >
                <span class="mdi mdi-content-copy"></span>
                QR kódos matricák linkjének másolása
            </button>
            <li>
                <p>
                    Mi történjen ha valaki beolvassa a QR kódot az egyik matricánkon?
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

        <h2>
            <span class="mdi mdi-progress-wrench"></span>
            Építkezési terület
        </h2>
        <p>
            Itt vannak a weboldal azon részei, amelyek nincsenek készen, ezért
            még nem publikusak.
        </p>
        <ul class="outlined-list">
            <a href="/anyam-kinja">
                <li>
                    <p>Anyám kinja rövidfilm by Klein Anna</p>
                </li>
            </a>
        </ul>
    {/if}
</main>
<Footer />

<style>
    button {
        width: 100%;
    }
</style>
