<script lang="ts">
    import UserManager from "$lib/UserManager.svelte";
    import firestore from "$lib/firebase/firestore";
    import ComicPanel from "../../../components/ComicPanel.svelte";
    import Header from "../../../components/Header.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Divider from "../../../components/Divider.svelte";
    import { onMount } from "svelte";

    type StatEntry = { stickerId: string; source: string; visitedAt: string };

    function visitDateToDate(visitedAt: string): Date {
        // visitedAt format: "YYYY. MM. DD. HH:mm:ss"
        const lastSpacceIndex = visitedAt.lastIndexOf(" ");
        const datePart = visitedAt
            .substring(0, lastSpacceIndex)
            .replace(/\.\s/g, "-")
            .replace(/\./g, "");
        const timePart = visitedAt
            .substring(lastSpacceIndex + 1)
            .replace(/:\s/g, ":")
            .split(":")
            .map((p) => p.padStart(2, "0"))
            .join(":");
        const isoString = `${datePart}T${timePart}`;
        return new Date(isoString);
    }

    let isLive = $state(false);
    let allStats: StatEntry[] = $state([]);
    const recentStats = $derived(
        allStats
            .filter(
                (s) => visitDateToDate(s.visitedAt) >= new Date(recentSince),
            )
            .sort(
                (a, b) =>
                    visitDateToDate(b.visitedAt).getTime() -
                    visitDateToDate(a.visitedAt).getTime(),
            ),
    );
    function toDatetimeLocalString(d: Date): string {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    const stickersByArea: Record<string, string[]> = {
        Bodajk: ["bodajk-tav", "g-buszmeg", "hszt", "ltp-buszmeg"],
        "Székesfehérvár, centrum": [
            "buszpu",
            "ciszter",
            "muzi",
            "puhakucko",
            "teleki",
        ],
        "Székesfehérvár, tó és tánc": ["tanchaz", "toparti"],
        "Székesfehérvár, vasút környéke": [
            "deak",
            "nyolcas-muhely",
            "vasut",
            "vpg",
        ],
        "Székesfehérvár, gyűrűn kívül": ["arpad", "vaci"],
    };
    const defaultSince = new Date(2026, 3, 11, 0, 0, 0);

    let isLoading = $state(false);
    let error = $state("");
    let recentSince = $state(toDatetimeLocalString(defaultSince));
    let lastRefreshed = $state<Date | null>(null);

    let isLocalhost = $state(false);
    let isAdvancedParam = $state(false);
    const allowDelete = $derived(
        (isAdvancedParam && UserManager.instance.koloraUser?.id === "hi1b98VKT0Pzu8ql8QsUqmVYubl1") || isLocalhost,
    );
    /*const isMember = $derived(
        UserManager.instance.koloraUser?.roles?.includes(ROLES.KOLORA_MEMBER),
    );*/

    const statsBySticker = $derived(
        [...new Set(allStats.map((s) => s.stickerId))]
            .map((stickerId) => ({
                stickerId,
                count: allStats.filter((s) => s.stickerId === stickerId).length,
            }))
            .sort((a, b) => b.count - a.count),
    );

    const statsBySource = $derived(
        (() => {
            const counts: Record<string, number> = {};
            for (const s of allStats) {
                counts[s.source] = (counts[s.source] ?? 0) + 1;
            }
            return Object.entries(counts)
                .map(([source, count]) => ({ source, count }))
                .sort((a, b) => b.count - a.count);
        })(),
    );

    const maxCount = $derived(
        Math.max(1, ...statsBySticker.map((s) => s.count)),
    );

    const readsByDay = $derived(
        (() => {
            const startingDate = new Date(recentSince);
            startingDate.setDate(startingDate.getDate() + 1);
            const today = new Date();
            today.setDate(today.getDate() + 1); // include today
            const dayCounts: Record<string, number> = {};
            for (
                let d = new Date(startingDate);
                d <= today;
                d.setDate(d.getDate() + 1)
            ) {
                const dayKey = d.toISOString().split("T")[0];
                dayCounts[dayKey] = 0;
            }
            for (const s of allStats) {
                const dayKey = visitDateToDate(s.visitedAt)
                    .toISOString()
                    .split("T")[0];
                if (dayKey in dayCounts) {
                    dayCounts[dayKey]++;
                }
            }
            const result = Object.entries(dayCounts).map(([day, count]) => ({
                day,
                count,
            }));
            return result;
        })(),
    );

    const maxDayCount = $derived(
        Math.max(1, ...readsByDay.map((d) => d.count)),
    );

    async function loadStats() {
        isLoading = true;
        error = "";
        try {
            allStats = await firestore["event-2026-04-11"].getAllStats();
            lastRefreshed = new Date();
        } catch (e) {
            error = "Nem sikerült betölteni az adatokat.";
            console.error(e);
        } finally {
            isLoading = false;
        }
    }

    function linkBySticker(stickerId: string): string {
        return `/projects/2026-04-11/sticker/${stickerId}/`;
    }

    onMount(() => {
        isLocalhost = window.location.hostname === "localhost";
        isAdvancedParam = new URLSearchParams(window.location.search).has("adv");

        isLoading = true;
        const unsubscribe = firestore["event-2026-04-11"].listenAll((stats) => {
            allStats = stats;
            lastRefreshed = new Date();
            isLoading = false;
        });
        isLive = true;

        return () => {
            unsubscribe();
            isLive = false;
        };
    });

    /*$effect(() => {
        if (UserManager.instance.isLoaded && isMember) {
            loadStats();
        }
    });*/
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    <h1 class="uppercase">
        <span class="mdi mdi-chart-bar"></span>
        Kincsvadászat 2026 — Statisztikák
    </h1>

    {#if !UserManager.instance.isLoaded}
        <p>
            <span class="mdi mdi-loading mdi-spin"></span>
            Betöltés...
        </p>
    {:else if false}
        <!-- TODO: Add member check later if needed -->
        <h2 class="uppercase">
            <span class="mdi mdi-lock"></span>
            Nincs hozzáférésed ehhez az oldalhoz
        </h2>
        <p>Ez az oldal csak Kolora tagoknak érhető el.</p>
        <p>
            <a class="btn" href="/profile">Profil oldal megnyitása</a>
        </p>
    {:else}
        <div class="flex flex-row items-center gap-2 flex-wrap">
            {#if isLive}
                <span
                    class="live-dot bg-green-500"
                    class:bg-yellow-500={isLoading}
                    title="Élő frissítés"
                ></span>
                <span class="bg-green-200 px-1 rounded text-sm">Élő adatok</span
                >
            {:else}
                <span class="mdi mdi-loading mdi-spin"></span>
            {/if}
            {#if lastRefreshed}
                <p class="text-sm opacity-70">
                    Utolsó lekérés: {lastRefreshed.toLocaleTimeString("hu-HU")}
                </p>
            {/if}
        </div>

        {#if error}
            <p class="text-[var(--kolora-color-red-variant)] font-bold">
                <span class="mdi mdi-alert"></span>
                {error}
            </p>
        {/if}

        <!-- Summary cards -->
        <div class="flex gap-4 flex-row">
            <ComicPanel
                outerClass="flex-1 md:flex-2"
                innerClass="container-column items-center text-center !gap-1"
            >
                <p class="text-sm font-bold uppercase flex items-center gap-1">
                    Összes látogatás
                </p>
                <p class="stat-value text-[2.5rem] font-bold">
                    {allStats.length}
                </p>
            </ComicPanel>
            <!-- Source breakdown -->
            <ComicPanel
                class="flex-1"
                innerClass="container-column panel-blue"
            >
                <p class="text-sm font-bold uppercase flex items-center gap-1">
                    <span class="mdi mdi-source-branch"></span>
                    Forrás szerint
                </p>
                {#if statsBySource.length === 0}
                    <p>Nincs adat.</p>
                {:else}
                    <div class="flex flex-row items-center">
                        {#each statsBySource as { source, count }}
                            <div
                                class="flex-1 border-2 flex flex-row items-center gap-2 p-2"
                            >
                                {#if source === "nfc"}
                                    <span class="mdi mdi-nfc-variant"></span>
                                {:else if source === "qr"}
                                    <span class="mdi mdi-qrcode"></span>
                                {:else}
                                    <span class="font-mono">{source}</span>
                                {/if}
                                <span class="font-bold whitespace-nowrap"
                                    >{count}</span
                                >
                            </div>
                        {/each}
                    </div>
                {/if}
            </ComicPanel>
        </div>

        <Divider color="var(--kolora-color-yellow)" />

        <div class="flex flex-col gap-4 lg:flex-row">
            <ComicPanel
                outerClass="lg:flex-1"
                innerClass="container-column panel-purple"
            >
                <h2 class="uppercase">
                    <span class="mdi mdi-sticker"></span>
                    Látogatások matricánként
                </h2>
                {#if statsBySticker.length === 0}
                    <p>Nincs adat.</p>
                {:else}
                    <ul class="list-none flex flex-col gap-2">
                        {#each statsBySticker.filter(({ count }) => count > 1) as { stickerId, count }}
                            <li class="flex items-center gap-3">
                                <a
                                    class="font-mono text-sm flex-1 font-bold"
                                    href={linkBySticker(stickerId)}
                                >
                                    #{stickerId}
                                </a>
                                <div
                                    class="flex-2 h-6 bg-white/15 border-2 border-current"
                                >
                                    <div
                                        class="h-full bg-[var(--kolora-color-yellow)] transition-[width] duration-[400ms] ease-in-out min-w-[2px]"
                                        style="width: {(count / maxCount) *
                                            100}%"
                                    ></div>
                                </div>
                                <span class="font-bold w-4 text-right"
                                    >{count}</span
                                >
                            </li>
                        {/each}
                    </ul>
                    {#if statsBySticker.some(({ count }) => count === 1)}
                        <h3>Egyszer látogatták</h3>
                        <p class="font-mono text-sm">
                            {@html statsBySticker
                                .filter(({ count }) => count === 1)
                                .map(
                                    (s) =>
                                        `<a class="font-mono" href="${linkBySticker(s.stickerId)}">#${s.stickerId}</a>`,
                                )
                                .join(", ")}
                        </p>
                    {/if}
                    {#if Object.keys(stickersByArea)
                        .flatMap((area) => stickersByArea[area])
                        .some((stickerId) => !statsBySticker.some((s) => s.stickerId === stickerId))}
                        <h3>Még felfedezetlen</h3>
                        <p class="font-mono text-sm">
                            {@html Object.keys(stickersByArea)
                                .flatMap((area) => stickersByArea[area])
                                .filter(
                                    (stickerId) =>
                                        !statsBySticker.some(
                                            (s) => s.stickerId === stickerId,
                                        ),
                                )
                                .map(
                                    (id) =>
                                        `<a class="font-mono" href="${linkBySticker(id)}">#${id}</a>`,
                                )
                                .join(", ")}
                        </p>
                    {/if}
                {/if}
            </ComicPanel>

            <ComicPanel
                outerClass="lg:flex-1"
                innerClass="container-column panel-yellow"
            >
                <h2 class="uppercase">
                    <span class="mdi mdi-calendar"></span>
                    Látogatások naponta
                </h2>
                <div class="flex flex-row gap-2 items-center">
                    Szűrés ettől:
                    <input
                        type="datetime-local"
                        class="bg-transparent border-2 border-current font-bold p-1 cursor-pointer flex-1"
                        bind:value={recentSince}
                        onchange={loadStats}
                    />
                </div>
                <svg
                    viewBox="0 0 1280 720"
                    class="w-full aspect-video outline-4"
                >
                    <rect
                        x="0"
                        y="0"
                        width="1280"
                        height="720"
                        fill="var(--kolora-color-yellow-variant)"
                    />
                    {#if readsByDay.length > 0}
                        {#each readsByDay as { day, count }, i (day)}
                            <rect
                                x={(i / readsByDay.length) * 1280}
                                y={720 - (count / maxDayCount) * 720}
                                width={(1280 / readsByDay.length) * 0.9}
                                height={(count / maxDayCount) * 720}
                                fill="var(--kolora-color-purple-variant)"
                            />
                            <text
                                x={(i / readsByDay.length) * 1280 + 8}
                                y={720 - (count / maxDayCount) * 720 + 8 + 56}
                                fill="var(--kolora-color-purple)"
                                font-size={56}
                            >
                                {count}
                            </text>
                            <text
                                x={(i / readsByDay.length) * 1280 +
                                    ((1280 / readsByDay.length) * 0.9) / 2 -
                                    32}
                                y={720 - 16}
                                fill="var(--kolora-color-purple)"
                                font-size={28}
                            >
                                {day.slice(5).replace("-", "/")}
                            </text>
                        {/each}
                    {:else}
                        <text
                            x="50%"
                            y="50%"
                            text-anchor="middle"
                            fill="rgba(255, 255, 255, 0.5)"
                            font-size="128"
                        >
                            Nincs adat.
                        </text>
                    {/if}
                </svg>
            </ComicPanel>

            <ComicPanel innerClass="container-column">
                <h2>Utolsó aktivitások</h2>
                <ul>
                    {#each Object.entries(stickersByArea)
                        .flatMap(([_, stickers]) => stickers)
                        .map((stickerId) => {
                            const lastVisit = allStats
                                .filter((s) => s.stickerId === stickerId)
                                .sort((a, b) => visitDateToDate(b.visitedAt).getTime() - visitDateToDate(a.visitedAt).getTime())[0];
                            return { stickerId, lastVisit };
                        })
                        .filter(({ lastVisit }) => lastVisit !== undefined)
                        .sort((a, b) => b.lastVisit?.visitedAt.localeCompare(a.lastVisit?.visitedAt) || 0) as { stickerId, lastVisit }}
                        <li
                            class="flex flex-row items-center gap-2 p-1"
                            title={lastVisit
                                ? `Utolsó látogatás: ${lastVisit.visitedAt}`
                                : "Még nem látogatták"}
                        >
                            <a
                                class="font-mono flex-1"
                                href={linkBySticker(stickerId)}>#{stickerId}</a
                            >
                            {#if lastVisit}
                                <span class="text-sm whitespace-nowrap"
                                    >{lastVisit.visitedAt.slice(6)}</span
                                >
                            {/if}
                        </li>
                    {/each}
                </ul>
            </ComicPanel>
        </div>

        <!-- Recent visits log -->
        <ComicPanel innerClass="container-column panel-black">
            <h2 class="uppercase">
                <span class="mdi mdi-clock-outline"></span>
                Legutóbbi látogatások ({recentStats.length})
            </h2>
            <div class="flex flex-row gap-2 items-center">
                Szűrés ettől:
                <input
                    type="datetime-local"
                    class="bg-transparent border-2 border-current font-bold p-1 cursor-pointer flex-1"
                    bind:value={recentSince}
                    onchange={loadStats}
                />
            </div>
            {#if recentStats.length === 0}
                <p>Nincs látogatás a kiválasztott időszakban.</p>
            {:else}
                <ul class="outlined-list">
                    {#each recentStats as entry}
                        <li class="flex flex-row items-center gap-4">
                            {#if entry.source === "nfc"}
                                <span class="mdi mdi-nfc-variant"></span>
                            {:else if entry.source === "qr"}
                                <span class="mdi mdi-qrcode"></span>
                            {:else}
                                <span class="font-mono">{entry.source}</span>
                            {/if}
                            <div class="flex-1 flex gap-4 items-baseline">
                                <a
                                    class="font-mono font-bold flex-1"
                                    href={linkBySticker(entry.stickerId)}
                                >
                                    #{entry.stickerId}
                                </a>
                                <span class="text-xs whitespace-nowrap"
                                    >{entry.visitedAt}</span
                                >
                            </div>
                            {#if allowDelete}
                                <button
                                    class="btn panel-red p-2"
                                    onclick={() => {
                                        const confirmDelete = confirm(
                                            `Biztosan törölni szeretnéd a ${entry.visitedAt} időpontban történt látogatást?`,
                                        );
                                        if (confirmDelete) {
                                            firestore["event-2026-04-11"]
                                                .deleteRecordByDate(
                                                    entry.visitedAt,
                                                )
                                                .then(() => {
                                                    loadStats();
                                                })
                                                .catch(() => {
                                                    alert(
                                                        "Hiba történt a látogatás törlése közben.",
                                                    );
                                                });
                                        }
                                    }}
                                >
                                    X
                                </button>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </ComicPanel>
    {/if}
    {#if allowDelete}
        <ComicPanel innerClass="container-column panel-red">
            <h2 class="uppercase">Veszély zóna</h2>
            <button
                class="btn"
                onclick={() => {
                    const confirmDelete = confirm(
                        "Biztosan törölni szeretnéd a Költészet napi kincsvadászat 2026 statisztikákat? Ez a művelet nem visszavonható.",
                    );
                    if (confirmDelete) {
                        firestore["event-2026-04-11"]
                            .deleteAllStats()
                            .then(() => {
                                loadStats();
                            })
                            .catch(() => {
                                alert(
                                    "Hiba történt a statisztikák törlése közben.",
                                );
                            });
                    }
                }}>Minden statisztika törlése</button
            >
        </ComicPanel>
    {/if}
</main>
<Footer />

<style>
    .stat-value {
        font-family: "Arsenal", Arial, Helvetica, sans-serif;
    }

    .live-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: blink 1.4s ease-in-out infinite;
        flex-shrink: 0;
    }

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
    }
</style>
