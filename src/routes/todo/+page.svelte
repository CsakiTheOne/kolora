<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
</script>

<Header selectedTab="Kiadás előtti teendők" />
<main>
    <p>
        A kiadás előtti teendők listája. Csáki ezeket szeretné befejezni mielőtt
        az oldalt publikálná.
    </p>

    <h2>Idővonal</h2>
    <div class="todo-item">
        <input type="checkbox" disabled />
        Leírások elkészítése az eseményekhez
    </div>
    <div class="todo-item">
        <input type="checkbox" disabled />
        Több kép, videó és média
    </div>

    <h2>Extra jóságok</h2>
    <div class="todo-item">
        <input type="checkbox" disabled />
        Tagok és résztvevők kedvenc emlékei az évből
    </div>

    <h2>Utolsó simítás</h2>
    <div class="todo-item">
        <input type="checkbox" disabled />
        Ezt az oldalt eltűntetni
    </div>
</main>
<Footer />

<style>
    .todo-item {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: var(--spacing);
    }

    .todo-item input {
        scale: 1.4;
    }
</style>
