<script>
    import Footer from "../../../components/Footer.svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
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
                <td>Slam<sup>*</sup></td>
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
    <p>
        <sup>*</sup> = Ez a Kolora Egyesület elsődleges színe.
    </p>

    <h3>Formák és alakzatok</h3>
    <p>
        A legfőbb célközönségünk a fehérvári és környékbeli <b>fiatalok</b>,
        ezért kerüljük az unalmas, rácsos elrendezéseket. A Facebook posztokban
        már szerepeltek hullámok. Ennek a továbbgondolását ajánlom.
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
