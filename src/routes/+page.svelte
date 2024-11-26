<script>
    import Footer from "../components/Footer.svelte";
</script>

<div class="container">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
            fill="#fff"
            d="M0 0C16 0 25 13 37 13 48 13 59 3 70 3s23 3 30 7v90H0V0Z"
        />
    </svg>
    <main>
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
                <a href="/about">
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
    </main>
</div>
<Footer />

<style>
    .container {
        background-color: var(--primary-color);
        position: relative;
        width: 100%;
        height: 100svh;
    }

    :global(body.theme-dark) .container {
        background-color: var(--background-color);
    }

    .container > * {
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
        transition: height 2s, d 2s;
    }

    @keyframes growFromBottom {
        0% {
            height: 0%;
        }
        100% {
            height: 48%;
        }
    }

    main {
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
