<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";
    import { onMount } from "svelte";
    import Backdrop from "./Backdrop.svelte";

    let isOpen = $state(false);
    let selectedTheme = $state("");
    let selectedColor = $state("");

    onMount(() => {
        selectedTheme = ThemeManager.theme;
        selectedColor = ThemeManager.color;
    });

    function setTheme(theme: string) {
        ThemeManager.theme = theme;
        selectedTheme = theme;
    }

    function setColor(color: string) {
        ThemeManager.color = color;
        selectedColor = color;
    }
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
            <div class="theme-toggle">
                <button
                    class="btn {selectedTheme === 'theme-light'
                        ? 'selected'
                        : ''}"
                    style="flex: 1; border: 2px solid var(--primary-variant-color);"
                    onclick={() => setTheme("theme-light")}
                >
                    <span class="mdi mdi-brightness-7"></span>
                    Világos
                </button>
                <button
                    class="btn {selectedTheme === 'theme-dark'
                        ? 'selected'
                        : ''}"
                    style="flex: 1; border: 2px solid var(--primary-variant-color);"
                    onclick={() => setTheme("theme-dark")}
                >
                    <span class="mdi mdi-brightness-5"></span>
                    Sötét
                </button>
            </div>
            <button
                class="btn {selectedTheme === 'theme-system' ? 'selected' : ''}"
                onclick={() => setTheme("theme-system")}
            >
                <span class="mdi mdi-brightness-auto"></span>
                Rendszer téma követése
            </button>
            <ul class="outlined-list">
                <button onclick={() => setColor("color-default")}>
                    <div
                        class="color-preview {!selectedColor ||
                        selectedColor === 'color-default'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-red);"
                    ></div>
                    Slam
                </button>
                <button onclick={() => setColor("color-blue")}>
                    <div
                        class="color-preview {selectedColor === 'color-blue'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-blue);"
                    ></div>
                    Terasz
                </button>
                <button onclick={() => setColor("color-purple")}>
                    <div
                        class="color-preview {selectedColor === 'color-purple'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-purple);"
                    ></div>
                    Akusztik
                </button>
                <button onclick={() => setColor("color-yellow")}>
                    <div
                        class="color-preview {selectedColor === 'color-yellow'
                            ? 'selected'
                            : ''}"
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

    .theme-toggle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: calc(var(--spacing) / 2);
    }

    .btn {
        flex: 1;
        padding: calc(var(--spacing) / 2);
        border: 2px solid var(--primary-variant-color);
        background: transparent;
        color: var(--on-primary-color);
    }

    .btn.selected {
        background: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
        border-radius: var(--corner-radius);
    }

    .color-preview {
        display: inline-block;
        width: 20px;
        aspect-ratio: 1;
        border-radius: var(--corner-radius);
        border: 2px solid black;
        transition: all 0.2s ease-out;
    }

    .color-preview.selected {
        border-radius: calc(var(--corner-radius) / 2);
    }
</style>
