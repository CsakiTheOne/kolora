<script lang="ts">
    import ComicPanel from "../../../components/ComicPanel.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import logoInkognito from "$lib/images/logos/inkognito-kollektiva.jpg";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    const stickersByArea = {
        Bodajk: ["bodajk-tav", "hszt"],
        Székesfehérvár: ["buszpu", "puhakucko", "nyolcas-muhely", "muzi"],
    };

    let foundStickers: string[] = $state([]);
    let isEventSoon = $state(false);

    onMount(() => {
        if (!browser) return;

        const storedStickers = localStorage.getItem(
            "event-2026-04-11-found-stickers",
        );
        if (storedStickers) {
            foundStickers = JSON.parse(storedStickers);
        }

        const eventDate = new Date("2026-04-11T00:00:00");
        const now = new Date();
        const diffInDays =
            (eventDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
        isEventSoon = diffInDays <= 4;
    });
</script>

<Header hideButtons />
<main class="container-column">
    <h1>Költészet napi kincsvadászat 2026</h1>
    <p>Esemény indul: Április 11-én</p>
    <p>
        A Magyar Költészet Napja alkalmából matricákat rejtünk el az utcákon,
        amelyekhez telefont érintve verseket és egyéb meglepetéseket találhatsz.
    </p>
    <p>
        Az eseményt a <a
            href="https://www.facebook.com/groups/570212437568903"
            target="_blank">Posztolj verset az utcára!</a
        > mozgalom ihlette.
    </p>
    <ComicPanel innerClass="container-column">
        <h2>Matricák, amiket megtaláltál ezen az eszközön</h2>

        {#if foundStickers.length === 0}
            {#if isEventSoon}
                <p>Még nem találtál meg egyetlen matricát sem!</p>
                {#each Object.entries(stickersByArea) as [area, stickers]}
                    <h3>{area} (0/{stickers.length})</h3>
                {/each}
            {:else}
                <p>
                    A helyszínek hamarosan elérhetőek lesznek, gyere vissza
                    később! Tervezett települések: Székesfehérvár és Bodajk.
                </p>
            {/if}
        {:else}
            {#each Object.entries(stickersByArea) as [area, stickers]}
                <h3>
                    {area} ({stickers.filter((sticker) =>
                        foundStickers.includes(sticker),
                    ).length}/{stickers.length})
                </h3>
                <ul class="outlined-list panel-yellow">
                    {#each stickers as sticker}
                        <a href="/projects/2026-04-11/sticker/{sticker}">
                            #{sticker}
                        </a>
                    {/each}
                </ul>
            {/each}
        {/if}
    </ComicPanel>
    <ComicPanel innerClass="static-row panel-black">
        <img src={logoInkognito} alt="" style="width: 92px; height: auto;" />
        <p>
            Az idei esemény az <a
                href="https://instagram.com/inkognito_kollektiva"
                target="_blank">INKognitó Kollektíva</a
            > támogatásával valósul meg. Lessétek meg őket is!
        </p>
    </ComicPanel>
</main>
<Footer />
