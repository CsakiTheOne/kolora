<script>
    import Card from "../../../components/Card.svelte";
    import ExtraContentDivider from "../../../components/ExtraContentDivider.svelte";
    import PoemDisplay from "../../../components/PoemDisplay.svelte";
    import utcazene2024Poster from "$lib/images/utcazene.jpg";
    import StickerFoundCallout from "../../../components/StickerFoundCallout.svelte";
</script>

<StickerFoundCallout/>

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

<Card style="margin: var(--spacing); padding: var(--spacing);">
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
    <p style="margin: var(--spacing) 0;">
        Fehérvárhoz húz a szívem, de Veszprémben töltöttem sok évem. A szomszéd
        vármegye székhelyén a kedvenc rendezvényemre szeretnélek meghívni
        titeket: Az Utcazenére. Nyáron, általában július végén kerül
        megrendezésre. Napokon keresztül zenészek lepik el Veszprém utcáit és
        kávézóit. Gyertek el idén és nézzetek körbe! Lesznek helyi zenészek
        (akár ti?) és külföldi előadók is.
    </p>
    <img
        id="utcazene2024Poster"
        src={utcazene2024Poster}
        alt="Utcazene 2024"
    />
    <a href="https://www.facebook.com/utcazene" target="_blank">Utcazene Facebook oldal</a>
</Card>

<style>
    #utcazene2024Poster {
        display: inline-block;
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: var(--corner-radius);
        object-fit: cover;
    }
</style>