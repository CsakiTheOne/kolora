<script lang="ts">
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
    import ladybug from "$lib/images/events/2026-04-11/kacalibogi.png";
    import StickerPage from "../../../../../components/2026-04-11/StickerPage.svelte";
</script>

<StickerPage>
    <ComicPanel innerClass="container-column panel-red">
        <h2>Volt egyszer egy katica</h2>
        <pre>Volt egyszer egy katica
elveszett egy pöttye
szegénykének emiatt 
potyogott a könnye.

Kereste az ágy alatt, 
a fenyőfán, a réten, 
bárányfelhőn, amögött,
kikészült egészen.

Egyszer aztán benézett 
a tükörbe is végre
- s meglátta a kóbor pettyet
az orra tövébe'.

Mi ebből a tanulság? 
Csak annyi, kisbarátom
hogyha bármi hiányozna, 
előbb keresd magadban, 
aztán a nagyvilágon.</pre>
        <p>- Storcz Erzsébet</p>
    </ComicPanel>
    <img style="aspect-ratio: 2 / 1; object-fit: cover;" src={ladybug} alt="" />
    <ComicPanel innerClass="container-column panel-purple">
        <h2>Kávézó látogatási szokások</h2>
        <p class="italic">
            "Sziasztok! Ismételten szakdolgozás van láthatáron, ezúttal Lángi
            Eszter barátunk kéri a segítségeteket, végre NEM csak a Z
            generációsoktól 🫶
        </p>
        <p class="italic">
            A kérdőív célja felmérni, hogy a design, a fenntarthatóság és a
            különböző szolgáltatások milyen módon befolyásolják a fogyasztói
            döntéseket egy kávézóban, és ezek alapján milyen fejlesztési
            lehetőségek lennének relevánsak.
        </p>
        <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdcMfB5mNETrCxKFRbZ7bu-8ykbk2sCT8qO6PBg3dskrc1bFQ/viewform"
            target="_blank"
        >
            Kitöltöm a kérdőívet!
        </a>
        <p class="italic">Minden kitöltést köszönünk!"</p>
        <p>- Puhakuckó kávézó</p>
    </ComicPanel>
</StickerPage>
