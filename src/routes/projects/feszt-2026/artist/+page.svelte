<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
    const { artist } = data;
</script>

<main>
    <div
        class="relative aspect-video flex flex-col justify-end p-4 shadow-teal-600 shadow-lg"
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
    <section class="flex flex-col gap-6 p-6 pb-16 sm:px-16 lg:px-32">
        <p class="glass-card leading-relaxed">{artist.description}</p>
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
</style>
