<script>
    import logoKolora from "$lib/images/logos/kolora_minimal.png";
    import iconMusicNote from "@pictogrammers/memory-svg/svg/music-note.svg?raw";
    import iconImage from "@pictogrammers/memory-svg/svg/image.svg?raw";
    import iconChatProcessing from "@pictogrammers/memory-svg/svg/chat-processing.svg?raw";
    import iconPencil from "@pictogrammers/memory-svg/svg/pencil.svg?raw";

    const { selectedPageIndex = -1 } = $props();

    let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<div class="header-top">
    <a class="logo-container" href="/v2" title="Kolora!">
        <img class="logo" src={logoKolora} alt="Kolora Egyesület" />
    </a>
    <attr title="Zene">{@html iconMusicNote} <span class="desktop-visible">Zene</span></attr>
    <attr title="Kiállítás">{@html iconImage} <span class="desktop-visible">Kiállítás</span></attr>
    <attr title="Slam">{@html iconChatProcessing} <span class="desktop-visible">Slam</span></attr>
    <attr title="Workshop">{@html iconPencil} <span class="desktop-visible">Workshop</span></attr>
    <div></div>
    <div></div>
</div>
<div class="sticky {scrollY >= 128 ? 'scrolled' : ''}">
    <div class="pages">
        <a class:selected={selectedPageIndex === 0} href="/v2">Főoldal</a>
        <a class:selected={selectedPageIndex === 1} href="/v2/projects"
            >Projektek</a
        >
        <a class:selected={selectedPageIndex === 2} href="/v2/members">Tagok</a>
        <a class:selected={selectedPageIndex === 3} href="/v2/contacts"
            >Elérhetőségek</a
        >
        <a href="/" target="_self">Régi design</a>
    </div>
</div>

<style>
    .header-top {
        border-top: 10px solid var(--kolora-color-base);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        transition: all 0.1s ease-in-out;
    }

    :global(.header-top svg) {
        width: 24px;
        height: auto;
        margin: 0.5rem;
    }

    .logo-container {
        background-color: var(--kolora-color-base);
        clip-path: polygon(0 0, 100% 0, 0 100%);
    }

    .header-top a {
        font-weight: bold;
        color: white;
        text-decoration: none;
    }

    .header-top attr {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: black;
        font-weight: bold;
    }

    .header-top attr .desktop-visible {
        display: none;
    }

    @media (min-width: 600px) {
        .header-top attr .desktop-visible {
            display: inline;
        }
    }

    .header-top attr:nth-child(2) :is(:global(svg path), span) {
        fill: #b388eb;
        color: #b388eb;
    }

    .header-top attr:nth-child(3) :is(:global(svg path), span) {
        fill: #dda448;
        color: #dda448;
    }

    .header-top attr:nth-child(4) :is(:global(svg path), span) {
        fill: #dc7f9b;
        color: #dc7f9b;
    }

    .header-top attr:nth-child(5) :is(:global(svg path), span) {
        fill: #86bbd8;
        color: #86bbd8;
    }

    .logo {
        width: 42px;
        height: 42px;
        margin-right: 32px;
        margin-bottom: 32px;
    }

    .sticky {
        position: sticky;
        top: 0;
        margin-top: -1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 99999;
    }

    .scrolled {
        box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
        background-color: white;
    }

    .pages {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: white;
    }

    .pages a {
        color: black;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        border: 2px solid black;
        white-space: nowrap;
        rotate: 3deg;
    }

    .pages a:nth-child(2n) {
        rotate: -3deg;
    }

    .pages a:hover {
        scale: 1.05;
    }

    .pages a.selected {
        background-color: var(--kolora-color-base);
        color: white;
    }

    .pages a:not(.selected):hover {
        background-color: var(--kolora-color-red-variant);
    }
</style>
