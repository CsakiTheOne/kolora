<script>

    import HeaderTabRow from "./HeaderTabRow.svelte";

    const {
        selectedTab = "",
    } = $props();

</script>
<header>
    <div class="column">
        <p>művészet? kultúra? székesfehérvár?</p>
        <a href="/"><h1 style="color: #fff;">kolora!</h1></a>
        <!--p>
            <a
                href="https://www.facebook.com/profile.php?id=100094619973134"
                target="_blank"
            >
                <span class="mdi mdi-facebook"></span>
                Facebook
            </a>
            -
            <a
                href="https://www.instagram.com/koloraegyesulet/"
                target="_blank"
            >
                <span class="mdi mdi-instagram"></span>
                Instagram
            </a>
            -
            <a href="https://www.youtube.com/@koloraegyesulet" target="_blank">
                <span class="mdi mdi-youtube"></span>
                YouTube
            </a>
        </p-->
    </div>
    <div class="toolbar">
        <!--span onclick={() => document.body.classList.toggle('theme-dark')} class="mdi mdi-brightness-6"></span-->
    </div>
</header>

<HeaderTabRow
    tabs={[
        { title: "Idővonal", url: "/" },
        { title: "Elérhetőségek", url: "/contacts" },
    ]}
    {selectedTab}
    onSelectTab={() => {

    }}
/>

<style>
    header {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }

    .toolbar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        height: 48px;
    }

    .toolbar span {
        scale: 1.4;
        padding: var(--spacing);
        cursor: pointer;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
    }

    header a {
        color: var(--on-primary-color);
    }
</style>
