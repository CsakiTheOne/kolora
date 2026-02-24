<script>
    import Header from "../../../components/v2/Header.svelte";
    import IrregularContainer from "../../../components/v2/IrregularContainer.svelte";
</script>

<Header selectedPageIndex={1} />
<main class="container-column">
    <h1>Projektjeink és nagyobb eseményeink</h1>

    <div class="adaptive-col-row">
        <IrregularContainer>
            <h2>Kolora Feszt 2025</h2>
            <p>
                Az első összművészeti fesztiválunk, ahol környékbeli alkotók és
                előadók mutatkoztak be Székesfehérváron. Bandák, kiállítás, DJ-k
                és workshop-ok.
            </p>
            <p>
                <a href="/projects/feszt-2025" target="_self">
                    Visszatekintés az esemény oldalára
                </a>
            </p>
        </IrregularContainer>

        <IrregularContainer>
            <h2>Költészet napi kincsvadászat</h2>
            <p>
                A Magyar Költészet Napja alkalmából matricákat rejtettünk el
                Székesfehérváron, amelyekhez telefont érintve verseket és egyéb
                meglepetéseket lehetett találni.
            </p>
            <p>
                <a href="/stickers" target="_self"> Visszatekintés az esemény oldalára </a>
            </p>
        </IrregularContainer>

        <IrregularContainer>
            <h2>Élő hátterek és egyéb digitális alkotások</h2>
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
                    href="https://play.google.com/store/apps/details?id=com.csakitheone.wholesomeware&pcampaignid=web_share"
                    target="_blank"
                >
                    WholesomeWare app beszerzése
                </a>
            </p>
        </IrregularContainer>
    </div>

    <h2>És sokminden más...</h2>
    <div class="adaptive-col-row">
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
    </div>
</main>

<style>
    main {
        align-items: start;
    }
</style>
