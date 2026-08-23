<script lang="ts">
    import {
        KoloraFeszt2026,
        type Artist,
        type Artwork,
    } from "$lib/events/Feszt2026/Feszt2026";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { SvelteURLSearchParams } from "svelte/reactivity";

    let foundArtworkSlugs = $state<string[]>([]);
    let artwork = $state<Artwork | null>(null);
    let artist = $state<Artist | null>(null);

    onMount(() => {
        foundArtworkSlugs = localStorage.getItem("foundArtworkSlugs")
            ? JSON.parse(localStorage.getItem("foundArtworkSlugs")!)
            : [];

        const params = new SvelteURLSearchParams(window.location.search);
        const slug = params.get("slug");
        if (slug) {
            localStorage.setItem(
                "foundArtworkSlugs",
                JSON.stringify([...foundArtworkSlugs, slug]),
            );
            artwork =
                KoloraFeszt2026.artworks.find((a) => a.slug === slug) || null;
        }
        if (artwork) {
            artist =
                KoloraFeszt2026.artists.find(
                    (a) => a.slug === artwork?.artistSlug,
                ) || null;
        }
    });
</script>

<main class="flex flex-col gap-6 p-6 pb-16 sm:px-16 lg:px-32">
    {#if !artwork}
        <a
            href="/projects/feszt-2026"
            class="glass-card p-3! self-start flex items-center justify-center gap-2"
        >
            <Icon icon="mdi:arrow-left" width={24} />
            <span>Vissza</span>
        </a>
        <h1>Hogyan működik a kiállítás?</h1>
        <div class="glass-card flex flex-col gap-4">
            <p>
                Néhány festménynél odaérintheted a telefonod egy matricához,
                hogy többet megtudj a művekről. Például, ha egy alkotást egy
                zene ihletett, telefont odatéve meghallgathatod a dalt, ami
                inspirálta azt a festményt.
            </p>
            <p class="text-sm opacity-75">
                Ehhez az aktivitáshoz internetkapcsolat és legalább iPhone 7
                vagy NFC kompatibilis Android eszköz szükséges.
            </p>
        </div>
        <h2>Megtalált művek</h2>
        <p class="glass-card">
            A kiállítás még zárva van. Térj vissza ide az esemény alatt, hogy
            számon tartsd a megtalált festményeket.
        </p>
        <h2>Jutalmak</h2>
        <p class="glass-card">
            Olvass be minden festményt, hogy a végén egy különleges jutalmat
            kapj!
        </p>
    {:else}
        {#if artist}
            <div class="glass-card flex flex-col gap-4">
                <h2>{artist.name}</h2>
                <p class="text-sm opacity-75">{artist.description}</p>
                {#if artist.instagramUrl}
                    <a
                        class="flex flex-row items-center justify-center gap-2 self-end"
                        href={artist.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon icon="mdi:instagram" width={24} />
                        Instagram
                    </a>
                {/if}
            </div>
        {/if}
        <h1 class="text-center">{artwork.notes}</h1>
        {#if artwork.spotifyUrl}
            <div class="glass-card p-0!">
                <iframe
                    title="Spotify Embed"
                    data-testid="embed-iframe"
                    style="border-radius:12px"
                    src={artwork.spotifyUrl
                        .replace(
                            "https://open.spotify.com/track/",
                            "https://open.spotify.com/embed/track/",
                        )
                        .replace("?si=", "?utm_source=generator&si=")}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
        {/if}
        {#if artwork.youtubeUrl}
            <div class="glass-card p-0!">
                <iframe
                    class="aspect-video"
                    width="100%"
                    src={artwork.youtubeUrl.replace(
                        "https://youtu.be/",
                        "https://www.youtube.com/embed/",
                    )}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </div>
        {/if}
        {#if artwork.ytMusicUrl}
            <a
                class="glass-card bg-red-700/50! flex flex-row items-center justify-center gap-2"
                href={artwork.ytMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon icon="simple-icons:youtubemusic" width={24} />
                Hallgasd meg YT Music-on
            </a>
        {/if}
        <hr />
        <button
            class="glass-card p-3! flex items-center justify-center gap-2"
            onclick={() => {
                artwork = null;
                artist = null;
            }}
        >
            <Icon icon="material-symbols:wall-art" width={24} />
            <span>Interaktív kiállítás</span>
        </button>
        <a
            href="/projects/feszt-2026"
            class="glass-card p-3! flex items-center justify-center gap-2"
        >
            <Icon icon="mdi:arrow-left" width={24} />
            <span>Vissza az esemény főoldalára</span>
        </a>
    {/if}
</main>
