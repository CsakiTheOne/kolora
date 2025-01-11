<script>
    import Alert from "../../../components/Alert.svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
</script>

<SmallHeader
    path={[{ title: "Dokumentáció", href: "/docs" }]}
    currentPage="Choose your own adventure"
/>
<main>
    <h2>Choose your own adventure</h2>

    <h3>Mi ez a műfaj és hogyan működik?</h3>
    <p>
        A Choose your own adventure (CYOA) vagy Gamebook műfajú művek olyan
        interaktív történetek, amelyekben az olvasó dönthet a cselekmény
        alakulásáról. Ez a műfaj könyvekben is kétezik. Könyv formában általában
        a megadott részek végén az olvasó "lapozz ide ha" utasításokat talál és
        a döntése alapján halad tovább a műben.
    </p>
    <a href="https://en.wikipedia.org/wiki/Gamebook" target="_blank"
        >Gamebook Wiki oldala</a
    >
    <a href="https://www.google.com/search?q=A+Cave+of+Time" target="_blank">
        A Cave of Time - Edward Packard
    </a>
    <p>
        A Kolora oldalán is van lehetőség ilyen történeteket írni és olvasni,
        viszont itt egy kicsit máshogy működnek.
    </p>

    <h3>Felépítés és haladás</h3>
    <p>
        Egy CYOA mű oldalakból áll. Az olvasó egyszerre csak egy oldalt lát.
        Minden oldal végén más oldalakra lehet hivatkozni. Ezek a továbbhaladási
        lehetőségek. Minden hivatkozásnak van egy szövege is, ami az olvasót
        segíti a döntésben.
    </p>
    <p>
        Az oldalakat nem kötelező hivatkozásokkal ellátni. Lehet egy műnek több
        végpontja, zsákutcája is.
    </p>

    <h3>Markdown és írás folyamata</h3>
    <p>
        Az itteni CYOA művek nagyjából a <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank">Markdown formázás</a
        > szabályait követik. A Markdown egy egyszerű szöveg formázási nyelv, amely
        könnyen írható, olvasható és konvertálható HTML, PDF vagy más formátumokba.
    </p>
    <h4>Oldal</h4>
    <p>Egy oldal hozzáadásához egy 2-es szintű címsort kell használni:</p>
    <code>
        ## Oldal címe<br />
        <br />
        Oldal tartalma,<br />
        ami több soros is lehet.
    </code>
    <h4>Hivatkozás</h4>
    <p>
        Egy hivatkozás hozzáadásához egy Markdown link kell. Ez az elem 2
        részből áll. A szöveg és maga a hivatkozás.
    </p>
    <code> [Szöveg](#oldal-címe) </code>
    <p>
        Például ha van egy oldalad, aminek a címe: <code
            >## A sárkány támadása</code
        >, akkor a hivatkozás így néz ki:
    </p>
    <code> [Tovább a sárkány támadására](#a-sárkány-támadása) </code>
    <p>
        Az első részben bármi lehet. Nem feltétlen kell tartalmaznia utalást az
        oldal címére. Viszont a második résznek pontosnak kell lennie.
    </p>
    <Alert title="Teszt, teszt és teszt!">
        <p>
            Fontos, hogy mindig próbáld ki a művedet mielőtt közzéteszed! Menj
            végig minden úton és ellenőrizd, hogy minden hivatkozás helyesen
            működik!
        </p>
    </Alert>

    <h3>Egy egyszerű kis kaland</h3>
    <p>Az alábbi példa egy egyszerű kis kalandot mutat be.</p>
    <code>
        ## A barlang<br />
        <br />
        Egy sötét barlangban találod magad.<br />
        A bal oldalon egy sötét folyosó, a jobb oldalon egy másik.<br />
        <br />
        [Balra megyek](#kincses-kamra)<br />
        [Jobbra megyek](#furcsa-kattanás)<br />
        <br />
        ## Kincses kamra<br />
        <br />
        Egy ládát látsz a sarokban.<br />
        Kinyitod és tele van arannyal.<br />
        <br />
        ## Furcsa kattanás<br />
        <br />
        Ahogy beléptél a folyosóra, egy kattanást hallottál.<br />
        <br />
        [Visszalépek gyorsan](#elkerült-csapda)<br />
        [Tovább megyek](#játék-vége)<br />
        <br />
        ...
    </code>

    <h3>Feltételek, változók és komplex mechanikák</h3>
    <p>
        A Kolora oldala bonyolultabb mechanikákat is támogatni fog a CYOA
        művekben, mint például változók használatát és feltételes ágakat. "Akkor
        mehetsz tovább ha megtaláltad a kulcsot" és hasonló szituációk. Viszont
        ezek még készítés alatt vannak és még nem túl megbízhatóak, ezért a
        használatuk egyelőre nem ajánlott.
    </p>
    <p>
        Ha kíváncsi vagy ezekre a kísérleti újdonságokra, nézd meg <a
            href="/profile/?id=hi1b98VKT0Pzu8ql8QsUqmVYubl1">Csáki</a
        > műveit.
    </p>
</main>
<Footer />

<style>
    p {
        text-align: justify;
    }

    code {
        padding: var(--spacing);
        background-color: #88888840;
        border-radius: var(--corner-radius);
        font-family: "Courier New", Courier, monospace;
    }
</style>
