<script lang="ts">
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraMemberDisplay from "../../components/KoloraMemberDisplay.svelte";
    import pfpTothNikolett from "$lib/images/members/toth-nikolett.jpg";
    import pfpMeszarosEmese from "$lib/images/members/meszaros-emese.jpg";
    import pfpGergelyEmma from "$lib/images/members/gergely-emma.jpg";
    import pfpReszegiRamona from "$lib/images/members/reszegi-ramona.jpg";
    import pfpSzvorenEszter from "$lib/images/members/szvoren-eszter.jpg";
    import pfpCsaktornyaiAdam from "$lib/images/members/csaktornyai-adam.jpg";
    import Alert from "../../components/Alert.svelte";
</script>

<Header selectedTab="Tagok" />
<main>
    <h2>Tagok</h2>

    <Alert icon="alert">
        <p>
            Ez az oldal még nincs kész, ezért csak kolora tagok és a linkkel
            rendelkező emberek láthatják. Akinél a WIP feliratot látod, neki még
            nincs kész a bemutatkozása. Náluk ideiglenesen én pótoltam pár
            dolgot, hogy jobban lássam hogyan fog egyben kinézni az oldal.
        </p>
    </Alert>

    <!-- Elnökség -->
    <KoloraMemberDisplay
        name="Völgyesi Tamás - Toma (wip)"
        tags={["Elnök", "Nem öreg, de már fiatal sem"]}
    >
        <p>//TODO: hamarosan</p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpTothNikolett}
        name="Tóth Nikolett - Niki"
        tags={["Alelnök", "Író", "Felderítő"]}
    >
        <p>
            Csókok bókok! Én lennék az egyik alelnöke ennek a csoda csapatnak.
            Ha kell bármit kiderítek bárkiről/bármiről. Ha elkap az ihlet írni
            szoktam, novellákat vagy monológokat. Bármikor vevő vagyok egy
            bulira vagy csak egy beszélgetésre is. Tárt karokkal és egy hatalmas
            öleléssel várok mindenkit ebbe a különleges kis társaságba. Légy
            bármilyen különc itt otthonodra fogsz találni. &lt;3
        </p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        name="Bodonyi Dániel (wip)"
        tags={["Alelnök", "DJ", "Műsorvezető"]}
        links={[
            {
                name: "Café at Museum Essentials mix",
                url: "https://www.mixcloud.com/Daniel_Bodonyi/bodonyi-dani-caf%C3%A9-at-museum-essentials/",
            },
            {
                name: "Vörösmarty Rádió",
                url: "https://vorosmartyradio.hu/",
            },
        ]}
    >
        <p>
            Az életemben fontos a zene, a zene és a zene. Ja és ne felejtsük ki
            a zenét sem! //TODO: befejezni
        </p>
    </KoloraMemberDisplay>
    <!-- Tagok -->
    <KoloraMemberDisplay
        profilePictureUrl={pfpGergelyEmma}
        name="Gergely Emma - Tacskó"
        tags={["Táncos", "Fehérvári Elissa Steamer", "Plakáttervező"]}
        links={[
            {
                name: "@gizdasiheder DIY-os Insta",
                url: "https://www.instagram.com/gizdasiheder/",
            },
        ]}
    >
        <p>//TODO: befejezni</p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpMeszarosEmese}
        name="Mészáros Emese"
        tags={[
            "Hobbi fotós",
            "Full-time traveller",
            "Real life creative mind crisis",
        ]}
        links={[
            {
                name: "@photos.m.e fotós Insta",
                url: "https://www.instagram.com/photos.m.e/",
            },
        ]}
    >
        <p>
            Hellobello Emese vagyok. Én lennék az aki mindenben szeret segíteni,
            és túl sok dologhoz szeretne érteni egyszerre, így nincs olyan hobbi
            amibe még nem kezdtem bele:))) Ha úgy van fotózok, máskor slamelek,
            otthon pedig előfordul, hogy a zuhany alatt énekelek.. U can come to
            me anytime, tárt karokkal várok mindenkit &lt;&lt;3
        </p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpReszegiRamona}
        name="Reszegi Ramóna - Rami"
        tags={["Énekes"]}
        links={[
            {
                name: "Nedel'a zenekar Insta",
                url: "https://www.instagram.com/nedela_zenekar",
            },
        ]}
    >
        <p>
            Egy életvidám pörgős arc vagyok szeretek szervezni, segíteni ahol
            kell. A spontaneitásnak is megvan a maga pikantériája no de a
            tervezés sem árt néha;) Az én asztalom a koncertek körülötti
            intézkedés ezzel is szeretnék nagyban foglalkozni, keress bátran!
        </p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpSzvorenEszter}
        name="Szvoren Eszter"
        links={[
            {
                name: "Szvoren Eszti - XII. Slam Poetry Országos Bajnokság - Döntő - áldozati bárány",
                url: "https://youtu.be/L44IuZaY-ek?si=gu4J4WxUiAmGzfDH",
            },
            {
                name: "Irodalmi mémek a @krudy_froccs Instán",
                url: "https://www.instagram.com/krudy_froccs/",
            },
        ]}
    >
        <p>
            Írok (főleg próza, slam, műfordítás), zenélek, festek, rajzolok, meg
            minden, ami művészet, asszem, de ne ezt olvasgasd, hanem az <a
                href="https://www.facebook.com/profile.php?id=100094619973134&sk=events"
                target="_blank">eseménynaptárat</a
            >, vagy minimum hazai kortársat, na szevasz.
        </p>
    </KoloraMemberDisplay>
    <!--KoloraMemberDisplay name="Tolnai Zsófi (wip)" /-->
    <!--KoloraMemberDisplay name="Móré Gergő (wip)" /-->
    <KoloraMemberDisplay
        profilePictureUrl={pfpCsaktornyaiAdam}
        name="Csáktornyai Ádám - Csáki"
        tags={["Szoftvermérnök", "Táncos"]}
        links={[
            {
                name: "WholesameWare, a saját márkám",
                url: "https://github.com/WholesomeWare",
            },
            {
                name: "Alkalmazásaim a Play Áruházban",
                url: "https://play.google.com/store/apps/dev?id=8177011913013516936",
            },
        ]}
    >
        <p>
            Mindenki csak Csákiként ismer. A srác, aki furcsa módokon kombinálja
            az informatikát a művészettel. Verselek, programozok, táncolok és
            ezt a weboldalt csinálgatom. Ha bármiben segítség kell, zaklass
            nyugodtan! :D
        </p>
    </KoloraMemberDisplay>

    <Alert icon="information" title="De várj, ez még nem minden!">
        <p>
            Ezen az oldalon nem minden tagunk szerepel. Az ő bemutatkozásaik
            később fognak megjelenni.
        </p>
        <p>
            Akár a tiéd is! Ha szeretnél csatlakozni hozzánk, keress a <a
                href="/contacts">megadott elérhetőségeinken</a
            > (vagy ha épp ott iszogatunk, akkor a Museum Caféban).
        </p>
    </Alert>
</main>
<Footer />

<style>
    main {
        row-gap: calc(var(--spacing) * 2);
    }

    p {
        text-align: justify;
    }
</style>
