<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import Carousel from "../components/Carousel.svelte";
    import ComicPanel from "../components/ComicPanel.svelte";
    import Divider from "../components/Divider.svelte";
    import Header from "../components/Header.svelte";
    import imgMuseumCafeLogo from "$lib/images/logos/museum-cafe.jpg";
    import imgNyolcasMuhelyLogo from "$lib/images/logos/nyolcas-muhely.jpg";
    import ProfileShowcase from "../components/ProfileShowcase.svelte";
    import imgBrotondProductionsLogo from "$lib/images/logos/brotond-productions.jpg";
    import imgInkognitoKollektivaLogo from "$lib/images/logos/inkognito-kollektiva.jpg";
    import Footer from "../components/Footer.svelte";
    import ComicPanelWithBackground from "../components/ComicPanelWithBackground.svelte";
    import headerImage from "$lib/images/header.webp";
</script>

<Header selectedPageIndex={0} />
<main class="container-column">
    <ComicPanelWithBackground innerClass="container-column panel-base" backgroundUrl={headerImage}>
        <h2>Rólunk</h2>
        <div class="adaptive-col-row" style="align-items: start;">
            <div
                style="flex: 1; display: flex; flex-direction: column; gap: 1rem;"
            >
                <h3>Ki, és mit?</h3>
                <p>
                    <a href="/members"
                        >Fehérvári kötődésű fiatalokból álló szervezőcsapatunk</a
                    > célja a művészetek népszerűsítése és a kulturális közélet fejlesztése
                    a fiatalság körében.
                </p>
            </div>
            <div
                style="flex: 1; display: flex; flex-direction: column; gap: 1rem;"
            >
                <h3>Hogyan?</h3>
                <p>
                    Művészeti / kulturális rendezvényeinken és közösségi média
                    profiljainkon rendszeres bemutatkozási és fellépési
                    lehetőséggel támogatjuk a helyi feltörekvő művészeket.
                </p>
            </div>
            <div
                style="flex: 1; display: flex; flex-direction: column; gap: 1rem;"
            >
                <h3>Miket csináltunk eddig?</h3>
                <p>
                    <a href="/timeline">
                        <span class="mdi mdi-timeline"></span>
                        2024 visszatekintés
                    </a>
                    <a
                        href="https://instagram.com/koloraegyesulet"
                        target="_blank"
                    >
                        <span class="mdi mdi-instagram"></span>
                        Kolora Insta
                    </a>
                    <a
                        href="https://www.youtube.com/@koloraegyesulet"
                        target="_blank"
                    >
                        <span class="mdi mdi-youtube"></span>
                        Kolora YouTube
                    </a>
                </p>
            </div>
        </div>
    </ComicPanelWithBackground>
    <div class="static-row">
        <ComicPanel
            innerClass="container-column panel-blue"
            outerStyle="width: 100%;"
        >
            <h2>Kedvenc helyeink</h2>
            <div class="adaptive-col-row">
                <div
                    style="flex: 1; text-align: center; justify-items: center;"
                >
                    <ProfileShowcase
                        image={imgMuseumCafeLogo}
                        name="Museum Café"
                    />
                    <div
                        style="font-size: 1.2rem; width: calc(100% - var(--spacing));"
                        class="button-group"
                    >
                        <a
                            href="https://maps.app.goo.gl/nR419Mg19cqQWBeu8"
                            target="_blank"
                        >
                            <span class="mdi mdi-map-marker"></span>
                        </a>
                        <a
                            href="https://www.instagram.com/museumcafe_szekesfehervar"
                            target="_blank"
                        >
                            <span class="mdi mdi-instagram"></span>
                        </a>
                        <a
                            href="https://facebook.com/museumcafeszekesfehervar"
                            target="_blank"
                        >
                            <span class="mdi mdi-facebook"></span>
                        </a>
                    </div>
                </div>
                <div
                    style="flex: 1; text-align: center; justify-items: center;"
                >
                    <ProfileShowcase
                        image={imgNyolcasMuhelyLogo}
                        name="Nyolcas Műhely"
                    />
                    <div
                        style="font-size: 1.2rem; width: calc(100% - var(--spacing));"
                        class="button-group"
                    >
                        <a
                            href="https://maps.app.goo.gl/G797KP5NgJ8qD3Jv9"
                            target="_blank"
                        >
                            <span class="mdi mdi-map-marker"></span>
                        </a>
                        <a
                            href="https://www.instagram.com/nyolcasmuhelyundergroundclub"
                            target="_blank"
                        >
                            <span class="mdi mdi-instagram"></span>
                        </a>
                        <a
                            href="https://facebook.com/nyolcasmuhely"
                            target="_blank"
                        >
                            <span class="mdi mdi-facebook"></span>
                        </a>
                    </div>
                </div>
            </div>
        </ComicPanel>
        <ComicPanel
            innerClass="container-column panel-yellow"
            outerStyle="width: 100%;"
        >
            <h2>Barátaink</h2>
            <div class="adaptive-col-row">
                <a
                    href="https://www.instagram.com/brotond_productions/"
                    target="_blank"
                    style="flex: 1;"
                >
                    <ProfileShowcase
                        image={imgBrotondProductionsLogo}
                        name="Brotond Productions"
                        title="Aki kivágja az unalmas részeket"
                    />
                </a>
                <a
                    href="https://www.instagram.com/inkognito_kollektiva/"
                    target="_blank"
                    style="flex: 1;"
                >
                    <ProfileShowcase
                        image={imgInkognitoKollektivaLogo}
                        name="INKognitó Kollektíva"
                        title="Barátaink a Hang-Szín-Tér művészeti iskolából"
                    />
                </a>
            </div>
        </ComicPanel>
    </div>
    <ComicPanel innerClass="container-column panel-red">
        <h2>Művészek</h2>
        <h3>Bandák, zenészek, akik koncerteztek nálunk</h3>
        <div style="display: flex; justify-content: center;">
            <Carousel
                style="max-height: 250px; width: 100%;"
                pages={KoloraLocalDb.musicians.map((musician) => ({
                    title: musician.name,
                    background: musician.bannerImageUrl
                        ? `url('${musician.bannerImageUrl}')`
                        : undefined,
                    onclick: () => {
                        if (musician.websiteUrl) {
                            window.open(musician.websiteUrl, "_blank");
                        }
                    },
                    fallbackContent: `<span class='mdi mdi-${musician.websiteUrl ? "instagram" : "music-note"}' style='font-size: 4rem;'></span>`,
                }))}
            />
        </div>
        <p style="text-align: center;">
            <button
                class="btn"
                onclick={() => {
                    const songsCount = KoloraLocalDb.musicians.flatMap(
                        (musician) => musician.songUrls,
                    ).length;
                    const randomSong = KoloraLocalDb.musicians.flatMap(
                        (musician) => musician.songUrls,
                    )[Math.floor(Math.random() * songsCount)];
                    window.open(randomSong, "_blank");
                }}
            >
                Hallgassunk random valamit
            </button>
        </p>
        <h3>Slammer-ek, akik szavaltak a színpadainkon</h3>
        <ul class="outlined-list" style="margin-left: 1rem;">
            <a
                href="https://youtube.com/playlist?list=PLxSO3Z5lw-xNuIBuUYZcll7J_jcdIZZ43&si=ZgSwslL_bq3PGCae"
                target="_blank"
            >
                <li>2025 Februárban a Nyolcas Műhelyben</li>
            </a>
            <a
                href="https://youtube.com/playlist?list=PLxSO3Z5lw-xPDOFOpHZzC-rmqEI-ACJQN&si=TqNCBi9R7jrkTCA6"
                target="_blank"
            >
                <li>
                    A Múzeumok éjszakáján és egyben Kolora első szülinapján a
                    Museum Caféban
                </li>
            </a>
            <a
                href="https://youtube.com/playlist?list=PLxSO3Z5lw-xMmwMn8J0c9Y0gX22sGSfW8&si=29xPCtemxvLsO1Xb"
                target="_blank"
            >
                <li>2024 Márciusban a Nyolcas Műhelyben</li>
            </a>
            <a
                href="https://youtu.be/zbqaZEAduWE?si=Ktoj_Yxrbc9rw6yV"
                target="_blank"
            >
                <li>2023-ban, az első rendezvényünkön, az Akusztikus esten</li>
            </a>
        </ul>
    </ComicPanel>
</main>
<Footer />
