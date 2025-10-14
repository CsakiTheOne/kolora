<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";

    let canvas: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null = $state(null);
    let scrollY: number = $state(0);

    $effect(() => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
    });

    $effect(() => {
        if (!canvas || !ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 0;
        canvas.height = 30;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = ThemeManager.getThemeColor("--primary-color", canvas);
        ctx.lineWidth = Math.min(10, window.innerWidth / 100);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        // Sine wave
        for (let i = 16; i < canvas.width - 16; i++) {
            const offset = scrollY / 10;
            const y = canvas.height / 2 + Math.sin((i + offset) / 10) * 8;
            ctx.lineTo(i, y);
        }
        ctx.stroke();
    });
</script>

<svelte:window bind:scrollY />
<canvas bind:this={canvas}></canvas>
