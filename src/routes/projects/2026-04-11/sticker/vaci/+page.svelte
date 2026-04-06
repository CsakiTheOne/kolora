<script>
    import StickerPage from "../../../../../components/2026-04-11/StickerPage.svelte";
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
    import heartcode from "$lib/images/events/2026-04-11/heartcode.svg";
</script>

<StickerPage>
    <ComicPanel innerClass="container-column panel-black">
        <h2>Heartcode</h2>
        <img src={heartcode} alt="" />
        <p>- Csáki</p>
    </ComicPanel>
    <iframe
        class="w-full aspect-video"
        src="https://www.youtube.com/embed/yup8gIXxWDU?si=fPtsNcgKdHd4RGG6"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    <ComicPanel innerClass="container-column">
        <h2>NFC infó</h2>
        <p>
            A Kolora (és idén INKognitó) költészet napi kincsvadászat eseményein
            NFC matricákat is használunk, hogy élvezetesebbé tegyük a játékot.
            Ezek apró adattárolók és tekercs alakú antennák. Mindegyikre egy
            egyedi link van írva, amely telefon érintésre ide vezeti a
            játékosokat.
        </p>
        <p>
            Itt pontosan NTAG213 típusú matricákat használtunk. Ez bőven elég
            rövidebb linkekhez. Ja és számítottunk rá, hogy ügyes infósok is
            megtalálhatják ezeket, szóval minden matricát lezártunk jelszóval,
            hogy ne lehessen átírni. :D
        </p>
        <a
            class="btn"
            href="https://nfcshop.hu/termek/ntag213-atlatszo-kor-nfc-matrica-25mm/"
            target="_blank">Én is szeretnék ilyen matricát!</a
        >
    </ComicPanel>
</StickerPage>
