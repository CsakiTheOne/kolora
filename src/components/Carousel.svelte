<script lang="ts">
    const { style = "", pages, ...rest } = $props();

    const spacing = 16;
    let carousel: HTMLElement | null = $state(null);
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
                            <h4>
                                {@html page.title}
                            </h4>
                        {/if}
                        {#if page.text}
                            <p>
                                {@html page.text}
                            </p>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <button
        class="btn prevPage"
        onclick={() => {
            carousel?.scrollBy({
                left: -carousel.clientWidth * 0.8,
                behavior: "smooth",
            });
        }}
        aria-label="Previous"
    >
        <span>&lt;</span>
    </button>
    <button
        class="btn nextPage"
        onclick={() => {
            carousel?.scrollBy({
                left: carousel.clientWidth * 0.8,
                behavior: "smooth",
            });
        }}
        aria-label="Next"
    >
        <span>&gt;</span>
    </button>
</div>

<style>
    .carousel {
        display: flex;
        gap: var(--spacing);
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        aspect-ratio: 21/9;
        scrollbar-width: none;
        border-left: 4px solid black;
        border-right: 4px solid black;
    }

    .carousel::-webkit-scrollbar {
        display: none;
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
        rotate: 45deg;
        cursor: pointer;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.2s;
    }

    .carousel-container > .btn > span {
        display: inline-block;
        rotate: -45deg;
    }

    .carousel-container:hover > .btn {
        opacity: 1;
    }

    .carousel-container > .btn.prevPage {
        left: -40px;
    }

    .carousel-container > .btn.nextPage {
        right: -4px;
    }

    .page-wrapper {
        flex: 0 0 min(80%, 520px);
        height: 100%;
        scroll-snap-align: center;
        scroll-snap-stop: always;
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
</style>
