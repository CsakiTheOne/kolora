<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";
    import AccountToolbarIcon from "../AccountToolbarIcon.svelte";

    let { poi } = $props();
</script>

<header>
    <h3 class="title">{poi?.name ?? "Betöltés..."}</h3>
    <div class="toolbar">
        <button
            class="btn"
            onclick={() => {
                alert(
                    "Egy helyhez kötött üzenőfal, ahová bárki posztolhat és olvashat verseket, történeteket, vagy bármi egyéb gondolatot.",
                );
            }}
        >
            <span class="mdi mdi-help-circle"></span>
            Mi ez?
        </button>
        <a href={poi?.googleMapsLink} target="_blank" aria-label="Térkép">
            <span class="mdi mdi-map-marker"></span>
        </a>
        <span
            onclick={() => ThemeManager.toggleDarkLight()}
            class="mdi mdi-brightness-6"
        ></span>
        <AccountToolbarIcon />
    </div>
</header>

<style>
    header {
        position: relative;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0 calc(var(--spacing) / 2);
        width: 100%;
        height: 128px;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        overflow: hidden;
        white-space: nowrap;
    }

    .title {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: var(--spacing);
    }

    .toolbar {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        padding: calc(var(--spacing) / 2);
        align-items: center;
        overflow: hidden;
    }

    :global(.toolbar > span.mdi, .toolbar > a > span.mdi) {
        font-size: 1.3rem;
        cursor: pointer;
        padding: calc(var(--spacing) / 2);
        color: var(--on-primary-color);
    }
</style>
