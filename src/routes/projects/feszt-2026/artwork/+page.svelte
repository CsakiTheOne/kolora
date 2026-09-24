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

    let audioEl = $state<HTMLAudioElement | null>(null);
    let isPlaying = $state(false);
    let currentTime = $state(0);
    let duration = $state(0);
    let volume = $state(0.8);
    let isMuted = $state(false);

    function formatTime(seconds: number): string {
        if (!Number.isFinite(seconds) || seconds < 0) {
            return "0:00";
        }
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");
        return `${mins}:${secs}`;
    }

    async function togglePlay(): Promise<void> {
        if (!audioEl) {
            return;
        }
        if (audioEl.paused) {
            await audioEl.play();
        } else {
            audioEl.pause();
        }
    }

    function onTimeUpdate(): void {
        if (!audioEl) {
            return;
        }
        currentTime = audioEl.currentTime;
    }

    function onLoadedMetadata(): void {
        if (!audioEl) {
            return;
        }
        duration = Number.isFinite(audioEl.duration) ? audioEl.duration : 0;
        currentTime = audioEl.currentTime;
        volume = audioEl.volume;
    }

    function seekTo(event: Event): void {
        if (!audioEl) {
            return;
        }
        const target = event.currentTarget as HTMLInputElement;
        const time = Number(target.value);
        audioEl.currentTime = time;
        currentTime = time;
    }

    function setVolume(event: Event): void {
        if (!audioEl) {
            return;
        }
        const target = event.currentTarget as HTMLInputElement;
        const nextVolume = Number(target.value);
        volume = nextVolume;
        audioEl.volume = nextVolume;
        isMuted = nextVolume === 0;
        audioEl.muted = isMuted;
    }

    function toggleMute(): void {
        if (!audioEl) {
            return;
        }
        isMuted = !isMuted;
        audioEl.muted = isMuted;
    }

    function onPlay(): void {
        isPlaying = true;
    }

    function onPause(): void {
        isPlaying = false;
    }

    function onEnded(): void {
        isPlaying = false;
        currentTime = 0;
    }

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
        <div class="glass-card flex flex-col gap-4">
            <p>
                Összesen {KoloraFeszt2026.artworks.filter((a) => foundArtworkSlugs.includes(a.slug)).length} / {KoloraFeszt2026.artworks.length} művet találtál meg!
            </p>
            <meter value="{KoloraFeszt2026.artworks.filter((a) => foundArtworkSlugs.includes(a.slug)).length}" max="{KoloraFeszt2026.artworks.length}"></meter>
        </div>
        <div class="space-y-3">
            {#each KoloraFeszt2026.artists.filter((artist) => KoloraFeszt2026.artworks.some((a) => a.artistSlug === artist.slug)) as artist}
                {@const artistArtworks = KoloraFeszt2026.artworks.filter((a) => a.artistSlug === artist.slug)}
                {@const foundCount = artistArtworks.filter((a) => foundArtworkSlugs.includes(a.slug)).length}
                <div class="glass-card p-3 flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <a href="/projects/feszt-2026/artist?slug={artist.slug}" class="font-medium hover:underline">
                            {artist.name}
                        </a>
                        <span class="text-sm opacity-75">{foundCount} / {artistArtworks.length}</span>
                    </div>
                    <meter value="{foundCount}" max="{artistArtworks.length}"></meter>
                </div>
            {/each}
        </div>
        
        <!--h2>Jutalmak</h2>
        <p class="glass-card">
            Olvass be minden festményt, hogy a végén egy különleges jutalmat
            kapj!
        </p-->
    {:else}
        {#if artist}
            <div class="glass-card flex flex-col gap-1">
                <h2>{artist.name}</h2>
                <p class="text-xs opacity-80">{artist.description}</p>
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
        {#if artwork.resourceUrl}
            <div
                class="glass-card flex flex-row items-center gap-2 text-xs"
            >
                <Icon icon="mdi:music-note" width={24} />
                <div class="bg-white/25 w-px h-8" aria-hidden="true"></div>
                <button
                    type="button"
                    class="glass-card p-2! bg-transparent! text-white rounded-full"
                    onclick={togglePlay}
                    aria-label={isPlaying
                        ? "Lejatszas szuneteltetese"
                        : "Lejatszas"}
                >
                    <Icon
                        icon={isPlaying ? "mdi:pause" : "mdi:play"}
                        width={20}
                    />
                </button>
                <div class="flex flex-col items-start gap-0.5 flex-1">
                    <span class="tabular-nums text-center opacity-80"
                        >{formatTime(currentTime)} / {formatTime(
                            duration,
                        )}</span
                    >
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        class="w-full accent-white"
                        oninput={seekTo}
                        disabled={!duration}
                        aria-label="Lejatszasi pozicio"
                    />
                </div>
                <div class="bg-white/25 w-px h-8" aria-hidden="true"></div>
                <button
                    type="button"
                    class="glass-card p-2! bg-transparent! text-white rounded-full"
                    onclick={toggleMute}
                    aria-label={isMuted ? "Nemitás feloldasa" : "Nemitás"}
                >
                    <Icon
                        icon={isMuted || volume === 0
                            ? "mdi:volume-off"
                            : volume < 0.3
                              ? "mdi:volume-low"
                              : volume < 0.7
                                ? "mdi:volume-medium"
                                : "mdi:volume-high"}
                        width={20}
                    />
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    class="w-16 accent-white"
                    oninput={setVolume}
                    aria-label="Hangero"
                />
                <audio
                    bind:this={audioEl}
                    preload="metadata"
                    controlsList="nodownload"
                    oncontextmenu={(event) => event.preventDefault()}
                    ontimeupdate={onTimeUpdate}
                    onloadedmetadata={onLoadedMetadata}
                    onplay={onPlay}
                    onpause={onPause}
                    onended={onEnded}
                    class="hidden"
                >
                    <source src={artwork.resourceUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
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
