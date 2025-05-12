<script lang="ts">
    import koloraLogo from "$lib/images/logos/kolora.png";
    import AccountToolbarIcon from "../AccountToolbarIcon.svelte";
    import ThemeToolbarIcon from "../ThemeToolbarIcon.svelte";

    let { poi, onWelcomeRequest } = $props();
</script>

<header>
    <a
        href="#"
        style="height: 48px; position: absolute; top: 0; left: 0;"
        onclick={onWelcomeRequest}
    >
        <img class="header-logo" src={koloraLogo} alt="Kolora logó" />
    </a>
    <h3 class="title">{poi?.name ?? "Betöltés..."}</h3>
    <div class="toolbar">
        <a href={poi?.googleMapsLink} target="_blank" aria-label="Térkép">
            <span class="mdi mdi-map-marker"></span>
        </a>
        <ThemeToolbarIcon />
        <AccountToolbarIcon />
    </div>
</header>

<style>
    header {
        position: relative;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0 calc(var(--spacing) / 2);
        width: 100%;
        height: 128px;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        overflow: hidden;
        white-space: nowrap;
    }

    h3 {
        max-width: 100%;
        text-align: start;
        text-wrap-mode: wrap;
    }

    .title {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: var(--spacing);
    }

    .toolbar {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        padding: 0 calc(var(--spacing) / 2);
        align-items: center;
        overflow: hidden;
    }

    header .header-logo {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 48px;
        aspect-ratio: 1;
        mix-blend-mode: lighten;
    }

    :global(.toolbar > span.mdi, .toolbar > a > span.mdi) {
        font-size: 1.3rem;
        cursor: pointer;
        padding: calc(var(--spacing) / 2);
        color: var(--on-primary-color);
    }
</style>
