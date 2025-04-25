<script lang="ts">
    import { onMount } from "svelte";

    let loadingIndicator: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let elapsedTime = 0;

    onMount(() => {
        if (!loadingIndicator) return;
        ctx = loadingIndicator.getContext("2d");

        const loadingIndicatorInterval = setInterval(() => {
            if (!loadingIndicator || !ctx) return;
            ctx.clearRect(
                0,
                0,
                loadingIndicator.width,
                loadingIndicator.height,
            );
            ctx.beginPath();
            const offset = -elapsedTime / 500;
            for (let i = 0; i < 2 * Math.PI; i += 0.1) {
                const radius = 25 + Math.sin(offset + i * Math.PI * 2.25) * 2;
                ctx.lineTo(
                    32 + radius * Math.cos(i),
                    32 + radius * Math.sin(i),
                );
            }
            ctx.closePath();
            ctx.fillStyle =
                loadingIndicator.computedStyleMap().get("color")?.toString() ||
                "#000";
            ctx.fill();
            elapsedTime += 1000 / 60;
        }, 1000 / 60);

        return () => {
            clearInterval(loadingIndicatorInterval);
        };
    });
</script>

<main>
    <h1>Üzenőfal készülőben</h1>
    <div style="position: relative; width: 100%; height: 64px;">
        <canvas
            width="64"
            height="64"
            style="color: var(--primary-color); position: absolute; top: 0; left: calc(50% - 32px); z-index: 0;"
            bind:this={loadingIndicator}
        >
        </canvas>
        <span class="mdi mdi-map-marker" style="position: absolute; top: 50%; left: 50%; translate: -50% -45%;"></span>
    </div>
    <p>
        Itt egy helyhez kötött üzenőfal fog létrejönni a Kolora Egyesület által.
        Ez azt jelenti, hogy akik ide látogatnak, verseket, egyéb műveket és
        gondolatokat hagyhatnak egymásnak.
    </p>
    <p>
        Ha megtaláltad ezt a matricát, az azt jelenti, hogy 1-2 napon belül
        elérhető lesz az üzenőfal és szabadon írhatsz ide bármit másoknak.
        <br />
        Nézz vissza kicsit később! :D
    </p>
    <a href="/feeds">
        <button class="btn">
            <span class="mdi mdi-map"></span>
            Hol vannak még ilyenek?
        </button>
    </a>
    <a href="/">
        <button class="btn"> Mi az a Kolora Egyesület? </button>
    </a>
</main>

<style>
    p {
        text-align: justify;
    }

    button {
        width: 100%;
    }
</style>
