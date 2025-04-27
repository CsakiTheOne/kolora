<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraMemberDisplay from "../../components/KoloraMemberDisplay.svelte";
</script>

<Header selectedTab="Tagok" />
<main>
    <h2>Tagok</h2>

    <!-- Elnökség -->
    <KoloraMemberDisplay name="Völgyesi Tamás - Toma" tags={["Elnök"]} tagsColor="var(--primary-color)" />
    <KoloraMemberDisplay name="Tóth Nikolett" tags={["Alelnök"]} tagsColor="var(--primary-color)" />
    <KoloraMemberDisplay
        name="Bodonyi Dániel"
        tags={["Alelnök"]}
        tagsColor="var(--primary-color)"
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
        bio="Mindenki csak Csákiként ismer. A srác, aki furcsa módokon kombinálja az informatikát a művészettel. Slam-elek, programozok, táncolok, egyszóval alkotok. Ezt a weboldalt és a költészet napján a kincsvadászat eseményeket raktam össze. Ha érdekelnek az ilyesmi dolgok, zaklass nyugodtan! :D"
        links={[
            {
                name: "WholesameWare, a saját márkám",
                url: "https://github.com/WholesomeWare",
            },
        ]}
    />
</main>
<Footer />
