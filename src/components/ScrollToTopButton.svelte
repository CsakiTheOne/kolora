<script lang="ts">
    import { onMount } from "svelte";

    let scrollY = $state(0);
    let btn: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null = $state(null);

    onMount(() => {
        if (!btn) return;
        ctx = btn.getContext("2d");
    });

    $effect(() => {
        if (!btn || !ctx) return;

        ctx.clearRect(0, 0, btn.width, btn.height);
        ctx.beginPath();
        const offset = -scrollY / 100;
        for (let i = 0; i < 2 * Math.PI; i += 0.1) {
            const radius = 25 + Math.sin(offset + i * Math.PI * 2.25) * 2;
            ctx.lineTo(32 + radius * Math.cos(i), 32 + radius * Math.sin(i));
        }
        ctx.closePath();
        ctx.fillStyle =
            btn.computedStyleMap().get("color")?.toString() || "#000";
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fill(
            new Path2D(
                "M 21 23 H 43 V 25 H 21 Z M 31.5 25 L 36.5 30.5 H 32.5 V 45 H 30.5 V 30.5 H 26.5 Z",
            ),
        );

        if (scrollY > 350) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
        btn.style.opacity = "" + scrollY / 2000;
    });
</script>

<svelte:window bind:scrollY />
<canvas
    bind:this={btn}
    width="64"
    height="64"
    onclick={() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }}
    role="button"
    aria-label="Scroll to top"
>
</canvas>

<style>
    canvas {
        position: fixed;
        right: calc(var(--spacing) * 1.5);
        bottom: calc(var(--spacing) * 1.5);
        width: 64px;
        height: 64px;
        color: var(--primary-color);
        cursor: pointer;
        z-index: 9999;
    }
</style>
