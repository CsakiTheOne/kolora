<script>
    import Header from "../../components/Header.svelte";
    import ComicPanel from "../../components/ComicPanel.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Header selectedPageIndex={-1} />
<main class="container-column">
    <h1>Felhasználói feltételek</h1>
    <ComicPanel innerClass="container-column">
        <ul>
            <li>
                A jelen felhasználói feltételek szabályozzák a Kolora weboldal
                használatát. A weboldal használatával Ön elfogadja ezeket a
                feltételeket.
            </li>
            <li>
                A Szolgáltató fenntartja a jogot, hogy a feltételeket bármikor
                módosítsa. A módosítások a weboldalon való közzététellel lépnek
                hatályba.
            </li>
        </ul>

        <h2>Weboldal használata</h2>
        <ul>
            <li>
                A Weboldal használata során Ön köteles tiszteletben tartani a
                hatályos jogszabályokat és harmadik felek jogait.
            </li>
            <li>
                Tilos a Weboldal használata jogellenes célokra, vagy olyan
                tevékenységre, amely a Weboldal működését veszélyezteti.
            </li>
        </ul>

        <h2>Felhasználói fiók</h2>
        <ul>
            <li>Ön felelős a fiókja biztonságáért.</li>
            <li>
                A Szolgáltató fenntartja a jogot, hogy a fiókját felfüggessze vagy
                törölje, ha a Feltételeket megsérti.
            </li>
        </ul>

        <h2>Szellemi tulajdon</h2>
        <ul>
            <li>
                A Weboldalon található tartalom, beleértve a szöveget, grafikákat,
                logókat és szoftvereket, a Szolgáltató vagy harmadik felek szellemi
                tulajdonát képezi.
            </li>
            <li>A tartalom engedély nélküli felhasználása tilos.</li>
        </ul>

        <h2>Adatvédelem</h2>
        <ul>
            <li>
                A Weboldal használata során gyűjtött személyes adatok kezelésére az
                <a href="/data">Adatkezelési Tájékoztató</a> rendelkezései vonatkoznak.
            </li>
        </ul>

        <h2>Posztok</h2>
        <ul>
            <li>
                A posztok tartalma nem lehet jogellenes, sértő, rágalmazó, vagy más
                módon harmadik felek jogait sértő.
            </li>
            <li>Tilos a posztokban reklámot elhelyezni.</li>
            <li>A posztok nem tartalmazhatnak vírust vagy más kártékony kódot.</li>
        </ul>

        <h2>Művek</h2>
        <ul>
            <li>
                A feltöltött műveknek a felhasználó saját alkotásának kell lenniük.
            </li>
            <li>A művek nem sérthetik harmadik felek szerzői jogait.</li>
            <li>
                A művek tartalma nem lehet jogellenes, sértő, vagy más módon
                elfogadhatatlan.
            </li>
            <li>A felhasználó felelős a feltöltött művek tartalmáért.</li>
            <li>
                A Szolgáltató fenntartja a jogot, hogy a szabályokat sértő műveket
                eltávolítsa.
            </li>
        </ul>
    </ComicPanel>
</main>
<Footer />
