<script>
    import Header from "../../components/Header.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Divider from "../../components/Divider.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Header selectedPageIndex={1} />
<main class="container-column">
    <h1>Projektjeink és nagyobb eseményeink</h1>

    <div class="adaptive-col-row">
        <ComicPanel
            innerClass="container-column panel-blue"
            outerClass="event-panel"
        >
            <h2>Kolora Feszt</h2>
            <p>
                Az első összművészeti fesztiválunk, ahol környékbeli alkotók és
                előadók mutatkoztak be Székesfehérváron. Bandák, kiállítás, DJ-k
                és workshop-ok.
            </p>
            <b>2026 hamarosan</b>
            <p>
                <a class="cta-link" href="/projects/feszt-2025" target="_self">
                    2025-ös program
                </a>
            </p>
        </ComicPanel>

        <ComicPanel
            innerClass="container-column panel-yellow"
            outerClass="event-panel"
        >
            <h2>Költészet napi kincsvadászat</h2>
            <p>
                A Magyar Költészet Napja alkalmából matricákat rejtettünk el
                Székesfehérváron, amelyekhez telefont érintve verseket és egyéb
                meglepetéseket lehetett találni.
            </p>
            <b>2026<a href="/projects/2026-04-11" style="opacity: 0; cursor: text;">.</a>hamarosan</b>
            <p>
                <a class="cta-link yellow" href="/stickers" target="_self">
                    2024 kincsei
                </a>
            </p>
        </ComicPanel>
    </div>

    <ComicPanel
        innerClass="container-column panel-purple"
        outerClass="feature-panel"
    >
        <h2>Élő hátterek és digitális alkotások</h2>
        <p>
            A <a
                href="https://instagram.com/wholesomewarestuff/"
                target="_blank">WholesomeWare</a
            > lehetőséget ad a rajzolni, festeni vagy bármilyen vizuális formában
            alkotni kedvelőknek, hogy műveiket feldobhassák egy kis interaktivitással
            és a brand nevét viselő alkalmazásban meg is oszthassák ezeket.
        </p>
        <p>
            <a
                class="cta-link"
                href="https://play.google.com/store/apps/details?id=com.csakitheone.wholesomeware&pcampaignid=web_share"
                target="_blank"
            >
                WholesomeWare app beszerzése
            </a>
        </p>
    </ComicPanel>

    <Divider />

    <ComicPanel innerClass="container-column panel-base">
        <h2>És sok minden más...</h2>
        <p>
            Minden projektünk egy új fejezet, de a sztori folyamatos: nézd meg,
            honnan indultunk, és hol tart most a Kolora.
        </p>
        <div class="link-wall">
            <a class="irregular-box-container" href="/timeline">
                <button class="irregular-box">2024 visszatekintés</button>
            </a>
            <a
                class="irregular-box-container"
                href="https://www.youtube.com/@koloraegyesulet"
                target="_blank"
            >
                <button class="irregular-box">YouTube csatornánk</button>
            </a>
            <a class="irregular-box-container" href="/contacts" target="_self">
                <button class="irregular-box">Kapcsolat</button>
            </a>
        </div>
    </ComicPanel>
</main>
<Footer />

<style>
    :global(.event-panel),
    :global(.feature-panel) {
        width: 100%;
    }

    .link-wall {
        display: grid;
        gap: 1rem;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .link-wall .irregular-box-container {
        width: 100%;
    }

    .link-wall .irregular-box {
        width: 100%;
    }
</style>
