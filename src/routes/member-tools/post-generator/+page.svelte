<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import Alert from "../../../components/Alert.svelte";

    const forms = [
        {
            id: "insta-post",
            name: "Instagram poszt",
            width: 1080,
            height: 1080,
            hPadding: 32,
            vPadding: 32,
        },
        {
            id: "insta-story",
            name: "Instagram story",
            width: 1080,
            height: 1920,
            hPadding: 64,
            vPadding: 256,
        },
        {
            id: "fb-event-cover",
            name: "Facebook esemény borítókép",
            width: 1920,
            height: 1080,
            hPadding: 64,
            vPadding: 64,
        },
    ];
    const shapes = ["edgy", "wave", "arc", "line"];
    const postThemes = [
        {
            name: "Terasz",
            colorPrimary: "#313b72",
            colorSecondary: "#86bbd8",
            initialShape: "edgy",
        },
        {
            name: "Akusztik",
            colorPrimary: "#531253",
            colorSecondary: "#b68cf0",
            initialShape: "wave",
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

    let form = $state(forms[0]);
    let theme = $state(initialTheme);
    let shape = $state(initialTheme.initialShape);
    let fullBackground = $state(false);

    let titleLine1 = $state("KOLORA");
    let titleLine2 = $state("");
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
        titleLine2 = theme.name.toUpperCase();
    });

    $effect(() => {
        if (!canvas || !c) return;

        const w = canvas.width;
        const h = canvas.height;
        const shapeDecorationSize = 32;
        const isHeaderEmpty =
            !titleLine1 && !titleLine2 && !location && !dateLine1 && !dateLine2;
        const headerContentHeight =
            (isHeaderEmpty ? 0 : fullBackground ? 156 : location ? 248 : 200) +
            form.vPadding;
        const headerHeight = fullBackground
            ? h - shapeDecorationSize
            : headerContentHeight;

        c.fillStyle = fullBackground ? theme.colorSecondary : "white";
        c.fillRect(0, 0, w, h);

        c.fillStyle = theme.colorPrimary;
        c.fillRect(0, 0, w, headerHeight);

        switch (shape) {
            case "edgy":
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
            case "wave":
                c.beginPath();
                const amplitude = shapeDecorationSize / 2; // Height of the sine wave
                const frequency = w / shapeDecorationSize / Math.PI; // Number of sine waves across the width
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
        c.fillText(titleLine1, form.hPadding, form.vPadding + 72);
        c.fillStyle = theme.colorSecondary;
        c.font = "bold 72px sans-serif";
        c.fillText(titleLine2, form.hPadding, form.vPadding + 144);

        // Location
        if (location) {
            c.fillStyle = theme.colorSecondary;
            c.beginPath();
            c.arc(
                form.hPadding + 10,
                form.vPadding + 192 - 16,
                10,
                0,
                Math.PI,
                true,
            );
            c.lineTo(form.hPadding + 10, form.vPadding + 192 + 6);
            c.closePath();
            c.fill();
            c.fillStyle = theme.colorPrimary;
            c.beginPath();
            c.arc(
                form.hPadding + 10,
                form.vPadding + 192 - 16,
                3,
                0,
                Math.PI * 2,
                true,
            );
            c.closePath();
            c.fill();
            c.fillStyle = "white";
            c.font = "30px sans-serif";
            c.fillText(location, form.hPadding + 36, form.vPadding + 192);
            const locationWidth = c.measureText(location).width;
            if (locationDisplaySzfv) {
                c.fillStyle = theme.colorSecondary;
                c.fillText(
                    "Székesfehérvár",
                    form.hPadding + 52 + locationWidth,
                    form.vPadding + 192,
                );
            }
        }

        // Date
        c.fillStyle = "white";
        c.font = "72px sans-serif";
        const dateLine1Width = c.measureText(dateLine1).width;
        const dateLine2Width = c.measureText(dateLine2).width;
        c.fillText(
            dateLine1,
            w - form.hPadding - dateLine1Width,
            form.vPadding + 72,
        );
        c.fillText(
            dateLine2,
            w - form.hPadding - dateLine2Width,
            form.vPadding + 144,
        );

        // Body
        const bodySectionsCount = [body1Title, body2Title, body3Title].filter(
            Boolean,
        ).length;
        const bodyPadding = 64;
        const bodyTop = headerContentHeight + shapeDecorationSize + bodyPadding;
        const bodySectionHeight =
            (h -
                headerContentHeight -
                shapeDecorationSize -
                40 -
                form.vPadding -
                bodyPadding * 3) /
            bodySectionsCount;
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "bold 64px sans-serif";
        c.fillText(
            body1Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight / 2,
        );
        c.fillText(
            body2Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2,
        );
        c.fillText(
            body3Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2,
        );
        c.font = "64px sans-serif";
        c.fillText(
            body1Side,
            w - form.hPadding * 2 - c.measureText(body1Side).width,
            bodyTop + bodySectionHeight / 2,
        );
        c.fillText(
            body2Side,
            w - form.hPadding * 2 - c.measureText(body2Side).width,
            bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2,
        );
        c.fillText(
            body3Side,
            w - form.hPadding * 2 - c.measureText(body3Side).width,
            bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2,
        );

        // Footer
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "bold 40px sans-serif";
        c.fillText(
            footerText,
            form.hPadding,
            h - form.vPadding - (fullBackground ? shapeDecorationSize : 0),
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
        <select class="outlined-input" bind:value={form}>
            {#each forms as f}
                <option value={f}>{f.name}</option>
            {/each}
        </select>
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

    <canvas width={form.width} height={form.height} bind:this={canvas}></canvas>
    <button
        class="btn"
        onclick={() => {
            if (!canvas) return;
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = `${form.id}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }}
    >
        <span class="mdi mdi-download"></span>
        Letöltés
    </button>

    <h3>Tartalom</h3>
    <div class="input-row">
        <input
            type="text"
            class="outlined-input"
            placeholder="Cím első sora"
            bind:value={titleLine1}
        />
        <input
            type="text"
            class="outlined-input"
            placeholder="Cím második sora"
            bind:value={titleLine2}
        />
    </div>
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
</main>
<Footer />

<style>
    canvas {
        width: 100%;
        box-shadow: 0 2px 6px black;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--spacing);
    }
</style>
