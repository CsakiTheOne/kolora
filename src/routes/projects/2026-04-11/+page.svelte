<script lang="ts">
    import ComicPanel from "../../../components/ComicPanel.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import logoInkognito from "$lib/images/logos/inkognito-kollektiva.jpg";
</script>

<Header hideButtons />
<main class="container-column">
    <h1>Költészet napi kincsvadászat 2026</h1>
    <p>Esemény indul: Április 11-én</p>
    <p>
        A Magyar Költészet Napja alkalmából matricákat rejtünk el [REDACTED]
        utcáin, amelyekhez telefont érintve verseket és egyéb tartalmakat
        találhatsz.
    </p>
    <ComicPanel innerClass="static-row panel-black">
        <img src={logoInkognito} alt="" style="width: 92px; height: auto;" />
        <p>
            Az idei esemény az <a
                href="https://instagram.com/inkognito_kollektiva"
                target="_blank">INKognitó Kollektíva</a
            > támogatásával valósul meg. Lessétek meg őket is!
        </p>
    </ComicPanel>
    <ComicPanel innerClass="container-column">
        <h2>Matricák, amiket megtaláltál ezen az eszközön</h2>
        <p>Még nem találtál meg egyetlen matricát sem!</p>
    </ComicPanel>
</main>
<Footer />
