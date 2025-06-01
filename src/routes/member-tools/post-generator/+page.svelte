<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import Alert from "../../../components/Alert.svelte";
    import { animateNumberAsState } from "$lib/utils.svelte";
    import PostGenerator, {
        formats,
        shapes,
        themes,
    } from "$lib/member-tools/PostGenerator.svelte";
    import Divider from "../../../components/Divider.svelte";

    let canvas: HTMLCanvasElement | undefined = $state();
    let postGenerator = new PostGenerator();

    onMount(() => {
        if (!canvas) return;
        postGenerator.mount(canvas);
    });
</script>

<SmallHeader
    path={[{ title: "Eszközök", href: "/member-tools" }]}
    currentPage="Poszt készítő"
/>
<main class="adaptive-col-row">
    <div style="flex: 1;">
        <h2>Poszt készítő</h2>
        <canvas
            width={postGenerator.format.width}
            height={postGenerator.format.height}
            bind:this={canvas}
        ></canvas>
        <button
            class="btn"
            onclick={() => {
                if (!canvas) return;
                const dataUrl = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = `${postGenerator.format.id}.png`;
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
        <details open>
            <summary><h3>Megjelenés</h3></summary>
            <div class="input-row">
                <select
                    class="outlined-input"
                    bind:value={postGenerator.format}
                >
                    {#each formats as f}
                        <option value={f}>{f.name}</option>
                    {/each}
                </select>
                <select class="outlined-input" bind:value={postGenerator.theme}>
                    {#each themes as t}
                        <option value={t}>{t.name}</option>
                    {/each}
                </select>
                <select class="outlined-input" bind:value={postGenerator.shape}>
                    {#each shapes as s}
                        <option value={s}>{s}</option>
                    {/each}
                </select>
            </div>
            <div>
                <input
                    type="checkbox"
                    class="outlined-input"
                    bind:checked={postGenerator.fullBackground}
                />
                <span>Egy háttérszínű kártya</span>
            </div>
        </details>

        <details>
            <summary><h4>Fejléc</h4></summary>
            <div class="input-row">
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Cím első sora"
                    bind:value={postGenerator.titleLine1}
                />
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Cím második sora"
                    bind:value={postGenerator.titleLine2}
                />
            </div>
            <div class="input-row">
                <span class="mdi mdi-map-marker"></span>
                <input
                    type="text"
                    class="outlined-input"
                    list="data-locations"
                    placeholder="Helyszín pl. Museum Café"
                    bind:value={postGenerator.location}
                />
                <datalist id="data-locations">
                    <option value="Museum Café" />
                    <option value="Nyolcas Műhely" />
                </datalist>
                <input
                    type="checkbox"
                    class="outlined-input"
                    bind:checked={postGenerator.locationDisplaySzfv}
                />
                <span>Székesfehérvár felirat halványan</span>
            </div>
            <div class="input-row">
                <span class="mdi mdi-calendar"></span>
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Dátum pl. 03/14"
                    bind:value={postGenerator.dateLine1}
                />
                <span class="mdi mdi-clock"></span>
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Idő pl. 17:00"
                    bind:value={postGenerator.dateLine2}
                />
            </div>
        </details>

        <details>
            <summary><h4>Törzs</h4></summary>
            <h5>Első pont</h5>
            <div class="input-row">
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Cím pl. program neve"
                    bind:value={postGenerator.body1Title}
                />
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Oldalsó szöveg pl. program ideje"
                    bind:value={postGenerator.body1Side}
                />
            </div>
            <input
                type="text"
                class="outlined-input"
                placeholder="Leírás"
                bind:value={postGenerator.body1Desctiption}
            />
            {#if postGenerator.bodySectionsCount.value > 0}
                <h5>Második pont</h5>
                <div class="input-row">
                    <input
                        type="text"
                        class="outlined-input"
                        placeholder="Cím"
                        bind:value={postGenerator.body2Title}
                    />
                    <input
                        type="text"
                        class="outlined-input"
                        placeholder="Oldalsó szöveg"
                        bind:value={postGenerator.body2Side}
                    />
                </div>
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Leírás"
                    bind:value={postGenerator.body2Desctiption}
                />
            {:else}
                <p>Második pont elrejtve, amíg az első üres.</p>
            {/if}
            {#if postGenerator.bodySectionsCount.value > 1}
                <h5>Harmadik pont</h5>
                <div class="input-row">
                    <input
                        type="text"
                        class="outlined-input"
                        placeholder="Cím"
                        bind:value={postGenerator.body3Title}
                    />
                    <input
                        type="text"
                        class="outlined-input"
                        placeholder="Oldalsó szöveg"
                        bind:value={postGenerator.body3Side}
                    />
                </div>
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="Leírás"
                    bind:value={postGenerator.body3Desctiption}
                />
            {:else}
                <p>Harmadik pont elrejtve, amíg a második üres.</p>
            {/if}
        </details>

        <details>
            <summary><h4>Lábléc</h4></summary>
            <div class="input-row">
                <span class="mdi mdi-page-layout-footer"></span>
                <input
                    type="text"
                    class="outlined-input"
                    placeholder="pl. A belépés ingyenes. vagy Belépő: 1500Ft"
                    bind:value={postGenerator.footerText}
                />
                <button
                    class="btn"
                    style="white-space: nowrap;"
                    onclick={() => {
                        const price = prompt(
                            "Belépő ára (egyszerűen írd be a számot):",
                        );
                        if (price === "0")
                            postGenerator.footerText = "A belépés ingyenes.";
                        else if (price)
                            postGenerator.footerText = `Belépő: ${price}Ft`;
                    }}
                >
                    Belépő ár megadása
                </button>
            </div>
            <div>
                <input
                    type="checkbox"
                    class="outlined-input"
                    bind:checked={postGenerator.isPagableIndicatorVisible}
                />
                <span>Jelző ikon lapozható posztokhoz</span>
            </div>
        </details>
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

    summary {
        cursor: pointer;
    }

    summary > * {
        display: inline-block;
    }

    details > * {
        margin-top: var(--spacing);
    }
</style>
