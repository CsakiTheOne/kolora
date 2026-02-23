<script>
    import logoKolora from "$lib/images/logos/kolora_minimal.png";
</script>

<div class="header-top">
    <a class="logo-container" href="/v2">
        <img class="logo" src={logoKolora} alt="Kolora logo" />
    </a>
</div>
<div class="sticky">
    <div class="pages">
        <a href="/v2">Főoldal</a>
        <a href="/v2">Projektek</a>
        <a href="/v2">Tagok</a>
        <a href="/v2/contacts">Elérhetőségek</a>
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
        flex-direction: column;
        align-items: center;
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

    .pages a:hover {
        background-color: var(--kolora-color-red);
    }
</style>
