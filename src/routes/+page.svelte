<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import ThemeManager from "$lib/ThemeManager";
    import Carousel from "../components/Carousel.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
</script>

<span
    id="theme-toggle-button"
    onclick={() => ThemeManager.toggleDarkLight()}
    class="mdi mdi-brightness-6"
></span>
<div class="page-container">
    <header class="container">
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
    </header>
    <div class="container">
        <Header selectedTab="Főoldal" />
        <main>
            <h2 id="about">Rólunk</h2>
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
            <h3>Hol?</h3>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173512.4889738877!2d18.27644473538632!3d47.19441633333276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f793764a78df%3A0x400c4290c1e11f0!2zU3rDqWtlc2ZlaMOpcnbDoXI!5e0!3m2!1sen!2shu!4v1732642994688!5m2!1sen!2shu"
                width="100%"
                height="350"
                style="border: none; border-radius: var(--corner-radius);"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <p>Legyen Székesfehérvár tele élettel!</p>

            <h2>Barátaink</h2>
            <p>Kedvenc bandáink, helyeink és más partnereink.</p>
            <Carousel
                style="aspect-ratio: 21/9;"
                pages={[
                    {
                        title: "Loophia",
                        background:
                            "url('https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/448202815_7694743990612810_7172244232801033659_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eOAn1PrGYJ0Q7kNvgEoV-wS&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=AG_Dl8w7NLs5QrIOZBB0vmv&oh=00_AYBZ7tvZartmTGRLWUim3Yq-jQHGoiahp75V681KKmjHlQ&oe=674F6D0F')",
                        onclick: () => {
                            window.open("https://linktr.ee/loophia", "_blank");
                        },
                    },
                    {
                        title: "Nedel'a",
                        background:
                            "url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/449056267_122152105730222063_647686779152558141_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Ldnc5FSPPiUQ7kNvgGoQtTr&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AwxgZD7bmo1ilJb2cK764Dt&oh=00_AYDybf9B_BkOnbtM_vTEDKMQ9zcqjXFljfaDDRA-VqVTyg&oe=674F5026')",
                        onclick: () => {
                            window.open(
                                "https://linktr.ee/nedela_zenekar",
                                "_blank",
                            );
                        },
                    },
                    {
                        background:
                            "url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/306000516_526334832831290_5001274354067863986_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=expRgXJMORsQ7kNvgHPyY8d&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AXxbDFn9LaHpecyedAPGoO7&oh=00_AYCZtxEHda8fuAi09CWW1xNkyQFeemh6mDpfztl66bhPzQ&oe=674F5B63')",
                        onclick: () => {
                            window.open(
                                "https://www.facebook.com/museumcafeszekesfehervar",
                                "_blank",
                            );
                        },
                    },
                    {
                        background:
                            "url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/301112437_499281555479521_4260646739517752206_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6AL8q7Q59j4Q7kNvgF6q6-l&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AqrFvYPdToGdVmYGEGqBLp-&oh=00_AYAHBgiV-f6FH7vOW6mbo9ySytgtU_Nvczm0c-nCDgyA7A&oe=674F80C4')",
                        onclick: () => {
                            window.open(
                                "https://www.facebook.com/nyolcasmuhely",
                                "_blank",
                            );
                        },
                    },
                    {
                        background:
                            "url('https://github.com/WholesomeWare/.github/blob/main/assets/header_title.jpg?raw=true')",
                        onclick: () => {
                            window.open(
                                "https://github.com/WholesomeWare",
                                "_blank",
                            );
                        },
                    },
                ]}
            />
            <p style="text-align: center;">
                <button
                    class="elevated-button"
                    onclick={() => {
                        const songsCount =
                            KoloraLocalDb.bandSongs2024rewind.length;
                        const randomSong =
                            KoloraLocalDb.bandSongs2024rewind[
                                Math.floor(Math.random() * songsCount)
                            ];
                        window.open(randomSong, "_blank");
                    }}
                >
                    <span class="mdi mdi-music-note"></span>
                    Hallgassunk valamit
                </button>
                <button
                    class="icon-button"
                    onclick={() => {
                        alert(
                            "Egy random zene egy ranndom bandától, akikkel együtt dolgoztunk.",
                        );
                    }}
                    aria-label="Segítség"
                >
                    <span class="mdi mdi-help"></span>
                </button>
            </p>
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

    header {
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

    header > * {
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

    header > div {
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
</style>
