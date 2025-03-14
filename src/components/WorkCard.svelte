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
        <span style="opacity: .5;">
            - {work.status === "published"
                ? "Feltöltve"
                : "Utoljára módosítva"}: {work.dateUploaded}
        </span><br />
        <abbr title={work.description}>
            {work.description}
        </abbr>
    </p>
    <div class="badges">
        <Badge>{work.workType}</Badge>
        {#if work.genre}
            <Badge>
                {work.genre}
            </Badge>
        {/if}
    </div>
</div>

<style>
    .work-card {
        display: flex;
        flex-direction: column;
        padding: calc(var(--spacing));
        gap: calc(var(--spacing));
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
        user-select: none;
    }

    .work-card a {
        color: var(--on-secondary-color);
    }

    .badges {
        display: flex;
        flex-wrap: nowrap;
        gap: calc(var(--spacing) / 2);
        overflow-x: auto;
        overflow-y: hidden;
    }

    :global(.badges > span) {
        background-color: var(--secondary-variant-color);
        color: var(--on-secondary-variant-color);
    }

    h3 {
        padding: 0;
    }

    p,
    abbr {
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
    }
</style>
