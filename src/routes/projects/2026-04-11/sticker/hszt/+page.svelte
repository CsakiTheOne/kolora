<script>
    import StickerPage from "../../../../../components/2026-04-11/StickerPage.svelte";
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
    import forg from "$lib/images/events/2026-04-11/forg.png";
</script>

<StickerPage>
    <ComicPanel innerClass="container-column panel-black">
        <h2>PIECE A SHIT</h2>
        <pre>When I see a frog

& it takes a hop away from me

it's like

what the fuck man.</pre>
        <p>- Sam Pink</p>
        <p>
            Egy vers a <i
                >99 Poems to Cure Whatever's Wrong with You Or Create the
                Problem's You Need</i
            > című kötetből.
        </p>
    </ComicPanel>
    <img style="aspect-ratio: 1 / 1; object-fit: cover;" src={forg} alt="" />
    <iframe
        width="100%"
        style="aspect-ratio: 9 / 16; border-radius: 4px;"
        src="https://www.youtube.com/embed/7wMsgOHqDPA?si=gNQwEM9RnD1u_Quc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</StickerPage>
