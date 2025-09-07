<script lang="ts">
    import { onMount, untrack } from "svelte";

    const { ...rest } = $props();

    const decoAnimFramerate = 1000 / 60; // 60 FPS

    let currentEvent: any = $state(null);
    let isSoon: boolean = $state(false);

    let decoCanvas: HTMLCanvasElement | undefined = $state();
    let ctx: CanvasRenderingContext2D | undefined = $state();
    let animTimer = $state(0);

    const tempHardcodedEvents = [
        {
            name: "Kortárs ",
            location: "Museum Café",
            start: new Date("2025-06-01T19:30:00"),
            end: new Date("2025-06-01T21:00:00"),
            nowPlayingText: "Maya és Chad Gustavson @ Museum Café",
        },
        {
            name: "KAM",
            location: "Museum Café",
            start: new Date("2025-09-07T18:30:00"),
            end: new Date("2025-09-07T19:30:00"),
            nowPlayingText: "KAM @ Museum Café",
        },
    ];

    $effect(() => {
        ctx = decoCanvas?.getContext("2d") as CanvasRenderingContext2D;
        const decoAnimInterval = setInterval(() => {
            if (!decoCanvas || !ctx) return;
            animTimer += decoAnimFramerate;
            decoCanvas.width = decoCanvas.clientWidth;
            decoCanvas.height = decoCanvas.clientHeight;

            ctx.clearRect(
                0,
                0,
                decoCanvas.clientWidth,
                decoCanvas.clientHeight,
            );
            ctx.fillStyle = `rgba(255, 255, 255, .2)`;

            for (let i = 0; i < decoCanvas.clientWidth; i += 32) {
                const height =
                    (Math.sin((animTimer + i * 4) / 800) *
                        decoCanvas.clientHeight) /
                    (isSoon ? 4 : 2);
                const y = decoCanvas.clientHeight / 2 - height;
                ctx.fillRect(i, y, 16, height);
            }
        }, decoAnimFramerate);

        untrack(() => {
            //TODO: request current events from firebase
            currentEvent = tempHardcodedEvents.find((event) => {
                const now = new Date();
                return event.start <= now && event.end >= now;
            });
            isSoon = false;
            if (!currentEvent) {
                // If no current event, check next event today
                currentEvent = tempHardcodedEvents.find((event) => {
                    const now = new Date();
                    return (
                        event.start.toDateString() === now.toDateString() &&
                        event.start > now && event.start <= new Date(now.getTime() + 60 * 60 * 1000 * 2)
                    );
                });
                isSoon = true;
            }
        });

        return () => {
            clearInterval(decoAnimInterval);
        };
    });
</script>

{#if currentEvent && currentEvent.nowPlayingText}
    <div class="card" {...rest}>
        <canvas class="deco" bind:this={decoCanvas}></canvas>
        <div class="content">
            <p>
                <b>
                    {#if isSoon}
                        Hamarosan kezdődik
                    {:else}
                        Now playing™️
                    {/if}
                </b>
            </p>
            <p>{currentEvent?.nowPlayingText}</p>
        </div>
    </div>
{/if}

<style>
    .card {
        position: relative;
        background-color: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
        border-radius: var(--corner-radius);
        overflow: hidden;
        height: fit-content;
    }

    canvas.deco {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .content {
        position: relative;
        padding: var(--spacing);
        z-index: 2;
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
