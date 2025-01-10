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

<div {...rest}>
    <a class="work-card" href="/gallery/work/?id={work.id}">
        <div class="badges">
            <Badge>{work.workType}</Badge>
            {#if work.eventId}
                <Badge>{work.eventId}</Badge>
            {/if}
        </div>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        {#if work.dateUploaded}
            <p style="font-size: .7rem;">Feltöltve: {work.dateUploaded}</p>
        {/if}
    </a>
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
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        border-radius: var(--corner-radius);
        user-select: none;
        cursor: pointer;
        text-decoration: none;
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
