<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import Alert from "../../../components/Alert.svelte";

    const shapes = ["rect", "circle", "arc", "line"];
    const postThemes = [
        {
            name: "Terasz",
            colorPrimary: "#313b72",
            colorSecondary: "#86bbd8",
            initialShape: "rect",
        },
        {
            name: "Akusztik",
            colorPrimary: "#531253",
            colorSecondary: "#b68cf0",
            initialShape: "circle",
        },
        {
            name: "Slam",
            colorPrimary: "#931621",
            colorSecondary: "#dc7f9b",
            initialShape: "arc",
        },
        {
            name: "Extra",
            colorPrimary: "#dda448",
            colorSecondary: "#554640",
            initialShape: "line",
        },
    ];

    let canvas: HTMLCanvasElement | null = null;
    let c: CanvasRenderingContext2D | null = null;
    const initialTheme = postThemes[2];

    let theme = $state(initialTheme);
    let shape = $state(initialTheme.initialShape);
    let fullBackground = $state(false);

    let location = $state("Museum Café");
    let locationDisplaySzfv = $state(true);
    let dateLine1 = $state("03/14");
    let dateLine2 = $state("19:00");
    let body1Title = $state("");
    let body1Side = $state("");
    let body1Desctiption = $state("");
    let body2Title = $state("");
    let body2Side = $state("");
    let body2Desctiption = $state("");
    let body3Title = $state("");
    let body3Side = $state("");
    let body3Desctiption = $state("");
    let footerText = $state("A belépés ingyenes.");

    onMount(() => {
        if (canvas) {
            c = canvas.getContext("2d");
        }
    });

    $effect(() => {
        shape = theme.initialShape;
    });

    $effect(() => {
        if (!canvas || !c) return;

        const w = canvas.width;
        const h = canvas.height;
        const shapeDecorationSize = 32;
        const headerHeight = fullBackground
            ? h - shapeDecorationSize
            : location
              ? 272
              : 256;
        const padding = 48;

        c.fillStyle = fullBackground ? theme.colorSecondary : "white";
        c.fillRect(0, 0, w, h);

        c.fillStyle = theme.colorPrimary;
        c.fillRect(0, 0, w, headerHeight);

        switch (shape) {
            case "rect":
                c.beginPath();
                const zigzagHeight = shapeDecorationSize;
                const zigzagWidth = shapeDecorationSize;
                let y = headerHeight;
                c.moveTo(0, y);

                for (let x = 0; x <= w + zigzagWidth; x += zigzagWidth) {
                    c.lineTo(x, y);
                    y =
                        y === headerHeight
                            ? headerHeight + zigzagHeight
                            : headerHeight;
                }

                c.lineTo(w, headerHeight);
                c.lineTo(0, headerHeight);
                c.closePath();
                c.fill();
                break;
            case "circle":
                c.beginPath();
                const amplitude = shapeDecorationSize / 2; // Height of the sine wave
                const frequency = (w / shapeDecorationSize / Math.PI) * 1.2; // Number of sine waves across the width
                const yOffset = headerHeight + amplitude; // Offset to center the wave vertically

                for (let x = 0; x <= w; x++) {
                    const y =
                        yOffset +
                        amplitude * Math.sin((x / w) * frequency * Math.PI * 2);
                    x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
                }

                c.lineTo(w, headerHeight);
                c.lineTo(0, headerHeight);
                c.closePath();
                c.fill();
                break;
            case "arc":
                c.beginPath();
                const radius = shapeDecorationSize; // Radius of the half circles
                let x = 0;

                while (x < w) {
                    c.arc(x + radius, headerHeight, radius, Math.PI, 0, true); // Draw half-circle
                    x += radius * 2; // Move to the next position
                }

                c.lineTo(w, headerHeight);
                c.lineTo(0, headerHeight);
                c.closePath();
                c.fill();
                break;
            default:
                break;
        }

        // Title
        c.fillStyle = "white";
        c.font = "72px sans-serif";
        c.fillText("KOLORA", padding, padding + 72);
        c.fillStyle = theme.colorSecondary;
        c.font = "bold 72px sans-serif";
        c.fillText(theme.name.toUpperCase(), padding, padding + 144);

        // Location
        if (location) {
            c.fillStyle = theme.colorSecondary;
            c.beginPath();
            c.arc(padding + 10, padding + 192 - 16, 10, 0, Math.PI, true);
            c.lineTo(padding + 10, padding + 192 + 6);
            c.closePath();
            c.fill();
            c.fillStyle = theme.colorPrimary;
            c.beginPath();
            c.arc(padding + 10, padding + 192 - 16, 3, 0, Math.PI * 2, true);
            c.closePath();
            c.fill();
            c.fillStyle = "white";
            c.font = "30px sans-serif";
            c.fillText(location, padding + 36, padding + 192);
            const locationWidth = c.measureText(location).width;
            if (locationDisplaySzfv) {
                c.fillStyle = theme.colorSecondary;
                c.fillText(
                    "Székesfehérvár",
                    padding + 52 + locationWidth,
                    padding + 192,
                );
            }
        }

        // Date
        c.fillStyle = "white";
        c.font = "72px sans-serif";
        const dateLine1Width = c.measureText(dateLine1).width;
        const dateLine2Width = c.measureText(dateLine2).width;
        c.fillText(dateLine1, w - padding - dateLine1Width, padding + 72);
        c.fillText(dateLine2, w - padding - dateLine2Width, padding + 144);

        // Body
        const bodySectionsCount = [body1Title, body2Title, body3Title].filter(
            Boolean,
        ).length;
        const bodySectionHeight = (h - headerHeight - 72) / 2 - ((bodySectionsCount - 1) * 92)
        const firstBodySectionY = headerHeight + bodySectionHeight;
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "bold 72px sans-serif";
        c.fillText(
            body1Title,
            padding * 2,
            firstBodySectionY,
        );
        c.fillText(
            body2Title,
            padding * 2,
            firstBodySectionY + bodySectionHeight,
        );
        c.fillText(
            body3Title,
            padding * 2,
            firstBodySectionY + bodySectionHeight * 2,
        );
        c.font = "72px sans-serif";
        c.fillText(
            body1Side,
            w - 2 * padding - c.measureText(body1Side).width,
            firstBodySectionY,
        );
        c.fillText(
            body2Side,
            w - 2 * padding - c.measureText(body2Side).width,
            firstBodySectionY + bodySectionHeight,
        );
        c.fillText(
            body3Side,
            w - 2 * padding - c.measureText(body3Side).width,
            firstBodySectionY + bodySectionHeight * 2,
        );

        // Footer
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "bold 40px sans-serif";
        c.fillText(
            footerText,
            padding,
            h - padding - (fullBackground ? shapeDecorationSize : 0),
        );
    });
</script>

<SmallHeader
    path={[{ title: "Eszközök", href: "/member-tools" }]}
    currentPage="Poszt készítő"
/>
<main>
    <h2>Poszt készítő</h2>

    <h3>Téma</h3>
    <div class="input-row">
        <select class="outlined-input" bind:value={theme}>
            {#each postThemes as t}
                <option value={t}>{t.name}</option>
            {/each}
        </select>
        <select class="outlined-input" bind:value={shape}>
            {#each shapes as s}
                <option value={s}>{s}</option>
            {/each}
        </select>
    </div>
    <div>
        <input type="checkbox" bind:checked={fullBackground} />
        <span>Egy háttérszínű kártya</span>
    </div>

    <canvas width="1080" height="1080" bind:this={canvas}></canvas>

    <h3>Tartalom</h3>
    <h4>Helyszín és idő</h4>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Helyszín"
            bind:value={location}
        />
        <input type="checkbox" bind:checked={locationDisplaySzfv} />
        <span>Székesfehérvár felirat halványan</span>
    </div>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Dátum első sora"
            bind:value={dateLine1}
        />
        <input
            type="text"
            class="outlined-input"
            placeholder="Dátum második sora"
            bind:value={dateLine2}
        />
    </div>
    <h4>Első pont</h4>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Cím"
            bind:value={body1Title}
        />
        <input
            type="text"
            class="outlined-input"
            placeholder="Oldalsó szöveg"
            bind:value={body1Side}
        />
    </div>
    <input
        type="text"
        class="outlined-input"
        placeholder="Leírás"
        bind:value={body1Desctiption}
    />
    <h4>Második pont</h4>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Cím"
            bind:value={body2Title}
        />
        <input
            type="text"
            class="outlined-input"
            placeholder="Oldalsó szöveg"
            bind:value={body2Side}
        />
    </div>
    <input
        type="text"
        class="outlined-input"
        placeholder="Leírás"
        bind:value={body2Desctiption}
    />
    <h4>Harmadik pont</h4>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Cím"
            bind:value={body3Title}
        />
        <input
            type="text"
            class="outlined-input"
            placeholder="Oldalsó szöveg"
            bind:value={body3Side}
        />
    </div>
    <input
        type="text"
        class="outlined-input"
        placeholder="Leírás"
        bind:value={body3Desctiption}
    />
    <h4>Lábléc</h4>
    <input type="text" class="outlined-input" bind:value={footerText} />

    <Alert icon="download">
        <p>A kép letöltése csak gépen működik, mobilon nem.</p>
    </Alert>
</main>
<Footer />

<style>
    canvas {
        width: 100%;
        aspect-ratio: 1 / 1;
        box-shadow: 0 2px 6px black;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--spacing);
    }
</style>
