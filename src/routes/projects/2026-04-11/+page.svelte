<script lang="ts">
    import ComicPanel from "../../../components/ComicPanel.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import logoInkognito from "$lib/images/logos/inkognito-kollektiva.jpg";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    const stickersByArea = {
        Bodajk: ["bodajk-tav", "g-buszmeg", "hszt", "ltp-buszmeg"],
        "Székesfehérvár, centrum": [
            "buszpu",
            "ciszter",
            "muzi",
            "puhakucko",
            "teleki",
        ],
        "Székesfehérvár, tó és tánc": ["tanchaz", "toparti"],
        "Székesfehérvár, vasút környéke": [
            "deak",
            "nyolcas-muhely",
            "vasut",
            "vpg",
        ],
        "Székesfehérvár, gyűrűn kívül": ["arpad", "vaci"],
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
        isEventSoon = diffInDays <= 7;
    });

    function findAllStickers() {
        const allStickers = Object.values(stickersByArea).flat();
        foundStickers = allStickers;
        localStorage.setItem(
            "event-2026-04-11-found-stickers",
            JSON.stringify(foundStickers),
        );
    }
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
            style="color: var(--kolora-color-red); font-weight: bold;"
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
                {#if stickers.filter( (sticker) => foundStickers.includes(sticker), ).length === 0}
                    <p>
                        Még nem találtál meg egyetlen matricát sem ezen a
                        helyszínen!
                    </p>
                {:else}
                    <ul class="outlined-list panel-yellow">
                        {#each stickers.filter( (sticker) => foundStickers.includes(sticker), ) as sticker}
                            <a href="/projects/2026-04-11/sticker/{sticker}">
                                #{sticker}
                            </a>
                        {/each}
                    </ul>
                {/if}
            {/each}
        {/if}
    </ComicPanel>
    <ComicPanel innerClass="container-column panel-purple">
        <h2>Tanácsok a kereséshez</h2>
        <p>
            A matricák Április 11-e folyamán kerülnek kihelyezésre. Érdemes
            szombat délután kirándulni, hogy minél többet megtalálj!
        </p>
        <p>
            Vannak matricák, amelyek távolabb esnek a többitől. Ezeket más
            napokon is megkeresheted. Mindem matrica kint lesz amíg az időjárás
            vagy egy lelkiismeretes takarító el nem távolítja őket.
        </p>
        <h3>Gyere barátokkal!</h3>
        <p>
            Küldd el a barátaidnak is ezt az oldalt, és induljatok közösen
            kincsvadászatra!
        </p>
        <button
            class="btn"
            style="background-color: var(--kolora-color-base); color: white;"
            onclick={() =>
                navigator.clipboard.writeText(
                    "https://kolora.web.app/projects/2026-04-11/",
                )}
        >
            Oldal linkjének másolása
        </button>
        <a
            class="btn"
            style="background-color: var(--kolora-color-blue); color: white !important;"
            href="https://www.facebook.com/events/1684966296007506/"
            target="_blank">Facebook esemény</a
        >
        <h3>Jó, vannak kategóriák, de mégis hol keressem a matricákat?</h3>
        <p>
            Idén igyekeztünk a középiskolásoknak kedvezni, így a matricák nagy
            része olyan helyeken lesz, ahol ők is gyakran megfordulnak.
            Iskoláik, ingázó útvonaluk, kedvelt találkozóhelyeik környéke.
        </p>
        <a
            href="https://www.facebook.com/events/1408358167265774/"
            target="_blank"
        >
            Amúgy tudtátok, hogy a Nyolcasban Kifordított Buli lesz 10 és 11-én
            este?
        </a>
        <h3>
            Ha valamelyiket nem találom vagy túl messze van, sosem tudom meg,
            hogy mi van rajta?
        </h3>
        <p>
            Nem maradsz le semmiről! Minden matrica tartalmát meg fogjuk osztani
            ezen az oldalon, így ha nem is sikerül megtalálnod egyiket sem,
            akkor is élvezheted a verseket és meglepetéseket!
        </p>
    </ComicPanel>
    <ComicPanel innerClass="flex flex-row items-start gap-4 panel-black">
        <img src={logoInkognito} alt="" style="width: 92px; height: auto;" />
        <p>
            Az idei esemény az <a
                href="https://instagram.com/inkognito_kollektiva"
                target="_blank">INKognitó Kollektíva</a
            >
            támogatásával valósul meg. Lessétek meg őket
            <span onclick={findAllStickers}>is!</span>
        </p>
    </ComicPanel>
    <button
        class="btn"
        style="background-color: var(--kolora-color-red); color: white;"
        onclick={() => {
            const confirmed = confirm(
                "Biztosan törölni szeretnéd a haladásodat? Ezt nem lehet visszavonni!",
            );
            if (!confirmed) return;
            localStorage.removeItem("event-2026-04-11-found-stickers");
            foundStickers = [];
        }}
    >
        Haladás törlése
    </button>
</main>
<Footer />
