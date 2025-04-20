<script>
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
</main>
<Footer />

<style>
    button {
        width: 100%;
    }
</style>
