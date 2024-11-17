<script>
    import { onMount } from "svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="container">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
            fill="#fff"
            d="M 0 0 V 100 H 100 V 10 C 93 6 81 3 70 3 C 59 3 48 11 37 11 C 25 11 16 0 0 0 Z"
        />
    </svg>
    <main>
        <div class="adaptive-col-row">
            <p>Művészet?</p>
            <p>Kultúra?</p>
            <p>Székesfehérvár?</p>
        </div>
        <h1 id="kolora-title">kolora!</h1>
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

    .container > * {
        position: absolute;
    }

    svg {
        display: block;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 45%;
    }

    svg > path {
        fill: var(--primary-light-color);
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
