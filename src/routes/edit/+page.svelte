<script lang="ts">
    import { onMount } from "svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import Work, { WORK_TYPES } from "$lib/model/Work";
    import GalleryUtils from "$lib/GalleryUtils";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import ChooseYourOwnAdventure from "$lib/ChooseYourOwnAdventure.svelte";
    import Backdrop from "../../components/Backdrop.svelte";

    let work: Work = $state(new Work());
    let currentUserUid = $state("");
    let cyoa = $derived(
        new ChooseYourOwnAdventure(
            work.workType === "Choose your own adventure" ? work : new Work(),
        ),
    );
    let isSetupRequired = $state(false);
    let isSidebarOpen = $state(true);
    let selection = $state({ start: 0, end: 0 });

    onMount(() => {
        const auth = initializeFirebase().auth;

        const authListener = auth.onAuthStateChanged((user) => {
            if (!user) {
                window.history.back();
            } else {
                currentUserUid = user.uid;
            }
        });

        const id = GalleryUtils.workId;

        if (id) {
            firestore.works
                .get(id)
                .then((fetchedWork) => {
                    work = fetchedWork;
                })
                .catch((err) => {
                    window.history.back();
                });
        } else {
            isSetupRequired = true;
        }

        window.onbeforeunload = () => {
            return "Az alkotásod mentetlen változásokat tartalmaz. Biztosan elhagyod az oldalt?";
        };

        return () => {
            authListener();
            window.onbeforeunload = null;
        };
    });

    function saveWork() {
        firestore.works
            .save({ ...work }, currentUserUid)
            .then(() => {
                alert(work.id ? "Mű mentve!" : "Új mű mentve!");
            })
            .catch((err) => {
                alert("Hiba történt a mentés során.");
            });
    }
</script>

<div class="page">
    {#if isSetupRequired}
        <Backdrop close={() => {}}>
            <div class="setup-dialog">
                <h2>Új mű beállítása</h2>
                <label for="workType">Mű típusa</label>
                <p>
                    Válassz egy mű típust, hogy a megfelelő eszközök és
                    beállítások jelenjenek meg.
                </p>
                <select
                    name="workType"
                    value={work.workType}
                    onchange={(e) =>
                        (work = { ...work, workType: e.target.value })}
                    class="outlined-input"
                >
                    {#each Object.entries(WORK_TYPES).map((r) => r[1]) as workType}
                        <option value={workType.label}>
                            {workType.description}
                        </option>
                    {/each}
                </select>
                <p>Később bármikor módosíthatod ezeket az adatokat.</p>
                <a href="/profile/?id={currentUserUid}" style="width: 100%;">
                    <button class="text-btn" style="width: 100%;">
                        <span class="mdi mdi-arrow-left"></span>
                        Vissza a profilra
                    </button>
                </a>
                <button
                    class="btn"
                    onclick={() => (isSetupRequired = false)}
                    style="width: 100%;"
                >
                    Szerkesztés folytatása
                </button>
            </div>
        </Backdrop>
    {/if}

    <div class="header-container">
        <SmallHeader
            path={[
                { title: "Profilom", href: `/profile/?id=${currentUserUid}` },
            ]}
            currentPage="Szerkesztő"
        />
    </div>
    <div class="editor">
        <div
            class="sidebar"
            style={isSidebarOpen ? "width: 400px;" : "min-width: 0;"}
        >
            {#if isSidebarOpen}
                <button
                    class="btn"
                    aria-label="Oldalsáv összecsukása"
                    onclick={() => (isSidebarOpen = !isSidebarOpen)}
                >
                    <span class="mdi mdi-page-layout-sidebar-left"></span>
                </button>
                <div
                    style="display: flex; gap: calc(var(--spacing) / 2); width: 100%;"
                >
                    <button
                        class="btn"
                        onclick={() => {
                            saveWork();
                        }}
                        style="flex: 1"
                    >
                        <span class="mdi mdi-content-save"></span>
                        Mentés
                    </button>
                </div>

                <button
                    class="btn"
                    onclick={() => (isSetupRequired = true)}
                    style="width: 100%;"
                >
                    <span class="mdi mdi-cog"></span>
                    Alapbeállítások
                </button>

                <p>
                    Láthatóság: A műved csak akkor látható ha egy posztban
                    megosztod.
                </p>

                <label for="workTitle">Mű címe</label>
                <input
                    type="text"
                    name="workTitle"
                    value={work.title}
                    oninput={(e) => (work = { ...work, title: e.target.value })}
                    class="outlined-input"
                    maxlength="100"
                />

                <label for="workDateCreated">Keletkezés dátuma</label>
                <input
                    type="text"
                    name="workDateCreated"
                    value={work.dateCreated}
                    oninput={(e) =>
                        (work = { ...work, dateCreated: e.target.value })}
                    class="outlined-input"
                    maxlength="100"
                />

                <label for="workGenre">Műfaj</label>
                <input
                    type="text"
                    name="workGenre"
                    value={work.genre}
                    oninput={(e) => (work = { ...work, genre: e.target.value })}
                    class="outlined-input"
                    maxlength="100"
                />

                <label for="workDescription">Mű leírása</label>
                <textarea
                    name="workDescription"
                    value={work.description}
                    oninput={(e) =>
                        (work = { ...work, description: e.target.value })}
                    class="outlined-input"
                    maxlength="500"
                    style="min-height: 92px; field-sizing: content !important;"
                ></textarea>

                {#if work.workType === "Choose your own adventure"}
                    <h3>Choose your own adventure eszközök</h3>

                    <p>
                        Oldalak ({cyoa.pages.length}):
                    </p>
                    <ol style="margin-left: var(--spacing);">
                        {#each cyoa.pages as page}
                            <li
                                style="margin-bottom: calc(var(--spacing) / 2);"
                            >
                                {page.title}<br />
                                <p style="font-size: .7rem; opacity: .7;">
                                    Linkek: {page.links
                                        .map((link) => link.page)
                                        .join(", ")}<br />
                                </p>
                            </li>
                        {/each}
                    </ol>
                {/if}
            {:else}
                <button
                    class="btn"
                    aria-label="Oldalsáv kinyitása"
                    onclick={() => (isSidebarOpen = !isSidebarOpen)}
                >
                    <span class="mdi mdi-page-layout-sidebar-left"></span>
                </button>
                <button class="btn" aria-label="Mű mentése" onclick={saveWork}>
                    <span class="mdi mdi-content-save"></span>
                </button>
            {/if}
        </div>

        <div class="content-editor">
            <div class="editor-toolbar">
                {#if work?.workType === "Choose your own adventure"}
                    <button
                        class="btn"
                        onclick={() => {
                            work = {
                                ...work,
                                content:
                                    `${work.content}\n\n## Új oldal címe\n\nOldal tartalma\n\n[Hivatkozás 1](#hivatkozás-1)\n\n[Hivatkozás 2](#hivatkozás-2)`.trim(),
                            };
                            window.scrollTo(0, document.body.scrollHeight);
                        }}
                    >
                        <span class="mdi mdi-note-plus"></span>
                        Új oldal a végére
                    </button>
                    <a href="/docs/cyoa/" target="_blank">
                        <span class="mdi mdi-open-in-new"></span>
                        CYOA dokumentáció
                    </a>
                {:else if work?.workType === "Írott mű"}
                    <span>
                        Az írott művek támogatják a <a
                            href="https://www.markdownguide.org/cheat-sheet/"
                            target="_blank">Markdown formázást</a
                        >.
                    </span>
                {/if}
            </div>
            <textarea
                class="outlined-input"
                name="workContent"
                value={work.content}
                oninput={(e) => (work = { ...work, content: e.target.value })}
                onselectionchange={(e) => {
                    selection = {
                        start: e.target.selectionStart,
                        end: e.target.selectionEnd,
                    };
                }}
                placeholder={work.workType === "Egyéb"
                    ? "A műhöz tartozó linket ide másold be."
                    : "A mű tartalma..."}
                style={work.workType !== "Egyéb" ? "min-height: 256px;" : ""}
            ></textarea>
        </div>
    </div>
</div>

<style>
    .setup-dialog {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        align-items: start;
        background: var(--secondary-color);
        color: var(--on-secondary-color);
        padding: var(--spacing);
        border-radius: var(--spacing);
        width: 100%;
        max-width: 400px;
        margin: var(--spacing) auto;
    }

    textarea {
        resize: none;
    }

    .page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100dvh;
        overflow: hidden;
    }

    .editor {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        min-height: 0;
        width: 100%;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: var(--spacing);
        background: var(--secondary-color);
        color: var(--on-secondary-color);
        padding: var(--spacing);
        text-align: start;
        overflow: auto;
    }

    .content-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
        overflow: hidden;
    }

    .content-editor > textarea {
        width: 100%;
        height: 100%;
    }

    .editor-toolbar {
        display: flex;
        flex-wrap: nowrap;
        gap: var(--spacing);
        padding: calc(var(--spacing) / 2);
        align-items: center;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }
</style>
