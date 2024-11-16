<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
</script>

<Header selectedTab="Galéria" />
<main>
    <h2>Események</h2>
    <p>
        <a href="./2024-evnyito-slam">2024 évnyitó slam</a>
    </p>
    <h2>Közösségi oldalakról</h2>
    <p>
        <a
            href="https://www.facebook.com/profile.php?id=100094619973134&sk=photos_by"
            target="_blank"
        >
            <span class="mdi mdi-facebook"></span>
            Facebook-ra feltöltött képek
        </a>
    </p>
    <p>
        <a href="/contacts">
            <span class="mdi mdi-at"></span>
            Kolora további közösségi profiljai
        </a>
    </p>
</main>
<Footer />
