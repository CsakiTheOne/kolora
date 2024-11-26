<script>
    import ThemeManager from "$lib/ThemeManager";
    import Footer from "../components/Footer.svelte";
</script>

<span id="theme-toggle-button" onclick={() => ThemeManager.toggleDarkLight()} class="mdi mdi-brightness-6"></span>
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
            <a href="#about" style="padding: var(--spacing);">
                <span
                    class="mdi mdi-menu-down"
                    style="font-size: 2rem;"
                ></span>
            </a>
        </div>
    </header>
    <main class="container">
        <h2 id="about">Rólunk</h2>
        <h3>Ki, és mit?</h3>
        <p>
            Fehérvári kötődésű fiatalokból álló szervezőcsapatunk célja a
            művészetek népszerűsítése és a kulturális közélet fejlesztése a
            fiatalság körében.
        </p>
        <h3>Hogyan?</h3>
        <p>
            Művészeti / kulturális rendezvényeinken és közösségi média
            profiljainkon rendszeres bemutatkozási és fellépési lehetőséggel
            támogatjuk a helyi feltörekvő művészeket.
        </p>
        <h3>Hol?</h3>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173512.4889738877!2d18.27644473538632!3d47.19441633333276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f793764a78df%3A0x400c4290c1e11f0!2zU3rDqWtlc2ZlaMOpcnbDoXI!5e0!3m2!1sen!2shu!4v1732642994688!5m2!1sen!2shu"
            width="100%"
            height="250"
            style="border: none; border-radius: var(--corner-radius);"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <p>Legyen Székesfehérvár tele élettel!</p>
    </main>
    <div class="container">
        <Footer style="height: 100%;" />
    </div>
</div>

<style>
    #theme-toggle-button {
        position: fixed;
        right: 0;
        top: 0;
        padding: var(--spacing);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 2;
    }

    header {
        background-color: var(--primary-color);
        position: relative;
    }

    .container {
        scroll-snap-align: start;
        width: 100%;
        height: 100svh;
    }

    :global(html) {
        scroll-snap-type: y mandatory;
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

    .adaptive-col-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        flex: 1;
    }

    @media (min-width: 768px) {
        .adaptive-col-row {
            flex-direction: row;
        }
    }
</style>
