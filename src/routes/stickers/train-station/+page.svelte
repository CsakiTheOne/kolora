<script>
    import Card from "../../../components/Card.svelte";
    import ExtraContentDivider from "../../../components/ExtraContentDivider.svelte";
    import FoundByRandomExplanation from "../../../components/FoundByRandomExplanation.svelte";
    import PoemDisplay from "../../../components/PoemDisplay.svelte";
    import StickerFoundCallout from "../../../components/StickerFoundCallout.svelte";
</script>

<StickerFoundCallout/>

<PoemDisplay
    author="Petőfi Sándor"
    title="Vasuton"
>
Tenger kéj veszen körűl,
Közepében lelkem fürdik...
A madár röpűlt csak eddig,
Most az ember is röpűl!
 
Nyílsebes gondolatunk,
Későn indulánk utánad,
De sarkantyúzd paripádat,
Mert elérünk, elhagyunk!
 
Hegy, fa, ház, ember, patak
És ki tudja, még mi minden?
Tűnedez föl szemeimben
S oszlik el, mint köd-alak.
 
A nap is velünk szalad,
Mint egy őrült, aki véli,
Hogy őt, összevissza tépni,
Űzi egy ördögcsapat;
 
Futott, futott, s hasztalan!
Elmaradt... fáradva dől le
A nyugati hegytetőre,
Arcán szégyen lángja van.
 
S még mi egyre röpülünk,
Egy sziporkát sem fáradva;
Ez a gép tán egyenest a
Másvilágba megy velünk! -
 
Száz vasútat, ezeret!
Csináljatok, csináljatok!
Hadd fussák be a világot,
Mint a testet az erek.
 
Ezek a föld erei,
Bennök árad a müveltség,
Ezek által ömlenek szét
Az életnek nedvei.
 
Miért nem csináltatok
Eddig is már?... vas hiányzott?
Törjetek szét minden láncot,
Majd lesz elég vasatok.
</PoemDisplay>

<ExtraContentDivider />

<Card style="margin: var(--spacing);">
    <iframe
        style="width: 100%; aspect-ratio: 16/9;"
        src="https://www.youtube.com/embed/Rw_7_CgUFFU?si=CFBOkQ5J4WBW8F0R"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</Card>

<Card style="margin: var(--spacing);">
    <iframe
        style="width: 100%; aspect-ratio: 16/9;"
        src="https://www.youtube.com/embed/cxZkLkhX1cI?si=QmBsCM2GaOL621o6"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</Card>

<FoundByRandomExplanation />
