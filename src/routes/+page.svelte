<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
    import VerticalTimelineItem from "../components/VerticalTimelineItem.svelte";
</script>

<Header />
<main>
    <VerticalTimelineItem title="2024 visszatekintés">
        <p>
            Az elmúlt évben a Kolora Egyesület számos rendezvényt szervezett,
            amelyek közül néhányat itt láthatsz. Hogy megünnepeljük a 2024-es
            évet, ezt a weboldalt raktuk össze, ahol nosztalgiázhatunk egy
            kicsit. Illetve ez az oldal lesz a helye egy újabb
            eseménysorozatnak, amely 2025 áprilisában fog indulni.
        </p>
        <p>Na induljunk el az időben visszafelé:</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kolora terasz és egyéb zenés rendezvények"
        subtitle="Egész évben Februártól Augusztusig"
    >
        <p>
            Az évben több alkalommal is megrendezésre kerültek a Kolora teraszok
            és más zenés események a Museum Caféban és a Nyolcas Műhelyben. Ezen
            események során felléptek a Kolora Egyesület tagjai, barátai és más
            zenekarok is.
        </p>
        <p>
            Néhány fellépő: JEX, Nedel'a, Kalafatics Imi, Loophia, .kory,
            Bodonyi Dani, Næz
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Múzeumok éjszakája és 1. Kolora szülinap"
        subtitle="Július 22."
    >
        <p>
            <a href="https://www.instagram.com/p/C8MQxtZsmon" target="_blank">
                <span class="mdi mdi-instagram"></span>
                Instagram poszt
            </a>
        </p>
        <p>//TODO: leírás, képek (Emese pls), videók (?), stb.</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem title="Magyar költészet napja" subtitle="Április 11.">
        <p>
            A magyar költészet napján Csáki egy kincsvadászatot szervezett, ahol
            a résztvevőknek Székesfehérvár utcáin kellett keresniük matricákat,
            amelyeken versek és egyéb jóságok voltak. A matricák tartalmai
            megtekinthetőek az alábbi linken:
        </p>
        <p><a href="stickers"> 2024 költészet napi kincsvadászat</a></p>
        <p>
            <a href="https://www.instagram.com/p/C5nz8SNNHcc" target="_blank">
                <span class="mdi mdi-instagram"></span>
                Csáki posztja a kincsvadászatról
            </a>
        </p>
        <p>
            Viszont jövőre is vár a művészet kedvelőkre egy meglepetés. Már
            készül a 2025-ös költészet napi program, amely itt lesz elérhető:
        </p>
        <p><a href="jam">2025 költészet napja</a></p>
    </VerticalTimelineItem>

    <VerticalTimelineItem title="2024 évnyitó slam" subtitle="Március 14.">
        <p>
            <a
                href="https://www.instagram.com/stories/highlights/17871723279011747/"
                target="_blank"
            >
                <span class="mdi mdi-instagram"></span>
                Instagram story
            </a>
        </p>
        <p>
            A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó
            slam versenyének, ahol 18 előadást láthattunk. Köztük volt 6
            tehetséges versenyző és sok új ember, akik először álltak a
            színpadra. Köszönjük a helyet a Nyolcas Műhelynek és a támogatást
            minden fellépőnek és nézőnek!
        </p>
        <p><a href="gallery/2024-evnyito-slam">Fellépők megtekintése</a></p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Első slam poetry workshop"
        subtitle="Február 25."
    >
        <p>
            <a href="https://www.instagram.com/p/C4n0kGGsKUc" target="_blank">
                <span class="mdi mdi-instagram"></span>
                Instagram poszt
            </a>
        </p>
        <img
            style="width: 100%; max-height: 320px;"
            src={imgFirstKoloraWorkshopTable}
            alt=""
        />
        <p>//TODO: leírás</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem title="A kezdetek" subtitle="2023" isLastItem={true}>
        <p>
            <a href="https://www.instagram.com/p/CuZs8OqsdHT" target="_blank">
                <span class="mdi mdi-instagram"></span>
                Instagram poszt
            </a>
        </p>
        <p>
            Csáki: <i>
                "A Kolora Egyesület 2023-ban alakult, viszont akkor én még nem
                tudtam a létezéséről. 😅 A közösségi oldalakon láttam, hogy az
                egyesület alakulásának évében is már voltak tök jó kis
                programok. Na de érdekesebb abba belegondolni, hogy mi
                következik. Sajnos 2024 második felében ritkultak az események,
                viszont remélem ezt a tendenciát sikerül együtt megfékezni. 😌
                Jómagam már benne vagyok egy 2025-ös program tervezésében és
                szervezésében, amit ismétlődő módon, rendszeresen szeretnék
                megtartani. De egyelőre nem ígérek semmit, meglepetés lesz. 😄"
            </i>
        </p>
        <p>
            //TODO: valami jobb szöveg ehelyett, nem akarok csak magam nevében
            beszélni
        </p>
    </VerticalTimelineItem>
</main>
<Footer />

<style>
    main {
        display: grid;
        grid-template-columns: [full-start] 0 [main-start] 1fr [main-end] 0 [full-end];
        gap: var(--spacing);
        padding: var(--spacing) 0;
    }

    @media (min-width: 720px) {
        main {
            grid-template-columns: [full-start] 20% [main-start] 1fr [main-end] 20% [full-end];
        }
    }

    :global(main > *) {
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
