<script lang="ts">
    import { onMount } from "svelte";
    import ComicPanel from "../../../../components/ComicPanel.svelte";
    import Footer from "../../../../components/Footer.svelte";

    let id: string = $state("");

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get("id") || "";
    });
</script>

<main class="container-column">
    <h1>Költészet napi kincsvadászat 2026</h1>
    <p>Matrica ID: {id}</p>
    <ComicPanel innerClass="container-column panel-yellow">
        <p>
            A Magyar Költészet Napja alkalmából matricákat rejtettünk el
            különböző helyeken. Most megtaláltál egyet! Ezeken a matricákon
            versek és egyéb meglepetések vannak, mint amiket lejjebb is találsz.
        </p>
    </ComicPanel>
    <h2>Kik csinálták ezt?</h2>
    <div class="static-row">
        <ComicPanel
            outerStyle="width: 100%;"
            innerClass="container-column panel-base"
        >
            <a href="/">
                <h3>Kolora Egyesület</h3>
            </a>
            <p style="font-size: small;">fehérvári összművészeti egyesület</p>
        </ComicPanel>
        <ComicPanel
            outerStyle="width: 100%;"
            innerClass="container-column panel-black"
        >
            <a href="https://instagram.com/inkognito_kollektiva" target="_blank">
                <h3>INKognitó Kollektíva</h3>
            </a>
            <p style="font-size: small;">bodajki művész közösség</p>
        </ComicPanel>
    </div>
    <h2>Vers</h2>
    <pre>
A rózsa vörös,
Az ibolya kék,
Ha a kódom működne
Annak nagyon örülnék.

A kóddal nincs gond,
Mindig csak javítom.
A laptopom olyan szar,
Mindjárt ki is hajítom.
    </pre>
</main>
<Footer />
