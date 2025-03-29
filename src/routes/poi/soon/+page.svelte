<script>
    import SmallHeader from "../../../components/SmallHeader.svelte";
</script>

<main>
    <h1>Költészet napi kincsvadászat</h1>
    <p>
        Néhány városban matricák bukkantak fel. Ha ezeket megtalálod, verseket
        és egyéb meglepetéseket találhatsz.
    </p>
    <p>Már meg is találtál egyet! Nézz vissza ide Április 11-én!</p>
    <button
        class="btn"
        onclick={() => {
            window.location.href = "/";
        }}
    >
        Vissza a főoldalra
    </button>
    <button
        class="btn"
        onclick={() => {
            const title = encodeURIComponent("Költészet napi kincsvadászat");
            const dates = "20250411T000000Z/20250411T235959Z";
            const description = encodeURIComponent(
                "Néhány városban matricák bukkantak fel. Ha ezeket megtalálod, verseket és egyéb meglepetéseket találhatsz.",
            );
            window.open(
                `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${dates}&details=${description}&location=${""}`,
            );
        }}
    >
        <span class="mdi mdi-calendar"></span>
        Felvétel a naptárba
    </button>
</main>
