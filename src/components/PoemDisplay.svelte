<script lang="ts">
    export let title: string;
    export let author: string;
</script>

<main>
    <h1 style="margin-top: 2rem;">{title}</h1>
    <h3 style="margin-top: .5rem;">{author}</h3>
    <pre style="margin-top: 1rem;"><slot></slot></pre>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        width: 100%;
    }

    pre {
        font-size: .9rem;
        line-height: 1.5;
        text-align: left;
        min-width: calc(100% - 128px);
        max-width: calc(100% - 32px);
        overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: normal;
    }
</style>