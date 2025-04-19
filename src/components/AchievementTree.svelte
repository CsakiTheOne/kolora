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
        onclick={() => {
            alert(`${rootAchievement.name}\n\n${rootAchievement.description}`);
        }}
        tabindex="0"
        role="button"
        aria-label={rootAchievement.name}
    >
        <span class={`mdi mdi-${rootAchievement.icon}`}></span>
    </div>
    {#if children.length > 0}
        <div
            style="display: flex; align-items: center; color: var(--primary-color);"
        >
            <p style="font-size: 2.5rem;">
                {#if children.length > 1}
                    &lt;
                {:else}
                    -
                {/if}
            </p>
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
        align-items: center;
        overflow-x: auto;
    }

    .achievement {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: var(--corner-radius);
        padding: calc(var(--spacing) / 2);
        overflow: visible;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .achievement.unlocked {
        background: var(--primary-color);
        color: var(--on-primary-color);
    }

    .children {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }
</style>
