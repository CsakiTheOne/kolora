<script>
    import Carousel from "../../../components/Carousel.svelte";
    import Divider from "../../../components/Divider.svelte";
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import imgOldDesignSystem from "$lib/images/utils/kolora-design-language.png";
</script>

<SmallHeader
    path={[{ title: "Eszközök", href: "/member-tools" }]}
    currentPage="Design rendszer"
/>
<main>
    <h2>Design rendszer</h2>
    <p>
        Egyesületünk egyik feladata, hogy bemutatkozási és fellépési
        lehetőségekkel támogassuk a helyi feltörekvő művészeket. Pontosan ezért
        jól láthatónak és könnyen érthetőnek kell lennünk. A design-unk is ezt
        hivatott tükrözni.
    </p>
    <h3>Régi, Levi által alkotott design rendszer</h3>
    <img
        src={imgOldDesignSystem}
        style="background: #888; width: 100%;"
        alt="Old design system"
    />
    <a
        href="https://www.figma.com/design/fQXueseuUZJlGYchKmx8CN/Kolora-design-system-2024-25?m=auto&t=jGZMg3CFBvGBdLDc-6"
        target="_blank"
    >
        <button class="btn" style="width: 100%;">
            Figma
        </button>
    </a>

    <h3>Színek</h3>
    <p>
        A színek a Kolora arculatának alapját képezik. Ezeket a színeket
        használjuk a weboldalon, a közösségi médiában és minden egyéb
        megjelenésünk során.
    </p>
    <p>
        Az események könnyű megkülönböztetése és konzisztencia érdekében, a
        következő színeket megadott esemény típusokhoz asszociáljuk:
    </p>
    <table class="color-table">
        <thead>
            <tr>
                <th style="width: 30%">Esemény típus</th>
                <th style="width: 30%">Elsődleges szín</th>
                <th style="width: 30%">Másodlagos szín</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background: #313b72;">
                <td>Terasz</td>
                <td>#313b72</td>
                <td style="background: #86bbd8;">#86bbd8</td>
            </tr>
            <tr style="background: #531253;">
                <td>Akusztik</td>
                <td>#531253</td>
                <td style="background: #b68cf0;">#b68cf0</td>
            </tr>
            <tr style="background: #931621;">
                <td>Slam</td>
                <td>#931621</td>
                <td style="background: #dc7f9b;">#dc7f9b</td>
            </tr>
            <tr style="background: #dda448;">
                <td>Egyéb</td>
                <td>#dda448</td>
                <td style="background: #554640;">#554640</td>
            </tr>
        </tbody>
    </table>
    <h4>Egyéb színek</h4>
    <table class="color-table">
        <thead>
            <tr>
                <th style="width: 33%">Szín</th>
                <th style="width: 66%">Hex kód(ok)</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background: #89003e;">
                <td>Logó színek</td>
                <td
                    style="background: linear-gradient(90deg, #89003e, #ffffff);"
                >
                    #89003e - #ffffff
                </td>
            </tr>
            <tr style="background: #ff3030;">
                <td>Előző logó színek</td>
                <td
                    style="background: linear-gradient(90deg, #ff3030, #ffffff);"
                >
                    #ff3030 - #ffffff
                </td>
            </tr>
        </tbody>
    </table>

    <h3>Formák és alakzatok</h3>
    <p>
        A legfőbb célközönségünk a fehérvári és környékbeli <b>fiatalok</b>,
        ezért kerüljük az unalmas, rácsos elrendezéseket. A Facebook posztokban
        már szerepeltek hullámok. Ennek a továbbgondolását ajánlom.
    </p>
    <p>
        Egy jó irány a Google által fejlesztett <a href="https://m3.material.io"
            >Material 3</a
        >.
    </p>
    <p>
        A színekhez hasonlóan a különböző formákat is lehetne esemény típusokhoz
        rendelni.
    </p>
    <table>
        <thead>
            <tr>
                <th>Esemény típus</th>
                <th>Forma</th>
                <th>Magyarázat</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Terasz</td>
                <td>Cikcakk</td>
                <td>
                    Elektronikus zenében a hangképzésnél gyakran előforduló
                    görbe
                </td>
            </tr>
            <tr>
                <td>Akusztik</td>
                <td>Hullám</td>
                <td>
                    Akusztikus zenében a hangok terjedését és a hangképzést
                    jelképzi
                </td>
            </tr>
            <tr>
                <td>Slam</td>
                <td>Félkörök</td>
                <td>Színházakban a függöny formájára hasonlít</td>
            </tr>
            <tr>
                <td>Egyéb</td>
                <td>Egyenes vonalak</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <p>
        Példákért lásd a <a href="/member-tools/post-generator"
            >poszt készítőt</a
        >.
    </p>
    <h4>Média tartalom felbontások</h4>
    <table>
        <thead>
            <tr>
                <th>Platform és tartalom típus</th>
                <th>Ajánlott felbontás</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Facebook esemény borító</td>
                <td>1200x628 px</td>
            </tr>
            <tr>
                <td>Instagram poszt</td>
                <td>1080x1080 px</td>
            </tr>
            <tr>
                <td>Instagram történet</td>
                <td>1080x1920 px</td>
            </tr>
        </tbody>
    </table>

    <h3>Frontend komponensek</h3>
    <p>
        Néhány egyedi komponens, amit a weboldalon használunk. Mindegyik követi
        a játékos, színes és fiatalos stílust.
    </p>
    <h4>Carousel</h4>
    <Carousel
        style="aspect-ratio: 21/9;"
        pages={[
            {
                title: "Carousel",
            },
            {
                title: "Material 3 carousel alapján",
                onclick: () => {
                    window.open(
                        "https://m3.material.io/components/carousel/overview",
                        "_blank",
                    );
                },
            },
            {
                title: "Google Fotók",
                text: "A Google Fotók alkalmazásban is megtalálható ez az elem Androidon.",
                onclick: () => {
                    window.open("https://photos.google.com/", "_blank");
                },
            },
        ]}
    />
    <h4>Divider</h4>
    <Divider />
    <h4>Virág FAB</h4>
    <p>
        A "vissza az oldal tetejére" gomb egy virág formájú FAB, ami a jobb alsó
        sarokban látható.
    </p>

    <h3>Tipográfia és hangnem</h3>
    <p>//TODO</p>

    <h3>Méretezés és térközök</h3>
    <p>//TODO</p>

    <h3>Képek</h3>
    <p>//TODO</p>

    <h3>Megjegyzések</h3>
    <h4>Miért nem követi a weboldal ezt a design rendszert?</h4>
    <p>
        Ennek több oka is van. Például az oldal tervezésekor több hangsúlyt
        fektettem a funkcionalitásra. Emellett banki fejlesztőként nem a design
        az erősségem és ezt a weboldalt használom önmagam fejlesztésére is.
        Illetve még egy ok, hogy a design rendszert magát nem én terveztem meg.
    </p>
    <p>
        A design rendszert nagyrészt a Levi készítette, én csak kibővítettem és
        dokumentáltam.
    </p>
</main>
<Footer />

<style>
    .color-table {
        color: white;
        overflow: hidden;
    }
</style>
