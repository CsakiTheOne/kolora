<script lang="ts">
    import { getCurrentUser } from "$lib/firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import Post from "$lib/model/Post";
    import Work from "$lib/model/Work";
    import { reload } from "firebase/auth";
    import { onMount } from "svelte";

    const { post, ...rest } = $props();

    const isOwnerLoggedIn = getCurrentUser()?.uid === post?.authorId;

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
    <div class="top-row">
        <a
            href={`/profile/?id=${post.authorId}`}
            style="font-size: .8rem; text-decoration: none;"
        >
            <span class="mdi mdi-account-circle"></span>
            {authorName}
        </a>
        {#if isOwnerLoggedIn}
            <span
                class="mdi mdi-delete"
                style="cursor: pointer; color: var(--primary-color);"
                onclick={() => {
                    if (confirm("Biztos törölni szeretnéd ezt a posztot?")) {
                        firestore.posts
                            .delete(post.id)
                            .then(() => window.location.reload());
                    }
                }}
                tabindex="0"
                role="button"
                aria-label="Törlés"
                onkeypress={(e) => {
                    if (e.key === "Enter") {
                        if (
                            confirm("Biztos törölni szeretnéd ezt a posztot?")
                        ) {
                            firestore.posts
                                .delete(post.id)
                                .then(() => window.location.reload());
                        }
                    }
                }}
            ></span>
        {/if}
    </div>
    <p>{post.content}</p>
    {#if post.attachmentWorkId && work && work.visible}
        <a class="work-link" href={`/work?id=${work!.id}`} target="_blank">
            <span class="mdi mdi-fountain-pen-tip"></span>
            {work.title}
        </a>
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

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .work-link {
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: calc(var(--spacing) / 2);
        border-radius: var(--corner-radius);
        cursor: pointer;
        text-decoration: none;
        font-size: 0.9rem;
    }
</style>
