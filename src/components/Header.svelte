<script>
    import HeaderTabRow from "./HeaderTabRow.svelte";

    const { selectedTab = "" } = $props();
</script>

<header>
    <div class="column">
        <p>művészet? kultúra? székesfehérvár?</p>
        <a href="/"><h1 id="kolora-title" style="color: #fff;">kolora!</h1></a>
    </div>
    <div class="toolbar">
        <!--span onclick={() => document.body.classList.toggle('theme-dark')} class="mdi mdi-brightness-6"></span-->
    </div>

    <HeaderTabRow
        tabs={[
            { icon: "timeline", title: "Idővonal", url: "/" },
            { icon: "list-status", title: "Kiadás előtti teendők", url: "/todo" },
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

    @media (min-width: 720px) {
        header {
            padding: 0 20%;
        }
    }
</style>
