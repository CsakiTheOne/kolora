<script lang="ts">
    import { ROLES } from "$lib/model/KoloraUser";
    import UserManager from "$lib/UserManager.svelte";
    import firestore from "$lib/firebase/firestore";
    import ComicPanel from "../../../components/ComicPanel.svelte";
    import Header from "../../../components/Header.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Divider from "../../../components/Divider.svelte";
    import { onMount } from "svelte";

    type StatEntry = { stickerId: string; source: string; visitedAt: string };

    let allStats: StatEntry[] = $state([]);
    let recentStats: StatEntry[] = $state([]);
    function toDatetimeLocalString(d: Date): string {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    const defaultSince = new Date();
    defaultSince.setHours(defaultSince.getHours() - 8);

    let isLoading = $state(false);
    let error = $state("");
    let recentSince = $state(toDatetimeLocalString(defaultSince));
    let lastRefreshed = $state<Date | null>(null);

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

    async function loadStats() {
        isLoading = true;
        error = "";
        try {
            const cutoff = new Date(recentSince);

            const [all, recent] = await Promise.all([
                firestore["event-2026-04-11"].getAllStats(),
                firestore["event-2026-04-11"].getStatsAfter(cutoff),
            ]);
            allStats = all;
            recentStats = recent;
            lastRefreshed = new Date();
        } catch (e) {
            error = "Nem sikerült betölteni az adatokat.";
            console.error(e);
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        loadStats();

        /*if (UserManager.instance.isLoaded && isMember) {
            loadStats();
        }*/
    });

    /*$effect(() => {
        if (UserManager.instance.isLoaded && isMember) {
            loadStats();
        }
    });*/
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    <ComicPanel innerClass="container-column panel-blue">
        <h1>
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
            <h2>
                <span class="mdi mdi-lock"></span>
                Nincs hozzáférésed ehhez az oldalhoz
            </h2>
            <p>Ez az oldal csak Kolora tagoknak érhető el.</p>
            <p>
                <a class="btn" href="/profile">Profil oldal megnyitása</a>
            </p>
        {:else}
            <div class="toolbar">
                <button class="btn" onclick={loadStats} disabled={isLoading}>
                    <span
                        class="mdi {isLoading
                            ? 'mdi-loading mdi-spin'
                            : 'mdi-refresh'}"
                    ></span>
                    Frissítés
                </button>
                {#if lastRefreshed}
                    <p class="text-small muted">
                        Utoljára frissítve: {lastRefreshed.toLocaleTimeString(
                            "hu-HU",
                        )}
                    </p>
                {/if}
            </div>

            {#if error}
                <p class="error-text">
                    <span class="mdi mdi-alert"></span>
                    {error}
                </p>
            {/if}

            <!-- Summary cards -->
            <div class="stats-grid">
                <ComicPanel
                    innerClass="container-column panel-yellow stat-card"
                >
                    <p class="stat-label">Összes látogatás</p>
                    <p class="stat-value">{allStats.length}</p>
                </ComicPanel>
                <ComicPanel
                    innerClass="container-column panel-purple-variant stat-card"
                >
                    <p class="stat-label">Egyedi forrás</p>
                    <p class="stat-value">{statsBySource.length}</p>
                </ComicPanel>
                <ComicPanel
                    innerClass="container-column panel-red-variant stat-card"
                >
                    <p class="stat-label">Látogatás ettől:</p>
                    <input
                        type="datetime-local"
                        class="datetime-input"
                        bind:value={recentSince}
                        onchange={loadStats}
                    />
                    <p class="stat-value">{recentStats.length}</p>
                </ComicPanel>
            </div>

            <Divider color="var(--kolora-color-yellow)" />

            <!-- Per-sticker breakdown -->
            <ComicPanel innerClass="container-column panel-purple">
                <h2>
                    <span class="mdi mdi-sticker"></span>
                    Látogatások matricánként
                </h2>
                {#if statsBySticker.length === 0}
                    <p>Nincs adat.</p>
                {:else}
                    <ul class="sticker-list">
                        {#each statsBySticker as { stickerId, count }}
                            <li class="sticker-row">
                                <span class="sticker-id">#{stickerId}</span>
                                <div class="bar-track">
                                    <div
                                        class="bar-fill"
                                        style="width: {(count / maxCount) *
                                            100}%"
                                    ></div>
                                </div>
                                <span class="sticker-count">{count}</span>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </ComicPanel>

            <!-- Source breakdown -->
            <ComicPanel innerClass="container-column panel-blue-variant">
                <h2>
                    <span class="mdi mdi-source-branch"></span>
                    Látogatások forrás szerint
                </h2>
                {#if statsBySource.length === 0}
                    <p>Nincs adat.</p>
                {:else}
                    <ul class="outlined-list">
                        {#each statsBySource as { source, count }}
                            <li class="source-row">
                                <span class="source-name">{source}</span>
                                <span class="source-count">{count}</span>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </ComicPanel>

            <!-- Recent visits log -->
            <ComicPanel innerClass="container-column panel-black">
                <h2>
                    <span class="mdi mdi-clock-outline"></span>
                    Legutóbbi látogatások
                </h2>
                {#if recentStats.length === 0}
                    <p>Nincs látogatás a kiválasztott időszakban.</p>
                {:else}
                    <ul class="outlined-list recent-list">
                        {#each [...recentStats].reverse() as entry}
                            <li class="recent-row">
                                <span class="mdi mdi-sticker-outline"></span>
                                <span class="recent-sticker"
                                    >#{entry.stickerId}</span
                                >
                                <span class="recent-source muted"
                                    >{entry.source}</span
                                >
                                <span class="recent-time"
                                    >{entry.visitedAt}</span
                                >
                            </li>
                        {/each}
                    </ul>
                {/if}
            </ComicPanel>
        {/if}
    </ComicPanel>
    <ComicPanel innerClass="container-column panel-red">
        <h2>Veszély zóna</h2>
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
                            alert("Statisztikák sikeresen törölve.");
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
</main>
<Footer />

<style>
    h1,
    h2 {
        text-transform: uppercase;
    }

    .toolbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .muted {
        opacity: 0.7;
    }

    .error-text {
        color: var(--kolora-color-red-variant);
        font-weight: bold;
    }

    /* Summary cards */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        width: 100%;
    }

    :global(.stat-card) {
        align-items: center;
        text-align: center;
        gap: 0.25rem !important;
    }

    .stat-label {
        font-size: 0.85rem;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        font-family: "Arsenal", Arial, Helvetica, sans-serif;
    }

    .datetime-input {
        background: transparent;
        border: 2px solid currentColor;
        color: inherit;
        font-weight: bold;
        padding: 0.25rem;
        cursor: pointer;
        width: 100%;
    }

    /* Bar chart */
    .sticker-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .sticker-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .sticker-id {
        font-family: monospace;
        font-size: 0.9rem;
        min-width: 130px;
        font-weight: bold;
    }

    .bar-track {
        flex: 1;
        height: 18px;
        background-color: rgba(255, 255, 255, 0.15);
        border: 2px solid currentColor;
    }

    .bar-fill {
        height: 100%;
        background-color: var(--kolora-color-yellow);
        transition: width 0.4s ease;
        min-width: 2px;
    }

    .sticker-count {
        font-weight: bold;
        min-width: 1.5rem;
        text-align: right;
    }

    /* Source list */
    .source-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;
    }

    .source-name {
        font-family: monospace;
        word-break: break-all;
    }

    .source-count {
        font-weight: bold;
        white-space: nowrap;
    }

    /* Recent log */
    .recent-list {
        max-height: 400px;
        overflow-y: auto;
    }

    .recent-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem;
        flex-wrap: wrap;
    }

    .recent-sticker {
        font-family: monospace;
        font-weight: bold;
    }

    .recent-source {
        flex: 1;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .recent-time {
        font-size: 0.8rem;
        white-space: nowrap;
    }
</style>
