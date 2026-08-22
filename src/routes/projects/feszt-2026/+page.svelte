<script lang="ts">
    import { KoloraFeszt2026 } from "$lib/events/Feszt2026/Feszt2026";
    import bannerAnimation from "$lib/images/events/kolora-feszt-2026/kolora-feszt-2026-banner-video.gif";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);

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
    <section class="flex flex-col gap-6 p-6 pb-16 sm:px-16 lg:px-32">
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
        <div class="columns-1 sm:columns-2 xl:columns-3 gap-6">
            {#each KoloraFeszt2026.artists as artist (artist.slug)}
                <a
                    class="glass-card relative aspect-video flex flex-row items-end justify-between gap-4 p-4 mb-6"
                    href={`/projects/feszt-2026/artist?slug=${artist.slug}`}
                >
                    <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        class="absolute w-full h-full object-cover inset-0 -z-10 opacity-80"
                    />
                    <h3>{artist.name}</h3>
                    <span class="text-sm lowercase!">{artist.category}</span>
                </a>
            {/each}
            <div class="glass-card p-4">
                További fellépők és részletek hamarosan...
            </div>
        </div>
        <a
            class="glass-card flex items-center justify-center gap-2"
            href="https://www.facebook.com/events/1745352100080025"
            target="_blank"
        >
            <Icon icon="mdi:facebook" width={24} />
            <span>Facebook esemény</span>
        </a>
        <a
            class="glass-card flex items-center justify-center gap-2"
            href="https://www.instagram.com/koloraegyesulet"
            target="_blank"
        >
            <Icon icon="mdi:instagram" width={24} />
            <span>Kolora Instagram</span>
        </a>
    </section>
</main>

<style>
    .glass-card {
        background: #271a4760;
        backdrop-filter: blur(20px);
        border-radius: 1.5rem;
        padding: 1rem;
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            0 2px 8px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: all 0.3s ease-in-out;
        overflow: hidden;
    }

    .glass-text {
        font-family: "League Spartan", sans-serif;
        opacity: 0.5;
        color: #00ffea;
        text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.4),
            0 4px 12px rgba(31, 38, 135, 0.3);
    }

    a.glass-card {
        background: #d12c0040;
        color: var(--on-primary-color);
        text-transform: uppercase;
    }

    button.glass-card:hover,
    button.glass-card:active {
        color: var(--on-primary-color);
    }
</style>
