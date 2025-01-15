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
    <h2>Téma: ???</h2>
</div>
<main>
    <p>
        Idén egy kalandra invitállak benneteket, ahol a történet írás találkozik
        a játékokkal. Choose your own adventure műfajú műveket kell írnotok ezen
        a pályázaton. A cél, hogy minél több fiatal művész megismerje ezt a
        különleges és egyedien játékos műfajt.
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

    <h3>Írás és leadás módja</h3>
    <p>
        Az írásra és a leadásra egy egyszerű, webes szerkesztőt használunk.
        Ebben tudtok írni, szerkeszteni, és a végén leadni a műveiteket. A
        szerkesztő használatáról bővebben a dokumentációban olvashattok.
    </p>
    <a href="/docs/editor" target="_blank">
        <span class="mdi mdi-open-in-new"></span>
        Szerkesztő használata
    </a>
    <p>
        Ha saját szövegszerkesztőt vagy papírt szeretnétek használni, akkor is
        érdemes elolvasni a dokumentációt, hogy az interaktív elemek tökéletesen
        működjenek az oldalon.
    </p>
    <Alert icon="information">
        <p>
            Itt, a Kolora weboldalán játszható játékot csinálunk a
            történeteitekből! :D
        </p>
    </Alert>

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
        title="Leadási határidő"
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
        <p>
            Ekkor kell leadni a műveiteket ezen az oldalon. Amint lejár az idő,
            nem lesz lehetőség módosítani a műveken, és minden beérkezett
            alkotás az oldalon publikussá válik (egy rövid ellenőrzés után).
        </p>
        <p>
            A beérkezett műveket bárki megtekintheti, és szavazhat a
            kedvenceire. Emellett a Kolora Egyesület tagjai is átnézik az
            alkotásokat. Ők képezik a zsűrit.
        </p>
    </VerticalTimelineItem>
    <VerticalTimelineItem title="Eredményhirdetés" isLastItem={true}>
        <p></p>
    </VerticalTimelineItem>

    <h3>Ihletek, ötletek, inspirációk</h3>
    <p>
        Itt van néhány ötlet, ami segíthet az írásban, vagy csak inspirálhat
        titeket:
    </p>
    <ul>
        <li>
            Nem kell minden oldalra továbbhaladási lehetőségeket rakni. A
            történetednek lehet több vége és zsákutcája. Pozitív, negatív,
            közömbös befejezések?
        </li>
        <li>
            Egy oldalon hivazkothatsz egy előző oldalra is. Időutazós történet?
        </li>
        <li>
            Nem kell minden oldalon több tovább vezető útnak lennie. Lehet csak
            1 is. Az olvasók egyszerre csak egy oldalt látnak. Ezt
            kihasználhatod a történetedben feszültség keltésre, titokzatos
            hangulat kialakítására, stb.
        </li>
        <li>
            Az olvasókat megkérheted dolgokra. Gurítsanak egy dobókockával,
            legyen náluk papír és ceruza, amire később fel kell írniuk valamit
            és csak akkor választhatnak egy utat, ha megoldottak egy rejtvényt.
            Néhány dologra ezek közül lesz lehetőség az oldalon, de egyelőre
            ezek az interakciók még kísérleti stádiumban vannak.
        </li>
        <li>
            Nézd meg a példa műveket a Kolora tagjaitól a <a href="/gallery">
                galériában
            </a>.
        </li>
    </ul>
    <p>Inspirációk a társas- és videójátékok világából:</p>
    <iframe
        width="100%"
        style="aspect-ratio: 16 / 9;"
        src="https://www.youtube.com/embed/QD1pbWCJcKQ?si=Snz2GBKBUlY4r5IO"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    <iframe
        width="100%"
        style="aspect-ratio: 16 / 9;"
        src="https://www.youtube.com/embed/BgvHNlgmKro?si=fEtGAEhBVEs3dyNv"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    <p>
        Bár a cyoa irományokban nehéz láthatatlan döntéseket készíteni, GMTK
        videója a döntésekről is adhat ötleteket:
    </p>
    <iframe
        width="100%"
        style="aspect-ratio: 16 / 9;"
        src="https://www.youtube.com/embed/6HZuSzlN2eI?si=LmY6FfzdT7g_ntFn"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
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
