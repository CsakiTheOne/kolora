<script>
    import Footer from "../../components/Footer.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
</script>

<SmallHeader
    path={[{ title: "Galéria", href: "/gallery" }]}
    currentPage="Dokumentáció"
/>
<main>
    <h2>Dokumentáció</h2>
    <p>
        Itt találhatsz leírást és segítséget a webapp technikai részeivel
        kapcsolatban.
    </p>
    <h3>Témák</h3>
    <ul>
        <a href="/docs/editor">
            <li>Szerkesztő használata</li>
        </a>
        <a href="/docs/cyoa">
            <li>Choose your own adventure műfajú művek írása</li>
        </a>
    </ul>
</main>
<Footer />

<style>
    p {
        text-align: justify;
    }

    code {
        padding: var(--spacing);
        background-color: #88888840;
        border-radius: var(--corner-radius);
        font-family: "Courier New", Courier, monospace;
    }
</style>
