<script>
    import HeaderTabRow from "./HeaderTabRow.svelte";
    import headerImage from "$lib/images/header.webp";
    import AccountToolbarIcon from "./AccountToolbarIcon.svelte";
    import ThemeToolbarIcon from "./ThemeToolbarIcon.svelte";

    const { selectedTab = "", ...rest } = $props();
</script>

<header {...rest}>
    <div style="background-image: url({headerImage});" class="background"></div>
    <div class="column">
        <p>Művészet? Kultúra? Székesfehérvár?</p>
        <a href="/" id="kolora-title"><h1>kolora!</h1></a>
    </div>
    <div class="toolbar">
        <ThemeToolbarIcon />
        <AccountToolbarIcon />
    </div>

    <div class="main-container">
        <HeaderTabRow {selectedTab} />
    </div>
</header>

<style>
    header {
        position: relative;
        color: var(--on-primary-color);
        max-height: min-content;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background-position: center;
        background-size: cover;
        z-index: -1;
    }

    .background::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--primary-color);
        opacity: 0.7;
    }

    .toolbar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        height: 48px;
        padding: 0 calc(var(--spacing) / 2);
        overflow: hidden;
    }

    :global(.toolbar > span) {
        font-size: 1.3rem;
        padding: calc(var(--spacing) / 2);
        cursor: pointer;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: calc(var(--spacing) * 2);
        gap: calc(var(--spacing) * 2);
    }

    header a {
        color: var(--on-primary-color) !important;
    }
</style>
