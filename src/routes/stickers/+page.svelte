<script>
    import Card from "../../components/Card.svelte";
</script>

<main>
    <h1>Költészet napi kincsvadászat</h1>

    <p>
        2024. Április 11-étől ezeken a helyeken találhatóak a matricák. Ezen az
        oldalon mindegyik megtekinthető.
    </p>

    <Card style="margin: var(--spacing);">
        <ul>
            <a href="./stickers/bus-station.html"><li>Buszpályaudvar</li></a>
            <a href="./stickers/cinema-city.html"
                ><li>Alba Pláza, Cinema City</li></a
            >
            <a href="./stickers/dancehouse.html"><li>Táncház</li></a>
            <a href="./stickers/main-street.html"><li>Fő utca</li></a>
            <a href="./stickers/museum-cafe.html"><li>Museum Café</li></a>
            <a href="./stickers/train-station.html"><li>Vasútállomás</li></a>
            <a href="./stickers/vpg.html"><li>Vasvári Pál Gimnázium</li></a>
            <a href="./stickers/workshop-eight.html"><li>Igéző</li></a>
        </ul>
    </Card>
    <Card style="margin: var(--spacing);">
        <ul>
            <a href="./stickers/test.html"><li>Teszt oldal</li></a>
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
