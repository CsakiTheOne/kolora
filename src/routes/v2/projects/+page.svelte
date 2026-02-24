<script>
    import Header from "../../../components/v2/Header.svelte";
    import IrregularContainer from "../../../components/v2/IrregularContainer.svelte";
</script>

<Header selectedPageIndex={1} />
<main class="container-column">
    <h1>Projektjeink és nagyobb eseményeink</h1>
    
    <h2>Kolora Feszt 2025</h2>
    <p>
        Az első összművészeti fesztiválunk, ahol környékbeli alkotók és előadók
        mutatkoztak be Székesfehérváron. Bandák, kiállítás, DJ-k és workshop-ok.
    </p>
    <p>
        <a href="/projects/feszt-2025">
            <button class="btn">Visszatekintés az esemény oldalára</button>
        </a>
    </p>

    <h2>Költészet napi kincsvadászat</h2>
    <p>
        A Magyar Költészet Napja alkalmából matricákat rejtettünk el
        Székesfehérváron, amelyekhez telefont érintve verseket és egyéb
        meglepetéseket lehetett találni.
    </p>
    <p>
        <a href="/stickers">
            <button class="btn">Visszatekintés az esemény oldalára</button>
        </a>
    </p>

    <h2>Élő hátterek és egyéb digitális alkotások</h2>
    <p>
        A <a href="https://instagram.com/wholesomewarestuff/" target="_blank"
            >WholesomeWare</a
        > lehetőséget ad a rajzolni, festeni vagy bármilyen vizuális formában alkotni
        kedvelőknek, hogy műveiket feldobhassák egy kis interaktivitással és a brand
        nevét viselő alkalmazásban meg is oszthassák ezeket.
    </p>
    <p>
        <a
            href="https://play.google.com/store/apps/details?id=com.csakitheone.wholesomeware&pcampaignid=web_share"
            target="_blank"
        >
            <button class="btn">WholesomeWare app beszerzése</button>
        </a>
    </p>

    <h2>És sokminden más...</h2>
    <IrregularContainer>
        <div class="links-list">
            <a href="/timeline" class="link-item">2024 visszatekintés</a>
            <a href="https://www.youtube.com/@koloraegyesulet" target="_blank" class="link-item">
                YouTube csatornánk
            </a>
        </div>
    </IrregularContainer>
</main>

<style>
    main {
        align-items: center;
    }

    .links-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }

    .link-item {
        display: inline-block;
        padding: 10px 20px;
        background-color: black;
        color: white;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.2s ease;
    }

    .link-item:hover {
        scale: 1.05;
        background-color: var(--accent-color, #333);
    }

    h2 {
        width: 100%;
        text-align: left;
        margin-top: 30px;
        margin-bottom: 15px;
    }

    p {
        width: 100%;
        text-align: left;
    }

    button {
        margin-top: 10px;
    }

    a:not(.link-item) {
        color: inherit;
        text-decoration: underline;
    }
</style>
