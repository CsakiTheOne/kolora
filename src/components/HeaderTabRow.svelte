<script>
    import { onMount } from "svelte";

    const {
        tabs,
        selectedTab,
        ...rest
    } = $props();

    $effect(() => {
        const selectedTabElement = document.querySelector('.tab.selected');
        if (selectedTabElement) {
            selectedTabElement.scrollIntoView({
                block: 'nearest',
                inline: 'center',
            });
        }
    });
</script>

<div {...rest} class="tab-row">
    {#each tabs as tab}
        <a href={tab.url} class={`tab ${tab.title === selectedTab ? 'selected' : ''}`}>
            {#if tab.icon}
                <span class={`mdi mdi-${tab.icon}`}></span>
            {/if}
            {tab.title}
        </a>
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
        overflow-y: hidden;
        scrollbar-width: none;
    }

    .tab, .tab:hover {
        display: inline-block;
        padding: calc(var(--spacing) / 3) calc(var(--spacing) / 2);
        border-left: 2px solid var(--primary-color);
        border-top: 2px solid var(--primary-color);
        border-right: 2px solid var(--primary-color);
        border-radius: 0;
        border-top-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius);
        cursor: pointer;
        transition: all .1s ease-in-out;
        max-lines: 1;
        text-wrap: nowrap;
    }

    .tab.selected {
        background-color: var(--background-color);
        color: var(--primary-color);
        translate: 0 2px;
    }

    .tab:not(.selected) {
        color: var(--on-primary);
        border-bottom: 2px solid var(--primary-color);
    }

    .tab:not(.selected):hover {
        background-color: var(--primary-light-color);
        translate: 0 2px;
    }
</style>