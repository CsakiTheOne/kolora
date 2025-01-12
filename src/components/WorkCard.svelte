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
    <div class="badges">
        <Badge style="background: var(--primary-color)">{work.workType}</Badge>
        {#if work.genre}
            <Badge style="background: var(--primary-color)">
                {work.genre}
            </Badge>
        {/if}
        {#if work.eventId}
            <Badge style="background: var(--primary-color)">
                {work.eventId}
            </Badge>
        {/if}
    </div>
    <a href="/gallery/work/?id={work.id}">
        <h3>{work.title}</h3>
    </a>
    <p>{work.description}</p>
    {#if work.dateUploaded}
        <p style="font-size: .7rem;">Feltöltve: {work.dateUploaded}</p>
    {/if}
    <p>
        <strong>Készítette:</strong>
        <a href={`/profile/?id=${work.authorId}`}>{authorName}</a> - {work.dateCreated}
    </p>
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

    .work-card * {
        color: var(--on-secondary-color);
    }

    .badges {
        display: flex;
        gap: calc(var(--spacing) / 2);
    }

    h3 {
        padding: 0;
    }

    p {
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
