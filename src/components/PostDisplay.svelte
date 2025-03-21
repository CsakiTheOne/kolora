<script lang="ts">
    import { getCurrentUser } from "$lib/firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import Post from "$lib/model/Post";
    import Work from "$lib/model/Work";
    import { onMount } from "svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "./markdown-renderers/MarkdownLink.svelte";
    import MarkdownStrictHtml from "./markdown-renderers/MarkdownStrictHtml.svelte";
    import MarkdownLinebreakParagraph from "./markdown-renderers/MarkdownLinebreakParagraph.svelte";
    import rtdb from "$lib/firebase/rtdb";

    const { post, ...rest } = $props();

    let isOwnerLoggedIn = $state(false);
    let authorName = $state("");
    let work: Work | null = $state(null);
    let likes = $state(0);
    let isLiked = $state(false);

    function refreshLikes() {
        rtdb.posts.likes.getCount(post.id).then((count) => {
            likes = count;
        });
        rtdb.posts.likes
            .getUser(post.id, getCurrentUser()?.uid)
            .then((like) => {
                isLiked = !!like;
            });
    }

    $effect(() => {
        isOwnerLoggedIn = getCurrentUser()?.uid === post?.authorId;

        firestore.users.get(post.authorId).then((user) => {
            authorName = user.username;
        });
        if (post.attachmentWorkId) {
            firestore.works.get(post.attachmentWorkId).then((w) => {
                work = w;
            });
        }

        refreshLikes();
    });
</script>

<div class="post-card" {...rest}>
    <div class="row">
        <a
            href={`/profile/?id=${post.authorId}`}
            style="font-size: .9rem; text-decoration: none;"
        >
            <span class="mdi mdi-account-circle"></span>
            {authorName}
        </a>
    </div>
    <SvelteMarkdown
        source={post.content}
        renderers={{
            link: MarkdownLink,
            html: MarkdownStrictHtml,
            paragraph: MarkdownLinebreakParagraph,
        }}
    />
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
                <span style="font-size: .7rem;">Kedvelések: {likes}</span>
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
            {:else}
                <div style="display: flex; align-items: center;">
                    <span
                        class={`mdi mdi-heart${isLiked ? "" : "-outline"}`}
                        style="padding-right: calc(var(--spacing) / 4);"
                        onclick={() => {
                            if (!isLiked) {
                                rtdb.posts.likes
                                    .like(post.id, getCurrentUser()?.uid)
                                    .then(() => refreshLikes());
                            } else {
                                rtdb.posts.likes
                                    .unlike(post.id, getCurrentUser()?.uid)
                                    .then(() => refreshLikes());
                            }
                        }}
                        tabindex="0"
                        role="button"
                        aria-label="Kedvelés"
                        onkeypress={(e) => {}}
                    ></span>
                    <span style="font-size: .7rem;">{likes}</span>
                </div>
            {/if}
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

    .work-link span.mdi {
        color: inherit;
    }

    .action-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: calc(var(--spacing) / 2);
    }

    .action-buttons span.mdi {
        font-size: 1.3rem;
    }
</style>
