<script lang="ts">
    import { KoloraFeszt2026 } from "$lib/events/Feszt2026/Feszt2026";
    import bannerAnimation from "$lib/images/events/kolora-feszt-2026/kolora-feszt-2026-banner-video.gif";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);

    let selectedDay = $state(24);

    function updateCountdown() {
        const now = new Date().getTime();
        const eventDate = new Date("2026-09-24T00:00:00").getTime();
        const distance = eventDate - now;

        if (distance > 0) {
            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
    }

    onMount(() => {
        const isSeptember = new Date().getMonth() === 8;
        const dayOfMonth = new Date().getDate();
        if (isSeptember && [24, 25, 26].includes(dayOfMonth))
            selectedDay = dayOfMonth;

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    });
</script>

<main>
    <div class="relative">
        <img
            class="w-full max-h-80 object-cover shadow-teal-600 shadow-lg"
            src={bannerAnimation}
            alt=""
        />
        <button
            class="glass-card absolute bottom-0 right-4 sm:right-16 lg:right-32 translate-y-[50%]"
            onclick={() => {
                // Share current page URL via share API
                const url = window.location.href;
                if (navigator.share) {
                    navigator
                        .share({
                            title: "Kolora Feszt 2026",
                            text: "Nézd meg a Kolora Feszt 2026 eseményét!",
                            url,
                        })
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing", error));
                } else {
                    navigator.clipboard
                        .writeText(url)
                        .then(() => alert("URL copied to clipboard!"))
                        .catch((error) =>
                            console.log("Error copying URL", error),
                        );
                }
            }}
        >
            <Icon icon="mdi:share-variant" width={24} />
        </button>
    </div>
    <section class="flex flex-col gap-6 p-6 pb-16 sm:px-16 lg:px-32 2xl:px-64">
        <p
            class="glass-text text-[3.6rem] text-center font-extrabold flex gap-2 items-center justify-center"
            style="line-height: 4rem;"
        >
            {#if days > 0}
                {days} nap<br />
            {/if}
            {#if hours > 0 || days > 0}
                {hours.toString().padStart(2, "0")}:
            {/if}{minutes.toString().padStart(2, "0")}:{seconds
                .toString()
                .padStart(2, "0")}
        </p>
        <div class="glass-card flex flex-col gap-4 p-4">
            <p>
                Ismét jön a Kolora és a Nyolcas Műhely egy közösen szervezett
                eseménnyel! Érkezik, közeledik, szinte szalad felénk a második
                Kolora Fesztivál!
            </p>
            <p>
                Koncertek, interaktív kiállítás, workshop-ok, DJ-k és mennyi
                minden más!
            </p>
        </div>

        <div class="w-full flex flex-row items-center justify-center gap-4">
            <a
                class="glass-card flex items-center justify-center gap-2"
                href="https://www.tixa.hu/kolora-feszt-20260924"
                target="_blank"
            >
                <Icon icon="mdi:ticket" width={24} />
            </a>
            <a
                class="glass-card flex items-center justify-center gap-2"
                href="https://www.facebook.com/events/1745352100080025"
                target="_blank"
            >
                <Icon icon="mdi:facebook" width={24} />
            </a>
            <a
                class="glass-card flex items-center justify-center gap-2"
                href="https://www.instagram.com/koloraegyesulet"
                target="_blank"
            >
                <Icon icon="mdi:instagram" width={24} />
            </a>
        </div>

        <h2>Lineup</h2>

        <div class="flex flex-row items-center gap-4">
            <button
                class="glass-card flex-0 min-w-16 lg:flex-1"
                class:flex-1={selectedDay === 24}
                onclick={() => (selectedDay = 24)}
            >
                <p class="line-clamp-1 text-ellipsis">
                    <span>24.</span>
                    <span
                        class="hidden lg:inline"
                        class:inline={selectedDay === 24}>Csütörtök</span
                    >
                </p>
            </button>
            <button
                class="glass-card flex-0 min-w-16 lg:flex-1"
                class:flex-1={selectedDay === 25}
                onclick={() => (selectedDay = 25)}
            >
                <p class="line-clamp-1 text-ellipsis">
                    <span>25.</span>
                    <span
                        class="hidden lg:inline"
                        class:inline={selectedDay === 25}>Péntek</span
                    >
                </p>
            </button>
            <button
                class="glass-card flex-0 min-w-16 lg:flex-1"
                class:flex-1={selectedDay === 26}
                onclick={() => (selectedDay = 26)}
            >
                <p class="line-clamp-1 text-ellipsis">
                    <span>26.</span>
                    <span
                        class="hidden lg:inline"
                        class:inline={selectedDay === 26}>Szombat</span
                    >
                </p>
            </button>
        </div>

        <!-- Large screens: show all days in 3 columns -->
        <div class="hidden lg:grid grid-cols-3 gap-6">
            {#each [24, 25, 26] as day (day)}
                {@const dayLineup = KoloraFeszt2026.lineup.filter(
                    (item) => item.day === day,
                )}
                {@const visibleArtists = dayLineup
                    .map((item) =>
                        KoloraFeszt2026.artists.find(
                            (a) => a.slug === item.artistSlug,
                        ),
                    )
                    .filter(
                        (a): a is Exclude<typeof a, undefined> =>
                            a !== undefined && a.hidden !== true,
                    )}
                {@const hiddenArtists = dayLineup
                    .map((item) =>
                        KoloraFeszt2026.artists.find(
                            (a) => a.slug === item.artistSlug,
                        ),
                    )
                    .filter(
                        (a): a is Exclude<typeof a, undefined> =>
                            a !== undefined && a.hidden === true,
                    )}
                {#if visibleArtists.length > 0 || hiddenArtists.length > 0}
                    <div class="flex flex-col">
                        <div class="flex flex-col gap-6">
                            {#each visibleArtists as artist (artist.slug)}
                                <a
                                    class="glass-card relative flex flex-row items-end justify-between gap-4 p-4"
                                    class:aspect-video={artist.imageUrl}
                                    href={`/projects/feszt-2026/artist?slug=${artist.slug}`}
                                    style={`view-transition-name: feszt-2026-artist-card-${artist.slug};`}
                                >
                                    {#if artist.imageUrl}
                                        <img
                                            src={artist.imageUrl}
                                            alt={artist.name}
                                            class="absolute w-full h-full object-cover inset-0 -z-10 opacity-80"
                                            style={`view-transition-name: feszt-2026-artist-image-${artist.slug};`}
                                        />
                                    {/if}
                                    <h3
                                        style={`view-transition-name: feszt-2026-artist-name-${artist.slug};`}
                                    >
                                        {artist.name}
                                    </h3>
                                    <span
                                        class="text-sm lowercase!"
                                        style={`view-transition-name: feszt-2026-artist-category-${artist.slug};`}
                                    >
                                        {artist.category}
                                    </span>
                                </a>
                            {/each}
                            {#each hiddenArtists as artist (artist.slug)}
                                <div
                                    class="glass-card relative flex flex-col items-center justify-center gap-2 p-4 opacity-60"
                                >
                                    <span class="text-2xl">❓</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <!-- Small screens: show only selected day -->
        <div class="lg:hidden">
            {#if true}
                {@const dayLineup = KoloraFeszt2026.lineup.filter(
                    (item) => item.day === selectedDay,
                )}
                {@const visibleArtists = dayLineup
                    .map((item) =>
                        KoloraFeszt2026.artists.find(
                            (a) => a.slug === item.artistSlug,
                        ),
                    )
                    .filter(
                        (a): a is Exclude<typeof a, undefined> =>
                            a !== undefined && a.hidden !== true,
                    )}
                {@const hiddenArtists = dayLineup
                    .map((item) =>
                        KoloraFeszt2026.artists.find(
                            (a) => a.slug === item.artistSlug,
                        ),
                    )
                    .filter(
                        (a): a is Exclude<typeof a, undefined> =>
                            a !== undefined && a.hidden === true,
                    )}
                <div class="columns-1 gap-6">
                    {#each visibleArtists as artist (artist.slug)}
                        <a
                            class="glass-card relative flex flex-row items-end justify-between gap-4 p-4 mb-6"
                            class:aspect-video={artist.imageUrl}
                            href={`/projects/feszt-2026/artist?slug=${artist.slug}`}
                            style={`view-transition-name: feszt-2026-artist-card-${artist.slug};`}
                        >
                            {#if artist.imageUrl}
                                <img
                                    src={artist.imageUrl}
                                    alt={artist.name}
                                    class="absolute w-full h-full object-cover inset-0 -z-10 opacity-80"
                                    style={`view-transition-name: feszt-2026-artist-image-${artist.slug};`}
                                />
                            {/if}
                            <h3
                                style={`view-transition-name: feszt-2026-artist-name-${artist.slug};`}
                            >
                                {artist.name}
                            </h3>
                            <span
                                class="text-sm lowercase!"
                                style={`view-transition-name: feszt-2026-artist-category-${artist.slug};`}
                            >
                                {artist.category}
                            </span>
                        </a>
                    {/each}
                    {#each hiddenArtists as artist (artist.slug)}
                        <div
                            class="glass-card relative flex flex-col items-center justify-center gap-2 p-4 mb-6 opacity-60"
                        >
                            <span class="text-2xl">❓</span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </section>
</main>
