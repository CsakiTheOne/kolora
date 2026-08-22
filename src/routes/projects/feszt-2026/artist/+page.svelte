<script lang="ts">
    import {
        KoloraFeszt2026,
        type Artist,
    } from "$lib/events/Feszt2026/Feszt2026";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { SvelteURLSearchParams } from "svelte/reactivity";

    let artist = $state<Artist | null>(null);

    onMount(() => {
        const params = new SvelteURLSearchParams(window.location.search);
        const slug = params.get("slug");
        if (slug) {
            artist =
                KoloraFeszt2026.artists.find((a) => a.slug === slug) || null;
        }
    });
</script>

<main>
    {#if !artist}
        <div class="flex flex-col items-center justify-center gap-4 p-6">
            <p>
                <Icon icon="mdi:loading" width={24} class="animate-spin" />
                Betöltés...
            </p>
            <a
                href="/projects/feszt-2026"
                class="glass-card flex items-center justify-center gap-2"
            >
                <Icon icon="mdi:arrow-left" width={24} />
                <span>Vissza a fesztivál oldalára</span>
            </a>
        </div>
    {:else}
        <div
            class="relative aspect-video w-full max-h-92 flex flex-col justify-end p-4 shadow-teal-600 shadow-lg"
        >
            <img
                class="absolute inset-0 w-full h-full object-cover -z-10"
                src={artist.imageUrl}
                alt={artist.name}
            />
            <a
                href="/projects/feszt-2026"
                class="glass-card absolute p-3! top-4 left-4 flex items-center justify-center gap-2"
            >
                <Icon icon="mdi:arrow-left" width={24} />
                <span>Vissza</span>
            </a>
            <h1>{artist.name}</h1>
        </div>
        <section
            class="columns-1 sm:columns-2 xl:columns-3 gap-6 p-6 pb-16 sm:px-16 lg:px-32"
        >
            <p class="glass-card leading-relaxed text-lg mb-6">
                {artist.description}
            </p>

            {#if artist.spotifyUrl && artist.spotifyUrl.includes("open.spotify.com/artist/")}
                <div class="glass-card p-0! mb-6">
                    <iframe
                        title="Spotify Embed"
                        data-testid="embed-iframe"
                        src={artist.spotifyUrl
                            .replace(
                                "open.spotify.com/artist/",
                                "open.spotify.com/embed/artist/",
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

            {#if artist.youtubeUrl}
                {#if artist.youtubeUrl.includes("channel") || artist.youtubeUrl.includes("/@")}
                    <a
                        class="glass-card flex items-center justify-center gap-2 mb-6"
                        href={artist.youtubeUrl}
                        target="_blank"
                    >
                        <Icon icon="mdi:youtube" width={24} />
                        <span>YouTube</span>
                    </a>
                {:else}
                    <div class="glass-card p-0! mb-6">
                        <iframe
                            class="aspect-video"
                            width="100%"
                            src="https://www.youtube.com/embed/{artist.youtubeUrl
                                .split('/')
                                .pop()}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                {/if}
            {/if}

            {#if artist.instagramUrl}
                <a
                    class="glass-card flex items-center justify-center gap-2 mb-6"
                    href={artist.instagramUrl}
                    target="_blank"
                >
                    <Icon icon="mdi:instagram" width={24} />
                    <span>Instagram</span>
                </a>
            {/if}
        </section>
    {/if}
</main>
