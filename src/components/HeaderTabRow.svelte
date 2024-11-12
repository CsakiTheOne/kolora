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
        justify-content: center;
        gap: 1rem;
        background-color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }

    .tab, .tab:hover {
        background-color: var(--background-color);
        color: var(--on-background-color);
        padding: calc(var(--spacing) / 3) calc(var(--spacing) / 2);
        border-left: 2px solid var(--primary-color);
        border-top: 2px solid var(--primary-color);
        border-right: 2px solid var(--primary-color);
        border-top-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius);
        cursor: pointer;
    }

    .tab.selected {
        translate: 0 2px;
    }
</style>