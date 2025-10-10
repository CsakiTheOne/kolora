<script lang="ts">
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import poster from "$lib/images/gallery/2025-kolora-feszt/poster.png";
    import cookie from "$lib/images/utils/cookie.svg?raw";
    import { onMount } from "svelte";

    const events: Array<{
        type:
            | "DJ"
            | "kiállítás"
            | "koncert"
            | "könyvbemutató"
            | "slam"
            | "workshop"
            | "egyéb";
        name: string;
        day: string; // YYYY-MM-DD
        start: string; // HH:MM
        end: string; // HH:MM
    }> = [
        {
            type: "koncert",
            name: "Acoustic Session",
            day: "2025-09-10",
            start: "18:00",
            end: "19:30",
        },
        {
            type: "DJ",
            name: "Electronic Night",
            day: "2025-09-10",
            start: "20:00",
            end: "23:00",
        },
        {
            type: "workshop",
            name: "Fotózás workshp",
            day: "2025-09-10",
            start: "14:00",
            end: "16:00",
        },
        {
            type: "kiállítás",
            name: "Modern Művészet Tárlat",
            day: "2025-09-10",
            start: "10:00",
            end: "22:00",
        },
        {
            type: "könyvbemutató",
            name: "Kortárs Magyar Irodalom",
            day: "2025-09-10",
            start: "16:30",
            end: "17:30",
        },
    ];

    const isEventStarted = new Date() >= new Date("2025-10-18T16:30:00");
    let currentTime = new Date();

    onMount(() => {
        const tickInterval = setInterval(() => {
            currentTime = new Date();
            console.log(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
        }, 1000);

        return () => clearInterval(tickInterval);
    });

    function getCurrentEvents() {
        const now = new Date();
        return events.filter((event) => {
            const start = new Date(`${event.day}T${event.start}`);
            const end = new Date(`${event.day}T${event.end}`);
            return now >= start && now <= end;
        });
    }

    function getNextEvents() {
        const now = new Date();
        return events
            .filter((event) => {
                const start = new Date(`${event.day}T${event.start}`);
                return start > now;
            })
            .sort((a, b) => {
                const startA = new Date(`${a.day}T${a.start}`);
                const startB = new Date(`${b.day}T${b.start}`);
                return startA.getTime() - startB.getTime();
            })
            .slice(0, 3);
    }
</script>

{#if !isEventStarted}
    <div class="cookie-clock" style="--seconds: {currentTime.getSeconds()}; --minutes: {currentTime.getMinutes()}; --hours: {currentTime.getHours()};">
        {@html cookie}
        {@html cookie}
        {@html cookie}
        <main>
            <h1>Kolora Feszt</h1>
            <Countdown targetDateTime={new Date("2025-10-18T16:30:00")} />
            <a
                class="btn"
                href="https://www.facebook.com/events/1461881778384144"
                target="_blank"
            >
                <span class="mdi mdi-facebook"></span>
                Facebook esemény
            </a>
        </main>
    </div>
{:else}
    <main>
        <h1 style="text-align: center;">Kolora Feszt</h1>
        <section>
            <h2>Jelenleg zajló események</h2>
            {#if getCurrentEvents().length > 0}
                <ul>
                    {#each getCurrentEvents() as event}
                        <li>
                            <strong>{event.name}</strong> ({event.type}) - {event.start}
                            - {event.end}
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>Jelenleg nincs zajló esemény.</p>
            {/if}
        </section>
        <section>
            <h2>Következő események</h2>
            {#if getNextEvents().length > 0}
                <ul>
                    {#each getNextEvents() as event}
                        <li>
                            <strong>{event.name}</strong> ({event.type}) - {event.day}
                            {event.start}
                            - {event.end}
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>Nincs több esemény a közeljövőben.</p>
            {/if}
        </section>
    </main>
{/if}
<Footer />

<style>
    :global(body) {
        --primary-color: #8d552e !important;
        --primary-variant-color: #d5c3b6 !important;
        --secondary-color: #33214b !important;
        --secondary-variant-color: #6ea6c4 !important;
        --background-color: #d5c3b6 !important;
        --on-primary-color: #d5c3b6 !important;
        --on-primary-variant-color: #33214b !important;
        --on-secondary-color: #d5c3b6 !important;
        --on-secondary-variant-color: #33214b !important;
        --on-background-color: #33214b !important;
        --spacing: 20px !important;
        --corner-radius: 10px !important;
    }

    .cookie-clock {
        position: relative;
        width: 100vw;
        height: 100svh;
        overflow: hidden;
    }

    .cookie-clock main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    :global(.cookie-clock svg) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        aspect-ratio: 1 / 1;
        z-index: -1;
    }

    :global(.cookie-clock svg:nth-child(1)) {
        height: 90svh;
        :global(path) {
            fill: #33214b;
            transform-origin: center;
            rotate: calc(var(--hours) * -15deg);
        }
    }

    :global(.cookie-clock svg:nth-child(2)) {
        height: 70svh;
        :global(path) {
            fill: #8d552e;
            transform-origin: center;
            rotate: calc(var(--minutes) * -6deg);
        }
    }

    :global(.cookie-clock svg:nth-child(3)) {
        height: 50svh;
        :global(path) {
            fill: #d5c3b6;
            transform-origin: center;
            rotate: calc(var(--seconds) * -1deg);
        }
    }
</style>
