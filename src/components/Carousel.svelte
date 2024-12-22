<script lang="ts">
    import { onMount } from "svelte";

    const { pages, ...rest } = $props();

    let carousel: HTMLElement | null = $state(null);
    let maxPageWidth = $state(0);

    onMount(() => {
        function updateWidths() {
            maxPageWidth = (carousel?.clientWidth || 0) * 0.6;
            const minPageWidth =
                (carousel?.clientWidth || 0) - maxPageWidth + 8;
            const scrollLeft = carousel?.scrollLeft || 0;
            const pageElements = carousel?.querySelectorAll(".page") || [];

            pageElements.forEach((page: HTMLElement) => {
                const distanceFromCenter =
                    page.offsetLeft - scrollLeft - (carousel?.offsetLeft || 0);
                const pageWidth = Math.max(
                    minPageWidth,
                    Math.min(
                        maxPageWidth,
                        maxPageWidth - distanceFromCenter * 0.25,
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
                //page.querySelector(".page-content").innerHTML = `w: ${carousel?.clientWidth} d: ${distanceFromCenter}`;
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

        document.addEventListener("resize", () => {
            updateWidths();
        });

        carousel?.addEventListener("scroll", () => {
            updateWidths();
        });

        updateWidths();
    });
</script>

<div class="carousel" bind:this={carousel} {...rest}>
    {#each pages as page}
        <div
            class="page"
            style="background: {page.background}; cursor: {page.onclick
                ? 'pointer'
                : 'default'};"
            onclick={page.onclick ? page.onclick : () => {}}
            onkeypress={page.onkeypress ? page.onkeypress : () => {}}
            role="button"
            tabindex="0"
        >
            <div class="page-content">
                {#if page.title}
                    <h4 style="width: calc({maxPageWidth}px - var(--spacing));">
                        {@html page.title}
                    </h4>
                {/if}
                {#if page.text}
                    <p style="width: calc({maxPageWidth}px - var(--spacing));">
                        {@html page.text}
                    </p>
                {/if}
            </div>
        </div>
    {/each}
    <div class="spacer"></div>
</div>

<style>
    .carousel {
        width: 100%;
        text-wrap: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        border-radius: calc(var(--corner-radius) * 2);
    }

    .page {
        display: inline-block;
        margin: 0 calc(var(--spacing) / 2);
        border-radius: calc(var(--corner-radius) * 2);
        min-width: 20px;
        height: 100%;

        overflow: hidden;

        background-color: var(--secondary-color);
        background-position: center !important;
        background-size: cover !important;
        color: white;
    }

    .page-content {
        display: inline-flex;
        flex-direction: column;
        justify-content: end;
        gap: calc(var(--spacing) / 2);
        padding: calc(var(--spacing) / 2);
        width: 100%;
        height: 100%;
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
