<script lang="ts">
    import { KoloraFeszt2026 } from "$lib/events/Feszt2026/Feszt2026";
    import rtdb from "$lib/firebase/rtdb";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    let foundArtworkSlugs = $state<string[]>([]);
    let copiedArtworkSlug = $state<string | null>(null);
    let artworkViewCounts = $state<Record<string, number>>({});

    function getArtworkUrl(slug: string): string {
        const path = `/projects/feszt-2026/artwork?slug=${encodeURIComponent(slug)}`;
        if (typeof window === "undefined") {
            return path;
        }

        return new URL(path, window.location.origin).toString();
    }

    function readFoundArtworkSlugs(): void {
        try {
            const raw = localStorage.getItem("foundArtworkSlugs");
            if (!raw || raw === "undefined") {
                foundArtworkSlugs = [];
                return;
            }

            const parsed = JSON.parse(raw);
            const values = Array.isArray(parsed)
                ? parsed
                : typeof parsed === "string"
                  ? [parsed]
                  : Array.isArray(parsed?.slugs)
                    ? parsed.slugs
                    : [];

            foundArtworkSlugs = [...new Set(values.map(String).filter(Boolean))] as string[];
        } catch {
            foundArtworkSlugs = [];
        }
    }

    function persistFoundArtworkSlugs(): void {
        const normalized = [...new Set(foundArtworkSlugs.map(String).filter(Boolean))];
        foundArtworkSlugs = normalized;

        if (normalized.length === 0) {
            localStorage.removeItem("foundArtworkSlugs");
            return;
        }

        localStorage.setItem("foundArtworkSlugs", JSON.stringify(normalized));
    }

    async function copyArtworkUrl(slug: string): Promise<void> {
        const url = getArtworkUrl(slug);

        try {
            await navigator.clipboard.writeText(url);
            copiedArtworkSlug = slug;
            window.setTimeout(() => {
                if (copiedArtworkSlug === slug) {
                    copiedArtworkSlug = null;
                }
            }, 1200);
        } catch (error) {
            console.error("Error copying artwork URL", error);
            alert("A URL másolása nem sikerült. Próbáld újra.");
        }
    }

    function removeFoundArtworkSlug(slug: string): void {
        foundArtworkSlugs = foundArtworkSlugs.filter((item) => item !== slug);
        persistFoundArtworkSlugs();
    }

    function clearFoundArtworkSlugs(): void {
        foundArtworkSlugs = [];
        persistFoundArtworkSlugs();
    }

    async function loadArtworkStats(): Promise<void> {
        const counts: Record<string, number> = {};
        for (const artwork of KoloraFeszt2026.artworks) {
            try {
                counts[artwork.slug] = await rtdb.feszt2026.artworkStats.getViewCount(artwork.slug);
            } catch (error) {
                console.error(`Failed to load view count for ${artwork.slug}:`, error);
                counts[artwork.slug] = 0;
            }
        }
        artworkViewCounts = counts;
    }

    onMount(() => {
        readFoundArtworkSlugs();
        loadArtworkStats();
    });
</script>

<main class="flex flex-col gap-6 p-6 pb-16 sm:px-16 lg:px-32">
    <header class="flex flex-col gap-2">
        <a
            href="/projects/feszt-2026"
            class="glass-card self-start px-3 py-2 flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" width={20} />
            <span>Vissza a fesztiválra</span>
        </a>
        <h1>Kolora Feszt 2026 admin</h1>
    </header>

    <section class="glass-card flex flex-col gap-4 p-4 sm:p-6">
        <div class="flex items-center justify-between gap-3">
            <h2 class="m-0">Művek listája</h2>
            <span class="text-sm opacity-75">
                {KoloraFeszt2026.artworks.length} db
            </span>
        </div>

        <div class="flex flex-col gap-3">
            {#each KoloraFeszt2026.artworks as artwork (artwork.slug)}
                {@const artist = KoloraFeszt2026.artists.find(
                    (item) => item.slug === artwork.artistSlug,
                )}
                <div class="glass-card p-3">
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div class="min-w-0 flex-1">
                            <p class="font-semibold break-all">
                                {artwork.slug}
                            </p>
                            <p class="text-sm opacity-75">
                                {artist?.name ?? artwork.artistSlug}
                                {#if artwork.notes}
                                    · {artwork.notes}
                                {/if}
                            </p>
                            <p class="text-xs opacity-60 mt-1">
                                👁️ {artworkViewCounts[artwork.slug] ?? 0} megtekintés
                            </p>
                        </div>

                        <div class="flex shrink-0 gap-2">
                            <button
                                type="button"
                                class="glass-card px-3 py-2 text-sm"
                                onclick={() => copyArtworkUrl(artwork.slug)}
                            >
                                {copiedArtworkSlug === artwork.slug
                                    ? "Másolva"
                                    : "Másolás"}
                            </button>
                            <a
                                class="glass-card px-3 py-2 text-sm"
                                href={getArtworkUrl(artwork.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Megnyitás
                            </a>
                        </div>
                    </div>

                    <input
                        class="mt-3 w-full rounded-md bg-black/10 px-3 py-2 text-sm text-white outline-none ring-0"
                        value={getArtworkUrl(artwork.slug)}
                        readonly
                    />
                </div>
            {/each}
        </div>
    </section>

    <section class="glass-card flex flex-col gap-4 p-4 sm:p-6">
        <div class="flex items-center justify-between gap-3">
            <h2 class="m-0">Megtalált artwork slugs</h2>
            <button
                type="button"
                class="glass-card px-3 py-2 text-sm"
                onclick={clearFoundArtworkSlugs}
                disabled={foundArtworkSlugs.length === 0}
            >
                Összes törlése
            </button>
        </div>

        {#if foundArtworkSlugs.length === 0}
            <p class="opacity-75">Még nincs mentett megtalált artwork.</p>
        {:else}
            <ul class="flex flex-col gap-2">
                {#each foundArtworkSlugs as slug (slug)}
                    <li class="glass-card flex items-center justify-between gap-3 px-3 py-2">
                        <span class="font-mono break-all">{slug}</span>
                        <button
                            type="button"
                            class="glass-card px-2 py-1 text-xs"
                            onclick={() => removeFoundArtworkSlug(slug)}
                        >
                            Törlés
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
</main>
