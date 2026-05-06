<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import { onMount } from "svelte";
    import ComicPanel from "../../../components/ComicPanel.svelte";

    type Artist = Record<string, unknown> & { id: string };

    let view: "table" | "cards" = $state("table");
    let artists: Artist[] = $state([]);
    let extraColumns: string[] = $state([]);
    let newColumnName = $state("");
    let dirtyCells: Record<string, string> = $state({});

    const RESERVED_COLUMNS = new Set(["id"]);
    const COLUMN_ORDER = ["Név", "Tevékenység", "Elérhetőség"];

    const getFilteredArtists = (): Artist[] => artists; // TODO: apply filters

    const getColumns = (list: Artist[]): string[] => {
        const columns = new Set<string>(extraColumns);
        for (const artist of list) {
            for (const key of Object.keys(artist)) {
                if (!RESERVED_COLUMNS.has(key)) {
                    columns.add(key);
                }
            }
        }
        const all = Array.from(columns);
        const ordered = COLUMN_ORDER.filter((c) => all.includes(c));
        const rest = all.filter((c) => !COLUMN_ORDER.includes(c));
        return [...ordered, ...rest];
    };

    const getCellKey = (artistId: string, column: string): string =>
        `${artistId}__${column}`;

    const toCellString = (value: unknown): string => {
        if (value === null || value === undefined) {
            return "";
        }
        if (typeof value === "object") {
            try {
                return JSON.stringify(value);
            } catch {
                return "";
            }
        }
        return String(value);
    };

    const coerceToExistingType = (
        rawValue: string,
        currentValue: unknown,
    ): unknown => {
        if (typeof currentValue === "number") {
            const parsed = Number(rawValue);
            return Number.isFinite(parsed) ? parsed : currentValue;
        }
        if (typeof currentValue === "boolean") {
            const normalized = rawValue.trim().toLowerCase();
            if (normalized === "true") {
                return true;
            }
            if (normalized === "false") {
                return false;
            }
            return currentValue;
        }
        if (currentValue && typeof currentValue === "object") {
            try {
                return JSON.parse(rawValue);
            } catch {
                return currentValue;
            }
        }
        return rawValue;
    };

    const getCellDisplayValue = (artist: Artist, column: string): string => {
        const key = getCellKey(artist.id, column);
        if (key in dirtyCells) {
            return dirtyCells[key];
        }
        return toCellString(artist[column]);
    };

    const setLocalCellValue = (
        artistId: string,
        column: string,
        value: unknown,
    ): void => {
        artists = artists.map((artist) => {
            if (artist.id !== artistId) {
                return artist;
            }
            return {
                ...artist,
                [column]: value,
            };
        });
    };

    const handleCellInput = (
        artistId: string,
        column: string,
        value: string,
    ): void => {
        dirtyCells = {
            ...dirtyCells,
            [getCellKey(artistId, column)]: value,
        };
    };

    const commitCell = async (
        artist: Artist,
        column: string,
    ): Promise<void> => {
        const key = getCellKey(artist.id, column);
        if (!(key in dirtyCells)) {
            return;
        }

        const rawValue = dirtyCells[key];
        const nextValue = coerceToExistingType(rawValue, artist[column]);

        setLocalCellValue(artist.id, column, nextValue);
        const { [key]: _, ...rest } = dirtyCells;
        dirtyCells = rest;

        await firestore.artists.set(artist.id, { [column]: nextValue });
    };

    const addRow = async (): Promise<void> => {
        const columns = getColumns(getFilteredArtists());
        const nextArtist: Record<string, unknown> = {};

        if (columns.length === 0) {
            nextArtist["Név"] = "";
        }

        for (const column of columns) {
            nextArtist[column] = "";
        }

        await firestore.artists.add(nextArtist);
    };

    const deleteRow = async (artistId: string): Promise<void> => {
        await firestore.artists.set(artistId, null);
    };

    const isColumnEmpty = (column: string): boolean => {
        return getFilteredArtists().every((artist) => {
            const value = artist[column];
            return (
                value === null ||
                value === undefined ||
                value === 0 ||
                value === ""
            );
        });
    };

    const deleteColumn = async (column: string): Promise<void> => {
        extraColumns = extraColumns.filter((c) => c !== column);
        const visibleArtists = getFilteredArtists();
        await Promise.all(
            visibleArtists
                .filter((artist) => column in artist)
                .map((artist) =>
                    firestore.artists.set(artist.id, { [column]: null }),
                ),
        );
    };

    const addColumn = async (): Promise<void> => {
        const columnName = newColumnName.trim();
        if (
            !columnName ||
            RESERVED_COLUMNS.has(columnName) ||
            getColumns(getFilteredArtists()).includes(columnName)
        ) {
            return;
        }

        extraColumns = [...extraColumns, columnName];
        newColumnName = "";

        const visibleArtists = getFilteredArtists();
        await Promise.all(
            visibleArtists.map((artist) =>
                firestore.artists.set(artist.id, {
                    [columnName]: "",
                }),
            ),
        );
    };

    onMount(() => {
        const isOnMobile = window.innerWidth < 768;
        view = isOnMobile ? "cards" : "table";

        const unsubscribe = firestore.artists.listen((newArtists) => {
            artists = (newArtists as Artist[]).sort((a, b) => {
                const nameA = toCellString(a["Név"] || "").toLowerCase();
                const nameB = toCellString(b["Név"] || "").toLowerCase();
                return nameA.localeCompare(nameB);
            });
        });

        return () => {
            unsubscribe();
        };
    });
</script>

<main class="container-column">
    <h1>Kolora művész kezelő</h1>

    <div class="views flex gap-2">
        <button
            type="button"
            class="btn flex-1"
            class:panel-red={view === "table"}
            onclick={() => (view = "table")}
        >
            Táblázat
        </button>
        <button
            type="button"
            class="btn flex-1"
            class:panel-red={view === "cards"}
            onclick={() => (view = "cards")}
        >
            Kártyák
        </button>
    </div>

    <ComicPanel innerClass="panel-purple filters">
        Szűrők hamarosan...
    </ComicPanel>

    {#if view === "table"}
        <ComicPanel innerClass="view-table flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <input
                    type="text"
                    class="flex-1 border-4 border-black bg-white p-2 text-black md:w-auto"
                    placeholder="Új oszlop neve"
                    bind:value={newColumnName}
                    onkeydown={(event) => {
                        if (event.key === "Enter") {
                            void addColumn();
                        }
                    }}
                />
                <button type="button" class="btn" onclick={addColumn}
                    >+ Oszlop</button
                >
            </div>

            <div
                class="max-h-[70vh] overflow-auto border-4 border-black bg-white"
            >
                <table
                    class="w-full min-w-3xl border-collapse bg-white text-[#111111]"
                >
                    <thead>
                        <tr>
                            <th
                                class="sticky top-0 z-20 border-2 border-black bg-[#fde68a] px-1.5 py-1 text-left text-[#111111]"
                                >ID</th
                            >
                            {#each getColumns(getFilteredArtists()) as column}
                                <th
                                    class="sticky top-0 z-20 border-2 border-black bg-[#fde68a] px-1.5 py-1 text-left text-[#111111]"
                                >
                                    <div class="flex items-center gap-1">
                                        <span class="flex-1">{column}</span>
                                        {#if isColumnEmpty(column)}
                                            <button
                                                type="button"
                                                class="btn secondary-btn py-0! px-1! text-xs"
                                                title="Oszlop törlése"
                                                onclick={() =>
                                                    void deleteColumn(column)}
                                                aria-label="Oszlop törlése: {column}"
                                            >
                                                X
                                            </button>
                                        {/if}
                                    </div>
                                </th>
                            {/each}
                            <th
                                class="sticky top-0 z-20 border-2 border-black bg-[#fde68a] px-1.5 py-1"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if getFilteredArtists().length === 0}
                            <tr>
                                <td
                                    colspan={getColumns(getFilteredArtists())
                                        .length + 2}
                                    class="bg-[#fffef2] p-4 text-center text-[#111111] italic"
                                >
                                    Nincsenek művészek. Adj hozzá egy új sort.
                                </td>
                            </tr>
                        {:else}
                            {#each getFilteredArtists() as artist (artist.id)}
                                <tr class="even:bg-[#fffbeb]">
                                    <td
                                        class="border-2 border-black bg-white px-1 py-1 text-center"
                                    >
                                        <button
                                            type="button"
                                            class="btn secondary-btn"
                                            title={artist.id}
                                            onclick={() =>
                                                navigator.clipboard.writeText(
                                                    artist.id,
                                                )}
                                            aria-label="ID másolása"
                                        >
                                            <span class="mdi mdi-content-copy"
                                            ></span>
                                        </button>
                                    </td>
                                    {#each getColumns(getFilteredArtists()) as column}
                                        <td
                                            class="border-2 border-black bg-transparent px-1 py-1 text-left text-[#111111]"
                                        >
                                            <input
                                                type="text"
                                                class="w-full min-w-32 border-2 border-black bg-white px-1.5 py-1 text-[#111111] placeholder:text-gray-600 focus:bg-[#fffef2] focus:outline-3 focus:outline-black focus:-outline-offset-2"
                                                value={getCellDisplayValue(
                                                    artist,
                                                    column,
                                                )}
                                                oninput={(event) => {
                                                    handleCellInput(
                                                        artist.id,
                                                        column,
                                                        (
                                                            event.currentTarget as HTMLInputElement
                                                        ).value,
                                                    );
                                                }}
                                                onblur={() => {
                                                    void commitCell(
                                                        artist,
                                                        column,
                                                    );
                                                }}
                                                onkeydown={(event) => {
                                                    if (event.key === "Enter") {
                                                        (
                                                            event.currentTarget as HTMLInputElement
                                                        ).blur();
                                                    }
                                                }}
                                            />
                                        </td>
                                    {/each}
                                    <td
                                        class="border-2 border-black bg-white px-1 py-1 text-center"
                                    >
                                        <button
                                            type="button"
                                            class="btn secondary-btn whitespace-nowrap"
                                            onclick={() =>
                                                void deleteRow(artist.id)}
                                            aria-label="Sor törlése"
                                        >
                                            <span class="mdi mdi-delete"></span>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
            <button type="button" class="btn" onclick={addRow}>+ Sor</button>
        </ComicPanel>
    {:else if view === "cards"}
        <div class="view-cards flex flex-col md:flex-row md:flex-wrap gap-4">
            {#if getFilteredArtists().length === 0}
                <ComicPanel innerClass="panel-red text-center italic">
                    Nincsenek művészek.
                </ComicPanel>
            {:else}
                {#each getFilteredArtists() as artist (artist.id)}
                    <ComicPanel
                        outerClass="w-full md:w-auto"
                        innerClass="flex flex-col gap-2"
                    >
                        <h2>{artist["Név"] || "[névtelen]"}</h2>
                        {#each getColumns(getFilteredArtists()).filter((c) => c !== "Név") as column}
                            {#if toCellString(artist[column])}
                                <div class="mb-1">
                                    <span class="font-semibold">{column}:</span>
                                    <span class="ml-1"
                                        >{toCellString(artist[column])}</span
                                    >
                                </div>
                            {/if}
                        {/each}
                    </ComicPanel>
                {/each}
            {/if}
            <button type="button" class="btn w-full" onclick={addRow}
                >+ Kártya</button
            >
        </div>
    {/if}
</main>
