<script>
    import Alert from "../../components/Alert.svelte";
    import Footer from "../../components/Footer.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
</script>

<SmallHeader currentPage="Eszközök" />
<main>
    <h2>Eszközök és resource-ok Kolora tagoknak</h2>
    <a href="./design-system">
        <button class="btn">
            <span class="mdi mdi-palette"></span>
            Design rendszer
        </button>
    </a>
    <a href="./post-generator">
        <button class="btn">
            <span class="mdi mdi-post"></span>
            Poszt készítő
        </button>
    </a>
    <h3>Linkek</h3>
    <a href="https://studio.youtube.com/" target="_blank">
        <button class="btn">
            <span class="mdi mdi-youtube-studio"></span>
            YouTube Studio
        </button>
    </a>
    <Alert icon="help">
        <p>
            Hiányzik innen valami? Ha van olyan eszköz, link, vagy bármi, ami
            szerinted hasznos lehet a Kolora tagoknak, szólj Csákinak és
            iderakja.
        </p>
    </Alert>
</main>
<Footer />

<style>
    button {
        width: 100%;
    }
</style>
