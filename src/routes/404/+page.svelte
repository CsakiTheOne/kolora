<script>

    import Footer from "../../components/Footer.svelte";
import Header from "../../components/Header.svelte";

</script>

<Header />
<main>
    <h1>404</h1>
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
</main>
<Footer />

<style>
    h1 {
        color: var(--primary-color);
        font-size: 5rem;
        font-weight: bold;
        margin: 0;
    }
</style>