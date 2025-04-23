<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import Alert from "../../../components/Alert.svelte";
    import { animateNumberAsState } from "$lib/utils.svelte";

    const forms = [
        {
            id: "insta-post",
            name: "Insta poszt",
            width: 1080,
            height: 1080,
            hPadding: 32,
            vPadding: 32,
            decorationSize: 32,
        },
        {
            id: "insta-story",
            name: "Insta story",
            width: 1080,
            height: 1920,
            hPadding: 64,
            vPadding: 256,
            decorationSize: 92,
        },
        {
            id: "fb-event-cover",
            name: "Fb esemény borítókép",
            width: 1920,
            height: 1080,
            hPadding: 64,
            vPadding: 64,
            decorationSize: 64,
        },
    ];
    const shapes = ["zigzag", "sine", "arc", "line"];
    const postThemes = [
        {
            name: "Terasz",
            colorPrimary: "#313b72",
            colorSecondary: "#86bbd8",
            initialShape: "zigzag",
        },
        {
            name: "Akusztik",
            colorPrimary: "#531253",
            colorSecondary: "#b68cf0",
            initialShape: "sine",
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
    let location = $state("");
    let locationDisplaySzfv = $state(true);
    let dateLine1 = $state("");
    let dateLine2 = $state("");
    let body1Title = $state("");
    let body1Side = $state("");
    let body1Desctiption = $state("");
    let body2Title = $state("");
    let body2Side = $state("");
    let body2Desctiption = $state("");
    let body3Title = $state("");
    let body3Side = $state("");
    let body3Desctiption = $state("");
    let footerText = $state("");
    let isPagableIndicatorVisible = $state(false);

    let bodySectionsCount = animateNumberAsState(0);
    let headerContentHeight = animateNumberAsState(0);
    let headerHeight = animateNumberAsState(0);
    let footerBottomPadding = animateNumberAsState(0);

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
        const isHeaderEmpty =
            !titleLine1 && !titleLine2 && !location && !dateLine1 && !dateLine2;
        headerContentHeight.value =
            (isHeaderEmpty ? 0 : fullBackground ? 156 : location ? 208 : 164) +
            form.vPadding +
            (fullBackground ? 0 : form.decorationSize);
        headerHeight.value = fullBackground
            ? h - form.decorationSize
            : headerContentHeight.value;

        c.fillStyle = fullBackground ? theme.colorSecondary : "white";
        c.fillRect(0, 0, w, h);

        c.fillStyle = theme.colorPrimary;
        c.fillRect(0, 0, w, headerHeight.value);

        switch (shape) {
            case "zigzag":
                c.beginPath();
                const zigzagHeight = form.decorationSize;
                const zigzagWidth = form.decorationSize;
                let y = headerHeight.value;
                c.moveTo(0, y);

                for (let x = 0; x <= w + zigzagWidth; x += zigzagWidth) {
                    c.lineTo(x, y);
                    y =
                        y === headerHeight.value
                            ? headerHeight.value + zigzagHeight
                            : headerHeight.value;
                }

                c.lineTo(w, headerHeight.value - 1);
                c.lineTo(0, headerHeight.value - 1);
                c.closePath();
                c.fill();
                break;
            case "sine":
                c.beginPath();
                const amplitude = form.decorationSize / 2; // Height of the sine wave
                const frequency = w / form.decorationSize / Math.PI; // Number of sine waves across the width
                const yOffset = headerHeight.value + amplitude; // Offset to center the wave vertically

                for (let x = 0; x <= w; x++) {
                    const y =
                        yOffset +
                        amplitude * Math.sin((x / w) * frequency * Math.PI * 2);
                    x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
                }

                c.lineTo(w, headerHeight.value - 1);
                c.lineTo(0, headerHeight.value - 1);
                c.closePath();
                c.fill();
                break;
            case "arc":
                c.beginPath();
                const radius = form.decorationSize; // Radius of the half circles
                let x = 0;

                while (x < w) {
                    c.arc(
                        x + radius,
                        headerHeight.value,
                        radius,
                        Math.PI,
                        0,
                        true,
                    ); // Draw half-circle
                    x += radius * 2; // Move to the next position
                }

                c.lineTo(w, headerHeight.value - 1);
                c.lineTo(0, headerHeight.value - 1);
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
        bodySectionsCount.value = [
            body1Title + body1Side + body1Desctiption,
            body2Title + body2Side + body2Desctiption,
            body3Title + body3Side + body3Desctiption,
        ].filter(Boolean).length;
        const bodyPadding = 32;
        const bodyTop =
            headerContentHeight.value + form.decorationSize + bodyPadding;
        const bodySectionHeight =
            (h -
                headerContentHeight.value -
                form.decorationSize -
                40 -
                form.vPadding -
                bodyPadding * 2) /
            bodySectionsCount.value;
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "bold 64px sans-serif";
        c.fillText(
            body1Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight / 2,
            w - form.hPadding * 4 - c.measureText(body1Side).width,
        );
        c.fillText(
            body2Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2,
            w - form.hPadding * 4 - c.measureText(body2Side).width,
        );
        c.fillText(
            body3Title,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2,
            w - form.hPadding * 4 - c.measureText(body3Side).width,
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
        c.fillStyle = theme.colorSecondary;
        c.font = "40px sans-serif";
        c.fillText(
            body1Desctiption,
            form.hPadding * 2,
            bodyTop + bodySectionHeight / 2 + 56,
            w - form.hPadding * 4,
        );
        c.fillText(
            body2Desctiption,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2 + 56,
            w - form.hPadding * 4,
        );
        c.fillText(
            body3Desctiption,
            form.hPadding * 2,
            bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2 + 56,
            w - form.hPadding * 4,
        );

        // Footer
        footerBottomPadding.value =
            h - form.vPadding - (fullBackground ? form.decorationSize : 0);
        c.fillStyle = fullBackground ? "white" : theme.colorPrimary;
        c.font = "40px sans-serif";
        c.fillText(
            footerText,
            form.hPadding,
            footerBottomPadding.value,
            w - form.hPadding * 2 - 64,
        );
        // Pagable indicator
        if (isPagableIndicatorVisible) {
            const pBottomRight = {
                x: w - form.hPadding - 16,
                y: footerBottomPadding.value,
            };
            c.fill(
                new Path2D(
                    `m${pBottomRight.x} ${pBottomRight.y - 16}-12 12v-8c-8 0-17.5 5-20 11 0-13.5 9.5-19 20-19v-8z`,
                ),
            );
        }
    });
</script>

<SmallHeader
    path={[{ title: "Eszközök", href: "/member-tools" }]}
    currentPage="Poszt készítő"
/>
<main class="adaptive-col-row">
    <div style="flex: 1;">
        <h2>Poszt készítő</h2>
        <canvas width={form.width} height={form.height} bind:this={canvas}
        ></canvas>
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
    </div>

    <div style="flex: 3;">
        <h3>Megjelenés</h3>
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
            <input
                type="checkbox"
                class="outlined-input"
                bind:checked={fullBackground}
            />
            <span>Egy háttérszínű kártya</span>
        </div>

        <h4>Fejléc</h4>
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
        <div class="input-row">
            <span class="mdi mdi-map-marker"></span>
            <input
                type="text"
                class="outlined-input"
                list="data-locations"
                placeholder="Helyszín pl. Museum Café"
                bind:value={location}
            />
            <datalist id="data-locations">
                <option value="Museum Café" />
                <option value="Nyolcas Műhely" />
            </datalist>
            <input
                type="checkbox"
                class="outlined-input"
                bind:checked={locationDisplaySzfv}
            />
            <span>Székesfehérvár felirat halványan</span>
        </div>
        <div class="input-row">
            <span class="mdi mdi-calendar"></span>
            <input
                type="text"
                class="outlined-input"
                placeholder="Dátum pl. 03/14"
                bind:value={dateLine1}
            />
            <span class="mdi mdi-clock"></span>
            <input
                type="text"
                class="outlined-input"
                placeholder="Idő pl. 17:00"
                bind:value={dateLine2}
            />
        </div>
        <h4>Törzs - Első pont</h4>
        <div class="input-row">
            <input
                type="text"
                class="outlined-input"
                placeholder="Cím pl. program neve"
                bind:value={body1Title}
            />
            <input
                type="text"
                class="outlined-input"
                placeholder="Oldalsó szöveg pl. program ideje"
                bind:value={body1Side}
            />
        </div>
        <input
            type="text"
            class="outlined-input"
            placeholder="Leírás"
            bind:value={body1Desctiption}
        />
        {#if bodySectionsCount.value > 0}
            <h5>Második pont</h5>
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
        {:else}
            <p>Második pont elrejtve, amíg az első üres.</p>
        {/if}
        {#if bodySectionsCount.value > 1}
            <h5>Harmadik pont</h5>
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
        {:else}
            <p>Harmadik pont elrejtve, amíg a második üres.</p>
        {/if}
        <h4>Lábléc</h4>
        <div class="input-row">
            <span class="mdi mdi-page-layout-footer"></span>
            <input
                type="text"
                class="outlined-input"
                placeholder="pl. A belépés ingyenes. vagy Belépő: 1500Ft"
                bind:value={footerText}
            />
            <button
                class="btn"
                style="white-space: nowrap;"
                onclick={() => {
                    const price = prompt(
                        "Belépő ára (egyszerűen írd be a számot):",
                    );
                    if (price === "0") footerText = "A belépés ingyenes.";
                    else if (price) footerText = `Belépő: ${price}Ft`;
                }}
            >
                Belépő ár megadása
            </button>
        </div>
        <div>
            <input
                type="checkbox"
                class="outlined-input"
                bind:checked={isPagableIndicatorVisible}
            />
            <span>Jelző ikon lapozható posztokhoz</span>
        </div>
    </div>
</main>
<Footer />

<style>
    main {
        padding: var(--spacing);
        align-items: stretch;
    }

    main > * {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

    canvas {
        max-width: 100%;
        max-height: 72svh;
        box-shadow: 0 2px 6px black;
        align-self: center;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--spacing);
        align-items: center;
    }
</style>
