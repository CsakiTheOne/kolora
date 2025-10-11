<script lang="ts">
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import poster from "$lib/images/gallery/2025-kolora-feszt/poster.png";
    import cookie from "$lib/images/utils/cookie-clock.svg?raw";
    import { onMount } from "svelte";
    import Carousel from "../../components/Carousel.svelte";
    import imgMusicianBodonyiDani from "$lib/images/musicians/bodonyi-dani-banner.jpg";
    import imgMusicianFeltucat from "$lib/images/musicians/feltucat-banner.jpg";
    import imgMusicianKalafaticsImre from "$lib/images/musicians/kalafatics-imre.png";
    import imgMusicianLoophia from "$lib/images/musicians/loophia-banner.jpg";
    import imgMusicianNaez from "$lib/images/musicians/naez-logo.jpg";

    const events: Array<{
        type:
            | "DJ"
            | "kiállítás"
            | "koncert"
            | "könyvbemutató"
            | "slam"
            | "workshop"
            | "fényfestés";
        name: string;
        day: string; // YYYY-MM-DD
        start: string; // HH:MM
        end: string; // HH:MM
        imageUrl?: string;
    }> = [
        {
            type: "koncert",
            name: "Tearaža",
            day: "2025-10-17",
            start: "17:00",
            end: "18:00",
        },
        {
            type: "koncert",
            name: "Somnium",
            day: "2025-10-17",
            start: "18:00",
            end: "19:00",
        },
        {
            type: "koncert",
            name: "Wake And Bake",
            day: "2025-10-17",
            start: "19:00",
            end: "20:00",
        },
        {
            type: "DJ",
            name: "Kama3 aka. Riot City",
            day: "2025-10-17",
            start: "20:00",
            end: "21:00",
        },
        {
            type: "DJ",
            name: "blameyourbrother",
            day: "2025-10-17",
            start: "21:00",
            end: "22:00",
        },
        {
            type: "kiállítás",
            name: "Szvath Marci",
            day: "2025-10-17",
            start: "16:30",
            end: "23:00",
        },
        {
            type: "workshop",
            name: "Kalafatics Imi & Tóth Zsombor",
            day: "2025-10-17",
            start: "17:30",
            end: "18:30",
            imageUrl: imgMusicianKalafaticsImre,
        },
        {
            type: "workshop",
            name: "Vesztu",
            day: "2025-10-17",
            start: "19:30",
            end: "20:30",
        },
        {
            type: "fényfestés",
            name: "Fényfestés: Whitelights",
            day: "2025-10-17",
            start: "21:00",
            end: "23:00",
        },
        {
            type: "koncert",
            name: "Féltucat",
            day: "2025-10-18",
            start: "18:30",
            end: "19:30",
            imageUrl: imgMusicianFeltucat,
        },
        {
            type: "koncert",
            name: "Porszem",
            day: "2025-10-18",
            start: "19:30",
            end: "20:30",
        },
        {
            type: "koncert",
            name: "Naez",
            day: "2025-10-18",
            start: "20:30",
            end: "21:30",
            imageUrl: imgMusicianNaez,
        },
        {
            type: "koncert",
            name: "Loophia",
            day: "2025-10-18",
            start: "21:30",
            end: "22:30",
            imageUrl: imgMusicianLoophia,
        },
        {
            type: "DJ",
            name: "Bodonyi Dani",
            day: "2025-10-18",
            start: "22:30",
            end: "23:30",
            imageUrl: imgMusicianBodonyiDani,
        },
        {
            type: "DJ",
            name: "OnlyFangs",
            day: "2025-10-18",
            start: "23:30",
            end: "00:30",
        },
        {
            type: "DJ",
            name: "HYPERtänzer",
            day: "2025-10-18",
            start: "00:30",
            end: "01:30",
        },
        {
            type: "kiállítás",
            name: "Szvath Marci",
            day: "2025-10-18",
            start: "17:00",
            end: "23:00",
        },
        {
            type: "fényfestés",
            name: "Fényfestés: Whitelights",
            day: "2025-10-18",
            start: "22:00",
            end: "01:00",
        },
    ];

    const isEventStarted = new Date() >= new Date("2025-10-18T16:30:00");
    let currentTime = new Date();

    onMount(() => {
        const tickInterval = setInterval(() => {
            currentTime = new Date();
        }, 1000 / 30);

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
    <div
        class="cookie-clock"
        style="--millis: {currentTime.getMilliseconds()}; --seconds: {currentTime.getSeconds()}; --minutes: {currentTime.getMinutes()}; --hours: {currentTime.getHours()};"
    >
        {@html cookie}
        {@html cookie}
        {@html cookie}
    </div>
    <div class="preshow-content">
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
    </div>
    <main>
        <h2>Fellépők, művészek</h2>
        <h3>Péntek</h3>
        <Carousel
            style="aspect-ratio: 21 / 9;"
            pages={events
                .filter((e) => e.day === "2025-10-17")
                .map((e) => ({
                    title: e.name,
                    text: e.type,
                    background: e.imageUrl
                        ? `url(${e.imageUrl}) center/cover`
                        : "var(--secondary-color)",
                }))}
        />
        <h3>Szombat</h3>
        <Carousel
            style="aspect-ratio: 21 / 9;"
            pages={events
                .filter((e) => e.day === "2025-10-18")
                .map((e) => ({
                    title: e.name,
                    text: e.type,
                    background: e.imageUrl
                        ? `url(${e.imageUrl}) center/cover`
                        : "var(--secondary-color)",
                }))}
        />
        <h2>Helyszín</h2>
        <iframe
            title="8-as Műhely"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.679136145763!2d18.40916337631081!3d47.18371847115417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f7a71b44a165%3A0xdbce9b61da28b53d!2s8-as%20M%C5%B1hely!5e0!3m2!1sen!2shu!4v1760118055477!5m2!1sen!2shu"
            width="100%"
            style="border:0; aspect-ratio: 5 / 4;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    </main>
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
        --corner-radius: 16px !important;
    }

    .cookie-clock {
        position: relative;
        width: 100vw;
        height: 100svh;
        overflow: hidden;
    }

    .preshow-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing);
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100svh;
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
        }
        :global(circle) {
            fill: #d5c3b6;
        }
        :global(g) {
            transform-origin: center;
            rotate: calc(var(--hours) * -30deg + (var(--minutes) * -30deg / 60) );
        }
    }

    :global(.cookie-clock svg:nth-child(2)) {
        height: 70svh;
        :global(path) {
            fill: #8d552e;
        }
        :global(circle) {
            fill: #d5c3b6;
        }
        :global(g) {
            transform-origin: center;
            rotate: calc((var(--minutes) * -6deg + var(--seconds)) * -6deg / 60);
        }
    }

    :global(.cookie-clock svg:nth-child(3)) {
        height: 50svh;
        :global(path) {
            fill: #d5c3b6;
        }
        :global(circle) {
            fill: #8d552e;
        }
        :global(g) {
            transform-origin: center;
            rotate: calc(var(--seconds) * -6deg + (var(--millis) * -6deg / 1000));
        }
    }
</style>
