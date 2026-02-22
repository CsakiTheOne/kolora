<script lang="ts">
    export let style = "";
</script>

<div style={style}>
    <slot/>
</div>

<style>
    div {
        background-color: var(--secondary-color);
        color: var(--on-secondary-color) !important;
        border-radius: var(--corner-radius);
        overflow: hidden;
    }
</style>