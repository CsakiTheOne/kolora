<script>
    import Card from "../../../components/Card.svelte";
    import ExtraContentDivider from "../../../components/ExtraContentDivider.svelte";
    import Footer from "../../../components/Footer.svelte";
    import PoemDisplay from "../../../components/PoemDisplay.svelte";
</script>

<PoemDisplay author="Varró Dániel" title="Éjszakai Busz">
A Moszkva téri McDonald's előtt,
ahol a Hold leszáll a 6-os É-ről,
vagy hányasról - ó változó idők!-
zord járókelők járnak le és föl. 

Tűsarkon kopognak ott a nők,
mély csend kíséri őket, ámulat,
amint a koszfoltos aszfalton ők
egymás elé rakják a lábukat.

Egy hang recseg: " A fényes, kopasz úr
igyekezzen a leszállással kérem!"
Hűvös van, s tűnt szerelmek soka szúr
a McDonald's előtt, a Moszkva téren.
</PoemDisplay>

<ExtraContentDivider />

<Card style="margin: 16px; padding: 16px;">
    <Card>
        <iframe
            style="width: calc(100%); aspect-ratio: 16/9;"
            src="https://www.youtube.com/embed/JtccJR0wBUk?si=e83wHPdrVzm2HkP-"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    </Card>
    <p>
        Fehérvárhoz húz a szívem, de Veszprémben töltöttem sok évem. A szomszéd
        vármegye székhelyén a kedvenc rendezvényemre szeretnélek meghívni
        titeket: Az Utcazenére. Nyáron, általában július végén kerül
        megrendezésre. Napokon keresztül zenészek lepik el Veszprém utcáit és
        kávézóit. Gyertek el idén és nézzetek körbe! Lesznek helyi zenészek
        (akár ti?) és külföldi előadók is.
    </p>
</Card>
