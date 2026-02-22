<script>
    import Card from "../../components/stickers-legacy/Card.svelte";
</script>

<main>
    <h1>Költészet napi kincsvadászat</h1>

    <p>
        2024. Április 11-étől ezeken a helyeken találhatóak a matricák. Ezen az
        oldalon mindegyik megtekinthető.
    </p>

    <Card style="margin: var(--spacing);">
        <ul>
            <a href="./bus-station"><li>Buszpályaudvar</li></a>
            <a href="./cinema-city"
                ><li>Alba Pláza, Cinema City</li></a
            >
            <a href="./dancehouse"><li>Táncház</li></a>
            <a href="./main-street"><li>Fő utca</li></a>
            <a href="./museum-cafe"><li>Museum Café</li></a>
            <a href="./train-station"><li>Vasútállomás</li></a>
            <a href="./vpg"><li>Vasvári Pál Gimnázium</li></a>
            <a href="./workshop-eight"><li>Igéző</li></a>
        </ul>
    </Card>
    <Card style="margin: var(--spacing);">
        <ul>
            <a href="./test"><li>Teszt oldal</li></a>
        </ul>
    </Card>
</main>

<style>
    main > * {
        margin: var(--spacing);
        text-align: left;
    }

    li {
        padding: var(--spacing);
        list-style: none;
        border-bottom: 1px solid var(--background-color);
    }

    a {
        font-weight: bold;
    }
</style>
