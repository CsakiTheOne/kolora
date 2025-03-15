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
        alakulásáról. Ez a műfaj könyvekben is létezik. Könyv formában általában
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
    <Alert title="Gyakorlás a tudás anyja">
        <p>
            A doksi olvasása közben ajánlott kipróbálni a tanultakat. Nyisd meg
            a <a href="/edit" target="_blank">beépített szerkesztőt</a> vagy a te
            preferált szöveg- vagy Markdown szerkesztődet. (Ha nem itt, az oldalon
            szeretnéd írni a műved, akkor a VSCode és Obsidian szerkesztőket ajánlom.)
        </p>
    </Alert>
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
        oldal címére. Viszont a második résznek pontosnak kell lennie. Mivel a
        hivatkozásban magára az oldal címére kell hivatkozni, ezért nem lehet
        két azonos című oldal. Ha ez nem megoldható a művedben vagy nem
        szeretnéd címekkel ellátni az oldalakat, egyszerű számozást is
        használhatsz.
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

    <hr />

    <Alert title="Bonyolultabb témák">
        <p>
            Bonyolult témák következnek és az alábbi funkciók nem szükségesek
            egy egyszerűbb mű elkészítéséhez.
        </p>
    </Alert>

    <h3>Feltételek, változók és komplex mechanikák</h3>
    <p>
        A Kolora oldala bonyolultabb mechanikákat is támogatn a CYOA művekben,
        mint például változók használatát és feltételes ágakat. "Akkor mehetsz
        tovább ha megtaláltad a kulcsot" és hasonló szituációk. Viszont ezek még
        készítés alatt vannak és még nem túl megbízhatóak, ezért a használatuk
        egyelőre nem ajánlott és az ezt használó alkotások "elromolhatnak".
    </p>
    <h4>Változók</h4>
    <p>
        A változók kis tárolók, amik értéket tárolnak. Ezeket a változókat tudod
        módosítani az olvasó döntései alapján és kinyithatsz vagy lezárhatsz
        utakat a változók értéke alapján.
    </p>
    <p>
        A változókat egyszerű parancsokkal befolyásolhatod. Ezek a parancsok egy
        oldal megnyitásakor azonnal lefutnak. Példa:
    </p>
    <code>
        ## Gyanús szoba<br />
        <br />
        A szoba tele van kacatokkal.<br />
        <br />
        [Asztal átkutatása](#semmit-nem-találtál)<br />
        <br />
        [Benézés a ládába](#kulcsot-találtál)<br />
        <br />
        ## Kulcsot találtál<br />
        <br />
        A ládában egy kulcsot találtál.<br />
        <br />
        /set kulcs 1<br />
        <br />
        [Keresés tovább](#gyanús-szoba)<br />
        <br />
        ...
    </code>
    <p>
        A példában a "Kulcsot találtál" oldalon a <code>/set kulcs 1</code> parancs
        fut le. Ezt az olvasó nem látja, de te tudod már, hogy az olvasó megtalálta
        a kulcsot.
    </p>
    <p>A változók értékeit meg is mutathatod az olvasónak. Példa:</p>
    <code>
        ## Táska<br />
        <br />
        {"{kulcs}"} kulcsod van.
    </code>
    <p>
        Az olvasó ezt a szöveget látja: "1 kulcsod van." Ha a kulcs értéke 0,
        akkor a szöveg: "0 kulcsod van." lesz.
    </p>
    <h4>Feltételek</h4>
    <p>
        A feltételekkel tudod megadni, hogy egy oldal csak akkor legyen
        elérhető, ha a hozzá tartozó feltétel teljesül. Példa:
    </p>
    <code>
        ## Gyanús szoba<br />
        <br />
        A szoba tele van kacatokkal. Egy zárt ajtót is találsz.<br />
        <br />
        [Asztal átkutatása](#semmit-nem-találtál)<br />
        <br />
        [Benézés a ládába](#kulcsot-találtál)<br />
        <br />
        [{"{kulcs}"} > 0 ? Zárt ajtó kinyitása a kulccsal](#ajtó-kinyitva)<br />
        ...
    </code>
    <p>
        A feltétel nem látszik az olvasónak, csak az eredménye. Ha a kulcs
        változó nagyobb, mint 0, akkor látszik a gomb az olvasónak. Ha nem,
        akkor egy szürke gombot lát felirat nélkül, lakat ikonnal.
    </p>
    <h4>Parancsok és logikai műveletek</h4>
    <p>A következő parancsok működnek az oldalon:</p>
    <table>
        <thead>
            <tr>
                <th>Parancs</th>
                <th>Leírás</th>
                <th>Példa</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{"/set <változó> <érték>"}</td>
                <td>
                    A változó értékét beállítja az adott értékre. Ha a változó
                    nem létezik, létrehozza.
                </td>
                <td>{"/set kulcs 1"}</td>
            </tr>
            <tr>
                <td>{"/add <változó> <érték>"}</td>
                <td>
                    A változó értékét növeli az adott értékkel. Ha a változó nem
                    létezik, létrehozza.
                </td>
                <td>{"/add pénz 500"}</td>
            </tr>
            <tr>
                <td>{"/subtract <változó> <érték>"}</td>
                <td>
                    A változó értékét csökkenti az adott értékkel. Ha a változó
                    nem létezik, létrehozza.
                </td>
                <td>{"/subtract élet 1"}</td>
            </tr>
            <tr>
                <td>{"/clear <változó>"}</td>
                <td>A változó értékét null-ra / 0-ra állítja.</td>
                <td>{"/clear kulcs"}</td>
            </tr>
        </tbody>
    </table>
    <p>
        A logikai műveletek a feltételekben használhatóak. A következő műveletek
        állnak rendelkezésre:
    </p>
    <table>
        <thead>
            <tr>
                <th>Művelet</th>
                <th>Leírás</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{"=="}</td>
                <td>Egyenlő</td>
            </tr>
            <tr>
                <td>{"!="}</td>
                <td>Nem egyenlő</td>
            </tr>
            <tr>
                <td>{"<"}</td>
                <td>Kisebb mint</td>
            </tr>
            <tr>
                <td>{">"}</td>
                <td>Nagyobb mint</td>
            </tr>
            <tr>
                <td>{"<="}</td>
                <td>Kisebb vagy egyenlő</td>
            </tr>
            <tr>
                <td>{">="}</td>
                <td>Nagyobb vagy egyenlő</td>
            </tr>
        </tbody>
    </table>
    <p>
        Ezeket a feltételeket a továbbhaladási lehetőségek szöveg részébe kell
        írni egy ? elé:
    </p>
    <code>
        [{"<változó> <logikai művelet> <érték> ? Szöveg"}](#oldal címe)<br />
        <br />
        [{"{kulcs} > 0 ? Zárt ajtó kinyitása a kulccsal"}](#ajtó-kinyitva)
    </code>
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
