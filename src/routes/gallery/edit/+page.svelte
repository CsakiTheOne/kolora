<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import Work from "$lib/model/Work";
    import GalleryUtils from "$lib/GalleryUtils";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import ChooseYourOwnAdventure from "$lib/ChooseYourOwnAdventure.svelte";

    let work: Work = $state(new Work());
    let currentUserUid = $state("");
    let cyoa = $derived(
        new ChooseYourOwnAdventure(
            work.workType === "Choose your own adventure" ? work : new Work(),
        ),
    );
    let isSidebarOpen = $state(true);

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
        }

        return () => {
            authListener();
        };
    });

    function saveWork() {
        firestore.works
            .save(
                { ...work, dateUploaded: new Date().toLocaleDateString("hu") },
                currentUserUid,
            )
            .then(() => {
                alert(work.id ? "Mű mentve!" : "Új mű mentve!");
            })
            .catch((err) => {
                alert("Hiba történt a mentés során.");
            });
    }
</script>

<div class="page">
    <div class="header-container">
        <SmallHeader
            path={[
                { title: "Galéria", href: "/gallery" },
                { title: "Profilom", href: `/profile/?id=${currentUserUid}` },
            ]}
            currentPage="Szerkesztő"
        />
    </div>
    <div class="editor">
        {#if isSidebarOpen}
            <div class="sidebar">
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
                            work.status = "draft";
                            saveWork();
                        }}
                        style="flex: 1"
                    >
                        <span class="mdi mdi-content-save"></span>
                        Mentés piszkozatként
                    </button>
                    <button
                        class="btn"
                        onclick={() => {
                            work.status = "pending";
                            saveWork();
                            alert(
                                "Az alkotásod megjelenik a galériában, amint egy Kolora tag jóváhagyja.",
                            );
                        }}
                        style="flex: 1"
                    >
                        <span class="mdi mdi-publish"></span>
                        Mentés és beküldés
                    </button>
                </div>

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

                <label for="workType">Műnem</label>
                <p>
                    Ez nem egyezik meg a műfajjal. Csak a mű megjelenítését
                    határozza meg ez a beállítás.
                </p>
                <select
                    name="workType"
                    value={work.workType}
                    onchange={(e) =>
                        (work = { ...work, workType: e.target.value })}
                    class="outlined-input"
                >
                    <option value="Choose your own adventure"
                        >Choose your own adventure</option
                    >
                    <option value="Írott mű"
                        >Írott mű (vers, novella, regény, stb.)</option
                    >
                    <option value="Egyéb"
                        >Nem írott mű (festmény, zene, slam, stb.)</option
                    >
                </select>

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
                    <a href="/docs/cyoa/" target="_blank">
                        <span class="mdi mdi-open-in-new"></span>
                        Dokumentáció megnyitása új lapon
                    </a>
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
                        Új oldal hozzáadása a végére
                    </button>
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
            </div>
        {:else}
            <div style="display: flex; flex-direction: column;">
                <button
                    class="btn"
                    aria-label="Oldalsáv kinyitása"
                    onclick={() => (isSidebarOpen = !isSidebarOpen)}
                    style="margin: var(--spacing);"
                >
                    <span class="mdi mdi-page-layout-sidebar-left"></span>
                </button>
                <button
                    class="btn"
                    aria-label="Mű mentése"
                    onclick={saveWork}
                    style="margin: var(--spacing);"
                >
                    <span class="mdi mdi-content-save"></span>
                </button>
            </div>
        {/if}

        <textarea
            class="outlined-input content-editor"
            name="workContent"
            value={work.content}
            oninput={(e) => (work = { ...work, content: e.target.value })}
            placeholder={work.workType === "Egyéb"
                ? "A műhöz tartozó linket ide másold be."
                : "A mű tartalma..."}
            style={work.workType !== "Egyéb" ? "min-height: 256px;" : ""}
        ></textarea>
    </div>
</div>

<style>
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
        width: 400px;
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
    }
</style>
