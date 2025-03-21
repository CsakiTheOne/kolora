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
    <div class="row">
        <a
            href={`/profile/?id=${post.authorId}`}
            style="font-size: .8rem; text-decoration: none;"
        >
            <span class="mdi mdi-account-circle"></span>
            {authorName}
        </a>
    </div>
    <p>{post.content}</p>
    {#if post.attachmentWorkId && work && work.visible}
        <a class="work-link" href={`/work?id=${work!.id}`} target="_blank">
            <span class="mdi mdi-fountain-pen-tip"></span>
            {work.title}
        </a>
    {/if}
    <div class="row">
        <p style="font-size: .7rem; color: var(--secondary-variant-color);">
            {new Date(post.createdAt).toLocaleDateString("hu-HU")}
        </p>
        <div class="action-buttons">
            {#if isOwnerLoggedIn}
                <span
                    class="mdi mdi-delete"
                    onclick={() => {
                        if (
                            confirm("Biztos törölni szeretnéd ezt a posztot?")
                        ) {
                            firestore.posts
                                .delete(post.id)
                                .then(() => window.location.reload());
                        }
                    }}
                    tabindex="0"
                    role="button"
                    aria-label="Törlés"
                    onkeypress={(e) => {}}
                ></span>
                <span class={`mdi mdi-heart`}></span>
            {:else}
                <span
                    class={`mdi mdi-heart${"-outline"}`}
                    onclick={() => {
                        //TODO: Implement liking
                    }}
                    tabindex="0"
                    role="button"
                    aria-label="Kedvelés"
                    onkeypress={(e) => {}}
                ></span>
            {/if}
            <span>TODO: implement like counter</span>
            <span
                class="mdi mdi-message-alert"
                onclick={() => {
                    if (confirm("Jelenteni szeretnéd ezt a posztot?")) {
                        //TODO: Implement reporting
                    }
                }}
                tabindex="0"
                role="button"
                aria-label="Jelentés"
                onkeypress={(e) => {}}
            ></span>
        </div>
    </div>
</div>

<style>
    span.mdi {
        color: var(--primary-color);
        cursor: pointer;
    }

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

    .row {
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

    .action-buttons {
        display: flex;
        gap: calc(var(--spacing) / 2);
    }
    
    .action-buttons span.mdi {
        font-size: 1.3rem;
    }
</style>
