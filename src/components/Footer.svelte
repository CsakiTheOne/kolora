<script>
    import logos from "$lib/images/KoloraXWholesomeWareBlack.png";

    function startFuture() {
        alert(
            "If you are a non-employee who has discovered this facility amid " +
                "the ruins of civilization, welcome! And remember: Testing " +
                "is the future, and the future starts with you.",
        );
    }
</script>

<footer>
    <hr />
    <h3>Mi ez? Miért van itt QR kód?</h3>
    <p style="text-align: justify;">
        Helló! <a
            on:click={startFuture}
            href="https://youtu.be/XJIgHWnkcnA?si=-UEbccf0doUdc-Ui"
            target="_blank">Ha csak véletlen találtad meg</a
        >
        ezt az NFC matricát és QR kódot, akkor üdv a játékban! Magyar költészet napja
        alkalmából ilyesmiket rejtettem el Fehérváron különböző helyeken. Damn, a
        város elég nagy, hol a többi? Az Insta story-jaimba rakok segítségeket. Lesd
        meg itt:
        <a href="https://instagram.com/csakitheone" target="_blank">@csakitheone</a>
    </p>
    <hr />
    <p>
        Készítette és működteti a <a
            href="https://play.google.com/store/apps/dev?id=8177011913013516936"
            target="_blank">WholesomeWare</a
        > <a href="https://csakitheone.github.io/" target="_blank">(Csáki)</a> a
        <a
            href="https://www.facebook.com/profile.php?id=100094619973134"
            target="_blank">Kolora</a
        > támogatásával 💝
    </p>
    <button on:click={() => alert("Első kollaboráció, de remélem nem utolsó 💖")}>
        <img style="width: 100px;" src={logos} alt="Logók" />
    </button>
</footer>

<style>
    h3,
    p {
        margin-inline: var(--spacing);
        text-align: center;
    }

    hr {
        margin: var(--spacing);
        border: 1px solid var(--on-background-color);
    }

    button {
        outline: none;
        border: none;
        background: none;
    }
</style>
