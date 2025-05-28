import { animateNumberAsState } from "$lib/utils.svelte";

const formats = [
    {
        id: "insta-post",
        name: "Insta poszt",
        width: 1080,
        height: 1080,
        hPadding: 32,
        vPadding: 32,
        decorationSize: 30,
    },
    {
        id: "insta-story",
        name: "Insta story",
        width: 1080,
        height: 1920,
        hPadding: 48,
        vPadding: 256,
        decorationSize: 60,
    },
    {
        id: "fb-event-cover",
        name: "Fb esemény borítókép",
        width: 1920,
        height: 1080,
        hPadding: 48,
        vPadding: 64,
        decorationSize: 40,
    },
];
const shapes = ["zigzag", "sine", "arc", "line"];
const themes = [
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

export { formats, shapes, themes };

export default class PostGenerator {

    private canvas: HTMLCanvasElement | null = $state(null);
    private c: CanvasRenderingContext2D | null = $state(null);

    format = $state(formats[0]);
    theme = $state(themes[2]);
    shape = $state(themes[2].initialShape);
    fullBackground = $state(false);

    titleLine1 = $state("KOLORA");
    titleLine2 = $state(themes[2].name.toLowerCase());
    location = $state("");
    locationDisplaySzfv = $state(true);
    dateLine1 = $state("");
    dateLine2 = $state("");
    body1Title = $state("");
    body1Side = $state("");
    body1Desctiption = $state("");
    body2Title = $state("");
    body2Side = $state("");
    body2Desctiption = $state("");
    body3Title = $state("");
    body3Side = $state("");
    body3Desctiption = $state("");
    footerText = $state("");
    isPagableIndicatorVisible = $state(false);

    bodySectionsCount = animateNumberAsState(0);
    headerContentHeight = animateNumberAsState(0);
    headerHeight = animateNumberAsState(0);
    footerBottomPadding = animateNumberAsState(0);

    mount(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.c = canvas.getContext("2d");

        $effect(() => {
            this.shape = this.theme.initialShape;
            if (themes.some(t => t.name.toLowerCase() === this.titleLine2.toLowerCase())) {
                this.titleLine2 = this.theme.name.toUpperCase();
            }
        });

        $effect(() => {
            if (!this.canvas || !this.c) return;

            const w = this.canvas.width;
            const h = this.canvas.height;
            const isHeaderEmpty =
                !this.titleLine1 && !this.titleLine2 && !location && !this.dateLine1 && !this.dateLine2;
            this.headerContentHeight.value =
                (isHeaderEmpty ? 0 : this.fullBackground ? 156 : location ? 208 : 164) +
                this.format.vPadding +
                (this.fullBackground ? 0 : this.format.decorationSize);
            this.headerHeight.value = this.fullBackground
                ? h - this.format.decorationSize
                : this.headerContentHeight.value;

            this.c.fillStyle = this.fullBackground ? this.theme.colorSecondary : "white";
            this.c.fillRect(0, 0, w, h);

            this.c.fillStyle = this.theme.colorPrimary;
            this.c.fillRect(0, 0, w, this.headerHeight.value);

            switch (this.shape) {
                case "zigzag":
                    this.c.beginPath();
                    const zigzagHeight = this.format.decorationSize;
                    const zigzagWidth = this.format.decorationSize;
                    let y = this.headerHeight.value;
                    this.c.moveTo(0, y);

                    for (let x = 0; x <= w + zigzagWidth; x += zigzagWidth) {
                        this.c.lineTo(x, y);
                        y =
                            y === this.headerHeight.value
                                ? this.headerHeight.value + zigzagHeight
                                : this.headerHeight.value;
                    }

                    this.c.lineTo(w, this.headerHeight.value - 1);
                    this.c.lineTo(0, this.headerHeight.value - 1);
                    this.c.closePath();
                    this.c.fill();
                    break;
                case "sine":
                    this.c.beginPath();
                    const amplitude = this.format.decorationSize / 2; // Height of the sine wave
                    const frequency = w / this.format.decorationSize / Math.PI; // Number of sine waves across the width
                    const yOffset = this.headerHeight.value + amplitude; // Offset to center the wave vertically

                    for (let x = 0; x <= w; x++) {
                        const y =
                            yOffset +
                            amplitude * Math.sin((x / w) * frequency * Math.PI * 2);
                        x === 0 ? this.c.moveTo(x, y) : this.c.lineTo(x, y);
                    }

                    this.c.lineTo(w, this.headerHeight.value - 1);
                    this.c.lineTo(0, this.headerHeight.value - 1);
                    this.c.closePath();
                    this.c.fill();
                    break;
                case "arc":
                    this.c.beginPath();
                    const radius = this.format.decorationSize; // Radius of the half circles
                    let x = 0;

                    while (x < w) {
                        this.c.arc(
                            x + radius,
                            this.headerHeight.value,
                            radius,
                            Math.PI,
                            0,
                            true,
                        ); // Draw half-circle
                        x += radius * 2; // Move to the next position
                    }

                    this.c.lineTo(w, this.headerHeight.value - 1);
                    this.c.lineTo(0, this.headerHeight.value - 1);
                    this.c.closePath();
                    this.c.fill();
                    break;
                default:
                    break;
            }

            // Title
            this.c.fillStyle = "white";
            this.c.font = "72px sans-serif";
            this.c.fillText(this.titleLine1, this.format.hPadding, this.format.vPadding + 72);
            this.c.fillStyle = this.theme.colorSecondary;
            this.c.font = "bold 72px sans-serif";
            this.c.fillText(this.titleLine2, this.format.hPadding, this.format.vPadding + 144);

            // Location
            if (location) {
                this.c.fillStyle = this.theme.colorSecondary;
                this.c.beginPath();
                this.c.arc(
                    this.format.hPadding + 10,
                    this.format.vPadding + 192 - 16,
                    10,
                    0,
                    Math.PI,
                    true,
                );
                this.c.lineTo(this.format.hPadding + 10, this.format.vPadding + 192 + 6);
                this.c.closePath();
                this.c.fill();
                this.c.fillStyle = this.theme.colorPrimary;
                this.c.beginPath();
                this.c.arc(
                    this.format.hPadding + 10,
                    this.format.vPadding + 192 - 16,
                    3,
                    0,
                    Math.PI * 2,
                    true,
                );
                this.c.closePath();
                this.c.fill();
                this.c.fillStyle = "white";
                this.c.font = "30px sans-serif";
                this.c.fillText(this.location, this.format.hPadding + 36, this.format.vPadding + 192);
                const locationWidth = this.c.measureText(this.location).width;
                if (this.locationDisplaySzfv) {
                    this.c.fillStyle = this.theme.colorSecondary;
                    this.c.fillText(
                        "Székesfehérvár",
                        this.format.hPadding + 52 + locationWidth,
                        this.format.vPadding + 192,
                    );
                }
            }

            // Date
            this.c.fillStyle = "white";
            this.c.font = "72px sans-serif";
            const dateLine1Width = this.c.measureText(this.dateLine1).width;
            const dateLine2Width = this.c.measureText(this.dateLine2).width;
            this.c.fillText(
                this.dateLine1,
                w - this.format.hPadding - dateLine1Width,
                this.format.vPadding + 72,
            );
            this.c.fillText(
                this.dateLine2,
                w - this.format.hPadding - dateLine2Width,
                this.format.vPadding + 144,
            );

            // Body
            this.bodySectionsCount.value = [
                this.body1Title + this.body1Side + this.body1Desctiption,
                this.body2Title + this.body2Side + this.body2Desctiption,
                this.body3Title + this.body3Side + this.body3Desctiption,
            ].filter(Boolean).length;
            const bodyPadding = 48;
            const bodyTop =
                this.headerContentHeight.value + this.format.decorationSize + bodyPadding;
            const bodySectionHeight =
                (h - bodyTop - this.format.vPadding - bodyPadding * this.bodySectionsCount.value * 2) /
                this.bodySectionsCount.value;
            this.c.fillStyle = this.fullBackground ? "white" : this.theme.colorPrimary;
            this.c.font = "bold 64px sans-serif";
            this.c.fillText(
                this.body1Title,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight / 2,
                w - this.format.hPadding * 4 - this.c.measureText(this.body1Side).width,
            );
            this.c.fillText(
                this.body2Title,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2,
                w - this.format.hPadding * 4 - this.c.measureText(this.body2Side).width,
            );
            this.c.fillText(
                this.body3Title,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2,
                w - this.format.hPadding * 4 - this.c.measureText(this.body3Side).width,
            );
            this.c.font = "64px sans-serif";
            this.c.fillText(
                this.body1Side,
                w - this.format.hPadding * 2 - this.c.measureText(this.body1Side).width,
                bodyTop + bodySectionHeight / 2,
            );
            this.c.fillText(
                this.body2Side,
                w - this.format.hPadding * 2 - this.c.measureText(this.body2Side).width,
                bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2,
            );
            this.c.fillText(
                this.body3Side,
                w - this.format.hPadding * 2 - this.c.measureText(this.body3Side).width,
                bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2,
            );
            this.c.fillStyle = this.theme.colorSecondary;
            this.c.font = "40px sans-serif";
            this.c.fillText(
                this.body1Desctiption,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight / 2 + 56,
                w - this.format.hPadding * 4,
            );
            this.c.fillText(
                this.body2Desctiption,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight * 2 - bodySectionHeight / 2 + 56,
                w - this.format.hPadding * 4,
            );
            this.c.fillText(
                this.body3Desctiption,
                this.format.hPadding * 2,
                bodyTop + bodySectionHeight * 3 - bodySectionHeight / 2 + 56,
                w - this.format.hPadding * 4,
            );

            // Footer
            this.footerBottomPadding.value =
                h - this.format.vPadding - (this.fullBackground ? this.format.decorationSize : 0);
            this.c.fillStyle = this.fullBackground ? "white" : this.theme.colorPrimary;
            this.c.font = "40px sans-serif";
            this.c.fillText(
                this.footerText,
                this.format.hPadding,
                this.footerBottomPadding.value,
                w - this.format.hPadding * 2 - 64,
            );
            // Pagable indicator
            if (this.isPagableIndicatorVisible) {
                const pBottomRight = {
                    x: w - this.format.hPadding - 16,
                    y: this.footerBottomPadding.value,
                };
                this.c.fill(
                    new Path2D(
                        `m${pBottomRight.x} ${pBottomRight.y - 16}-12 12v-8c-8 0-17.5 5-20 11 0-13.5 9.5-19 20-19v-8z`,
                    ),
                );
            }
        });
    }

}