<script lang="ts">
    export let title: string;
    export let author: string;
</script>

<main>
    <h1>{title}</h1>
    <h3>{author}</h3>
    <pre><slot></slot></pre>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        width: 100%;
    }

    main > * {
        margin-top: 1rem;
    }

    pre {
        font-size: .9rem;
        line-height: 1.5;
        text-align: left;
        max-width: 90%;
        overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: normal;
    }
</style>