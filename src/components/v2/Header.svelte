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
    <attr title="Zene">{@html iconMusicNote}</attr>
    <attr title="Kiállítás">{@html iconImage}</attr>
    <attr title="Slam">{@html iconChatProcessing}</attr>
    <attr title="Workshop">{@html iconPencil}</attr>
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
    </div>
</div>
<a style="display: block; margin: 1rem;" href="/" target="_self"
    >Vissza a régi design-ra</a
>

<style>
    .header-top {
        border-top: 10px solid var(--kolora-color-red);
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
        background-color: var(--kolora-color-red);
        clip-path: polygon(0 0, 100% 0, 0 100%);
    }

    .header-top a {
        font-weight: bold;
        color: white;
        text-decoration: none;
    }

    .header-top :global(attr:nth-child(2) svg path) {
        fill: #b388eb;
        color: #b388eb;
    }

    .header-top :global(attr:nth-child(3) svg path) {
        fill: #dda448;
        color: #dda448;
    }

    .header-top :global(attr:nth-child(4) svg path) {
        fill: #dc7f9b;
        color: #dc7f9b;
    }

    .header-top :global(attr:nth-child(5) svg path) {
        fill: #86bbd8;
        color: #86bbd8;
    }

    .logo {
        width: 48px;
        height: 48px;
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
        rotate: 2deg;
    }

    .pages a:nth-child(2n) {
        rotate: -2deg;
    }

    .pages a.selected {
        background-color: var(--kolora-color-red);
        color: white;
    }

    .pages a:not(.selected):hover {
        background-color: var(--kolora-color-red-variant);
    }
</style>
