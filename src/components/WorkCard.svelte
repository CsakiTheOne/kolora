<script>
    import Badge from "./Badge.svelte";

    const { work, ...rest } = $props();
</script>

<a
    class="work-card"
    href="/gallery/work/?id={work.id}"
    {...rest}
>
    <div class="badges">
        <Badge>{work.workType}</Badge>
        {#if work.eventId}
            <Badge>{work.eventId}</Badge>
        {/if}
    </div>
    <h2>{work.title}</h2>
    <p>{work.description}</p>
    <p><strong>Készítette:</strong> {work.author} - {work.dateCreated}</p>
    {#if work.dateUploaded}
        <p style="font-size: .7rem;">{work.dateUploaded}</p>
    {/if}
</a>

<style>
    .work-card {
        display: flex;
        flex-direction: column;
        padding: var(--spacing);
        gap: var(--spacing);
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        border-radius: var(--corner-radius);
        user-select: none;
        cursor: pointer;
        text-decoration: none;
    }

    .badges {
        display: flex;
        gap: var(--spacing);
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
