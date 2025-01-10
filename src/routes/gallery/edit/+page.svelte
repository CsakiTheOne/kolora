<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import Work from "$lib/model/Work";
    import GalleryUtils from "$lib/GalleryUtils";

    let work: Work = $state(new Work());
    let currentUserUid = $state("");

    onMount(() => {
        const firebase = initializeFirebase();
        const auth = firebase.auth;

        if (!auth.currentUser) {
            window.history.back();
            return;
        }

        currentUserUid = auth.currentUser.uid;

        const id = GalleryUtils.workId;

        if (id) {
            firestore.works.get(id)
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
    });

    function saveWork() {
        work.dateUploaded = new Date().toLocaleDateString();

        firestore.works.save(work, currentUserUid)
            .then(() => {
                alert(work.id ? "Mű mentve!" : "Új mű mentve!");
            })
            .catch((err) => {
                alert("Hiba történt a mentés során.");
            });
    }
</script>

<Header selectedTab="Galéria" />
<main>
    <div class="metadata-editor">
        <button class="btn" onclick={saveWork}>
            <span class="mdi mdi-content-save"></span>
            Mentés
        </button>

        <label for="workTitle">Mű címe</label>
        <input
            type="text"
            name="workTitle"
            bind:value={work.title}
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

        <label for="workDescription">Mű leírása</label>
        <textarea
            name="workDescription"
            bind:value={work.description}
            class="outlined-input"
        ></textarea>
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

    .metadata-editor {
        flex: 1;
    }

    .content-editor {
        flex: 2;
    }
</style>
