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
    <p>Na induljunk el az időben visszafelé:</p>

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

    <h2>
        Múzeumok éjszakája és 1. Kolora szülinap
        <a href="https://www.instagram.com/p/C8MQxtZsmon" target="_blank"
            ><span class="mdi mdi-instagram"></span></a
        >
    </h2>
    <h5>Július 22.</h5>
    <p>//TODO: leírás, képek (Emese pls), videók (?), stb.</p>

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
        <a href="https://www.instagram.com/p/C5nz8SNNHcc" target="_blank"
            >Csáki posztja a kincsvadászatról</a
        >
    </p>
    <p>
        Viszont jövőre is vár a művészet kedvelőkre egy meglepetés. Már készül a
        2025-ös költészet napi program, amely itt lesz elérhető:
    </p>
    <p><a href="jam">2025 költészet napja</a></p>

    <hr />

    <h2>
        2024 évnyitó slam <a
            href="https://www.instagram.com/stories/highlights/17871723279011747/"
            target="_blank"><span class="mdi mdi-instagram"></span></a
        >
    </h2>
    <h5>Március 14.</h5>
    <p>
        A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó slam
        versenyének, ahol 18 előadást láthattunk. Köztük volt 6 tehetséges
        versenyző és sok új ember, akik először álltak a színpadra. Köszönjük a
        helyet a Nyolcas Műhelynek és a támogatást minden fellépőnek és nézőnek!
    </p>
    <p><a href="gallery/2024-evnyito-slam">Fellépők megtekintése</a></p>

    <hr />

    <h2>
        Első slam poetry workshop <a
            href="https://www.instagram.com/p/C4n0kGGsKUc"
            target="_blank"><span class="mdi mdi-instagram"></span></a
        >
    </h2>
    <h5>Február 25.</h5>
    <img
        style="width: 100%; max-height: 350px;"
        src={imgFirstKoloraWorkshopTable}
        alt=""
    />

    <hr />

    <h2>
        A kezdetek
        <a href="https://www.instagram.com/p/CuZs8OqsdHT" target="_blank"
            ><span class="mdi mdi-instagram"></span></a
        >
    </h2>
    <h5>2023</h5>
    <p>
        Csáki: <i>
            "A Kolora Egyesület 2023-ban alakult, viszont akkor én még nem
            tudtam a létezéséről. 😅 A közösségi oldalakon láttam, hogy az
            egyesület alakulásának évében is már voltak tök jó kis programok. Na
            de érdekesebb abba belegondolni, hogy mi következik. Sajnos 2024
            második felében ritkultak az események, viszont remélem ezt a
            tendenciát sikerül együtt megfékezni. 😌 Jómagam már benne vagyok
            egy 2025-ös program tervezésében és szervezésében, amit ismétlődő
            módon, rendszeresen szeretnék megtartani. De egyelőre nem ígérek
            semmit, meglepetés lesz. 😄"
        </i>
    </p>
</main>
<Footer />

<style>
    main {
        display: grid;
        grid-template-columns: [full-start] 16px [main-start] 1fr [main-end] 16px [full-end];
        gap: var(--spacing);
        padding: var(--spacing) 0;
    }

    @media(min-width: 720px) {
        main {
            grid-template-columns: [full-start] 20% [main-start] 1fr [main-end] 20% [full-end];
        }
    }

    main > * {
        grid-column: main;
        object-fit: cover;
    }

    main > :is(h1, h2, h3, h4, h5, h6) {
        text-align: left;
    }

    hr {
        border: 0;
        border-top: 1px solid var(--primary-color);
    }
</style>
