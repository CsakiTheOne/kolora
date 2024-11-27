<script lang="ts">
    import { onMount } from "svelte";

    const {
        pages,
        ...rest
    } = $props();

    let carousel: HTMLElement | null = $state(null);

    onMount(() => {
        function updateWidths() {
            const minPageWidth = 42;
            const maxPageWidth = (carousel?.clientWidth || 0) * .67;
            const scrollLeft = carousel?.scrollLeft || 0;
            const pageElements = carousel?.querySelectorAll(".page") || [];
            
            pageElements.forEach((page: HTMLElement) => {
                const distanceFromCenter = scrollLeft - (page.offsetLeft - page.clientWidth / 3);
                const absoluteDistanceFromCenter = Math.abs(distanceFromCenter);
                const pageWidth = Math.max(minPageWidth, maxPageWidth - absoluteDistanceFromCenter * .5);
                
                page.style.width = `${pageWidth}px`;
            });
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
        <div class="page" style="background: {page.background};">
            {page.title}
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
        padding: 0 calc(var(--spacing) * 2);
        border-radius: calc(var(--corner-radius) * 2);
    }
    
    .page {
        display: inline-flex;
        flex-direction: column;
        justify-content: end;
        gap: calc(var(--spacing) / 2);
        padding: calc(var(--spacing) / 2);

        margin: 0 calc(var(--spacing) / 2);
        border-radius: calc(var(--corner-radius) * 2);
        min-width: 20px;
        height: 100%;

        overflow: hidden;

        background-position: center !important;
        background-size: cover !important;
        color: white;
    }

    .spacer {
        display: inline-block;
        width: 20cqw;
    }
</style>