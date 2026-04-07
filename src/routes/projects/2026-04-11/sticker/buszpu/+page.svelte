<script>
    import StickerPage from "../../../../../components/2026-04-11/StickerPage.svelte";
    import vbuszLocsolo from "$lib/images/events/2026-04-11/vbusz-locsolo.jpg";
    import ComicPanel from "../../../../../components/ComicPanel.svelte";
</script>

<StickerPage>
    <a
        style="border: 4px solid black;"
        href="https://www.facebook.com/photo?fbid=941373935258896&set=pcb.941375488592074"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img src={vbuszLocsolo} alt="Vbusz Locsolo" />
    </a>
    <ComicPanel innerClass="container-column panel-blue">
        <h2>Celæna és Æisa népdal feldolgozásai</h2>
        <div class="flex flex-row gap-4">
            <div class="flex-1">
                <iframe
                    class="w-full aspect-square"
                    src="https://www.youtube.com/embed/PfINS-p9Kqk?si=REMh1QWvPwmMu2Tc"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="flex-1">
                <iframe
                    class="w-full aspect-square"
                    src="https://www.youtube.com/embed/mi0QyqIZRK8?si=A-QwZRWXRyzmzFcS"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
        <iframe
            class="w-full aspect-video"
            src="https://www.youtube.com/embed/K9sXsJc285k?si=t_jrgmDK-Q3Qz3rq"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
        <div class="flex flex-row gap-4">
            <div class="flex-1">
                <iframe
                    class="w-full aspect-square"
                    src="https://www.youtube.com/embed/N8aqzCKS6pg?si=MjeA-KjQd8NUbsPO"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="flex-1 flex flex-col">
                <a
                    class="btn"
                    style="background-color: #1ed760;"
                    href="https://open.spotify.com/artist/1iO2JTW6PN5qPN7Obq94EA?si=73WDTnYSRT2mKMbczCxZIw"
                    target="_blank">Spotify: Celæna</a
                >
                <a
                    class="btn"
                    style="background-color: #1ed760;"
                    href="https://open.spotify.com/artist/31I8M8cZYfzIjW5Fa1iG8x?si=fpZXD00bTD6T7Cjov6LOZw"
                    target="_blank">Spotify: Æisa</a
                >
            </div>
        </div>
    </ComicPanel>
</StickerPage>
