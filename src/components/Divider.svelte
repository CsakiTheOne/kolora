<script lang="ts">
    import { onMount } from "svelte";

    const {
        shape = "sine",
    } = $props();

    let canvas: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null = $state(null);
    let color = $state("");

    onMount(() => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        color = canvas.computedStyleMap().get("color")!.toString();
    });

    $effect(() => {
        if (!canvas || !ctx) return;
        canvas.width = canvas.parentElement!.clientWidth;

        let path = new Path2D();
        switch (shape) {
            case "zigzag":
                for (let i = 16; i < canvas.width - 16; i += 16) {
                    path.lineTo(i, canvas.height / 2 + (i % 32 === 0 ? -8 : 8));
                }
                break;
            case "sine":
                for (let i = 16; i < canvas.width - 16; i += 8) {
                    path.lineTo(
                        i,
                        (canvas.height / 2) + Math.sin(i / 8) * 8,
                    );
                }
                break;
            case "arc":
                for (let i = 32; i < canvas.width - 16; i += 32) {
                    path.arc(i, 8, 16, Math.PI, Math.PI * 2, true);
                }
                break;
            case "line":
                path.moveTo(16, canvas.height / 2);
                path.lineTo(canvas.width - 16, canvas.height / 2);
                break;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.stroke(path);
    });
</script>

<canvas width="100%" height="32" bind:this={canvas} style="color: var(--primary-color);"></canvas>