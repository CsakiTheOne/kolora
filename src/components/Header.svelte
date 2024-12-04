<script>
    import ThemeManager from "$lib/ThemeManager";
    import HeaderTabRow from "./HeaderTabRow.svelte";
    import headerImage from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/group photo with cake.jpg";
    import AccountToolbarIcon from "./AccountToolbarIcon.svelte";

    const { selectedTab = "" } = $props();
</script>

<header>
    <div style="background-image: url({headerImage});" class="background"></div>
    <div class="column">
        <p>Művészet? Kultúra? Székesfehérvár?</p>
        <a href="/"><h1 id="kolora-title">kolora!</h1></a>
    </div>
    <div class="toolbar">
        <span
            onclick={() => ThemeManager.toggleDarkLight()}
            class="mdi mdi-brightness-6"
        ></span>
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
        opacity: .9;
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
        overflow: hidden;
    }

    :global(.toolbar span) {
        font-size: 1.3rem;
        padding: var(--spacing);
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
        color: var(--on-primary-color);
    }
</style>
