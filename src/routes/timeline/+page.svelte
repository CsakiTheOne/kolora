<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import VerticalTimelineItem from "../../components/VerticalTimelineItem.svelte";
    import Carousel from "../../components/Carousel.svelte";
    import imgYearOpeningSlam from "$lib/images/gallery/2024-evnyito-slam/event-banner.jpg";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
    import imgKoloraSzitakoto from "$lib/images/kolora-szitakoto.png";
    import imgKoloraBirthdayCake from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/kolora-birthday-cake.jpg";
    import { text } from "@sveltejs/kit";
</script>

<Header selectedTab="Idővonal" />
<main>
    <VerticalTimelineItem title="2024 visszatekintés">
        <p>
            Az elmúlt évben a Kolora Egyesület számos rendezvényt szervezett,
            amelyek közül néhányat itt láthatsz. Hogy megünnepeljük a 2024-es
            évet, ezt a weboldalt raktuk össze, ahol nosztalgiázhatunk egy
            kicsit.
        </p>
        <p>Na induljunk el az időben visszafelé:</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kolora teraszok + spontán zene"
        subtitle="Egész évben"
    >
        <p>
            Az évben több alkalommal is megrendeztük a Kolora teraszt a Museum
            Caféban, és előfordult az is, hogy nagyobb bejelentés nélkül leptük
            meg az ott italozókat. Ezen események során Bodonyi Dani és .kory
            mixei váltották föl a háttérzenét a kávézóban.
        </p>
        //TODO: Dani mix, esetleg képek
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Waiting Room + egy5egy félakusztik koncert @ Museum Café"
        subtitle="Augusztus 4."
    >
        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    title: "Waiting Room",
                    background: `url('https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/466917919_543266368416392_5528035443175376377_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9tK1AWbsA6kQ7kNvgGMSRzg&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=ACVMhlOpklW4E4iwmAiKwUc&oh=00_AYD-SF0rlLQQoY-sKiprG6RXdThwMBFZv48ntfP8psKFTQ&oe=674F9470')`,
                    onclick: () =>
                        window.open("https://linktr.ee/waiting_room", "_blank"),
                },
                {
                    title: "egy5egy",
                    background: `url('https://scontent.fbud6-4.fna.fbcdn.net/v/t39.30808-6/443842683_974592858003892_3865728876528380810_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IrCYmdM8X7wQ7kNvgGMQMaN&_nc_zt=23&_nc_ht=scontent.fbud6-4.fna&_nc_gid=ALFjsaI2ZterBpoqEK0-bw0&oh=00_AYB7mAMo7MkBzfyUI9BBofGp01lrBvg5olBvgsergnYrhw&oe=67522990')`,
                    onclick: () =>
                        window.open("https://linktr.ee/egy5egy", "_blank"),
                },
            ]}
        />
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Múzeumok éjszakája a Museum Caféban + 1. Kolora szülinap"
        subtitle="Július 22."
        instagramLink="https://www.instagram.com/p/C8MQxtZsmon"
    >
        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    title: "<span class='mdi mdi-play'></span> Montázs videó by Brotond Productions",
                    background: `url('${imgKoloraBirthdayCake}')`,
                    onclick: () =>
                        window.open(
                            "https://www.instagram.com/reel/C8-WQVdPFUb/",
                            "_blank",
                        ),
                },
                {
                    title: "//TODO: képek ide",
                },
            ]}
        />
        <p>
            Slam, Næz, Bodonyi Dani, fényfestés, italok és torta. Egy éves lett
            a Kolora Július 21-én, és megadtuk a módját az ünneplésnek.
        </p>
        <p>
            <a href="https://www.youtube.com/@naez.official" target="_blank">
                <button class="btn">
                    <span class="mdi mdi-youtube"></span>
                    Næz?
                </button>
            </a>
        </p>
        <p>//TODO: leírás, képek (Emese pls), stb.</p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Loophia koncert a Museum Caféban"
        subtitle="Április 21."
    >
        <iframe
            width="100%"
            style="aspect-ratio: 16/9;"
            src="https://www.youtube.com/embed/Paa2xhP3EVo?si=qy4NsKYvwBuW2VR6"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
        <p>
            <a
                href="https://youtu.be/p-_4iC-xHoo?si=nStmUZVY8CfajXPy"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-youtube"></span>
                    Ki, vagy mi az a Loophia?
                </button>
            </a>
        </p>
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
        <p>
            <a href="/stickers">
                <button class="btn"> 2024 költészet napi kincsvadászat </button>
            </a>
        </p>
        <p>
            Ezt az eseményt a <a
                href="https://www.facebook.com/groups/570212437568903/"
                target="_blank">Posztolj verset az utcára!</a
            > mozgalom ihlette.
        </p>
        <!--p>
            Viszont jövőre is vár a művészetkedvelőkre egy meglepetés. Már
            készül a 2025-ös költészet napi program, amely itt lesz elérhető:
        </p>
        <p><a class="btn" href="/jam">2025 költészet napja</a></p-->
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kalafatics Imre önálló estje"
        subtitle="Április 7."
        instagramLink="https://www.instagram.com/p/C5giBg0sakJ"
        facebookLink="https://www.facebook.com/permalink.php?story_fbid=273894045774593&id=100094619973134&ref=embed_post"
    >
        <div>
            <Carousel
                style="aspect-ratio: 21/9;"
                pages={[
                    {
                        background: `url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420517825_273892215774776_968796109561885963_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PSvSI2JOEAkQ7kNvgFCAuru&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=ATKq0bQJpN77E5p2eJV16GA&oh=00_AYDR7-a-1WnoT7kV4CYxsm5KCmg2P5V59KasuF6K5OQjYw&oe=674EA89A')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420517825_273892215774776_968796109561885963_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PSvSI2JOEAkQ7kNvgFCAuru&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=ATKq0bQJpN77E5p2eJV16GA&oh=00_AYDR7-a-1WnoT7kV4CYxsm5KCmg2P5V59KasuF6K5OQjYw&oe=674EA89A",
                                "_blank",
                            ),
                    },
                    {
                        background: `url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420479229_273892205774777_2826171396095097959_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rfri3rzj8RYQ7kNvgEoCuwL&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AinHepIzhgRXwJKr6PT0ABE&oh=00_AYCJmjaopQB8wJKtr4SgFadq8ju9KtWm2FDElL_EnYrKLw&oe=674EA5AC')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420479229_273892205774777_2826171396095097959_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rfri3rzj8RYQ7kNvgEoCuwL&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AinHepIzhgRXwJKr6PT0ABE&oh=00_AYCJmjaopQB8wJKtr4SgFadq8ju9KtWm2FDElL_EnYrKLw&oe=674EA5AC",
                                "_blank",
                            ),
                    },
                    {
                        background: `url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/434601977_273892225774775_3835235214518132631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=22PsWcmF1QcQ7kNvgGrX62m&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AmZ8gNCL3XDBCyOxENfdzzE&oh=00_AYDfzxkfYwqkYknyYZwwDWaBtxvMDYyQTbw7owkRHZiePw&oe=674E8EB9')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/434601977_273892225774775_3835235214518132631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=22PsWcmF1QcQ7kNvgGrX62m&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AmZ8gNCL3XDBCyOxENfdzzE&oh=00_AYDfzxkfYwqkYknyYZwwDWaBtxvMDYyQTbw7owkRHZiePw&oe=674E8EB9",
                                "_blank",
                            ),
                    },
                    {
                        background: `url('https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/434594751_273892085774789_1323393024636415877_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=wO_VPVq-QK4Q7kNvgFJR9dd&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=Ai0_QVYz5RROAawesDRVccH&oh=00_AYBL4DiWatfbpLDhMqyifN2CqtiQ8jNFTXhhv6rNwe9ZLg&oe=674EA813')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/434594751_273892085774789_1323393024636415877_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=wO_VPVq-QK4Q7kNvgFJR9dd&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=Ai0_QVYz5RROAawesDRVccH&oh=00_AYBL4DiWatfbpLDhMqyifN2CqtiQ8jNFTXhhv6rNwe9ZLg&oe=674EA813",
                                "_blank",
                            ),
                    },
                    {
                        background: `url('https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420518033_273892095774788_5248966560286878263_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=b5txkfqOIawQ7kNvgENKFkf&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AuOajZUYkhAme2OooUyAIIS&oh=00_AYBkcljJBG6DGHOfr-K-xoycok_Bs4d8v3XzBRkimto-FA&oe=674EB88D')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/420518033_273892095774788_5248966560286878263_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=b5txkfqOIawQ7kNvgENKFkf&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AuOajZUYkhAme2OooUyAIIS&oh=00_AYBkcljJBG6DGHOfr-K-xoycok_Bs4d8v3XzBRkimto-FA&oe=674EB88D",
                                "_blank",
                            ),
                    },
                    {
                        background: `url('https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/417392054_273892075774790_7571420337483724355_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FRJ-BdOA68QQ7kNvgH8EgbO&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=AUf7jLHL36FtF8-tBBWubqV&oh=00_AYCXzIqrnMr54MNJDXzr3fXTonAQeup7rEDMI40QfEA2CA&oe=674E8932')`,
                        onclick: () =>
                            window.open(
                                "https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/417392054_273892075774790_7571420337483724355_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FRJ-BdOA68QQ7kNvgH8EgbO&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=AUf7jLHL36FtF8-tBBWubqV&oh=00_AYCXzIqrnMr54MNJDXzr3fXTonAQeup7rEDMI40QfEA2CA&oe=674E8932",
                                "_blank",
                            ),
                    },
                ]}
            />
            <span>Fotók: Tenki Márton</span>
        </div>
        <p>
            Imre spontán koncertjeivel sokan találkozhattunk már a Museum
            Caféban. Egy vasárnapi este lírával állt ki elénk, a dalokhoz pedig
            elhozta a remek történeteit is.
        </p>
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
                <button class="btn">
                    <span class="mdi mdi-youtube"></span>
                    Fellépők megtekintése
                </button>
            </a>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Nedel'a koncert @ Museum Café"
        subtitle="Március 10."
        instagramLink="https://www.instagram.com/p/C3x3_VxsfWk"
    >
        <a href="https://linktr.ee/nedela_zenekar" target="_blank">
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src="https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/449056267_122152105730222063_647686779152558141_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Ldnc5FSPPiUQ7kNvgGoQtTr&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AwxgZD7bmo1ilJb2cK764Dt&oh=00_AYDybf9B_BkOnbtM_vTEDKMQ9zcqjXFljfaDDRA-VqVTyg&oe=674F5026"
                alt=""
            />
        </a>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Első slam poetry workshop"
        subtitle="Február 25."
        facebookLink="https://www.facebook.com/permalink.php?story_fbid=pfbid0GffCQPFqTkqZTbrEXGCiq5wVYXpSksXKvrdz2RmGuQDWytgJowzap5yZrrHYZxnRl&id=100094619973134"
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
            akikkel együtt játszottunk a szavakkal, alkottunk és fejlődtünk.
            Ezeket a workshop-okat az évben többször is megtartották
            vasárnaponként a kedvenc kávézónkban.
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="The JEX koncert @ Museum Café"
        subtitle="Február 1."
        instagramLink="https://www.instagram.com/p/C2ajW1FMa27"
    >
        <a href="https://linktr.ee/thejexofficial" target="_blank">
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src="https://ugc.production.linktr.ee/c636f8b7-b0dc-467f-b193-553aa8392781_DSC07364.jpeg?io=true&size=thumbnail-feature-v1_0"
                alt=""
            />
        </a>
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

    <h2>Mi lesz az idővonallal 2024 után?</h2>
    <p>Marad emléknek amíg az kedves számunkra.</p>
    <p>
        Na jó, egy kicsit megváltozik. Ez az "Idővonal" oldal mellékszereplő
        lesz és más tartalmaknak ad helyt. Milyen tartalmaknak? Majd
        meglátjátok!
    </p>
</main>
<Footer />

<style>
    main img {
        border-radius: var(--corner-radius);
    }
</style>
