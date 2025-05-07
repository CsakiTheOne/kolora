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
</script>

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
                Fehérvári kötődésű fiatalokból álló szervezőcsapatunk célja a
                művészetek népszerűsítése és a kulturális közélet fejlesztése a
                fiatalság körében.
            </p>
        </div>
        <div>
            <h3 style="margin-bottom: calc(var(--spacing) / 2);">Hogyan?</h3>
            <p>
                Művészeti / kulturális rendezvényeinken és közösségi média
                profiljainkon rendszeres bemutatkozási és fellépési lehetőséggel
                támogatjuk a helyi feltörekvő művészeket.
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
    <ul class="outlined-list">
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
                A Múzeumok éjszakáján és egyben Kolora első szülinapján a Museum
                Caféban
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
        <div style="flex: 1; text-align: center;">
            <img
                src={imgMuseumCafeLogo}
                alt="Museum Café"
                style="width: 100%; max-width: 300px; aspect-ratio: 5/4; object-fit: cover; border-radius: var(--corner-radius);"
            />
            <h4 style="padding: calc(var(--spacing) / 2);">
                Museum Café
            </h4>
            <div style="font-size: 1.2rem;">
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
        <div style="flex: 1; text-align: center;">
            <img
                src={imgNyolcasMuhelyLogo}
                alt="Nyolcas Műhely"
                style="width: 100%; max-width: 300px; aspect-ratio: 5/4; object-fit: cover; border-radius: var(--corner-radius);"
            />
            <h4 style="padding: calc(var(--spacing) / 2);">
                Nyolcas Műhely
            </h4>
            <div style="font-size: 1.2rem;">
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
                <a href="https://facebook.com/nyolcasmuhely" target="_blank">
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
    </div>
</main>
<Footer />

<style>
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
