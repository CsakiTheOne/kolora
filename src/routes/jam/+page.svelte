<script>
    import SlamJamConfig from "$lib/slamjam/slamjamconfig";
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";

    let currentEvent = $state(SlamJamConfig.currentEvent);
</script>

<header>
    {#if currentEvent !== undefined}
        <Countdown
            targetDateTime={currentEvent?.relevantDateTime}
            backgroundColor="var(--on-primary-color)"
            color="var(--primary-color)"
        />
        <h1>{currentEvent?.title}</h1>
        {#if currentEvent?.state !== "upcoming"}
            <h2>Téma: {currentEvent?.theme}</h2>
        {/if}
    {:else}
        <h1>Slam Jam</h1>
    {/if}
</header>
<main>
    {#if currentEvent === undefined}
        <p>
            Jelenleg nincs tervezett Slam Jam esemény. Ha szeretnél részt venni
            egy Slam Jamen, nézz vissza később!
        </p>
    {:else if currentEvent?.descriptionHTML}
        <p>{@html currentEvent?.descriptionHTML}</p>
    {/if}
    <h3>Benedek Elek</h3>
    <h2>A játékos tót</h2>
    <p>
        Tramta, tramta, gyerekek,<br />
        Itt a réz síp, vegyetek,<br />
        Van itt játék mindenféle,<br />
        Bicska, melynek nincsen éle;<br />
        Kocsi, szekér, négy karikás,<br />
        Nézzétek meg, egy sem hibás.<br />
        Puska is van, ne félj tőle,<br />
        Nem kell szaladni előle,<br />
        Olyan puska, ez a puska,<br />
        Jobbat nem hoz a Jézuska.<br />
        Pojáca kell? Van nekem,<br />
        Tele vagyon a zsebem<br />
        Van pénzetek? Fizessetek,<br />
        Olcsón adom, siessetek.<br />
        A sípomnak nincsen párja,<br />
        Hat faluba, hat határba.<br />
        Megér akár száz forintot,<br />
        Hogyha én belefúvintok.<br />
        Valamennyit én csináltam,<br />
        Míg az országot bejártam,<br />
        Csinálok még többet is,<br />
        Hogyha kell, még ezret is!<br />
        Tramta, tramta gyermekek,<br />
        Most már Isten veletek!<br />
    </p>
</main>
<Footer />

<style>
    header {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }

    header,
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
    }

    main {
        margin: 0 auto;
        max-width: 720px;
    }
</style>
