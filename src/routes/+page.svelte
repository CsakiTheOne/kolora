<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
</script>

<Header />
<main>
    <h2>2024 visszatekintés</h2>
    <p>
        Az elmúlt évben a Kolora Egyesület számos rendezvényt szervezett,
        amelyek közül néhányat itt láthatsz. Hogy megünnepeljük a 2024-es évet,
        ezt a weboldalt raktuk össze, ahol nosztalgiázhatunk egy kicsit. Illetve
        ez az oldal lesz a helye egy újabb eseménysorozatnak, amely 2025
        áprilisában fog indulni.
    </p>

    <hr />

    <h2>Múzeumok éjszakája és 1. Kolora szülinap</h2>
    <h5>Július 22.</h5>
    <p>
        //TODO: leírás, képek (Emese pls), videók (?), stb.
    </p>

    <hr />

    <h2>Magyar költészet napja</h2>
    <h5>Április 11.</h5>
    <p>
        A magyar költészet napján Csáki egy kincsvadászatot szervezett, ahol a
        résztvevőknek Székesfehérvár utcáin kellett keresniük matricákat,
        amelyeken versek és egyéb jóságok voltak. A matricák tartalmai
        megtekinthetőek az alábbi linken:
    </p>
    <p><a href="stickers"> 2024 költészet napi kincsvadászat</a></p>
    <p>
        Viszont jövőre is vár a művészet kedvelőkre egy meglepetés. Már készül a
        2025-ös költészet napi program, amely itt lesz elérhető:
    </p>
    <p><a href="jam">2025 költészet napja</a></p>

    <hr />

    <h2>Kolora terasz és egyéb zenés rendezvények</h2>
    <h5>Egész évben Februártól Augusztusig</h5>
    <p>
        Az évben több alkalommal is megrendezésre kerültek a Kolora teraszok és
        más zenés események a Museum Caféban és a Nyolcas Műhelyben. Ezen
        események során felléptek a Kolora Egyesület tagjai, barátai és más
        zenekarok is.
    </p>
    <p>
        Néhány fellépő: JEX, Nedel'a, Kalafatics Imi, Loophia, .kory, Bodonyi
        Dani, Næz
    </p>

    <hr />

    <h2>2024 évnyitó slam</h2>
    <h5>Március 14.</h5>
    <p>
        A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó slam
        versenyének, ahol 18 előadást láthattunk. Köztük volt 6 tehetséges
        versenyző és sok új ember, akik először álltak a színpadra. Köszönjük a
        helyet a Nyolcas Műhelynek és a támogatást minden fellépőnek és nézőnek!
    </p>
    <p><a href="gallery/2024-evnyito-slam">Fellépők megtekintése</a></p>

    <hr />

    <h2>Első slam poetry workshop</h2>
    <h5>Február 25.</h5>
    <img style="width: 100%; max-height: 350px;" src={imgFirstKoloraWorkshopTable} alt="">
    <p>
        //TODO: workshop leírása, képek, stb.
    </p>
</main>
<Footer />

<style>
    main {
        display: grid;
        grid-template-columns: [full-start] 10% [main-start] 1fr [main-end] 10% [full-end];
        gap: var(--spacing);
        padding: var(--spacing) 0;
    }

    main > * {
        grid-column: main;
        object-fit: cover;
    }

    main > :is(h1, h2, h3, h4, h5, h6) {
        text-align: left;
    }

    hr {
        grid-column: full;
        margin: 0 calc(10% - 8px);
        border: 0;
        border-top: 1px solid var(--primary-color);
    }
</style>
