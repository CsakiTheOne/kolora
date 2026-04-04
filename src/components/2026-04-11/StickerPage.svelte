<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import { onMount } from "svelte";
    import koloraLogo from "$lib/images/logos/kolora.png";
    import inkognitoLogo from "$lib/images/logos/inkognito-kollektiva.jpg";
    import ComicPanel from "../ComicPanel.svelte";
    import Divider from "../Divider.svelte";
    import ComicPanelWithBackground from "../ComicPanelWithBackground.svelte";
    import Footer from "../Footer.svelte";

    const { children } = $props();

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
    {@render children()}
    <Divider />
    <h2>Hol találok még kincseket? Mennyi van még?</h2>
    <a class="irregular-box-container" href="/projects/2026-04-11">
        <button class="irregular-box">Irány az esemény oldala</button>
    </a>
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
    <ComicPanel innerClass="container-column panel-yellow">
        <p>
            Az eseményt a <a
                href="https://www.facebook.com/groups/570212437568903"
                target="_blank">Posztolj verset az utcára!</a
            > mozgalom ihlette.
        </p>
    </ComicPanel>
</main>
<Footer />
