<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
</script>

<Header selectedTab="Projektek" />
<main>
    <ul class="outlined-list">
        <button onclick={() => alert("6b c3 ad 6e 6a 61")}>
            <span class="mdi mdi-help"></span>
            61 6e 79 c3 a1 6d
        </button>
        <a href="/projects/feszt-2025">
            <p>
                <span class="mdi mdi-party-popper"></span>
                2025 Kolora Feszt
            </p>
            <p class="text-small">
                Az első összművészeti fesztiválunk, ahol környékbeli alkotók és
                előadók mutatkoztak be Székesfehérváron. Bandák, kiállítás, DJ-k
                és workshop-ok.
            </p>
        </a>
        <a href="/stickers">
            <p>
                <span class="mdi mdi-nfc-variant"></span>
                2024 Költészet napi kincsvadászat
            </p>
            <p class="text-small">
                A Magyar Költészet Napja alkalmából matricákat rejtettünk el
                Székesfehérváron, amelyekhez telefont érintve verseket és egyéb
                meglepetéseket lehetett találni.
            </p>
        </a>
    </ul>
</main>
<Footer />
