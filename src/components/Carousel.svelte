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
            const maxPageWidth = (carousel?.clientWidth || 0) * .6;
            const scrollLeft = carousel?.scrollLeft || 0;
            const pageElements = carousel?.querySelectorAll(".page") || [];
            
            pageElements.forEach((page: HTMLElement) => {
                const distanceFromCenter =  page.offsetLeft - scrollLeft - carousel?.clientWidth / 3;
                const pageWidth = Math.max(minPageWidth, Math.min(maxPageWidth, maxPageWidth - distanceFromCenter * .55));
                const contentOpacity = Math.max(0, Math.min(1, 1 - Math.abs(distanceFromCenter) / carousel?.clientWidth));
                
                page.style.width = `${pageWidth}px`;
                page.querySelector(".page-content").style.opacity = contentOpacity.toString();
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
            <div class="page-content">
                {page.title}
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
        padding: 0 calc(var(--spacing) * 2);
        border-radius: calc(var(--corner-radius) * 2);
    }
    
    .page {
        display: inline-block;
        margin: 0 calc(var(--spacing) / 2);
        border-radius: calc(var(--corner-radius) * 2);
        min-width: 20px;
        height: 100%;

        overflow: hidden;

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

    .spacer {
        display: inline-block;
        width: 30cqw;
    }
</style>