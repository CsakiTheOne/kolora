<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import {
        addDoc,
        collection,
        doc,
        Firestore,
        getDoc,
        setDoc,
    } from "firebase/firestore";
    import Work from "$lib/model/Work";
    import GalleryUtils from "$lib/GalleryUtils";

    let work: Work = $state(new Work());
    let db: Firestore | null = $state(null);

    onMount(() => {
        const id = GalleryUtils.workId;
        db = initializeFirebase().firestore;

        if (id) {
            const workRef = doc(db, "works", id);

            getDoc(workRef)
                .then((doc) => {
                    work = { ...new Work(), ...doc.data() };
                    // Remove the id from the URL
                    const newUrl = window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, newUrl);
                })
                .catch((err) => {
                    window.history.back();
                });
        }
    });

    function saveWork() {
        if (!db) return;

        work.dateUploaded = new Date().toLocaleDateString();

        if (work.id) {
            const workRef = doc(db, "works", work.id);
            setDoc(workRef, {...work})
                .then(() => {
                    alert("Mű mentve!");
                })
                .catch((err) => {
                    alert("Hiba történt a mentés során.");
                });
        } else {
            addDoc(collection(db, "works"), {...work})
                .then((e) => {
                    alert("Új mű mentve!");
                    work.id = e.id;
                    saveWork();
                })
                .catch((err) => {
                    alert("Hiba történt az új mű mentése során.");
                });
        }
    }
</script>

<Header selectedTab="Galéria" />
<main>
    <div class="metadata-editor">
        <label for="workTitle">Mű címe</label>
        <input
            type="text"
            name="workTitle"
            bind:value={work.title}
            class="outlined-input"
        />

        <label for="workAuthor">Mű szerzője</label>
        <input
            type="text"
            name="workAuthor"
            bind:value={work.author}
            class="outlined-input"
        />

        <label for="workDateCreated">Keletkezés dátuma</label>
        <input
            type="text"
            name="workDateCreated"
            bind:value={work.dateCreated}
            class="outlined-input"
        />

        <label for="workType">Műnem</label>
        <select
            name="workType"
            bind:value={work.workType}
            class="outlined-input"
        >
            <option value="Interaktív költemény">Choose your own adventure</option>
            <option value="Írott mű"
                >Egyéb írott mű (vers, novella, regény, stb.)</option
            >
            <option value="Egyéb"
                >Egyéb nem írott mű (festmény, zene, szobor, stb.)</option
            >
        </select>

        <label for="workDescription">Mű leírása</label>
        <textarea
            name="workDescription"
            bind:value={work.description}
            class="outlined-input"
        ></textarea>

        <button class="elevated-button" onclick={saveWork}>
            <span class="mdi mdi-content-save"></span>
            Mentés
        </button>
    </div>
    <div class="content-editor">
        <label for="workContent">Mű tartalma</label>
        <textarea
            name="workContent"
            bind:value={work.content}
            class="outlined-input"
        ></textarea>
    </div>
</main>
<Footer />

<style>
    textarea {
        resize: none;
        field-sizing: content;
    }

    main {
        display: flex;
        flex-direction: row;
        padding: var(--spacing);
    }

    main > * {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
    }

    .metadata-editor {
        flex: 1;
    }

    .content-editor {
        flex: 2;
    }
</style>
