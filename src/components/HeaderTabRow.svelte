<script>
    const {
        tabs,
        selectedTab,
        ...rest
    } = $props();
</script>

<div {...rest} class="tab-row">
    {#each tabs as tab}
        <a href={tab.url} class={`tab ${tab.title === selectedTab ? 'selected' : ''}`}>{tab.title}</a>
    {/each}
</div>

<style>
    .tab-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--spacing);
        padding: 0 var(--spacing);
        overflow-x: auto;
        scrollbar-width: none;
    }

    .tab, .tab:hover {
        background-color: var(--background-color);
        color: var(--on-background-color);
        padding: calc(var(--spacing) / 3) calc(var(--spacing) / 2);
        border-left: 2px solid var(--primary-color);
        border-top: 2px solid var(--primary-color);
        border-right: 2px solid var(--primary-color);
        border-radius: 0;
        border-top-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius);
        cursor: pointer;
        transition: all .1s ease-in-out;
    }

    .tab.selected {
        translate: 0 2px;
    }

    .tab:not(.selected) {
        border-radius: var(--corner-radius);
        border-bottom: 2px solid var(--primary-color);
    }

    .tab:not(.selected):hover {
        background-color: var(--primary-light-color);
        translate: 0 -2px;
    }
</style>