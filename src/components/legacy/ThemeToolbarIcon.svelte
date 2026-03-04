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
            <div class="button-group">
                <button
                    class={selectedTheme === "theme-light" ? "selected" : ""}
                    onclick={() => setTheme("theme-light")}
                >
                    <span class="mdi mdi-brightness-7"></span>
                    Világos
                </button>
                <button
                    class={selectedTheme === "theme-dark" ? "selected" : ""}
                    onclick={() => setTheme("theme-dark")}
                >
                    <span class="mdi mdi-brightness-5"></span>
                    Sötét
                </button>
            </div>
            <div class="button-group">
                <button
                    class={selectedTheme === "theme-system" ? "selected" : ""}
                    onclick={() => setTheme("theme-system")}
                >
                    <span class="mdi mdi-brightness-auto"></span>
                    Rendszer téma követése
                </button>
            </div>
            <div class="button-group">
                <button
                    onclick={() => setColor("color-default")}
                    class={selectedColor === "color-default" ? "selected" : ""}
                >
                    <div
                        class="color-preview {!selectedColor ||
                        selectedColor === 'color-default'
                            ? 'selected'
                            : ''}"
                        style="background: #dcb37e;"
                    ></div>
                </button>
                <button
                    onclick={() => setColor("color-red")}
                    class={selectedColor === "color-red" ? "selected" : ""}
                >
                    <div
                        class="color-preview {selectedColor === 'color-red'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-red);"
                    ></div>
                </button>
                <button
                    onclick={() => setColor("color-blue")}
                    class={selectedColor === "color-blue" ? "selected" : ""}
                >
                    <div
                        class="color-preview {selectedColor === 'color-blue'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-blue);"
                    ></div>
                </button>
                <button
                    onclick={() => setColor("color-purple")}
                    class={selectedColor === "color-purple" ? "selected" : ""}
                >
                    <div
                        class="color-preview {selectedColor === 'color-purple'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-purple);"
                    ></div>
                </button>
                <button
                    onclick={() => setColor("color-yellow")}
                    class={selectedColor === "color-yellow" ? "selected" : ""}
                >
                    <div
                        class="color-preview {selectedColor === 'color-yellow'
                            ? 'selected'
                            : ''}"
                        style="background: var(--kolora-color-yellow);"
                    ></div>
                </button>
            </div>
        </div>
    </Backdrop>
{/if}

<style>
    .theme-dialog {
        position: fixed;
        top: calc(var(--spacing) / 2);
        right: calc(var(--spacing) / 2);
        width: 320px;
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

    .button-group > * {
        padding: calc(var(--spacing) / 2);
        border: 2px solid var(--primary-variant-color);
        background: transparent;
        color: var(--on-primary-color);
    }

    .button-group > *.selected {
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
