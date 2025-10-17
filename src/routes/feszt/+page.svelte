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
    import Divider from "../../components/Divider.svelte";

    const eventTypeIcon = {
        DJ: "📀",
        kiállító: "🖼️",
        banda: "🎸",
        könyvbemutató: "📚",
        workshop: "🎨",
        fényfestés: "💡",
        egyéb: "❓",
    };

    const events: Array<{
        type:
            | "DJ"
            | "kiállító"
            | "banda"
            | "könyvbemutató"
            | "workshop"
            | "fényfestés"
            | "egyéb";
        name: string;
        day: string; // YYYY-MM-DD
        start: string; // HH:MM
        end: string; // HH:MM
        url?: string;
    }> = [
        // Péntek
        {
            type: "egyéb",
            name: "1. nap - Kapunyitás",
            day: "2025-10-17",
            start: "16:30",
            end: "16:30",
        },
        {
            type: "workshop",
            name: "Kalafatics Imi & Tóth Zsombor",
            day: "2025-10-17",
            start: "16:30",
            end: "19:00",
        },
        {
            type: "workshop",
            name: "Vesztu",
            day: "2025-10-17",
            start: "16:30",
            end: "19:00",
            url: "https://www.instagram.com/vesztutattoo/",
        },
        {
            type: "kiállító",
            name: "Szvath Marci",
            day: "2025-10-17",
            start: "16:30",
            end: "23:59",
            url: "https://www.instagram.com/zagyva.graphics/",
        },
        {
            type: "kiállító",
            name: "Szvath Marci",
            day: "2025-10-18",
            start: "0:00",
            end: "23:59",
            url: "https://www.instagram.com/zagyva.graphics/",
        },
        {
            type: "banda",
            name: "Somnium",
            day: "2025-10-17",
            start: "20:00",
            end: "21:00",
            url: "https://www.instagram.com/somniumzenekar/",
        },
        {
            type: "banda",
            name: "Wake And Bake",
            day: "2025-10-17",
            start: "21:30",
            end: "22:30",
        },
        {
            type: "DJ",
            name: "OnlyFangs",
            day: "2025-10-17",
            start: "23:00",
            end: "23:59",
        },
        {
            type: "DJ",
            name: "Kama3 aka. Riot City",
            day: "2025-10-18",
            start: "00:00",
            end: "01:00",
        },
        {
            type: "DJ",
            name: "blameyourbrother.",
            day: "2025-10-18",
            start: "01:00",
            end: "02:00",
        },
        // Szombat
        {
            type: "egyéb",
            name: "2. nap - Kapunyitás",
            day: "2025-10-18",
            start: "17:00",
            end: "17:00",
        },
        {
            type: "banda",
            name: "Féltucat",
            day: "2025-10-18",
            start: "18:00",
            end: "18:50",
            url: "https://www.instagram.com/_feltucat/",
        },
        {
            type: "banda",
            name: "Porszem",
            day: "2025-10-18",
            start: "19:10",
            end: "20:00",
            url: "https://www.instagram.com/porszemband/",
        },
        {
            type: "banda",
            name: "Tearaža",
            day: "2025-10-18",
            start: "20:20",
            end: "21:10",
            url: "https://www.instagram.com/tearaza_band/",
        },
        {
            type: "banda",
            name: "Naez",
            day: "2025-10-18",
            start: "21:30",
            end: "22:20",
            url: "https://www.instagram.com/naez.official/",
        },
        {
            type: "banda",
            name: "Loophia",
            day: "2025-10-18",
            start: "22:40",
            end: "23:30",
            url: "https://www.instagram.com/loophia_/",
        },
        {
            type: "DJ",
            name: "Bodonyi Dani",
            day: "2025-10-19",
            start: "00:00",
            end: "01:00",
            url: "https://www.instagram.com/daniel_bodonyi/",
        },
        {
            type: "DJ",
            name: "HYPERtänzer",
            day: "2025-10-19",
            start: "01:00",
            end: "03:00",
        },
    ];

    const eventStartDate = new Date("2025-10-17T16:30:00");

    const isEventStarted = new Date() >= eventStartDate;

    let currentCountdownTime = $state(new Date());
    let selectedDay = $state(17);
    let favorites = $state<string[]>([]);
    let favoritesOnly = $state(false);

    onMount(() => {
        const now = new Date();
        if (now.getDate() === 18 || now.getDate() === 19) {
            selectedDay = 18;
        }

        favorites = JSON.parse(localStorage.getItem("feszt-favorites") || "[]");

        const tickInterval = setInterval(() => {
            const now = new Date();
            const remainingMs = eventStartDate.getTime() - now.getTime();
            currentCountdownTime = new Date(remainingMs);
        }, 1000 / 30);

        const autoRefreshTimeout = setTimeout(() => {
            location.reload();
        }, 1000 * 60 * 5);

        return () => {
            clearInterval(tickInterval);
            clearTimeout(autoRefreshTimeout);
        };
    });

    $effect(() => {
        localStorage.setItem("feszt-favorites", JSON.stringify(favorites));
    });

    function getCurrentEvents() {
        const now = new Date().getTime();
        return events.filter((event) => {
            const start = new Date(`${event.day}T${event.start}`).getTime();
            const end = new Date(`${event.day}T${event.end}`).getTime();
            return now >= start && now <= end;
        });
    }

    function getNextEvents() {
        const now = new Date().getTime();
        return events
            .filter((event) => {
                const start = new Date(`${event.day}T${event.start}`).getTime();
                return start > now;
            })
            .sort((a, b) => {
                const startA = new Date(`${a.day}T${a.start}`).getTime();
                const startB = new Date(`${b.day}T${b.start}`).getTime();
                return startA - startB;
            })
            .slice(0, 2);
    }
</script>

<div class="theme-override">
    {#if !isEventStarted}
        <div
            class="cookie-clock"
            style="--millis: {currentCountdownTime.getMilliseconds()}; --seconds: {currentCountdownTime.getSeconds()}; --minutes: {currentCountdownTime.getMinutes()}; --hours: {currentCountdownTime.getHours()};"
        >
            {@html cookie}
            {@html cookie}
            {@html cookie}
        </div>
        <div class="preshow-content">
            <h1>Kolora Feszt</h1>
            <Countdown targetDateTime={eventStartDate} />
            <p>
                Menetrend <br />
                <span class="mdi mdi-chevron-down"></span>
            </p>
        </div>
    {:else}
        <main>
            <h1 style="text-align: center;">Kolora Feszt</h1>
            <h2>Jelenleg zajló események</h2>
            {#if getCurrentEvents().length > 0}
                <ul class="outlined-list">
                    {#each getCurrentEvents() as event}
                        <li>
                            <p class="text-small">
                                {event.start} - {event.end}
                            </p>
                            <div
                                style="display: flex; justify-content: space-between; align-items: center;"
                            >
                                {#if event.url}
                                    <a href={event.url} target="_blank">
                                        <p>
                                            <strong>{event.name}</strong>
                                            {#if event.type !== "egyéb"}
                                                ({event.type})
                                            {/if}
                                            <span class="mdi mdi-link"></span>
                                        </p>
                                    </a>
                                {:else}
                                    <p>
                                        <strong>{event.name}</strong>
                                        {#if event.type !== "egyéb"}
                                            ({event.type})
                                        {/if}
                                    </p>
                                {/if}
                                <button
                                    class="btn icon-button"
                                    onclick={() => {
                                        if (favorites.includes(event.name))
                                            favorites = favorites.filter(
                                                (e) => e !== event.name,
                                            );
                                        else
                                            favorites = [
                                                ...favorites,
                                                event.name,
                                            ];
                                    }}
                                    aria-label="Kedvencekhez adás"
                                >
                                    <span
                                        class="mdi {favorites.includes(
                                            event.name,
                                        )
                                            ? 'mdi-star'
                                            : 'mdi-star-outline'}"
                                    ></span>
                                </button>
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>Jelenleg nincs zajló esemény.</p>
            {/if}
            <h2>Következik</h2>
            {#if getNextEvents().length > 0}
                <ul class="outlined-list">
                    {#each getNextEvents() as event}
                        <li>
                            <p class="text-small">
                                {event.start} - {event.end}
                            </p>
                            <div
                                style="display: flex; justify-content: space-between; align-items: center;"
                            >
                                {#if event.url}
                                    <a href={event.url} target="_blank">
                                        <p>
                                            <strong>{event.name}</strong>
                                            {#if event.type !== "egyéb"}
                                                ({event.type})
                                            {/if}
                                            <span class="mdi mdi-link"></span>
                                        </p>
                                    </a>
                                {:else}
                                    <p>
                                        <strong>{event.name}</strong>
                                        {#if event.type !== "egyéb"}
                                            ({event.type})
                                        {/if}
                                    </p>
                                {/if}
                                <button
                                    class="btn icon-button"
                                    onclick={() => {
                                        if (favorites.includes(event.name))
                                            favorites = favorites.filter(
                                                (e) => e !== event.name,
                                            );
                                        else
                                            favorites = [
                                                ...favorites,
                                                event.name,
                                            ];
                                    }}
                                    aria-label="Kedvencekhez adás"
                                >
                                    <span
                                        class="mdi {favorites.includes(
                                            event.name,
                                        )
                                            ? 'mdi-star'
                                            : 'mdi-star-outline'}"
                                    ></span>
                                </button>
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>Nincs több esemény a közeljövőben.</p>
            {/if}
            <Divider />
        </main>
    {/if}
    <main>
        <h2>Menetrend</h2>
        <div class="button-group">
            <button
                onclick={() => (selectedDay = 17)}
                class:selected={selectedDay === 17}>Péntek</button
            >
            <button
                onclick={() => (selectedDay = 18)}
                class:selected={selectedDay === 18}>Szombat</button
            >
        </div>
        <div
            style="display: flex; justify-content: space-between; align-items: center; gap: var(--spacing);"
        >
            <span>
                Kapunyitás:
                <strong>
                    {#if selectedDay === 17}
                        16:30
                    {:else if selectedDay === 18}
                        17:00
                    {:else}
                        Nem nyitjuk ki :P
                    {/if}
                </strong>
            </span>
            <span style="margin-top: -10px;">
                <input
                    type="checkbox"
                    class="switch"
                    bind:checked={favoritesOnly}
                /> Csak kedvencek
            </span>
        </div>
        <ul class="outlined-list">
            {#each events
                .filter((e, i, arr) => arr.findIndex((event) => event.name === e.name) === i)
                .filter((e) => !favoritesOnly || favorites.includes(e.name))
                .filter((e) => (e.day === `2025-10-${selectedDay}` && parseInt(e.start.substring(0, 2)) >= 12) || (e.day === `2025-10-${selectedDay + 1}` && parseInt(e.start.substring(0, 2)) < 12)) as event}
                {#if event.type !== "egyéb"}
                    <li>
                        <p class="text-small">
                            {event.start} - {event.end}
                        </p>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center;"
                        >
                            {#if event.url}
                                <a href={event.url} target="_blank">
                                    <p>
                                        <strong>{event.name}</strong>
                                        ({event.type})
                                        <span class="mdi mdi-link"></span>
                                    </p>
                                </a>
                            {:else}
                                <p>
                                    <strong>{event.name}</strong> ({event.type})
                                </p>
                            {/if}
                            <button
                                class="btn icon-button"
                                onclick={() => {
                                    if (favorites.includes(event.name))
                                        favorites = favorites.filter(
                                            (e) => e !== event.name,
                                        );
                                    else favorites = [...favorites, event.name];
                                }}
                                aria-label="Kedvencekhez adás"
                            >
                                <span
                                    class="mdi {favorites.includes(event.name)
                                        ? 'mdi-star'
                                        : 'mdi-star-outline'}"
                                ></span>
                            </button>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
        <h2>Helyszín</h2>
        <iframe
            title="8-as Műhely"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.679136145763!2d18.40916337631081!3d47.18371847115417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f7a71b44a165%3A0xdbce9b61da28b53d!2s8-as%20M%C5%B1hely!5e0!3m2!1sen!2shu!4v1760118055477!5m2!1sen!2shu"
            width="100%"
            style="border:0; aspect-ratio: 5 / 4;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <h2>További infók</h2>
        <p>
            <a
                class="btn"
                href="https://www.facebook.com/events/1461881778384144"
                target="_blank"
            >
                <span class="mdi mdi-facebook"></span>
                Facebook esemény
            </a>
        </p>
        <h3>Csináltál jó fotókat az eseményről?</h3>
        <p>
            Küldd el nekünk: <a
                href="mailto:koloraegyesulet@gmail.com"
                style="color: var(--secondary-color);"
                >koloraegyesulet@gmail.com</a
            >
        </p>
        <p>
            <a class="btn" href="/contacts/">
                <span class="mdi mdi-at"></span>
                További elérhetőségek
            </a>
        </p>
    </main>
    <Footer />
</div>

<style>
    .theme-override {
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
        background-color: var(--background-color);
        color: var(--on-background-color);
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
        z-index: 2;
    }

    :global(.cookie-clock svg) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        aspect-ratio: 1 / 1;
        z-index: 1;
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
            rotate: calc((var(--hours) - 1) * 30deg + var(--minutes) * 30deg / 60);
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
            rotate: calc(var(--minutes) * 6deg + var(--seconds) * 6deg / 60);
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
            rotate: calc(var(--seconds) * 6deg + var(--millis) * 6deg / 1000);
        }
    }

    ul.outlined-list :is(a, button) {
        background-color: var(--primary-color);
        color: var(--on-primary-color) !important;
    }

    .button-group > * {
        border: 2px solid var(--primary-color);
        background: transparent;
        color: var(--on-background-color);
    }

    .button-group > *.selected {
        background: var(--primary-color);
        color: var(--on-primary-color);
        border-radius: var(--corner-radius);
    }
</style>
