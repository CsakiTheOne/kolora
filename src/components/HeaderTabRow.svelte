<script>
    import Badge from "./Badge.svelte";

    const { selectedTab, ...rest } = $props();

    let tabs = [
        { icon: "timeline", title: "Idővonal", url: "/timeline" },
        { icon: "form-textbox-password", title: "Kódok", url: "/codes", badge: "Béta" },
        { icon: "at", title: "Elérhetőségek", url: "/contacts" },
    ];

    $effect(() => {
        const selectedTabElement = document.querySelector(".tab.selected");
        if (selectedTabElement) {
            selectedTabElement.scrollIntoView({
                block: "nearest",
                inline: "center",
            });
        }
    });
</script>

<div {...rest} class="tab-row">
    {#each tabs as tab}
        <a
            href={tab.url}
            class={`tab ${tab.title === selectedTab ? "selected" : ""}`}
        >
            {#if tab.icon}
                <span class={`mdi mdi-${tab.icon}`}></span>
            {/if}
            {tab.title}
            {#if tab.badge}
                <Badge>{tab.badge}</Badge>
            {/if}
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

    .tab,
    .tab:hover {
        display: inline-block;
        padding: calc(var(--spacing) / 3) calc(var(--spacing) / 2);
        border-left: 2px solid var(--primary-color);
        border-top: 2px solid var(--primary-color);
        border-right: 2px solid var(--primary-color);
        border-radius: 0;
        border-top-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius);
        background-color: var(--background-color);
        color: var(--on-background-color);
        translate: 0 2px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        max-lines: 1;
        text-wrap: nowrap;
    }

    .tab:not(.selected) {
        background-color: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
    }

    .tab:not(.selected):hover {
        background-color: var(--background-color);
        color: var(--on-background-color);
    }
</style>
