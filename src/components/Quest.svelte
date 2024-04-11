<script lang="ts">
    export let title: string;
</script>

<div>
    <input type="checkbox">
    <span>{title}</span>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-items: start;
        align-items: center;
        padding: calc(var(--spacing) / 2);
    }

    div > * {
        margin: calc(var(--spacing) / 2);
    }

    input[type="checkbox"] {
        appearance: none;
        width: 24px;
        height: 24px;
        border: 2px solid var(--primary-color);
        border-radius: 4px;
        outline: none;
        transition: border-color 0.3s;
    }

    input[type="checkbox"]:checked {
        background-color: var(--primary-color);
    }

    span {
        max-width: calc(100% - 24px - 64px);
        text-align: left;
    }
</style>