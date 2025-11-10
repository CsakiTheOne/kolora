<script>
    import koloraLogo from "$lib/images/logos/kolora.png";
    import AccountToolbarIcon from "./AccountToolbarIcon.svelte";
    import ThemeToolbarIcon from "./ThemeToolbarIcon.svelte";

    const { path = [], currentPage, hideThemeButton = false, ...rest } = $props();
</script>

<header {...rest}>
    <div class="left">
        <a href="/" style="height: 48px;">
            <img class="header-logo" src={koloraLogo} alt="Kolora logó" />
        </a>

        {#each path as { title, href }}
            <a {href}>{title}</a> &gt;
        {/each}
        <span>{currentPage}</span>
    </div>
    <div class="toolbar">
        {#if !hideThemeButton}
            <ThemeToolbarIcon />
        {/if}
        <AccountToolbarIcon />
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        overflow: hidden;
        white-space: nowrap;
    }

    header > .left {
        flex: 1;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: var(--spacing);
        overflow-x: auto;
        overflow-y: hidden;
    }

    header .header-logo {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 48px;
        aspect-ratio: 1;
        mix-blend-mode: lighten;
    }

    header > .left > a {
        color: var(--text-color);
    }

    .toolbar {
        display: flex;
        align-items: center;
        padding: 0 calc(var(--spacing) / 2);
        overflow: hidden;
    }

    :global(.toolbar > span) {
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0 calc(var(--spacing) / 2);
    }
</style>
