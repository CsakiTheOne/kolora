<script lang="ts">
    import Countdown from "../../../components/legacy/Countdown.svelte";
    import Footer from "../../../components/legacy/Footer.svelte";
    import poster from "$lib/images/gallery/2025-kolora-feszt/poster.png";
    import cookie from "$lib/images/utils/cookie-clock.svg?raw";
    import { onMount } from "svelte";
    import Divider from "../../../components/legacy/Divider.svelte";
    import imgSectionBands from "$lib/images/gallery/2025-kolora-feszt/kolora-feszt-section-bands.jpg";
    import imgSectionDJs from "$lib/images/gallery/2025-kolora-feszt/kolora-feszt-section-djs.jpg";
    import imgSectionWorkshops from "$lib/images/gallery/2025-kolora-feszt/kolora-feszt-section-workshops.jpg";
    import SmallHeader from "../../../components/legacy/SmallHeader.svelte";

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
    <div class="header">
        <SmallHeader currentPage="Kolora Feszt" hideThemeButton />
    </div>
    <main class="container-column">
        <h1>Mit bámulsz? Nem kéne itt lenned</h1>
        <img style="max-width: 640px;" src="http://http.cat/401" alt="" />
    </main>
    <Footer />
</div>

<style>
    .theme-override {
        /*--primary-color: #8d552e !important;
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
        color: var(--on-background-color);*/
    }

    .header {
        position: relative;
        z-index: 3;
    }
</style>
