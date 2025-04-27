<script>
    import { ROLES } from "$lib/model/KoloraUser";
    import UserManager from "$lib/UserManager.svelte";
    import Alert from "../../components/Alert.svelte";
    import Footer from "../../components/Footer.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
</script>

<SmallHeader currentPage="Eszközök" />
<main>
    {#if !UserManager.instance.koloraUser?.roles?.includes(ROLES.KOLORA_MEMBER)}
        <Alert title="Sajnos ehhez az oldalhoz nincs hozzáférésed">
            <p>Ez az oldal csak Kolora tagoknak érhető el.</p>
            <p>
                Ha Kolora tag vagy, de mégis ezt látod, akkor ellenőrizd, hogy
                be vagy-e jelentkezve. Ha így sem működik, szólj Csákinak.
            </p>
        </Alert>
    {:else}
        <h2>Eszközök és források</h2>
        <a href="./design-system">
            <button class="btn">
                <span class="mdi mdi-palette"></span>
                Design rendszer
            </button>
        </a>
        <a href="./post-generator">
            <button class="btn">
                <span class="mdi mdi-post"></span>
                Poszt készítő
            </button>
        </a>
        <Alert icon="account" title="Kolora fiók létrehozás egyszerűen">
            <p>
                Ha valakinek szeretnél segíteni a Kolora fiók létrehozásban,
                akkor csak küldd el neki ezt a linket:
            </p>
            <button
                class="btn"
                onclick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.origin}/member-tools/auto-login`,
                    );
                }}
            >
                <span class="mdi mdi-content-copy"></span>
                Link másolása
            </button>
        </Alert>
        <h3>Linkek</h3>
        <a
            href="https://drive.google.com/drive/folders/1akxU9BGE1xXlYTHlrtUMhzKm8Cl8E2bu?usp=sharing"
            target="_blank"
        >
            <button class="btn">
                <span class="mdi mdi-google-drive"></span>
                Csáki Kolorás Drive mappája
            </button>
        </a>
        <a href="https://studio.youtube.com/" target="_blank">
            <button class="btn">
                <span class="mdi mdi-youtube-studio"></span>
                YouTube Studio
            </button>
        </a>
        <Alert icon="help">
            <p>
                Hiányzik innen valami? Ha van olyan eszköz, link, vagy bármi,
                ami szerinted hasznos lehet a Kolora tagoknak, szólj Csákinak és
                iderakja.
            </p>
        </Alert>
    {/if}
</main>
<Footer />

<style>
    button {
        width: 100%;
    }
</style>
