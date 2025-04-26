<script lang="ts">
    import { fade } from "svelte/transition";

    export let close: () => void;
</script>

<div
    class="backdrop"
    onclick={close}
    onkeydown={(e) => e.key === "Enter" && close()}
    tabindex="0"
    role="button"
    transition:fade={{ duration: 200 }}
>
    <div
        class="backdrop-content"
        role="button"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.key === "Enter" && e.stopPropagation()}
        tabindex="0"
    >
        <slot></slot>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 100 !important;
        backdrop-filter: blur(1px);
    }

    .backdrop-content {
        z-index: 101 !important;
    }
</style>
