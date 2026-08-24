<script lang="ts">
    import { onMount } from "svelte";
    import "../../../Feszt2026.css";

    const { children } = $props();

    let windowWidth = $state(
        typeof window !== "undefined" ? window.innerWidth : 1200,
    );
    let windowHeight = $state(
        typeof window !== "undefined" ? window.innerHeight : 800,
    );

    function generateNoiseOverlaySvg(): string {
        const w = windowWidth / 2;
        const h = windowHeight / 2;
        const svg = `data:image/svg+xml,%3Csvg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;
        return `url("${svg}")`;
    }

    let noiseBackgroundImage = $state(generateNoiseOverlaySvg());

    function handleResize() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        noiseBackgroundImage = generateNoiseOverlaySvg();
    }

    onMount(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
</script>

<div class="theme-override">
    <div class="bg-container">
        <div class="blob blob-red"></div>
        <div class="blob blob-cyan"></div>
        <div class="blob blob-purple"></div>
        <div
            class="noise-overlay"
            style="background-image: {noiseBackgroundImage}"
        ></div>
    </div>
    {@render children()}
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap");

    :global(body) {
        background-color: #0b5d63;
    }

    :global(main) {
        width: 100%;
        position: relative;
        z-index: 10;
    }

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

    /* Shared blob styles */
    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(50px);
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
    }
</style>
