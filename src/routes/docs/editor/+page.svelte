<script>
    import Alert from "../../../components/Alert.svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
</script>

<SmallHeader
    path={[{ title: "Dokumentáció", href: "/docs" }]}
    currentPage="Szerkesztő használata"
/>
<main>
    <h2>Szerkesztő használata</h2>

    <p>
        Ez a dokumentáció a weboldalunkon található műszerkesztő használatát
        ismerteti. Ezzel az eszközzel egyszerűen és hatékonyan hozhatsz létre és
        szerkeszthet irodalmi műveket.
    </p>

    <h3>A szerkesztő felépítése</h3>

    <table>
        <tbody>
            <tr>
                <td>Mű címe</td>
                <td>Itt adhatod meg a műved címét.</td>
            </tr>
            <tr>
                <td>Keletkezés dátuma</td>
                <td>A mű elkészültének dátumát tüntetheted fel.</td>
            </tr>
            <tr>
                <td>Műnem</td>
                <td
                    >A mű típusát és megjelenését adhatod meg ezzel az oldalon.
                    Részletesebb kifejtés lejjebb.</td
                >
            </tr>
            <tr>
                <td>Műfaj</td>
                <td
                    >Pl.: (vers) elbeszélő költemény, (regény) fantasy, (zene)
                    rock, stb. Bármit megadhatsz.</td
                >
            </tr>
            <tr>
                <td>Mű leírása</td>
                <td>Ebben a részben röviden leírhatod a művedet.</td>
            </tr>
            <tr>
                <td>Mű tartalma</td>
                <td>Itt írod be a mű szövegét.</td>
            </tr>
            <tr>
                <td>Link a műhöz</td>
                <td
                    >A "Mű tartalma" szekciót váltja fel, ha nem írott műnemről
                    van szó.</td
                >
            </tr>
        </tbody>
    </table>

    <h3>Műnem és műfaj</h3>

    <p>
        A műnem az oldalon való megjelenítés módját határozza meg. Jelenleg 3
        lehetőség közül lehet választani:
    </p>

    <table>
        <tbody>
            <tr>
                <td>Choose your own adventure</td>
                <td
                    >A mű interaktív történetként jelenik meg. Egyszerre csak
                    egy oldal látszik.</td
                >
            </tr>
            <tr>
                <td>Írott mű</td>
                <td>Az egész mű szövege látszik az oldalon.</td>
            </tr>
            <tr>
                <td>Nem írott mű</td>
                <td
                    >A mű nem tekinthető meg az oldalon, csak egy linken
                    keresztül.</td
                >
            </tr>
        </tbody>
    </table>
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
