<script>
    import Footer from "../components/Footer.svelte";

</script>
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
<Footer />

<style>
    main {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 100svh;
    }

    a {
        color: var(--on-primary-color);
    }
</style>