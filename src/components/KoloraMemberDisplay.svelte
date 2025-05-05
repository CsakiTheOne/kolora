<script lang="ts">
    import Badge from "./Badge.svelte";
    import flowerShape from "$lib/images/utils/flower-shape.png";

    const {
        profilePictureUrl = "",
        name,
        tags = [],
        children = null,
        links = [],
    } = $props();
</script>

<div class="member">
    <div class="pfp-container">
        <div class="tint" style="mask-image: url('{flowerShape}'); scale: 1.02;"></div>
        {#if profilePictureUrl}
            <img
                class="picture"
                src={profilePictureUrl}
                alt="Kolora tag képe"
                style="mask-image: url('{flowerShape}');"
            />
        {:else}
            <span class="mdi mdi-account-circle"></span>
        {/if}
    </div>
    <div class="member-info">
        <div>
            <h3>{name}</h3>
            {#if tags}
                <div class="tags">
                    {#each tags as tag}
                        <Badge
                            style="background: {['Elnök', 'Alelnök'].includes(
                                tag,
                            ) && 'var(--primary-color)' || tag === "Piros" && "#dd0000e0"}; color: white;"
                        >
                            {tag}
                        </Badge>
                    {/each}
                </div>
            {/if}
        </div>
        {#if children}
            <div>
                {@render children()}
            </div>
        {/if}
        {#if links.length > 0}
            <ul>
                {#each links as link}
                    <a href={link.url} target="_blank">
                        <li>{link.name}</li>
                    </a>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .member {
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
    }

    .pfp-container {
        width: 72px;
        height: 72px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        scale: 1.2;
    }

    .pfp-container > img,
    .pfp-container > .tint {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        mask-size: cover;
        mask-position: center;
    }

    .pfp-container > .tint {
        background: var(--secondary-color);
    }

    .pfp-container > .mdi-account-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        font-size: 2rem;
        color: var(--on-primary-color);
    }

    .member-info {
        width: calc(100% - 72px - var(--spacing));
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
    }

    .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: calc(var(--spacing) / 2);
        padding-top: calc(var(--spacing) / 4);
        overflow-x: auto;
        white-space: nowrap;
    }
</style>
