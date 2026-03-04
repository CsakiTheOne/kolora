<script lang="ts">
    let canvas: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null = $state(null);
    let scrollY: number = $state(0);
    let innerWidth: number = $state(0);

    const {
        color = "var(--kolora-color-base)",
    } = $props();

    $effect(() => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
    });

    $effect(() => {
        if (!canvas || !ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 0;
        canvas.height = 32;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle =
            canvas.computedStyleMap().get("color")?.toString() || "black";
        ctx.lineWidth = Math.max(8, innerWidth / 200);
        ctx.lineCap = "butt";
        ctx.lineJoin = "miter";
        ctx.beginPath();
        // zigzag pattern
        const zigzagSize = 24;
        for (let x = ctx.lineWidth; x < canvas.width; x += zigzagSize) {
            const y =
                ((x - ctx.lineWidth) / zigzagSize) % 2 === 0
                    ? ctx.lineWidth
                    : canvas.height - ctx.lineWidth;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    });
</script>

<svelte:window bind:scrollY bind:innerWidth />
<canvas style="color: {color};" bind:this={canvas}></canvas>
