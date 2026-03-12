<script lang="ts">
    import { ROLES } from "$lib/model/KoloraUser";
    import UserManager from "$lib/UserManager.svelte";
    import { onMount } from "svelte";
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Divider from "../../components/Divider.svelte";
    import rtdb from "$lib/firebase/rtdb";

    let qrFallbackUrl = $state("");
    let copyAutoLoginStatus = $state("");
    let copyStickerStatus = $state("");

    const isMember = $derived(
        UserManager.instance.koloraUser?.roles?.includes(ROLES.KOLORA_MEMBER),
    );

    function copyAutoLoginLink() {
        navigator.clipboard
            .writeText(`${window.location.origin}/member-tools/auto-login`)
            .then(() => {
                copyAutoLoginStatus = "Link kimásolva";
            })
            .catch(() => {
                copyAutoLoginStatus = "A másolás nem sikerült";
            });
    }

    function copyStickerLink() {
        navigator.clipboard
            .writeText(`${window.location.origin}/poi/nearby`)
            .then(() => {
                copyStickerStatus = "Link kimásolva";
            })
            .catch(() => {
                copyStickerStatus = "A másolás nem sikerült";
            });
    }

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

<Header selectedPageIndex={-1} />
<main class="container-column">
    <ComicPanel innerClass="container-column panel-blue">
        <h1>Kolora eszközök</h1>

    {#if !UserManager.instance.isLoaded}
        <p>
            <span class="mdi mdi-loading mdi-spin"></span>
            Betöltés...
        </p>
    {:else if !isMember}
        <h2>
            <span class="mdi mdi-lock"></span>
            Nincs hozzáférésed ehhez az oldalhoz
        </h2>
        <p>Ez az oldal csak Kolora tagoknak érhető el.</p>
        <p>
            Ha Kolora tag vagy, de mégis ezt látod, ellenőrizd, hogy be vagy-e
            jelentkezve. Ha így sem működik, szólj Csákinak.
        </p>
        <p>
            <a class="btn" href="/profile">Profil oldal megnyitása</a>
        </p>
    {:else}
        <div class="tools-grid">
            <ComicPanel innerClass="container-column panel-purple" outerClass="tool-panel">
                <h2>
                    <span class="mdi mdi-link"></span>
                    Linkek és források
                </h2>
                <p>
                    <a href="https://discord.gg/y9cVqnEcvg" target="_blank">
                        Kolora Discord szerver
                    </a>
                </p>
                <p class="text-small">Fontos linkek és forrásaink ide költöztek.</p>
                <p>
                    <a
                        href="https://mini-qr-code-generator.vercel.app/"
                        target="_blank"
                    >
                        <span class="mdi mdi-qrcode"></span>
                        QR kód generátor
                    </a>
                </p>
            </ComicPanel>

            <ComicPanel innerClass="container-column panel-yellow" outerClass="tool-panel">
                <h2>
                    <span class="mdi mdi-account"></span>
                    Fiók létrehozás segéd
                </h2>
                <p>
                    Ha valakinek segítenél Kolora fiókot létrehozni, másold ki
                    ezt a linket és küldd el neki.
                </p>
                <div class="actions-row">
                    <button class="btn" onclick={copyAutoLoginLink}>
                        <span class="mdi mdi-content-copy"></span>
                        Auto-login link másolása
                    </button>
                    {#if copyAutoLoginStatus}
                        <p class="status-text">{copyAutoLoginStatus}</p>
                    {/if}
                </div>
            </ComicPanel>
        </div>

        <ComicPanel innerClass="container-column panel-red-variant">
            <h2>
                <span class="mdi mdi-sticker"></span>
                QR kódos matricák
            </h2>
            <div class="actions-row">
                <button class="btn" onclick={copyStickerLink}>
                    <span class="mdi mdi-content-copy"></span>
                    Matricák linkjének másolása
                </button>
                {#if copyStickerStatus}
                    <p class="status-text">{copyStickerStatus}</p>
                {/if}
            </div>

            <label class="field-label" for="qr-fallback-url">
                Mi történjen, ha valaki beolvassa a QR kódot az egyik matricánkon?
            </label>
            <input
                id="qr-fallback-url"
                type="text"
                class="text-input"
                value={qrFallbackUrl}
                oninput={(e: any) => {
                    qrFallbackUrl = e.target.value;
                    rtdb.config.feeds.setQrCodeFallbackUrl(qrFallbackUrl);
                }}
            />
            <p class="text-small">
                Írj be egy sima / jelet a főoldalhoz vagy másolj be bármilyen
                linket, pl.: https://instagram.com/koloraegyesulet
            </p>
        </ComicPanel>

        <Divider color="var(--kolora-color-yellow)" />

        <ComicPanel innerClass="container-column panel-base">
            <h2>
                <span class="mdi mdi-progress-wrench"></span>
                Építkezési terület
            </h2>
            <p>
                Itt fogjuk gyűjteni az új, fejlesztés alatt álló belsős
                funkciókat, amiket kiadás előtt lehet kipróbálni.
            </p>
        </ComicPanel>
    {/if}
    </ComicPanel>
</main>
<Footer />

<style>
    h1,
    h2 {
        text-transform: uppercase;
    }

    .tools-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    :global(.tool-panel) {
        width: 100%;
    }

    .actions-row {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .status-text {
        font-weight: bold;
    }

    .field-label {
        font-weight: bold;
        text-transform: uppercase;
    }

    .text-input {
        width: 100%;
        border: 3px solid black;
        background-color: white;
        color: black;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
    }

    @media (min-width: 900px) {
        .tools-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
