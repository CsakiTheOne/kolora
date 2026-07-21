<script>
    import Header from "../../components/Header.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Header />
<main class="container-column">
    <h1>Doom</h1>

    <ComicPanel
        innerClass="container-column panel-red items-center"
        outerStyle="width: 100%;"
    >
        <p>
            The game is embedded below. Click into the game window first so it
            captures keyboard input.
        </p>
        <p>
            Controls: arrow keys to move, <b>Ctrl</b> to fire, <b>Space</b> to use/open.
        </p>

        <iframe
            style="max-width: 640px; width: 100%; aspect-ratio: 64 / 48; border: 4px solid black;"
            src="https://archive.org/embed/doom_dos"
            title="Playable Doom"
            loading="lazy"
            allowfullscreen
        ></iframe>

        <p>
            <a
                class="btn"
                href="https://archive.org/details/doom_dos"
                target="_blank"
                rel="noreferrer"
            >
                Open in new tab
            </a>
        </p>
    </ComicPanel>
</main>
<Footer />

<style>
    main {
        align-items: center;
    }

    main > * {
        width: min(1100px, 100%);
    }

    .doom-frame-container {
        border: 4px solid black;
        background-color: black;
        overflow: hidden;
    }

    .doom-frame-container iframe {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 10;
        min-height: 560px;
        border: 0;
    }

    @media (max-width: 700px) {
        .doom-frame-container iframe {
            min-height: 380px;
        }
    }
</style>
