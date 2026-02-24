<script>
    import logoKolora from "$lib/images/logos/kolora_minimal.png";
    import iconMusicNote from "@pictogrammers/memory-svg/svg/music-note.svg?raw";
    import iconImage from "@pictogrammers/memory-svg/svg/image.svg?raw";
    import iconChatProcessing from "@pictogrammers/memory-svg/svg/chat-processing.svg?raw";
    import iconPencil from "@pictogrammers/memory-svg/svg/pencil.svg?raw";

    const { selectedPageIndex = -1 } = $props();
</script>

<div class="header-top">
    <attr title="Zene">{@html iconMusicNote}</attr>
    <attr title="Kiállítás">{@html iconImage}</attr>
    <a class="logo-container" href="/v2" title="Kolora!">
        <img class="logo" src={logoKolora} alt="Kolora Egyesület" />
    </a>
    <attr title="Slam">{@html iconChatProcessing}</attr>
    <attr title="Workshop">{@html iconPencil}</attr>
</div>
<div class="sticky">
    <div class="pages">
        <a class:selected={selectedPageIndex === 0} href="/v2">Főoldal</a>
        <a class:selected={selectedPageIndex === 1} href="/v2">Projektek</a>
        <a class:selected={selectedPageIndex === 2} href="/v2/members">Tagok</a>
        <a class:selected={selectedPageIndex === 3} href="/v2/contacts">Elérhetőségek</a>
        <a href="/" target="_self">Vissza a régi design-ra</a>
    </div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="8px"
        viewBox="0 0 10 10"
        xml:space="preserve"
        preserveAspectRatio="none"
    >
        <path d="M0 0 H10 V10 Z" fill="black" />
    </svg>
</div>

<style>
    .header-top {
        background-color: black;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    :global(.header-top svg) {
        width: 24px;
        height: auto;
        margin: 0.5rem;
        opacity: 0.7;
    }

    :global(.header-top attr:nth-child(1) svg path) {
        fill: #b388eb;
    }

    :global(.header-top attr:nth-child(2) svg path) {
        fill: #dda448;
    }

    :global(.header-top attr:nth-child(4) svg path) {
        fill: #dc7f9b;
    }

    :global(.header-top attr:nth-child(5) svg path) {
        fill: #86bbd8;
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

    .pages {
        background-color: black;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        overflow-x: auto;
    }

    .logo {
        width: 64px;
        height: 64px;
    }

    .pages a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        border: 2px solid white;
        white-space: nowrap;
        rotate: 2deg;
    }

    .pages a:nth-child(2n) {
        rotate: -2deg;
    }

    .pages a.selected {
        background-color: white;
        color: black;
    }

    .pages a:not(.selected):hover {
        background-color: var(--kolora-color-red);
    }
</style>
