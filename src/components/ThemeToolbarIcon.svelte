<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";
    import Backdrop from "./Backdrop.svelte";

    let isOpen = $state(false);
</script>

<span
    class="mdi mdi-brightness-6"
    onclick={() => (isOpen = !isOpen)}
    onkeydown={(e) => e.key === "Enter" && (isOpen = !isOpen)}
    tabindex="0"
    role="button"
></span>

{#if isOpen}
    <Backdrop close={() => (isOpen = false)}>
        <div class="theme-dialog">
            <ul class="outlined-list">
                <button onclick={() => ThemeManager.toggleDarkLight()}>
                    <span class="mdi mdi-brightness-6"></span>
                    Váltás világos / sötét módra
                </button>
                <li>Színsémák:</li>
                <button onclick={() => (ThemeManager.color = "color-default")}>
                    <div
                        class="color-preview"
                        style="background: var(--kolora-color-red);"
                    ></div>
                    Slam
                </button>
                <button onclick={() => (ThemeManager.color = "color-blue")}>
                    <div
                        class="color-preview"
                        style="background: var(--kolora-color-blue);"
                    ></div>
                    Terasz
                </button>
                <button onclick={() => (ThemeManager.color = "color-purple")}>
                    <div
                        class="color-preview"
                        style="background: var(--kolora-color-purple);"
                    ></div>
                    Akusztik
                </button>
                <button onclick={() => (ThemeManager.color = "color-yellow")}>
                    <div
                        class="color-preview"
                        style="background: var(--kolora-color-yellow);"
                    ></div>
                    Extra
                </button>
            </ul>
        </div>
    </Backdrop>
{/if}

<style>
    .theme-dialog {
        position: fixed;
        top: calc(var(--spacing) / 2);
        right: calc(var(--spacing) / 2);
        width: 280px;
        border: none;
        border-radius: var(--corner-radius);
        display: flex;
        flex-direction: column;
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: var(--spacing);
        gap: calc(var(--spacing) / 2);
    }

    button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: calc(var(--spacing) / 2);
    }

    .color-preview {
        display: inline-block;
        width: 24px;
        aspect-ratio: 1;
        border-radius: var(--corner-radius);
        border: 2px solid black;
    }
</style>
