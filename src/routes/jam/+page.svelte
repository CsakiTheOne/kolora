<script>
    import SlamJamConfig from "$lib/slamjamconfig";
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";

    let currentEvent = $state(SlamJamConfig.currentEvent);
</script>

<header>
    {#if currentEvent !== undefined}
        <h1>???</h1>
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
    <p>
        <a href="/">&Lt; Vissza a főoldalra</a>
    </p>
    {#if currentEvent === undefined}
        <p>
            Jelenleg nincs tervezett Slam Jam esemény. Ha szeretnél részt venni
            egy Slam Jamen, nézz vissza később!
        </p>
    {:else if currentEvent?.descriptionHTML}
        <p>{@html currentEvent?.descriptionHTML}</p>
    {/if}
    <h3 style="text-align: center;">Benedek Elek</h3>
    <h2 style="text-align: center;">A játékos tót</h2>
    <p style="margin: auto;">
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
        display: grid;
        gap: var(--spacing);
        padding: var(--spacing) 0;
        text-align: center;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }

    main {
        display: grid;
        grid-template-columns: [full-start] 16px [main-start] 1fr [main-end] 16px [full-end];
        gap: var(--spacing);
        padding: var(--spacing) 0;
    }

    @media (min-width: 720px) {
        main {
            grid-template-columns: [full-start] 20% [main-start] 1fr [main-end] 20% [full-end];
        }
    }

    main > * {
        grid-column: main;
    }

    main > :is(h1, h2, h3, h4, h5, h6) {
        text-align: left;
    }
</style>
