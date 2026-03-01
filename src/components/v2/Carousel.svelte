<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    const { style = "", pages, ...rest } = $props();

    const spacing = 16;
    let carousel: HTMLElement | null = $state(null);
    let maxPageWidth = $state(0);

    onMount(() => {
        function updateWidths() {
            maxPageWidth = (carousel?.clientWidth || 0) * 0.6;
            const minPageWidth =
                (carousel?.clientWidth || 0) - (maxPageWidth + spacing);
            const scrollLeft = carousel?.scrollLeft || 0;
            const pageElements = carousel?.querySelectorAll(".page-wrapper") || [];

            pageElements.forEach((page: HTMLElement) => {
                const distanceFromCenter =
                    page.offsetLeft - scrollLeft - (carousel?.offsetLeft || 0);
                const pageWidth = Math.max(
                    minPageWidth,
                    Math.min(
                        maxPageWidth,
                        maxPageWidth - distanceFromCenter * 0.35,
                    ),
                );
                const contentOpacity = Math.max(
                    0,
                    Math.min(
                        1,
                        1 -
                            Math.abs(distanceFromCenter) /
                                (carousel?.clientWidth || 1),
                    ),
                );

                page.style.width = `${pageWidth}px`;
                page.querySelector(".page-content").style.opacity =
                    contentOpacity.toString();
            });

            const lastItemDistance =
                pageElements[pageElements.length - 1].offsetLeft -
                scrollLeft -
                carousel?.offsetLeft;
            if (lastItemDistance < 0) {
                carousel?.scrollTo({
                    left: scrollLeft + lastItemDistance,
                });
            }
        }

        window.addEventListener("resize", () => {
            updateWidths();
        });

        carousel?.addEventListener("scroll", () => {
            updateWidths();
        });

        updateWidths();
    });
</script>

<div
    class="carousel-container"
    style="--spacing: {spacing}px; max-width: 100%; {style}"
>
    <div class="carousel" bind:this={carousel} {...rest}>
        {#each pages as page}
            <div
                class="page-wrapper"
                style="cursor: {page.onclick ? 'pointer' : 'default'};"
                onclick={page.onclick ? page.onclick : () => {}}
                onkeypress={page.onkeypress ? page.onkeypress : () => {}}
                role="button"
                tabindex="0"
            >
                <div class="page">
                    <div
                        class="page-content"
                        style="background-image: {page.background ?? 'none'};"
                    >
                        {#if !page.background && page.fallbackContent}
                            <div class="fallback-content">
                                {@html page.fallbackContent}
                            </div>
                        {/if}
                        {#if page.title}
                            <h4 style="width: calc({maxPageWidth}px - 1rem);">
                                {@html page.title}
                            </h4>
                        {/if}
                        {#if page.text}
                            <p style="width: calc({maxPageWidth}px - 1rem);">
                                {@html page.text}
                            </p>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
        <div class="spacer"></div>
    </div>
    <button
        class="btn prevPage"
        onclick={() => {
            carousel.scrollBy({
                left: -(maxPageWidth + spacing),
                behavior: "smooth",
            });
        }}
    >
        <span>&lt;</span>
    </button>
    <button
        class="btn nextPage"
        onclick={() => {
            carousel.scrollBy({
                left: maxPageWidth + spacing,
                behavior: "smooth",
            });
        }}
    >
        <span>&gt;</span>
    </button>
</div>

<style>
    .carousel {
        width: 100%;
        text-wrap: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        aspect-ratio: 21/9;
    }

    .carousel-container {
        position: relative;
    }

    .carousel-container > .btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        aspect-ratio: 1;
        background-color: var(--kolora-color-base);
        color: white;
        border: 4px solid black;
        font-size: 1.3rem;
        font-weight: bold;
        z-index: 1;
        opacity: 0;
        rotate: 45deg;
        transition: opacity 0.2s;
        cursor: pointer;
    }

    .carousel-container > .btn > span {
        display: inline-block;
        rotate: -45deg;
    }

    .carousel-container:hover > .btn {
        opacity: 1;
    }

    .carousel-container > .btn.prevPage {
        left: 0;
    }

    .carousel-container > .btn.nextPage {
        right: 0;
    }

    .page-wrapper {
        display: inline-block;
        margin: 0 calc(var(--spacing) / 2);
        min-width: 20px;
        max-width: 350px;
        height: 100%;
    }

    .page {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
        padding: 4px;
        background-color: black;
    }

    .page-content {
        display: inline-flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-end;
        gap: calc(var(--spacing) / 2);
        padding: var(--spacing);
        width: 100%;
        height: 100%;
        background-color: var(--kolora-color-base);
        color: white;
        background-size: cover;
        background-position: center;
    }

    .page-content .fallback-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .page-content h4 {
        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
        white-space: normal;
    }

    .page-content p {
        font-size: 0.8rem;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
        white-space: normal;
    }

    .spacer {
        display: inline-block;
        width: 40cqw;
    }
</style>
