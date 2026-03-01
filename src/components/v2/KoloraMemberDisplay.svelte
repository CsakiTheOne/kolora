<script lang="ts">
    import ComicPanel from "./ComicPanel.svelte";

    const {
        profilePictureUrl = "",
        name,
        tags = [],
        children = null,
        links = [],
    } = $props();
</script>

<div class="comic-panel">
    <div class="comic-dots panel-blue"></div>
    <div
        class="member-bg"
        style="background-image: url({profilePictureUrl});"
    ></div>
    <div class="member">
        <div class="pfp-container">
            {#if profilePictureUrl}
                <img src={profilePictureUrl} alt={name} />
            {:else}
                <span class="mdi mdi-account-circle"></span>
            {/if}
        </div>
        <div class="member-info">
            <div>
                <h2 id={name.toLowerCase().replace(" ", "-")}>{name}</h2>
                {#if tags}
                    <div class="tags">
                        {#each tags as tag}
                            <span
                                style="background-color: {tag === 'Piros'
                                    ? 'red'
                                    : 'var(--kolora-color-base)'};"
                            >
                                {tag}
                            </span>
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
</div>

<style>
    .comic-panel {
        position: relative;
        padding: 4px;
        background-color: black;
        z-index: -3;
    }

    .comic-dots,
    .member-bg {
        position: absolute;
        top: 4px;
        left: 4px;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        z-index: -2;
    }

    .member-bg {
        background-size: cover;
        background-position: center;
        filter: blur(8px);
        opacity: 0.5;
        z-index: -1;
    }

    .member {
        display: flex;
        flex-direction: row;
        align-content: stretch;
        gap: 1rem;
        color: white;
    }

    .pfp-container {
        width: 200px;
        min-width: 128px;
        max-width: 30vw;
        aspect-ratio: 1/1;
        position: relative;
    }

    .pfp-container img {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    .pfp-container .mdi-account-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        font-size: 2rem;
        color: var(--kolora-color-red-variant);
    }

    .member-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem 2rem 1rem 0.5rem;
    }

    .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding-top: 0.5rem;
        white-space: nowrap;
    }

    .tags > span {
        padding: 2px;
    }

    li {
        margin-left: 1rem;
    }
</style>
