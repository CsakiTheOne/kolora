<script>
    import ThemeManager from "$lib/ThemeManager";
    import HeaderTabRow from "./HeaderTabRow.svelte";

    const { selectedTab = "" } = $props();
</script>

<header>
    <div class="column">
        <p>Művészet? Kultúra? Székesfehérvár?</p>
        <a href="/"><h1 id="kolora-title">kolora!</h1></a>
    </div>
    <div class="toolbar">
        <span onclick={() => ThemeManager.toggleDarkLight()} class="mdi mdi-brightness-6"></span>
    </div>

    <HeaderTabRow
        tabs={[
            { icon: "timeline", title: "Idővonal", url: "/timeline" },
            { icon: "at", title: "Elérhetőségek", url: "/contacts" },
        ]}
        {selectedTab}
    />
</header>

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
        overflow: hidden;
    }

    .toolbar span {
        font-size: 1.3rem;
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

    @media (min-width: 720px) {
        header {
            padding: 0 20%;
        }
    }
</style>
