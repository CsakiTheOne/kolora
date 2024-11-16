<script>
    import { onMount } from "svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="container">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#fff" d="M 0 0 V 100 H 100 V 10 C 93 6 81 3 70 3 C 59 3 48 11 37 11 C 25 11 16 0 0 0 Z" />
    </svg>
    <main>
        <p>Művészet?</p>
        <p>Kultúra?</p>
        <p>Székesfehérvár?</p>
        <h1 id="kolora-title">kolora!</h1>
        <p>
            <a href="/timeline">Idővonal</a>
        </p>
        <p>
            <a href="/memories-24-25">2024-25</a>
        </p>
        <p>
            <a href="/contacts">Elérhetőségek</a>
        </p>
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
</style>
