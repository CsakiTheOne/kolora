<script>
    import { onMount } from "svelte";
    import Badge from "./Badge.svelte";
    import firestore from "$lib/firebase/firestore";

    const { work, ...rest } = $props();

    let authorName = $state("");

    onMount(() => {
        firestore.users.get(work.authorId).then((user) => {
            authorName = user.username;
        });
    });
</script>

<div class="work-card" {...rest}>
    <a href="/gallery/work/?id={work.id}">
        <h3>{work.title}</h3>
    </a>
    <p>
        <a href={`/profile/?id=${work.authorId}`}>{authorName}</a> - {work.dateCreated}
    </p>
    <abbr title="{work.description}">
        {work.description}
    </abbr>
    {#if work.dateUploaded}
        <p style="font-size: .7rem;">{work.status === "published" ? "Feltöltve" : "Utoljára módosítva"}: {work.dateUploaded}</p>
    {/if}
    <div class="badges">
        <Badge>{work.workType}</Badge>
        {#if work.genre}
            <Badge>
                {work.genre}
            </Badge>
        {/if}
        {#if work.eventId}
            <Badge>
                {work.eventId}
            </Badge>
        {/if}
    </div>
</div>

<style>
    .work-card {
        display: flex;
        flex-direction: column;
        padding: calc(var(--spacing) / 2);
        gap: calc(var(--spacing) / 2);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
        user-select: none;
    }

    .badges {
        display: flex;
        gap: calc(var(--spacing) / 2);
    }

    :global(.badges > span) {
        background-color: var(--secondary-variant-color);
        color: var(--on-secondary-variant-color);
    }

    h3 {
        padding: 0;
    }

    p, abbr {
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
    }
</style>
