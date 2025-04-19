<script>
    import AchievementTree from "./AchievementTree.svelte";
    import { achievements } from "$lib/model/Achievement";

    const { rootAchievement, visitedPlaces = [] } = $props();

    let children = $state(
        achievements.filter((a) => a.parentId === rootAchievement.id),
    );
</script>

<div class="achievement-display">
    <div
        class={`achievement ${rootAchievement.predicate(visitedPlaces) && "unlocked"}`}
        data-tooltip={`${rootAchievement.name} - ${rootAchievement.description}`}
    >
        <span class={`mdi mdi-${rootAchievement.icon}`}></span>
    </div>
    {#if children.length > 0}
        <div style="display: flex; align-items: center; color: var(--primary-color);">
            <p>-</p>
        </div>
        <div class="children">
            {#each children as child}
                <AchievementTree rootAchievement={child} {visitedPlaces} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .achievement-display {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: stretch;
        gap: var(--spacing);
        overflow-x: auto;
        overflow-y: visible;
    }

    .achievement {
        display: flex;
        position: relative;
        justify-content: flex-start;
        align-items: center;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: var(--corner-radius);
        padding: var(--spacing);
    }

    .achievement.unlocked {
        background: var(--primary-color);
        color: var(--on-primary-color);
    }

    .achievement:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        translate: 0 var(--spacing);
        background: var(--on-primary-color);
        color: var(--primary-color);
        padding: calc(var(--spacing) / 2);
        border-radius: var(--corner-radius);
        white-space: nowrap;
        z-index: 1;
    }

    .children {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }
</style>
