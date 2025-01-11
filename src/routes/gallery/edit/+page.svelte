<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import Work from "$lib/model/Work";
    import GalleryUtils from "$lib/GalleryUtils";
    import SmallHeader from "../../../components/SmallHeader.svelte";

    let work: Work = $state(new Work());
    let currentUserUid = $state("");

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
                    // Remove the id from the URL
                    const newUrl =
                        window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, newUrl);
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
        work.dateUploaded = new Date().toLocaleDateString();

        firestore.works
            .save(work, currentUserUid)
            .then(() => {
                alert(work.id ? "Mű mentve!" : "Új mű mentve!");
            })
            .catch((err) => {
                alert("Hiba történt a mentés során.");
            });
    }
</script>

<SmallHeader
    path={[
        { title: "Galéria", href: "/gallery" },
        { title: "Profilom", href: `/profile/?id=${work?.authorId}` },
    ]}
    currentPage="Szerkesztő"
/>
<main>
    <div class="metadata-editor">
        <div style="display: flex; gap: calc(var(--spacing) / 2);">
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
        />

        <label for="workDateCreated">Keletkezés dátuma</label>
        <input
            type="text"
            name="workDateCreated"
            value={work.dateCreated}
            oninput={(e) => (work = { ...work, dateCreated: e.target.value })}
            class="outlined-input"
        />

        <label for="workType">Műnem</label>
        <select
            name="workType"
            value={work.workType}
            onchange={(e) => (work = { ...work, workType: e.target.value })}
            class="outlined-input"
        >
            <option value="Choose your own adventure"
                >Choose your own adventure</option
            >
            <option value="Írott mű"
                >Egyéb írott mű (vers, novella, regény, stb.)</option
            >
            <option value="Egyéb"
                >Egyéb nem írott mű (festmény, zene, szobor, stb.)</option
            >
        </select>
        {#if work.workType === "Choose your own adventure"}
            <a href="/docs/cyoa/" target="_blank">
                <span class="mdi mdi-open-in-new"></span>
                Choose your own adventure dokumentáció megnyitása új lapon
            </a>
        {/if}

        <label for="workDescription">Mű leírása</label>
        <textarea
            name="workDescription"
            value={work.description}
            oninput={(e) => (work = { ...work, description: e.target.value })}
            class="outlined-input"
        ></textarea>
    </div>
    <div class="content-editor">
        <label for="workContent">
            {#if work.workType === "Egyéb"}
                Link a műhöz
            {:else}
                Mű tartalma
            {/if}
        </label>
        <textarea
            name="workContent"
            value={work.content}
            oninput={(e) => (work = { ...work, content: e.target.value })}
            class="outlined-input"
            style={work.workType !== "Egyéb" && "min-height: 256px;"}
        ></textarea>
    </div>
</main>
<Footer />

<style>
    textarea {
        width: 100%;
        resize: none;
        field-sizing: content;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: var(--spacing);
    }

    @media (min-width: 768px) {
        main {
            flex-direction: row;
        }
    }

    main > * {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

    .metadata-editor,
    .content-editor {
        background: var(--secondary-color);
        color: var(--on-secondary-color);
        padding: var(--spacing);
        border-radius: var(--corner-radius);
        width: 100%;
    }

    .metadata-editor {
        flex: 1;
    }

    .content-editor {
        flex: 2;
    }
</style>
