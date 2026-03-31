<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import { onMount } from "svelte";
    import Footer from "../../../../../components/Footer.svelte";
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
    import ComicPanelWithBackground from "../../../../../components/ComicPanelWithBackground.svelte";
    import koloraLogo from "$lib/images/logos/kolora.png";
    import inkognitoLogo from "$lib/images/logos/inkognito-kollektiva.jpg";
    import Divider from "../../../../../components/Divider.svelte";
    import forg from "$lib/images/events/2026-04-11/forg.png";

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
    <ComicPanel innerClass="container-column panel-black">
        <h2>PIECE A SHIT</h2>
        <pre>When I see a frog

& it takes a hop away from me

it's like

what the fuck man.</pre>
        <p>- Sam Pink</p>
        <p>
            Egy vers a <i
                >99 Poems to Cure Whatever's Wrong with You Or Create the
                Problem's You Need</i
            > című kötetből.
        </p>
    </ComicPanel>
    <img style="aspect-ratio: 1 / 1; object-fit: cover;" src={forg} alt="" />
    <iframe
        width="100%"
        style="aspect-ratio: 9 / 16; border-radius: 4px;"
        src="https://www.youtube.com/embed/7wMsgOHqDPA?si=gNQwEM9RnD1u_Quc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
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
