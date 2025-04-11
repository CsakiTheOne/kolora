<script lang="ts">
    import { getCurrentUser } from "$lib/firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import Post from "$lib/model/Post";
    import Work from "$lib/model/Work";
    import { onMount } from "svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownLink from "../markdown-renderers/MarkdownLink.svelte";
    import MarkdownStrictHtml from "../markdown-renderers/MarkdownStrictHtml.svelte";
    import MarkdownLinebreakParagraph from "../markdown-renderers/MarkdownLinebreakParagraph.svelte";
    import rtdb from "$lib/firebase/rtdb";
    import Report from "$lib/model/Report";
    import UserManager from "$lib/UserManager.svelte";
    import { ROLES } from "$lib/model/KoloraUser";
    import PoiUtils from "$lib/PoiUtils";

    const { post, ...rest } = $props();

    let isOwnerLoggedIn = $state(false);
    let isAdminLoggedIn = $state(false);
    let authorName = $state("");

    let work: Work | null = $state(null);

    let likes = $state(0);
    let isLiked = $state(false);

    let isEditing = $state(false);

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
        isAdminLoggedIn =
            UserManager.instance.koloraUser?.roles.includes(ROLES.ADMIN) ===
            true;

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
    {#if isEditing}
        <textarea
            class="outlined-input"
            style="resize: vertical; min-height: 80px;"
            bind:value={post.content}
            maxlength={PoiUtils.POST_CONTENT_LENGTH_LIMIT}
        ></textarea>
        <p style="text-align: right; font-size: 0.7rem;">
            {post.content.length}/{PoiUtils.POST_CONTENT_LENGTH_LIMIT}
        </p>
        <button
            class="btn"
            onclick={() => {
                firestore.posts
                    .set(post.id, { content: post.content })
                    .then(() => {
                        window.location.reload();
                        isEditing = false;
                    });
            }}
        >
            Mentés
        </button>
    {:else}
        <SvelteMarkdown
            source={post.content}
            renderers={{
                link: MarkdownLink,
                html: MarkdownStrictHtml,
                paragraph: MarkdownLinebreakParagraph,
            }}
        />
    {/if}
    {#if post.attachmentWorkId && work}
        <a class="work-link" href={`/work?id=${work!.id}`} target="_blank">
            <span class="mdi mdi-fountain-pen-tip"></span>
            {work.title} - {work.dateCreated}
        </a>
    {/if}
    <div class="row">
        <div style="display: flex; align-items: center;">
            {#if post.poiId === "_global"}
                <span
                    class="mdi mdi-earth"
                    style="margin-right: 4px;"
                    onclick={() => alert("Ez a poszt minden helyen látható.")}
                    tabindex="0"
                    role="button"
                    aria-label="Globális poszt"
                    onkeypress={(e) => {}}
                ></span>
            {/if}
            <span
                style="font-size: .7rem; color: var(--secondary-variant-color);"
            >
                {new Date(post.createdAt).toLocaleDateString("hu-HU")}
            </span>
        </div>
        <div class="action-buttons">
            {#if isOwnerLoggedIn || isAdminLoggedIn}
                <span style="font-size: .7rem;">Kedvelések: {likes}</span>
                <span
                    class="mdi mdi-pencil"
                    onclick={() => {
                        if (isEditing) {
                            isEditing = false;
                        } else {
                            isEditing = isOwnerLoggedIn || isAdminLoggedIn;
                        }
                    }}
                    tabindex="0"
                    role="button"
                    aria-label="Szerkesztés"
                    onkeypress={(e) => {}}
                ></span>
                <span
                    class="mdi mdi-delete"
                    onclick={() => {
                        if (
                            confirm("Biztos törölni szeretnéd ezt a posztot?")
                        ) {
                            firestore.posts.delete(post.id).then(() => {
                                window.location.reload();
                            });
                        }
                    }}
                    tabindex="0"
                    role="button"
                    aria-label="Törlés"
                    onkeypress={(e) => {}}
                ></span>
            {/if}
            {#if !isOwnerLoggedIn}
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
                <span
                    class="mdi mdi-message-alert"
                    onclick={() => {
                        const reason = prompt(
                            "Miért szeretnéd jelenteni ezt a posztot?",
                        );
                        if (reason) {
                            firestore.reports
                                .send({
                                    ...new Report(),
                                    userId: getCurrentUser()?.uid || "",
                                    contentType: "post",
                                    contentId: post.id,
                                    reason: reason,
                                })
                                .then(() => {
                                    alert("A posztot sikeresen jelentetted!");
                                })
                                .catch(() => {
                                    alert("Hiba történt a jelentés során.");
                                });
                        }
                    }}
                    tabindex="0"
                    role="button"
                    aria-label="Jelentés"
                    onkeypress={(e) => {}}
                ></span>
            {/if}
        </div>
    </div>
</div>

<style>
    span.mdi,
    a {
        color: var(--primary-variant-color);
        cursor: pointer;
    }

    :global(body.theme-dark .post-card :is(span.mdi, a)) {
        color: var(--primary-color);
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
        color: var(--on-primary-color) !important;
        padding: calc(var(--spacing) / 2);
        border-radius: var(--corner-radius);
        cursor: pointer;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .work-link span.mdi {
        color: inherit !important;
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
