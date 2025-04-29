<script lang="ts">
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import KoloraMemberDisplay from "../../components/KoloraMemberDisplay.svelte";
    import pfpTothNikolett from "$lib/images/members/toth-nikolett.webp";
    import pfpMeszarosEmese from "$lib/images/members/meszaros-emese.jpg";
    import UserManager from "$lib/UserManager.svelte";
    import { ROLES } from "$lib/model/KoloraUser";

    let isLoading = $state(true);

    $effect(() => {
        const isReady = UserManager.instance.isLoaded;
        const isLoggedIn = UserManager.instance.isLoggedIn;
        const isMember =
            isReady &&
            isLoggedIn &&
            UserManager.instance.koloraUser!!.roles.includes(
                ROLES.KOLORA_MEMBER,
            );

        isLoading = !isMember;
    });
</script>

<Header selectedTab="Tagok" />
<main>
    <h2>Tagok</h2>

    {#if isLoading}
        <p>Oldal készítés alatt, ezért csak a Kolora tagok számára elérhető.</p>
        <p>
            Ha Kolora tag vagy, de mégis ezt látod, akkor ellenőrizd, hogy be
            vagy-e jelentkezve. Ha így sem működik, szólj Csákinak.
        </p>
    {:else}
        <!-- Elnökség -->
        <KoloraMemberDisplay name="Völgyesi Tamás - Toma (wip)" tags={["Elnök"]} />
        <KoloraMemberDisplay
            profilePictureUrl={pfpTothNikolett}
            name="Tóth Nikolett - Niki"
            tags={["Alelnök", "Író", "Felderítő"]}
        >
            <p>
                Csókok bókok! Én lennék az egyik alelnöke ennek a csoda
                csapatnak. Ha kell bármit kiderítek bárkiről/bármiről. Ha elkap
                az ihlet írni szoktam, novellákat vagy monológokat. Bármikor
                vevő vagyok egy bulira vagy csak egy beszélgetésre is. Tárt
                karokkal és egy hatalmas öleléssel várok mindenkit ebbe a
                különleges kis társaságba. Légy bármilyen különc itt otthonodra
                fogsz találni. &lt;3
            </p>
        </KoloraMemberDisplay>
        <KoloraMemberDisplay
            name="Bodonyi Dániel (wip)"
            tags={["Alelnök", "DJ"]}
            links={[
                {
                    name: "Café at Museum Essentials mix",
                    url: "https://www.mixcloud.com/Daniel_Bodonyi/bodonyi-dani-caf%C3%A9-at-museum-essentials/",
                },
            ]}
        />
        <!-- Tagok -->
        <KoloraMemberDisplay
            name="Gergely Emma (wip)"
            tags={["Táncos", "Fehérvári Elissa Steamer"]}
            links={[{
                name: "@gizdasiheder DIY-os Insta",
                url: "https://www.instagram.com/gizdasiheder/",
            }]}
        />
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
                Hellobello Emese vagyok. Én lennék az aki mindenben szeret
                segíteni, és túl sok dologhoz szeretne érteni egyszerre, így
                nincs olyan hobbi amibe még nem kezdtem bele:))) Ha úgy van
                fotózok, máskor slamelek, otthon pedig előfordul, hogy a zuhany
                alatt énekelek.. U can come to me anytime, tárt karokkal várok
                mindenkit &lt;&lt;3
            </p>
        </KoloraMemberDisplay>
        <KoloraMemberDisplay
            name="Reszegi Ramóna (wip)"
            tags={["Énekes"]}
            links={[
                {
                    name: "Nedel'a zenekar",
                    url: "https://linktr.ee/nedela_zenekar",
                },
            ]}
        />
        <KoloraMemberDisplay
            name="Szvoren Eszter (wip)"
            links={[
                {
                    name: "Irodalmi mémek a @krudy_froccs Instán",
                    url: "https://www.instagram.com/krudy_froccs/",
                },
            ]}
        />
        <KoloraMemberDisplay name="Tolnai Zsófi (wip)" />
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
                Mindenki csak Csákiként ismer. A srác, aki furcsa módokon
                kombinálja az informatikát a művészettel. Verselek, programozok,
                táncolok. Ezt a weboldalt és a költészet napján a kincsvadászat
                eseményeket raktam össze. Ha érdekelnek az ilyesmi dolgok,
                zaklass nyugodtan! :D
            </p>
        </KoloraMemberDisplay>
    {/if}
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
