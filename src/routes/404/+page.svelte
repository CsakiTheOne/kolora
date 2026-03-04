<script>
    import Header from "../../components/Header.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    <h1>404</h1>
    <ComicPanel innerClass="container-column">
        <h2>Ez az oldal nem található</h2>
        <p>
            <a href="/">
                <span class="mdi mdi-arrow-left"></span>
                Vissza a főoldalra
            </a>
        </p>
        <p>
            <a href="https://m.me/CsakiTheOne" target="_blank">
                <span class="mdi mdi-facebook-messenger"></span>
                Beszólás az oldal fejlesztőjének
            </a>
        </p>
    </ComicPanel>
</main>
<Footer />
