<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type Post from "$lib/model/Post";
    import { onMount } from "svelte";

    const { post, ...rest } = $props();

    let authorName = $state("");

    onMount(() => {
        firestore.users.get(post.authorId).then((user) => {
            authorName = user.username;
        });
    });
</script>

<div class="post-card" {...rest}>
    <a href={`/profile/?id=${post.authorId}`} style="font-size: .8rem; text-decoration: none;">
        <span class="mdi mdi-account-circle"></span>
        {authorName}
    </a>
    <p>{post.content}</p>
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
</style>
