<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import VerticalTimelineItem from "../../components/VerticalTimelineItem.svelte";
    import Carousel from "../../components/Carousel.svelte";
    import imgYearOpeningSlam from "$lib/images/gallery/2024-evnyito-slam/event-banner.jpg";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
    import imgKoloraSzitakoto from "$lib/images/kolora-szitakoto.png";
    import imgKoloraBirthdayCake from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/kolora-birthday-cake.jpg";
    import imgMusicianKalafaticsImre2 from "$lib/images/musicians/kalafatics-imre-2.png";
    import { text } from "@sveltejs/kit";
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import ThemeManager from "$lib/ThemeManager";
    import { browser } from "$app/environment";
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
        {#if browser}
            <iframe
                title="Bodonyi Dani - Café at Museum Essentials"
                width="100%"
                height="120"
                src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=${ThemeManager.theme === "theme-light" ? "1" : "0"}&hide_artwork=1&feed=%2FDaniel_Bodonyi%2Fbodonyi-dani-caf%25C3%25A9-at-museum-essentials%2F`}
                frameborder="0"
            ></iframe>
        {/if}
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Waiting Room + egy5egy félakusztik koncert @ Museum Café"
        subtitle="Augusztus 4."
    >
        <div class="adaptive-col-row">
            <a
                href={KoloraLocalDb.getMusician("Waiting Room")?.websiteUrl}
                target="_blank"
            >
                <img
                    style="width: 100%;"
                    src={KoloraLocalDb.getMusician("Waiting Room")
                        ?.bannerImageUrl}
                    alt=""
                />
            </a>
            <a
                href={KoloraLocalDb.getMusician("egy5egy")?.websiteUrl}
                target="_blank"
            >
                <img
                    style="width: 100%;"
                    src={KoloraLocalDb.getMusician("egy5egy")?.bannerImageUrl}
                    alt=""
                />
            </a>
        </div>
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
                    title: "Næz",
                    background: `url('${KoloraLocalDb.getMusician("Næz")?.bannerImageUrl}')`,
                    onclick: () =>
                        window.open(
                            KoloraLocalDb.getMusician("Næz")?.websiteUrl,
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
            <a
                href="https://youtube.com/playlist?list=PLxSO3Z5lw-xPDOFOpHZzC-rmqEI-ACJQN&si=WMLuJ5EBUiDaGKmw"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-youtube"></span>
                    Slam előadások megtekintése
                </button>
            </a>
        </p>
        <p>//TODO: képek Emesétől</p>
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
        <p>//TODO: képek</p>
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
        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    background: `url('${KoloraLocalDb.getMusician("Kalafatics Imre")?.bannerImageUrl}')`,
                },
                {
                    title: '<span class="mdi mdi-google-drive"></span> Még több fotó Tenki Mártontól',
                    background: `url('${imgMusicianKalafaticsImre2}')`,
                    onclick: () =>
                        window.open(
                            "https://drive.google.com/drive/folders/1eYo9prYNlx-O-QW9c0mNNhwDve-oCsNd?usp=sharing",
                            "_blank",
                        ),
                },
            ]}
        />
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
        <a
            href={KoloraLocalDb.getMusician("Nedel'a")?.websiteUrl}
            target="_blank"
        >
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src={KoloraLocalDb.getMusician("Nedel'a")?.bannerImageUrl}
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
        <a
            href={KoloraLocalDb.getMusician("The JEX")?.websiteUrl}
            target="_blank"
        >
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src={KoloraLocalDb.getMusician("The JEX")?.bannerImageUrl}
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
