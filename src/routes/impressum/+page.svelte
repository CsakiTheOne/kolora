<script>
    import Alert from "../../components/Alert.svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
</script>

<Header />
<main>
    <h2>Impresszum</h2>
    <Alert icon="xml" title="A weblap fejlesztője és adminisztrátora">
        <p><strong>Csáktornyai Ádám (Csáki)</strong></p>
        <p>Elérhetőségek:</p>
        <p>
            <a href="mailto:jockahun@gmail.com" target="_blank">
                <span class="mdi mdi-email"></span>
                Email: jockahun@gmail.com
            </a>
        </p>
        <p>
            <a href="https://instagram.com/wholesomewarestuff" target="_blank">
                <span class="mdi mdi-instagram"></span>
                Instagram: @wholesomewarestuff
            </a>
        </p>
        <p>
            <a href="https://m.me/CsakiTheOne" target="_blank">
                <span class="mdi mdi-facebook-messenger"></span>
                Messenger: Csáki
            </a>
        </p>
        <p>
            Ha bármi probléma vagy kérdés van az oldallal kapcsolatban, keress
            bátran!
        </p>
    </Alert>
    <h2>Felhasznált szellemi alkotások</h2>
    <p>A fotókat a Kolora Egyesület tagjai és barátai készítették.</p>
    <h3>Technológiák</h3>
    <ul>
        <a href="https://svelte.dev" target="_blank">
            <li>SvelteKit</li>
        </a>
        <a href="https://firebase.google.com" target="_blank">
            <li>Firebase</li>
        </a>
        <a href="https://pictogrammers.com" target="_blank">
            <li>Pictogrammers ikonok</li>
        </a>
    </ul>
</main>
<Footer />
