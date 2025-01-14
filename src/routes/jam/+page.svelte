<script>
    import Alert from "../../components/Alert.svelte";
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import VerticalTimelineItem from "../../components/VerticalTimelineItem.svelte";

    const dateAnnouncement = new Date("2025-04-11T00:00:00");
</script>

<SmallHeader
    path={[{ title: "Galéria", href: "/gallery" }]}
    currentPage="Költészet napi kalandozás"
/>
<div class="secondary-header">
    <div>
        <h1>Költészet napi kalandozás</h1>
        <span>by WholesomeWare</span>
    </div>
    <Countdown
        targetDateTime={dateAnnouncement}
        backgroundColor="var(--on-primary-color)"
        color="var(--primary-color)"
    />
</div>
<main>
    <p>
        Idén egy kalandra invitállak benneteket, ahol a történet írás találkozik
        a játékokkal. Choose your own adventure műfajú műveket kell írnotok ezen
        a pályázaton. A cél, hogy minél több fiatal művész megismerje ezt a
        különleges műfajt.
    </p>

    <h3>Mi is az a "choose your own adventure"?</h3>
    <p>
        Ez egy olyan interaktív történet, ahol az olvasó döntései befolyásolják
        a cselekményt. A történet különböző pontjainál választási lehetőségek
        vannak, melyek más és más irányba viszik a cselekményt, így akár
        többféle befejezés is létezhet. Ezt a formátumot nevezzük játékkönyvnek
        is.
    </p>
    <a href="/docs/cyoa" target="_blank">
        <span class="mdi mdi-open-in-new"></span>
        Több infó a műfajról a dokumentációban
    </a>

    <h3>Menetrend</h3>
    <VerticalTimelineItem title="Felkészülési idő" subtitle="Kihírdetéstől">
        <p>
            A cyoa nem a legegyszerűbb műfaj és nem minden nap találkozunk vele.
            Ezért egy kis felkészülési idővel kezdünk, hogy minden érdeklődőnek
            legyen alkalma kicsit ismerkedni a műfajjal, már létező könyvekkel
            és művekkel, és az írás folyamatával.
        </p>
        <p>
            Egy téma lesz kihírdetve, ami alapján kell írni a műveiteket. De
            addig is ezen a weboldalon találhattok sok segítséget, példákat és
            egy könnyen tanulható szerkesztőt is, amiben írhatjátok az
            alkotásaitokat.
        </p>
    </VerticalTimelineItem>
    <VerticalTimelineItem
        title="Téma kihírdetés és írás kezdete"
        subtitle="Április 11. - Magyar költészet napja"
    >
        <p>
            Látjátok az oldal tetején a visszaszámlálást? Ha az lejár, akkor
            fogtok egy témát kapni ezen az oldalon. Ekkor kezdődik a hivatalos
            írásidőszak, amikor már a saját műveiteket írhatjátok.
        </p>
        <p>
            Nem kell kapkodni. Tervezgessetek, ötleteljetek, és találjatok ki
            valami kreatívat, amivel igazán ki tudjátok használni a műfaj
            adottságait. :D
        </p>
    </VerticalTimelineItem>
    <VerticalTimelineItem
        title="Beadási határidő"
        subtitle="Június 24. - Szent Iván napja"
    >
        <Alert
            icon="creation"
            title="Gemini a pályázat tervezésekor ezt mondta:"
        >
            <p>
                "Ez a nap a varázslatok, a boszorkányok és a természetfeletti
                erők ideje." :D
            </p>
        </Alert>
    </VerticalTimelineItem>
</main>
<Footer />

<style>
    .secondary-header {
        display: grid;
        gap: var(--spacing);
        padding: var(--spacing) 0;
        text-align: center;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }
</style>
