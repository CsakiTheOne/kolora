<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import { onMount } from "svelte";
    import Footer from "../../../../../components/Footer.svelte";
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
    import ComicPanelWithBackground from "../../../../../components/ComicPanelWithBackground.svelte";
    import koloraLogo from "$lib/images/logos/kolora.png";
    import inkognitoLogo from "$lib/images/logos/inkognito-kollektiva.jpg";
    import Divider from "../../../../../components/Divider.svelte";
    import ladybug from "$lib/images/events/2026-04-11/kacalibogi.png";

    let source: string = $state("");

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        source = urlParams.get("source") || ""; // Can be nfc, qr or anything else
        const url = new URL(window.location.href);
        url.searchParams.delete("source");
        window.history.replaceState({}, document.title, url.toString());

        const stickerId = url.pathname.split("/").slice(-2, -1)[0];
        firestore["event-2026-04-11"].visitSticker(stickerId, source);

        const foundStickers = JSON.parse(
            localStorage.getItem("event-2026-04-11-found-stickers") || "[]",
        );
        localStorage.setItem(
            "event-2026-04-11-found-stickers",
            JSON.stringify([...new Set([...foundStickers, stickerId])]),
        );
    });
</script>

<main class="container-column">
    <h1>Kincset találtál!</h1>
    <ComicPanel innerClass="container-column panel-yellow">
        <p>
            A Magyar Költészet Napja alkalmából matricákat rejtettünk el
            különböző helyeken. Most megtaláltál egyet! Ezeken a matricákon
            versek és egyéb meglepetések vannak, mint amiket lejjebb is találsz.
        </p>
    </ComicPanel>
    <Divider />
    <ComicPanel innerClass="container-column panel-red">
        <h2>Volt egyszer egy katica</h2>
        <pre>Volt egyszer egy katica
elveszett egy pöttye
szegénykének emiatt 
potyogott a könnye.

Kereste az ágy alatt, 
a fenyőfán, a réten, 
bárányfelhőn, amögött,
kikészült egészen.

Egyszer aztán benézett 
a tükörbe is végre
- s meglátta a kóbor pettyet
az orra tövébe'.

Mi ebből a tanulság? 
Csak annyi, kisbarátom
hogyha bármi hiányozna, 
előbb keresd magadban, 
aztán a nagyvilágon.</pre>
        <p>- Storcz Erzsébet</p>
    </ComicPanel>
    <img style="aspect-ratio: 2 / 1; object-fit: cover;" src={ladybug} alt="" />
    <Divider />
    <h2>Kik csinálták ezt?</h2>
    <div class="static-row">
        <ComicPanelWithBackground
            outerStyle="width: 100%;"
            innerClass="container-column panel-base"
            backgroundUrl={koloraLogo}
        >
            <a href="/">
                <h3>Kolora Egyesület</h3>
            </a>
            <p style="font-size: small;">fehérvári összművészeti egyesület</p>
        </ComicPanelWithBackground>
        <ComicPanelWithBackground
            outerStyle="width: 100%;"
            innerClass="container-column panel-black"
            backgroundUrl={inkognitoLogo}
        >
            <a
                href="https://instagram.com/inkognito_kollektiva"
                target="_blank"
            >
                <h3>INKognitó Kollektíva</h3>
            </a>
            <p style="font-size: small;">bodajki művész közösség</p>
        </ComicPanelWithBackground>
    </div>
</main>
<Footer />
