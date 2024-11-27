<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import VerticalTimelineItem from "../../components/VerticalTimelineItem.svelte";
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import imgYearOpeningSlam from "$lib/images/gallery/2024-evnyito-slam/event-banner.jpg";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
    import imgKoloraSzitakoto from "$lib/images/kolora-szitakoto.png";
    import Carousel from "../../components/Carousel.svelte";
</script>

<Header selectedTab="Idővonal" />
<main>
    <VerticalTimelineItem title="2024 visszatekintés">
        <p>
            Az elmúlt évben a Kolora Egyesület számos rendezvényt szervezett,
            amelyek közül néhányat itt láthatsz. Hogy megünnepeljük a 2024-es
            évet, ezt a weboldalt raktuk össze, ahol nosztalgiázhatunk egy
            kicsit. Illetve ez az oldal lesz a helye egy újabb
            eseménysorozatnak, amely 2025 áprilisában fog indulni.
        </p>
        <p>Na induljunk el az időben visszafelé:</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kolora terasz és zene"
        subtitle="Egész évben Februártól Novemberig"
    >
        <p>
            Az évben több alkalommal is megrendezésre kerültek a Kolora teraszok
            és más zenés események a Museum Caféban és a Nyolcas Műhelyben. Ezen
            események során felléptek a Kolora Egyesület tagjai, barátai, mint
            például Bodonyi Dani a DJ set-jével és más zenekarok is, mint
            például a JEX, a Nedel'a, a Loophia és a Næz.
        </p>
        <p style="text-align: center;">
            <button
                class="elevated-button"
                onclick={() => {
                    const songsCount = KoloraLocalDb.bandSongs2024rewind.length;
                    const randomSong =
                        KoloraLocalDb.bandSongs2024rewind[
                            Math.floor(Math.random() * songsCount)
                        ];
                    window.open(randomSong, "_blank");
                }}
            >
                <span class="mdi mdi-music-note"></span>
                Hallgassunk valamit
            </button>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Múzeumok éjszakája és 1. Kolora szülinap"
        subtitle="Július 22."
        instagramLink="https://www.instagram.com/p/C8MQxtZsmon"
    >
        <p>
            Slam, Næz, DJ Bodonyi, italok és torta. Egy éves lett a Kolora és
            megadtuk a módját az ünneplésnek a Museum Caféban.
        </p>
        <p>//TODO: leírás, képek (Emese pls), videók (?), stb.</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Magyar költészet napja"
        subtitle="Április 11."
        instagramLink="https://www.instagram.com/p/C5jJoSmNd-w"
        facebookLink="https://fb.me/e/1MldHJc9c"
    >
        <p>
            A magyar költészet napján Csáki egy kincsvadászatot szervezett, ahol
            a résztvevőknek Székesfehérvár utcáin kellett keresniük matricákat,
            amelyeken versek és egyéb jóságok voltak. A matricák tartalmai
            megtekinthetőek az alábbi linken:
        </p>
        <p><a href="/stickers"> 2024 költészet napi kincsvadászat</a></p>
        <p>
            Viszont jövőre is vár a művészet kedvelőkre egy meglepetés. Már
            készül a 2025-ös költészet napi program, amely itt lesz elérhető:
        </p>
        <p><a href="/jam">2025 költészet napja</a></p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kalafatics Imre önálló estje"
        subtitle="Április 7."
        instagramLink="https://www.instagram.com/p/C5giBg0sakJ"
        facebookLink="https://fb.me/e/3zCpDvxrU"
    >
        <p>
            Imre spontán koncertjeivel sokan találkozhattunk már a Museum
            Café-ban. Egy vasárnapi este lírával állt ki elénk, a dalokhoz pedig
            nem felejtette otthon a remek történeteit sem.
        </p>

        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    background:
                        "url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420517825_273892215774776_968796109561885963_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PSvSI2JOEAkQ7kNvgHVGorO&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AZxBaY89hOlbb1vYhBtxhyg&oh=00_AYDFQRQRu4zDRat17hZaRGRJMNqDa1bwQ7TWHN714pEVLg&oe=674D1EDA')",
                },
                {
                    background:
                        "url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/434601977_273892225774775_3835235214518132631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=828I0Q07troQ7kNvgHA0vYv&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AGJTOTJeFYHkXrBysHnMbUy&oh=00_AYBkjoDmRXamy_dekiuzYbg-JHAFN-05tOtSjzF4IkvSMw&oe=674D3D39')",
                },
                {
                    background:
                        "url('https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/417392054_273892075774790_7571420337483724355_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=l4He1B_JOa0Q7kNvgF9Gux9&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=A51gUIpJ5N_Kt7aDof5xKH7&oh=00_AYAj8pGcxp8Rbo-wUHULgDb5_ADbdnbzR99LHRcsGVMvQg&oe=674D37B2')",
                },
            ]}
        />
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Évnyitó slam"
        subtitle="Március 14."
        instagramLink="https://www.instagram.com/stories/highlights/17871723279011747/"
        facebookLink="https://fb.me/e/5qV6UfabB"
    >
        <img
            style="width: 100%; max-height: 300px; object-fit: cover;"
            src={imgYearOpeningSlam}
            alt=""
        />
        <p>
            A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó
            slam versenyének, ahol 18 előadást láthattunk. Köztük volt 6
            tehetséges versenyző és sok új ember, akik először álltak a
            színpadra. Köszönjük a helyet a Nyolcas Műhelynek és a támogatást
            minden fellépőnek és nézőnek!
        </p>
        <p>
            <a
                href="https://youtube.com/playlist?list=PLxSO3Z5lw-xMmwMn8J0c9Y0gX22sGSfW8&si=tzZyj71NrnGVyWnT"
                target="_blank"
            >
                <span class="mdi mdi-youtube"></span>
                Fellépők megtekintése
            </a>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Első slam poetry workshop"
        subtitle="Február 25."
        instagramLink="https://www.instagram.com/p/C4n0kGGsKUc"
    >
        <div>
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src={imgFirstKoloraWorkshopTable}
                alt=""
            />
            <span>Fotó: Mészáros Emese</span>
        </div>
        <p>
            Szvoren Eszter és Völgyesi Toma voltak az irodalom tanáraink idén,
            akikkel együtt alkottunk, szójátékokat játszottunk és fejlődtünk.
            Ezeket a workshop-okat az évben többször is megtartották
            Vasárnaponként a kedvenc kávézónkban.
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="2023"
        instagramLink="https://www.instagram.com/p/CuZs8OqsdHT"
        isLastItem={true}
    >
        <p style="text-align: center;">
            <button
                style="appearance: none; border: none; border-radius: 50%;"
                onclick={() => alert("230621")}
            >
                <img
                    style="width: 128px; cursor: help;"
                    src={imgKoloraSzitakoto}
                    alt=""
                />
            </button>
            <br />
            Kolora születése: 2023.06.21.
        </p>
    </VerticalTimelineItem>

    <hr />

    <h2>Mi fog történni ezzel az oldallal 2025 eleje után?</h2>
    <p>Marad emléknek amíg azok kedvesek számunkra.</p>
    <p>
        Na jó, egy kicsit megváltozik. Ez az "Idővonal" oldal mellékszereplő
        lesz és más tartalmaknak ad helyt, mint pl. a 2025-ös költészetnapi
        eseménynek, ami még csak egy nem túl feltűnő linken keresztül érhető el.
    </p>
</main>
<Footer />
