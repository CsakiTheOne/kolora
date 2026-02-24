<script lang="ts">
    import IrregularContainer from "./IrregularContainer.svelte";

    const {
        profilePictureUrl = "",
        name,
        tags = [],
        children = null,
        links = [],
    } = $props();
</script>

<div class="member">
    <IrregularContainer innerPaddings="0" class="pfp-container">
        {#if profilePictureUrl}
            <img src={profilePictureUrl} alt={name} />
        {:else}
            <span class="mdi mdi-account-circle"></span>
        {/if}
    </IrregularContainer>
    <div class="member-info">
        <div>
            <h2 id={name.toLowerCase().replace(" ", "-")}>{name}</h2>
            {#if tags}
                <div class="tags">
                    {#each tags as tag}
                        <IrregularContainer
                            innerPaddings="5px 20px"
                            style="background: {(['Elnök', 'Alelnök'].includes(
                                tag,
                            ) &&
                                'var(--primary-color)') ||
                                (tag === 'Piros' &&
                                    '#dd0000e0')}; color: white;"
                        >
                            {tag}
                        </IrregularContainer>
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
        gap: 1rem;
    }

    :global(.pfp-container) {
        width: 96px;
        height: auto;
        position: relative;
    }

    :global(.pfp-container img) {
        width: 100%;
        height: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
    }

    :global(.pfp-container .mdi-account-circle) {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        font-size: 2rem;
        color: var(--on-primary-color);
    }

    .member-info {
        width: calc(100% - 96px - 1rem);
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
