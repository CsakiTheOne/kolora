<script>
    import logos from "$lib/images/KoloraXWholesomeWareBlack.png";
</script>

<footer>
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
    footer > * {
        margin: var(--spacing);
    }
    
    p {
        text-align: center;
    }

    hr {
        border: 1px solid var(--on-background-color);
    }

    button {
        outline: none;
        border: none;
        background: none;
    }
</style>
