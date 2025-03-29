<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import VerticalTimelineItem from "../../components/VerticalTimelineItem.svelte";
    import Carousel from "../../components/Carousel.svelte";
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import ThemeManager from "$lib/ThemeManager";
    import { browser } from "$app/environment";
    import imgKoloraGroupPhoto from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/group photo with cake original.jpg";
    import imgYearOpeningSlam from "$lib/images/gallery/2024-evnyito-slam/event-banner.jpg";
    import imgFirstKoloraWorkshopTable from "$lib/images/gallery/first-kolora-workshop/table.jpg";
    import imgKoloraSzitakoto from "$lib/images/kolora-szitakoto.png";
    import imgKoloraBirthdayCake from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/kolora-birthday-cake.jpg";
    import imgMusicianNaez from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/naez-csoportkep.jpg";
    import imgEsztiWithHat from "$lib/images/gallery/muzeumok-ejszakaja-kolora-szulinap-1/eszti-kalap-huzas.jpg";
    import imgMuseumCafeLogo from "$lib/images/logos/museum-cafe.jpg";
    import imgNyolcasMuhelyLogo from "$lib/images/logos/nyolcas-muhely.jpg";
    import vidKispirosKincsvadaszat from "$lib/images/gallery/kolteszet-napi-kincsvadaszat/kispiros-km.mp4";
</script>

<Header selectedTab="Főoldal" />
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
                loading="lazy"
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
        facebookLink="https://fb.me/e/2h0gQUyOj"
    >
        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    title: "egy5egy",
                    background: `url('${KoloraLocalDb.getMusician("egy5egy")?.bannerImageUrl}')`,
                    onclick: () =>
                        window.open(
                            KoloraLocalDb.getMusician("egy5egy")?.websiteUrl,
                            "_blank",
                        ),
                },
                {
                    title: "Waiting Room",
                    background: `url('${KoloraLocalDb.getMusician("Waiting Room")?.bannerImageUrl}')`,
                    onclick: () =>
                        window.open(
                            KoloraLocalDb.getMusician("Waiting Room")
                                ?.websiteUrl,
                            "_blank",
                        ),
                },
            ]}
        />
        <p>
            <a
                href="https://www.facebook.com/reel/913230383947981"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-facebook"></span>
                    A Waiting Room promo videója az eseményről
                </button>
            </a>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Múzeumok éjszakája a Museum Caféban + 1. Kolora szülinap"
        subtitle="Június 22."
        instagramLink="https://www.instagram.com/p/C8MQxtZsmon"
        facebookLink="https://fb.me/e/3OIvmblM7"
    >
        <p>
            Slam, Næz, Bodonyi Dani, fényfestés, italok és torta. Egy éves lett
            a Kolora Július 21-én, és megadtuk a módját az ünneplésnek.
        </p>
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
                    title: "<span class='mdi mdi-youtube'></span> Slam előadások",
                    background: `url('${imgEsztiWithHat}')`,
                    onclick: () =>
                        window.open(
                            "https://youtube.com/playlist?list=PLxSO3Z5lw-xPDOFOpHZzC-rmqEI-ACJQN&si=WMLuJ5EBUiDaGKmw",
                            "_blank",
                        ),
                },
                {
                    title: "Næz",
                    background: `url('${imgMusicianNaez}')`,
                    onclick: () =>
                        window.open(
                            KoloraLocalDb.getMusician("Næz")?.websiteUrl,
                            "_blank",
                        ),
                },
                {
                    title: "<span class='mdi mdi-image-multiple'></span> Képek Emesétől",
                    background: `url('${imgKoloraGroupPhoto}')`,
                    onclick: () =>
                        window.open(
                            "https://drive.google.com/drive/folders/1txEiQEVJbBbD2V4J3jetJ9W0yX8NZuhy?usp=sharing",
                            "_blank",
                        ),
                },
            ]}
        />
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Loophia koncert a Museum Caféban"
        subtitle="Április 21."
        instagramLink="https://www.instagram.com/reel/C5yrfY-spoy"
        facebookLink="https://www.facebook.com/permalink.php?story_fbid=pfbid0VC2b49YoPt5S19JSeRFWTPzmGH1nktiDYBaQZGQJbo71pvPbCLSq4YLecYXbvV1ql&id=100094619973134"
    >
        <iframe
            loading="lazy"
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
            <a
                href="https://www.facebook.com/permalink.php?story_fbid=pfbid0VC2b49YoPt5S19JSeRFWTPzmGH1nktiDYBaQZGQJbo71pvPbCLSq4YLecYXbvV1ql&id=100094619973134"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-image-multiple"></span>
                    Fotók Seffer Istvántól
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
        <div
            class="adaptive-col-row"
            style="width: 100%; gap: var(--spacing); align-items: stretch;"
        >
            <div
                style="display: flex; flex-direction: column; gap: var(--spacing); justify-content: space-evenly;"
            >
                <p>
                    A magyar költészet napján Csáki egy kincsvadászatot
                    szervezett, ahol a résztvevőknek Székesfehérvár utcáin
                    kellett keresniük matricákat, amelyeken versek és egyéb
                    jóságok voltak. A matricák tartalmai megtalálhatók itt:
                </p>
                <p>
                    <a href="/stickers">
                        <button class="btn">
                            <span class="mdi mdi-map"></span>
                            2024 költészet napi kincsvadászat
                        </button>
                    </a>
                </p>
                <p>
                    Ezt az eseményt a <a
                        href="https://www.facebook.com/groups/570212437568903/"
                        target="_blank">Posztolj verset az utcára!</a
                    > mozgalom ihlette.
                </p>
            </div>
            <div style="max-width: 40%;">
                <video style="max-height: 350px;" controls>
                    <source src={vidKispirosKincsvadaszat} type="video/mp4" />
                </video>
                Story:
                <a href="https://instagram.com/kispirosboi" target="_blank"
                    >@kispirosboi</a
                >
            </div>
        </div>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Kalafatics Imre önálló estje"
        subtitle="Április 7."
        instagramLink="https://www.instagram.com/p/C5giBg0sakJ"
        facebookLink="https://www.facebook.com/permalink.php?story_fbid=273894045774593&id=100094619973134&ref=embed_post"
    >
        <p>
            Imre spontán koncertjeivel sokan találkozhattunk már a Museum
            Caféban. Egy vasárnapi este lírával állt ki elénk, a dalokhoz pedig
            elhozta a remek történeteit is.
        </p>
        <img
            style="width: 100%; max-height: 300px; object-fit: cover;"
            src={KoloraLocalDb.getMusician("Kalafatics Imre")?.bannerImageUrl}
            alt=""
        />
        <p>
            <a
                href="https://drive.google.com/drive/folders/1eYo9prYNlx-O-QW9c0mNNhwDve-oCsNd?usp=sharing"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-image-multiple"></span>
                    Még több kép Tenki Mártontól
                </button>
            </a>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Évnyitó slam"
        subtitle="Március 14."
        instagramLink="https://www.instagram.com/stories/highlights/17871723279011747/"
        facebookLink="https://fb.me/e/5qV6UfabB"
    >
        <p style="flex: 1; width: 100%;">
            A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó
            slam versenyének, ahol 18 előadást láthattunk. Köztük volt 6
            tehetséges versenyző és sok új ember, akik először álltak a
            színpadra. Köszönjük a helyet a Nyolcas Műhelynek és a támogatást
            minden fellépőnek és nézőnek!
        </p>
        <Carousel
            style="aspect-ratio: 21/9;"
            pages={[
                {
                    title: "<span class='mdi mdi-youtube'></span> Fellépők",
                    background: `url('${imgYearOpeningSlam}')`,
                    onclick: () =>
                        window.open(
                            "https://youtube.com/playlist?list=PLxSO3Z5lw-xMmwMn8J0c9Y0gX22sGSfW8&si=tzZyj71NrnGVyWnT",
                            "_blank",
                        ),
                },
                {
                    title: "Helyszín: Nyolcas Műhely",
                    background: `url('${imgNyolcasMuhelyLogo}')`,
                    onclick: () =>
                        window.open(
                            "https://www.facebook.com/nyolcasmuhely",
                            "_blank",
                        ),
                },
            ]}
        />
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
        <p>
            <a
                href="https://drive.google.com/drive/folders/1CDQVRaAfFphdRu1rksA7nAJYi40Ad9sK?usp=sharing"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-image-multiple"></span>
                    Képek Emesétől
                </button>
            </a>
        </p>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="Első slam poetry workshop"
        subtitle="Február 25."
        facebookLink="https://www.facebook.com/permalink.php?story_fbid=pfbid0GffCQPFqTkqZTbrEXGCiq5wVYXpSksXKvrdz2RmGuQDWytgJowzap5yZrrHYZxnRl&id=100094619973134"
        instagramLink="https://www.instagram.com/p/C4n0kGGsKUc"
    >
        <p>
            Szvoren Eszter és Völgyesi Toma voltak az irodalom tanáraink idén,
            akikkel együtt játszottunk a szavakkal, alkottunk és fejlődtünk.
            Ezeket a workshop-okat az évben többször is megtartották
            vasárnaponként a kedvenc kávézónkban.
        </p>
        <div>
            <img
                style="width: 100%; max-height: 300px; object-fit: cover;"
                src={imgFirstKoloraWorkshopTable}
                alt=""
            />
            <span>Fotó: Mészáros Emese</span>
        </div>
    </VerticalTimelineItem>

    <VerticalTimelineItem
        title="The JEX koncert @ Museum Café"
        subtitle="Február 1."
        instagramLink="https://www.instagram.com/p/C2ajW1FMa27"
    >
        <p>
            Ott voltunk a The JEX saját szervezésű koncertjén a Museum Caféban.
        </p>
        <iframe
            loading="lazy"
            width="100%"
            style="aspect-ratio: 16/9;"
            src="https://www.youtube.com/embed/R8HhNxtDX48?si=J5ptwc5dubHWzN-S"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
        <p>
            <a
                href="https://drive.google.com/drive/folders/1yeck-4Eu4Rxg58ufvpE3rcbPlpEQn50L?usp=sharing"
                target="_blank"
            >
                <button class="btn">
                    <span class="mdi mdi-image-multiple"></span>
                    Képek Emesétől
                </button>
            </a>
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
