<script lang="ts">
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraMemberDisplay from "../../components/KoloraMemberDisplay.svelte";
    import pfpVolgyesiTamas from "$lib/images/members/volgyesi-tamas.jpg";
    import pfpBodonyiDaniel from "$lib/images/members/bodonyi-daniel.jpg";
    import pfpTothNikolett from "$lib/images/members/toth-nikolett.jpg";
    import pfpMeszarosEmese from "$lib/images/members/meszaros-emese.jpg";
    import pfpGergelyEmma from "$lib/images/members/gergely-emma.jpg";
    import pfpReszegiRamona from "$lib/images/members/reszegi-ramona.jpg";
    import pfpSzvorenEszter from "$lib/images/members/szvoren-eszter.jpg";
    import pfpKissBalint from "$lib/images/members/kiss-balint.webp";
    import pfpCsaktornyaiAdam from "$lib/images/members/csaktornyai-adam.jpg";
    import pfpTolnaiZsofi from "$lib/images/members/tolnai-zsofi.jpg";
    import Alert from "../../components/Alert.svelte";
</script>

<Header selectedTab="Tagok" />
<main>
    <h2>Tagok</h2>

    <!-- Elnökség -->
    <KoloraMemberDisplay
        profilePictureUrl={pfpVolgyesiTamas}
        name="Völgyesi Tamás - Toma"
        tags={["Elnök", "Fehérvár. Hardcore. Röviden."]}
    >
        <p>
            10+ év rendezvénytechnika.<br />
            10+ év vendéglátás.<br />
            20+ év rendezvényszervezés.<br />
            30+ év rajongás a művészetért.<br />
            30+ év lokálpatriotizmus.<br />
        </p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpBodonyiDaniel}
        name="Bodonyi Dani"
        tags={["Alelnök", "DJ", "Műsorvezető"]}
    >
        <p>
            Az életem a zene, a zene és a zene. Ja és ne felejtsük ki a zenét
            sem. Rádiós zenei szerkesztőként állandóan követem a könnyűzene
            jelenét és így látom csak igazán, hogy mennyi rejtett erőtartalék
            van a pop zenei felszín alatt. Célom az egyesületben, hogy minél
            többféle zenével és zenésszel ismertessem meg a közönséget,
            elősegítve egy olyan jövőt, ahol nem csak mai sláger meg mai sláger
            között válogathat az ember.
        </p>
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
    <!-- Tagok -->
    <KoloraMemberDisplay
        profilePictureUrl={pfpCsaktornyaiAdam}
        name="Csáki"
        tags={["Szoftvermérnök", "Táncos"]}
        links={[
            {
                name: "WholesameWare, a saját márkám",
                url: "https://instagram.com/WholesomeWareStuff",
            },
            {
                name: "Alkalmazásaim a Play Áruházban",
                url: "https://play.google.com/store/apps/dev?id=8177011913013516936",
            },
        ]}
    >
        <p>
            Csá! -ki. A srác, aki furcsa módokon kombinálja az informatikát a
            művészettel. Verselek, programozok, táncolok és ezt a weboldalt
            szépítgetem. Ha bármiben segítség kell, zaklass nyugodtan! :D
        </p>
    </KoloraMemberDisplay>
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
        <p>
            Rajzolok, írok, festek, plakátokat tervezek - ha valamit ki lehet
            találni és meg lehet valósítani, én ott vagyok. A kreativitás a
            kedvenc játékszerem! És ha hirtelen elsuhan valaki deszkán a
            környéken? Ne aggódj, csak én voltam - épp ihletet kergettem.
        </p>
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
    <!--KoloraMemberDisplay name="Móré Gergő (wip)" /-->
    <KoloraMemberDisplay
        profilePictureUrl={pfpKissBalint}
        name="Piros"
        tags={["Szervező", "Piros"]}
        links={[
            {
                name: "Member of Insanity Crew",
                url: "https://www.instagram.com/insanitycrew_events",
            },
        ]}
    >
        <p>
            Hali! Amikor éppen nem sört csapolok vagy az ország egy random
            pontján épitek egy színpadot, szeretek programokat szervezni és
            kapcsolatokat épiteni csodálatos emberekkel.
        </p>
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        profilePictureUrl={pfpReszegiRamona}
        name="Reszegi Ramóna"
        tags={["Feltörekvő énekes"]}
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
    <KoloraMemberDisplay
    profilePictureUrl={pfpTolnaiZsofi}
    name="Tolnai Zsófi"
    >
        <p>
            Szevasz! Zsófi vagyok. Horgolva néha verset írok, vagy kerámián
            éppen túrázok de egy kávéra mindig nyitott vagyok. Bodajktól a
            Balatonig mindenhol megtaláltok, fél életemben vonatokra várok, és
            most indulnom is kell, bármi van az üzeneted várom! :))
        </p>
    </KoloraMemberDisplay>

    <Alert icon="information" title="De várj, ez még nem minden!">
        <p>
            Akár a te bemutatkozásod is itt lehet! Ha szeretnél csatlakozni
            hozzánk, keress a <a href="/contacts">megadott elérhetőségeinken</a>
            (vagy ha épp ott iszogatunk, akkor a Museum Caféban).
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
