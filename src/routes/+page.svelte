<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import ThemeManager from "$lib/ThemeManager";
    import Carousel from "../components/Carousel.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import imgKoloraGroupPhoto from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/group photo with cake original.jpg";
    import imgMuseumCafeLogo from "$lib/images/logos/museum-cafe.jpg";
    import imgNyolcasMuhelyLogo from "$lib/images/logos/nyolcas-muhely.jpg";
    import imgBrotondProductionsLogo from "$lib/images/logos/brotond-productions.jpg";
    import imgWholesomeWareLogo from "$lib/images/logos/wholesomeware.png";
    import ProfileShowcase from "../components/ProfileShowcase.svelte";
    import { onMount } from "svelte";
    import Divider from "../components/Divider.svelte";

    const enableHeroSection = false;
</script>

<div class="page-container">
    {#if enableHeroSection}
        <div class="container large-header">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    fill="#fff"
                    d="M0 0C16 0 26 10 37 10 48 10 59 3 70 3s23 3 30 7v90H0V0Z"
                />
            </svg>
            <div>
                <div class="adaptive-col-row">
                    <p>Művészet?</p>
                    <p>Kultúra?</p>
                    <p>Székesfehérvár?</p>
                </div>
                <a href="/">
                    <h1 id="kolora-title">kolora!</h1>
                </a>
                <div class="adaptive-col-row">
                    <p
                        class="link"
                        onclick={() =>
                            document
                                .getElementById("about")
                                ?.scrollIntoView({ behavior: "smooth" })}
                    >
                        <span class="mdi mdi-information"></span>
                        Rólunk
                    </p>
                    <p>
                        <a href="/timeline">
                            <span class="mdi mdi-timeline"></span>
                            Idővonal
                        </a>
                    </p>
                    <p>
                        <a href="/codes">
                            <span class="mdi mdi-form-textbox-password"></span>
                            Kódok
                        </a>
                    </p>
                    <p>
                        <a href="/contacts">
                            <span class="mdi mdi-at"></span>
                            Elérhetőségek
                        </a>
                    </p>
                </div>
                <!--button
                    class="splash-bottom-notification"
                    onclick={() => {
                        document
                            ?.getElementById("homepage")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    <span class="mdi mdi-chevron-double-down"></span><br />
                    Slam poetry verseny + open mic
                </button-->
            </div>
        </div>
    {/if}
    <div class="container">
        <Header selectedTab="Főoldal" />
        <main id="homepage">
            <h2>Magyar Költészet Napja 2025</h2>
            <p>
                Idén is versek kerülnek az utcákra és Csáki is kitett pár
                apróságot: Üzenőfalakat, ahol saját költeményeket és egyéb
                gondolatokat hagyhattok egymásnak. Nézzetek rá az új <a
                    href="/feeds">Üzenőfalak</a
                > oldalra.
            </p>
            <p>
                Ihlette a <a
                    href="https://www.facebook.com/groups/570212437568903/"
                    target="_blank">Posztolj verset az utcára!</a
                > mozgalom.
            </p>
            <Divider />
            <h2 id="about">Rólunk</h2>
            <img id="group-photo" src={imgKoloraGroupPhoto} alt="" />
            <div class="adaptive-col-row" style="align-items: start;">
                <div>
                    <h3 style="margin-bottom: calc(var(--spacing) / 2);">
                        Ki, és mit?
                    </h3>
                    <p>
                        Fehérvári kötődésű fiatalokból álló szervezőcsapatunk
                        célja a művészetek népszerűsítése és a kulturális
                        közélet fejlesztése a fiatalság körében.
                    </p>
                </div>
                <div>
                    <h3 style="margin-bottom: calc(var(--spacing) / 2);">
                        Hogyan?
                    </h3>
                    <p>
                        Művészeti / kulturális rendezvényeinken és közösségi
                        média profiljainkon rendszeres bemutatkozási és
                        fellépési lehetőséggel támogatjuk a helyi feltörekvő
                        művészeket.
                    </p>
                </div>
            </div>
            <div>
                <h3 style="margin-bottom: calc(var(--spacing) / 2);">
                    Miket csináltunk eddig?
                </h3>
                <p>
                    <a href="/timeline">
                        <button class="btn">
                            <span class="mdi mdi-timeline"></span>
                            2024 visszatekintés
                        </button>
                    </a>
                </p>
            </div>
            <Divider />
            <h2>Barátaink</h2>
            <h3>Bandák, zenészek, akik koncerteztek nálunk</h3>
            <Carousel
                style="aspect-ratio: 21/9;"
                pages={KoloraLocalDb.musicians.map((musician) => ({
                    title: musician.name,
                    background: `url('${musician.bannerImageUrl}')`,
                    onclick: () => {
                        if (musician.websiteUrl) {
                            window.open(musician.websiteUrl, "_blank");
                        }
                    },
                }))}
            />
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
                    <span class="mdi mdi-music-note"></span>
                    Hallgassunk random valamit
                </button>
            </p>
            <h3>Slammer-ek, akik szavaltak a színpadainkon</h3>
            <ul>
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
                        A Múzeumok éjszakáján és egyben Kolora első szülinapján
                        a Museum Caféban
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
                    <li>
                        2023-ban, az első rendezvényünkön, az Akusztikus esten
                    </li>
                </a>
            </ul>
            <p style="text-align: center;">
                <button
                    class="btn"
                    onclick={() => {
                        const videosCount = KoloraLocalDb.slamPerformances.length;
                        const randomVideo =
                            KoloraLocalDb.slamPerformances[
                                Math.floor(Math.random() * videosCount)
                            ];
                        window.open(randomVideo, "_blank");
                    }}
                >
                    <span class="mdi mdi-dice-3"></span>
                    Slam roulette
                </button>
            </p>
            <h3>Kedvenc helyeink</h3>
            <div class="adaptive-col-row">
                <div style="flex: 1;">
                    <ProfileShowcase
                        image={imgMuseumCafeLogo}
                        name="Museum Café"
                    />
                    <div style="text-align: center; font-size: 1.2rem;">
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
                <div style="flex: 1;">
                    <ProfileShowcase
                        image={imgNyolcasMuhelyLogo}
                        name="Nyolcas Műhely"
                    />
                    <div style="text-align: center; font-size: 1.2rem;">
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
            <h3>További partnereink</h3>
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
                    href="https://github.com/WholesomeWare"
                    target="_blank"
                    style="flex: 1;"
                >
                    <ProfileShowcase
                        image={imgWholesomeWareLogo}
                        name="WholesomeWare"
                        title="Informatikai támogatás"
                    />
                </a>
            </div>
        </main>
        <Footer />
    </div>
</div>

<style>
    #theme-toggle-button {
        position: absolute;
        right: 0;
        top: 0;
        padding: var(--spacing);
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--on-primary-color);
        z-index: 2;
    }

    .large-header {
        background-color: var(--primary-color);
        position: relative;
    }

    .container {
        scroll-snap-align: start;
        width: 100%;
        min-height: 100svh;
    }

    :global(html) {
        scroll-snap-type: y proximity;
    }

    :global(body.theme-dark) header {
        background-color: var(--background-color);
    }

    .large-header > * {
        position: absolute;
    }

    svg {
        display: block;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 48%;
        animation: growFromBottom 2s ease-out;
    }

    svg > path {
        fill: var(--primary-variant-color);
        transition:
            height 2s,
            d 2s;
    }

    :global(body.theme-dark) svg > path {
        fill: var(--background-color);
    }

    @keyframes growFromBottom {
        0% {
            height: 40%;
        }
        100% {
            height: 48%;
        }
    }

    .large-header > div {
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: var(--on-primary-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .splash-bottom-notification {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: calc(var(--spacing) / 2);
        border: none;
        background: none;
        color: var(--on-primary-variant-color);
        text-align: center;
        cursor: pointer;
    }

    :global(body.theme-dark) .splash-bottom-notification {
        color: var(--on-background-color);
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 700;
    }

    #group-photo {
        display: block;
        aspect-ratio: 19/9;
        object-fit: cover;
        border-radius: var(--corner-radius);
        width: 100%;
        max-height: 100%;
    }

    a > span.mdi {
        padding: calc(var(--spacing) / 4);
        font-size: 1.3rem;
    }
</style>
