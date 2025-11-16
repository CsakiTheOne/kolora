<script lang="ts">
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let snowflakes: Snowflake[] = [];
    let animationId;

    class Snowflake {
        x: number;
        y: number;
        radius: number;
        speed: number;
        wind: number;
        age: number = 0;

        constructor(canvasWidth: number, canvasHeight: number) {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight - canvasHeight;
            this.radius = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
        }

        update(canvasHeight: number) {
            if (this.y < canvasHeight - this.radius) {
                this.y += this.speed;
                this.x += this.wind;
            }
            else if (this.age > 50) {
                this.x = Math.random() * window.innerWidth;
                this.y = -this.radius;
                this.age = 0;

            }
            else {
                this.age++;
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
            ctx.closePath();
        }
    }

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");

        snowflakes = [];
        for (let i = 0; i < 100; i++) {
            snowflakes.push(new Snowflake(canvas.width, canvas.height));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach((snowflake) => {
            snowflake.update(canvas.height);
            snowflake.draw(ctx);
        });

        animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    onMount(() => {
        const isDecember = new Date().getMonth() === 11;
        const isSnowForced = window.location.search.includes("snow=true");

        if (!isDecember && !isSnowForced) {
            return;
        }

        init();
        animate();
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }
</style>
