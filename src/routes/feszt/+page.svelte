<script lang="ts">
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import poster from "$lib/images/gallery/2025-kolora-feszt/poster.png";
    import cookie from "$lib/images/utils/cookie-clock.svg?raw";
    import { onMount } from "svelte";
    import Divider from "../../components/Divider.svelte";

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
        // Péntek
        {
            type: "egyéb",
            name: "1. nap - Kapunyitás",
            day: "2025-10-17",
            start: "16:30",
            end: "16:30",
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
</script>

<div class="theme-override">
    <div class="cookies">
        {@html cookie}
        {@html cookie}
        {@html cookie}
    </div>
    <div class="preshow-content">
        <h1>Kolora Feszt</h1>
        <h2>
            Köszönjük, hogy <br />
            eljöttetek! &lt;3
        </h2>
    </div>

    <main>
        <h2>Fellépők, művészek</h2>
        <p>Bandák</p>
        <ul class="outlined-list">
            {#each events.filter((event) => event.type === "banda") as event}
                {#if event.url}
                    <a href={event.url} target="_blank">
                        {event.name}
                        <span class="mdi mdi-link"></span>
                    </a>
                {:else}
                    <li>{event.name}</li>
                {/if}
            {/each}
        </ul>
        <p>DJ-k</p>
        <ul class="outlined-list">
            {#each events.filter((event) => event.type === "DJ") as event}
                {#if event.url}
                    <a href={event.url} target="_blank">
                        {event.name}
                        <span class="mdi mdi-link"></span>
                    </a>
                {:else}
                    <li>{event.name}</li>
                {/if}
            {/each}
        </ul>
        <p>Workshop vezetők, kiállítók</p>
        <ul class="outlined-list">
            {#each events.filter((event) => event.type === "kiállító" || event.type === "workshop") as event}
                {#if event.url}
                    <a href={event.url} target="_blank">
                        {event.name}
                        <span class="mdi mdi-link"></span>
                    </a>
                {:else}
                    <li>{event.name}</li>
                {/if}
            {/each}
        </ul>
        <h2>Helyszín</h2>
        <p>Köszönjük a Nyolcas Műhelynek!</p>
        <iframe
            title="8-as Műhely"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.679136145763!2d18.40916337631081!3d47.18371847115417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f7a71b44a165%3A0xdbce9b61da28b53d!2s8-as%20M%C5%B1hely!5e0!3m2!1sen!2shu!4v1760118055477!5m2!1sen!2shu"
            width="100%"
            style="border:0; aspect-ratio: 16 / 9;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <h2>Csináltál jó fotókat az eseményről?</h2>
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

    .cookies {
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

    :global(.cookies svg) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        aspect-ratio: 1 / 1;
        z-index: 1;

        :global(g) {
            transform-origin: center;
            rotate: 180deg;
        }
    }

    :global(.cookies svg:nth-child(1)) {
        height: 90svh;
        :global(path) {
            fill: #33214b;
        }
        :global(circle) {
            fill: #d5c3b6;
        }
    }

    :global(.cookies svg:nth-child(2)) {
        height: 70svh;
        :global(path) {
            fill: #8d552e;
        }
        :global(circle) {
            fill: #d5c3b6;
        }
    }

    :global(.cookies svg:nth-child(3)) {
        height: 50svh;
        :global(path) {
            fill: #d5c3b6;
        }
        :global(circle) {
            fill: #8d552e;
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
