<script lang="ts">
    import { enableMultiTabIndexedDbPersistence } from "firebase/firestore";
    import Badge from "./Badge.svelte";

    const {
        profilePictureUrl = "",
        name,
        tags = [],
        tagsColor = null,
        bio = "",
        links = [],
    } = $props();
</script>

<div class="member">
    {#if profilePictureUrl}
        <img
            src={profilePictureUrl}
            alt="Kolora tag képe"
            style="background: var(--primary-variant-color);"
        />
    {:else}
        <span class="mdi mdi-account-circle" style="font-size: 4rem;"></span>
    {/if}
    <div class="member-info">
        <div>
            <h3>{name}</h3>
            <div
                style="display: flex; flex-direction: row; gap: calc(var(--spacing) / 2); padding-top: calc(var(--spacing) / 4);"
            >
                {#each tags as tag}
                    <Badge style="background: {tagsColor}; color: white;">
                        {tag}
                    </Badge>
                {/each}
            </div>
        </div>
        <p>
            {#if bio.length > 0}
                {bio}
            {:else}
                -
            {/if}
        </p>
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

    .member > img, .member > span.mdi.mdi-account-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;
    }

    .member-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
    }
</style>
