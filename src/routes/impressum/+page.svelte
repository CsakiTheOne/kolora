<script>
    import Header from "../../components/Header.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    <h1>Impresszum</h1>
    <ComicPanel innerClass="container-column">
        <h2>
            <span class="mdi mdi-xml"></span>
            A weblap fejlesztője és adminisztrátora
        </h2>
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
    </ComicPanel>
    <ComicPanel innerClass="container-column">
        <h2>Felhasznált szellemi alkotások</h2>
        <p>
            A fotókat, videókat és egyéb média tartalmakat a Kolora Egyesület tagjai
            és barátai készítették. E tartalmak a készítők tulajdonát képezik.
        </p>
        <h3>Technológiák</h3>
        <ul>
            <li>
                <a href="https://svelte.dev" target="_blank">SvelteKit</a>
            </li>
            <li>
                <a href="https://firebase.google.com" target="_blank">Firebase</a>
            </li>
            <li>
                <a href="https://pictogrammers.com" target="_blank">Pictogrammers ikonok</a>
            </li>
        </ul>
    </ComicPanel>
</main>
<Footer />
