<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import ThemeManager from "$lib/ThemeManager";
    import Carousel from "../components/Carousel.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import imgWholesomeWareLogo from "$lib/images/wholesomeware-logo.png";
    import imgKoloraGroupPhoto from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/group photo with cake original.jpg";
    import ProfileShowcase from "../components/ProfileShowcase.svelte";
</script>

<span
    id="theme-toggle-button"
    onclick={() => ThemeManager.toggleDarkLight()}
    class="mdi mdi-brightness-6"
></span>
<div class="page-container">
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
                <p>
                    <a href="#about">
                        <span class="mdi mdi-information"></span>
                        Rólunk
                    </a>
                </p>
                <p>
                    <a href="/timeline">
                        <span class="mdi mdi-timeline"></span>
                        Idővonal
                    </a>
                </p>
                <p>
                    <a href="/contacts">
                        <span class="mdi mdi-at"></span>
                        Elérhetőségek
                    </a>
                </p>
            </div>
        </div>
    </div>
    <div class="container">
        <Header selectedTab="Főoldal" />
        <main>
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

            <h2>Barátaink</h2>
            <h3>Bandák, zenészek, akik koncerteztek nálunk</h3>
            <Carousel
                style="aspect-ratio: 21/9;"
                pages={KoloraLocalDb.musicians.map((musician) => ({
                    title: musician.name,
                    background: `url('${musician.bannerImageUrl}')`,
                    onclick: () => {
                        window.open(musician.websiteUrl, "_blank");
                    },
                }))}
            />
            <p style="text-align: center;">
                <button
                    class="btn"
                    onclick={() => {
                        const songsCount = KoloraLocalDb.musicians.flatMap(
                            (musician) => musician.youtubeSongUrls,
                        ).length;
                        const randomSong = KoloraLocalDb.musicians.flatMap(
                            (musician) => musician.youtubeSongUrls,
                        )[Math.floor(Math.random() * songsCount)];
                        window.open(randomSong, "_blank");
                    }}
                >
                    <span class="mdi mdi-music-note"></span>
                    Hallgassunk random valamit
                </button>
            </p>
            <h3>Kedvenc helyeink</h3>
            <div class="adaptive-col-row">
                <div style="flex: 1;">
                    <ProfileShowcase
                        image="https://scontent.fbud6-4.fna.fbcdn.net/v/t39.30808-6/306000516_526334832831290_5001274354067863986_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yvf99FIYx-kQ7kNvgGzNENr&_nc_zt=23&_nc_ht=scontent.fbud6-4.fna&_nc_gid=AAs0slOi0I1IQ_XZx7-P3BI&oh=00_AYCx0xWinj2JA95MwZKlqMVtni6zw_ehln-JL-YSYt4KGA&oe=675236A3"
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
                            href="https://facebook.com/museumcafeszekesfehervar"
                            target="_blank"
                        >
                            <span class="mdi mdi-facebook"></span>
                        </a>
                    </div>
                </div>
                <div style="flex: 1;">
                    <ProfileShowcase
                        image="https://scontent.fbud6-4.fna.fbcdn.net/v/t39.30808-6/301112437_499281555479521_4260646739517752206_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=o6gKW6Cy7y8Q7kNvgHeCh3e&_nc_zt=23&_nc_ht=scontent.fbud6-4.fna&_nc_gid=AYX3wgZQ-P2Sm_H3yAWoXq-&oh=00_AYBijgVWaQZx2EusvJ5uAqHbl5-rdL9BDB2wivMNHTc2iA&oe=67525C04"
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
                        image="https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/322222919_554215823041860_4998650009849050662_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=smiybflQW7kQ7kNvgHiqBsv&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=A0SgPMiBAk2fMm5dFFG_gKP&oh=00_AYDP6aVWGee0YuU9NU9JoBEcqrP8CJw3PiNO8GYzw57Rdw&oe=674FACDF"
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

    @keyframes growFromBottom {
        0% {
            height: 0%;
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

    h1 {
        font-size: 3.5rem;
        font-weight: 700;
    }

    #group-photo {
        display: block;
        aspect-ratio: 19/9;
        object-fit: cover;
        border-radius: var(--corner-radius);
    }
</style>
