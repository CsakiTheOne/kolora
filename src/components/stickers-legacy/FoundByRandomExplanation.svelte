<script>
    function startFuture() {
        alert(
            "If you are a non-employee who has discovered this facility amid " +
                "the ruins of civilization, welcome! And remember: Testing " +
                "is the future, and the future starts with you.",
        );
    }
</script>

<div>
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
        <a href="https://instagram.com/csakitheone" target="_blank"
            >@csakitheone</a
        >
    </p>
</div>

<style>
    div > * {
        margin: var(--spacing);
    }

    h3,
    p {
        text-align: center;
    }

    hr {
        border: 1px solid var(--on-background-color);
    }
</style>
