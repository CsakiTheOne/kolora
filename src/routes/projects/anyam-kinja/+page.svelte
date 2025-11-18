<script>
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
</script>

<div class="theme-override">
    <main style="min-height: 100svh;">
        <h1>Anyám Kínja</h1>
        <p class="text-small">
            Klein Anna kisfilmje a <a href="/" style="color: inherit;"
                >Kolora Egyesület</a
            > támogatásával.
        </p>
        <p>
            Mit jelent gondoskodni valakiről, aki már nem a régi?<br />
            Mit jelent még egyszer, utoljára gyereknek lenni egy felnőtt testben?<br
            />
            Mit jelent elengedni azt, akit egész életünkben kapaszkodóként tartottunk?
        </p>
        <p>
            A készülő kisfilmünk egy fiatal lány és beteg édesanyja utolsó közös
            napját mutatja be. Egyetlen otthoni térben játszódik, mégis
            mindannyiunk legmélyebb félelmeit és legőszintébb szeretetét idézi
            meg. A történetben nincs nagy dráma — csak két ember, akik már csak
            apró gesztusokkal tudnak kapcsolódni egymáshoz. Egy fésülés, egy
            mosoly, egy régi gyerekkori emlék… majd az elengedés csendje.
        </p>
        <p>
            A film a gondoskodó generáció hangja: azoké, akik tanulmányaik,
            munkájuk, saját életük mellett próbálják szeretetből pótolni, amit
            egy egész rendszer nem tud megadni. A stáb fiatal, lelkes, teljes
            szívvel dolgozik költségvetés nélkül, de maximális odaadással.
        </p>
        <p>
            A Te segítségeddel viszont egy olyan filmet készíthetünk, amely
            méltóan beszél azokról, akik csendben hordozzák mások életét.
        </p>
        <div class="movie-placeholder">
            <p>Hamarosan...</p>
        </div>
    </main>
    <Footer />
</div>

<style>
    .theme-override {
        --primary-color: #000000 !important;
        --primary-variant-color: #333333 !important;
        --secondary-color: #666666 !important;
        --secondary-variant-color: #999999 !important;
        --background-color: #ffffff !important;
        --on-primary-color: #ffffff !important;
        --on-primary-variant-color: #ffffff !important;
        --on-secondary-color: #ffffff !important;
        --on-secondary-variant-color: #000000 !important;
        --on-background-color: #000000 !important;
        --spacing: 24px !important;
        --corner-radius: 4px !important;
        background-color: var(--background-color);
        color: var(--on-background-color);
    }

    h1 {
        font-weight: 700;
        color: #000000;
        letter-spacing: -0.5px;
        text-transform: uppercase;
    }

    main > p {
        background-color: #000000;
        color: #ffffff;
        padding: calc(var(--spacing) * .5);
        box-shadow: 4px 4px 0px #cccccc;
    }

    .movie-placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        border: 3px solid #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: italic;
        color: #000000;
        background: #f5f5f5;
        font-weight: 500;
    }
</style>
