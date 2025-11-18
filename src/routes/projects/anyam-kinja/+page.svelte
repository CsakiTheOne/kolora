<script>
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
</script>

<div class="theme-override">
    <main style="min-height: 100svh;">
        <h1>Anyám Kínja</h1>
        <p class="text-small">
            Klein Anna kisfilmje a <a href="/" style="color: inherit;">Kolora Egyesület</a> támogatásával.
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
    </main>
    <Footer />
</div>

<style>
    .theme-override {
        --primary-color: #8d552e !important;
        --primary-variant-color: #d5c3b6 !important;
        --secondary-color: #33214b !important;
        --secondary-variant-color: #6ea6c4 !important;
        --background-color: #d5c3b6 !important;
        --on-primary-color: #d5c3b6 !important;
        --on-primary-variant-color: #33214b !important;
        --on-secondary-color: #d5c3b6 !important;
        --on-secondary-variant-color: #33214b !important;
        --on-background-color: #33214b !important;
        --spacing: 20px !important;
        --corner-radius: 16px !important;
        background-color: var(--background-color);
        color: var(--on-background-color);
    }
</style>
