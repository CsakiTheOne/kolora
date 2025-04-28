<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraMemberDisplay from "../../components/KoloraMemberDisplay.svelte";
    import pfpTothNikolett from "$lib/images/members/toth-nikolett.webp";
</script>

<Header selectedTab="Tagok" />
<main>
    <h2>Tagok</h2>

    <!-- Elnökség -->
    <KoloraMemberDisplay name="Völgyesi Tamás - Toma" tags={["Elnök"]} />
    <KoloraMemberDisplay
        profilePictureUrl={pfpTothNikolett}
        name="Tóth Nikolett - Niki"
        tags={["Alelnök", "Író", "Felderítő"]}
    >
        Csókok bókok! Én lennék az egyik alelnöke ennek a csoda csapatnak. Ha
        kell bármit kiderítek bárkiről/bármiről. Ha elkap az ihlet írni szoktam,
        novellákat vagy monológokat. Bármikor vevő vagyok egy bulira vagy csak
        egy beszélgetésre is. Tárt karokkal és egy hatalmas öleléssel várok
        mindenkit ebbe a különleges kis társaságba. Légy bármilyen különc itt
        otthonodra fogsz találni. &lt;3
    </KoloraMemberDisplay>
    <KoloraMemberDisplay
        name="Bodonyi Dániel"
        tags={["Alelnök"]}
        links={[
            {
                name: "Café at Museum Essentials mix",
                url: "https://www.mixcloud.com/Daniel_Bodonyi/bodonyi-dani-caf%C3%A9-at-museum-essentials/",
            },
        ]}
    />
    <!-- Tagok -->
    <KoloraMemberDisplay name="Gergely Emma" tags={["Táncos"]} />
    <KoloraMemberDisplay
        name="Mészáros Emese"
        tags={["Fotós"]}
        links={[
            {
                name: "@photos.m.e fotós Insta",
                url: "https://www.instagram.com/photos.m.e/",
            },
        ]}
    />
    <KoloraMemberDisplay
        name="Reszegi Ramóna"
        tags={["Énekes"]}
        links={[
            {
                name: "Nedel'a zenekar",
                url: "https://linktr.ee/nedela_zenekar",
            },
        ]}
    />
    <KoloraMemberDisplay
        name="Szvoren Eszter"
        links={[
            {
                name: "Irodalmi mémek a @krudy_froccs Instagramon",
                url: "https://www.instagram.com/krudy_froccs/",
            },
        ]}
    />
    <KoloraMemberDisplay name="Tolnai Zsófi" />
    <KoloraMemberDisplay
        name="Csáktornyai Ádám - Csáki"
        tags={["Infós", "Táncos"]}
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
            az informatikát a művészettel. Verselek, programozok, táncolok. Ezt
            a weboldalt és a költészet napján a kincsvadászat eseményeket raktam
            össze. Ha érdekelnek az ilyesmi dolgok, zaklass nyugodtan! :D
        </p>
    </KoloraMemberDisplay>
</main>
<Footer />
