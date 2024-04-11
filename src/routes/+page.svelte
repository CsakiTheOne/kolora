<script>
    import Quest from "../components/Quest.svelte";
</script>

<main>
    <h1>Kincsvadász küldetések</h1>

    <h2>Elsődleges</h2>

    <Quest title="Találd meg a matricákat" />

    <div>
        <input type="number" min="0" max="8"> / 8
    </div>

    <Quest title="Kövesd az egyik matricán található Facebook oldalt, hogy ne maradj le egy nyári buliról" />

    <h2>Másodlagos</h2>

    <Quest title='Játsz egy "choose your own adventure" elbeszélő költeményt (csak Android-on)' />

    <Quest title="Találd meg a Portal 2 easter-egg-et" />

    <Quest title="Fárasztó a sok séta, igyál valamit" />
</main>

<style>
    main > * {
        margin: var(--spacing);
        text-align: left;
    }

    input[type="number"] {
        width: 64px;
        height: 24px;
        background-color: transparent;
        border: 2px solid var(--primary-color);
        border-radius: 4px;
        outline: none;
        text-align: center;
    }
</style>
