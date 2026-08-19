<script lang="ts">
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

<div class="theme-override">
    <div class="bg-container">
        <div class="blob blob-red"></div>
        <div class="blob blob-cyan"></div>
        <div class="blob blob-purple"></div>
        <div class="noise-overlay"></div>
    </div>
    <main>
        <img
            class="w-full max-h-80 object-cover shadow-teal-600 shadow-lg"
            src={bannerAnimation}
            alt=""
        />
        <section class="flex flex-col gap-6 p-6 sm:px-16 lg:px-32">
            <p
                class="glass-text text-[2.6rem] font-extrabold flex gap-2 items-center justify-center"
            >
                {#if days > 0}
                    {days} nap
                {/if}
                {#if hours > 0 || days > 0}
                    {hours.toString().padStart(2, "0")}:
                {/if}{minutes.toString().padStart(2, "0")}:{seconds
                    .toString()
                    .padStart(2, "0")}
            </p>
            <div class="glass-card flex flex-col gap-4 p-4">
                <p>
                    Ismét jön a Kolora és a Nyolcas Műhely egy közösen
                    szervezett eseménnyel! Érkezik, közeledik, szinte szalad
                    felénk a második Kolora Fesztivál!
                </p>
                <p>
                    Koncertek, interaktív kiállítás, workshop-ok, DJ-k és mennyi
                    minden más!
                </p>
                <p>Fellépők, részletek hamarosan...</p>
            </div>
            <a
                class="glass-card flex items-center justify-center gap-2"
                href="https://www.facebook.com/events/1745352100080025"
                target="_blank"
            >
                <Icon icon="mdi:facebook" width={24} />
                <span>Facebook esemény</span>
            </a>
        </section>
    </main>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap");

    :global(h1, h2, h3, h4, h5, h6) {
        font-family: "League Spartan", sans-serif;
        font-weight: bold;
        text-transform: uppercase;
    }

    .theme-override {
        position: relative;
        /* Primary vibrant accents sampled from the bright red/orange shapes */
        --primary-color: #d12c00 !important;
        --primary-variant-color: #f15a24 !important;

        /* Secondary accents sampled from the bright cyan & deep purple/indigo blobs */
        --secondary-color: #00ffea !important;
        --secondary-variant-color: #271a47 !important;

        /* Base background sampled from the deep teal shadow background */
        --background-color: #0b5d63 !important;

        /* Text/Icon colors tuned for high contrast against primary, secondary, and background */
        --on-primary-color: #ffffff !important;
        --on-primary-variant-color: #271a47 !important;
        --on-secondary-color: #0b5d63 !important;
        --on-secondary-variant-color: #ffffff !important;
        --on-background-color: #ffffff !important;

        color: var(--on-background-color);
    }

    .bg-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        inset: 0;
        overflow: hidden;
        z-index: 0;
        background-color: var(--background-color);
    }

    main {
        width: 100%;
        position: absolute;
        z-index: 10;
    }

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
    }

    .glass-text {
        font-family: "League Spartan", sans-serif;
        color: #00ffea80;
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

    /* Shared blob styles */
    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(30px);
        opacity: 0.85;
        /* Hardware acceleration for smoother animations */
        will-change: transform;
        animation: morph 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Top Red/Orange Area */
    .blob-red {
        top: -10%;
        left: 30%;
        width: 55vw;
        height: 55vw;
        background-color: #d12c00;
        animation-duration: 18s;
    }

    /* Bright Cyan Area */
    .blob-cyan {
        bottom: -15%;
        left: -10%;
        width: 70vw;
        height: 70vw;
        background-color: #0cd4b1;
        animation-duration: 22s;
        animation-delay: -5s;
    }

    /* Dark Purple/Blue Patches */
    .blob-purple {
        top: 40%;
        right: -10%;
        width: 50vw;
        height: 50vw;
        background-color: #271a47;
        animation-duration: 20s;
        animation-direction: alternate-reverse;
    }

    /* The slow, wandering animation */
    @keyframes morph {
        0% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(8%, 12%) scale(1.1);
        }
        66% {
            transform: translate(-10%, 5%) scale(0.9);
        }
        100% {
            transform: translate(12%, -15%) scale(1.05);
        }
    }

    /* The crucial grain/noise texture overlay */
    .noise-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none; /* Allows clicking through to content below */
        z-index: 5;
        opacity: 0.75;
        mix-blend-mode: overlay;
        /* Inline SVG for fractal noise */
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
</style>
