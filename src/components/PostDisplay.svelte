<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import Post from "$lib/model/Post";
    import Work from "$lib/model/Work";
    import { onMount } from "svelte";

    const { post, ...rest } = $props();

    let authorName = $state("");
    let work: Work | null = $state(null);

    onMount(() => {
        firestore.users.get(post.authorId).then((user) => {
            authorName = user.username;
        });
        if (post.attachmentWorkId) {
            firestore.works.get(post.attachmentWorkId).then((w) => {
                work = w;
            });
        }
    });
</script>

<div class="post-card" {...rest}>
    <a
        href={`/profile/?id=${post.authorId}`}
        style="font-size: .8rem; text-decoration: none;"
    >
        <span class="mdi mdi-account-circle"></span>
        {authorName}
    </a>
    <p>{post.content}</p>
    {#if post.attachmentWorkId && work}
        <p
            class="work-link"
            onclick={() => {
                if (!work!.visible) {
                    alert("Ez a mű nem elérhető! Lehet, hogy az írója priváttá tette.")
                    return;
                }
                window.open(`/work?id=${work!.id}`, "_blank");
            }}
        >
            <span class="mdi mdi-fountain-pen-tip"></span>
            {work.visible ? work.title : "Privát mű"}
        </p>
    {/if}
</div>

<style>
    .post-card {
        display: flex;
        flex-direction: column;
        padding: calc(var(--spacing) / 2);
        gap: calc(var(--spacing) / 2);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
        user-select: none;
    }

    .work-link {
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: calc(var(--spacing) / 2);
        border-radius: var(--corner-radius);
        cursor: pointer;
    }
</style>
