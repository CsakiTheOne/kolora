<script>
    import Card from "../../../components/legacy/Card.svelte";
    import ExtraContentDivider from "../../../components/legacy/ExtraContentDivider.svelte";
    import FoundByRandomExplanation from "../../../components/legacy/FoundByRandomExplanation.svelte";
    import PoemDisplay from "../../../components/legacy/PoemDisplay.svelte";
    import StickerFoundCallout from "../../../components/legacy/StickerFoundCallout.svelte";
</script>

<StickerFoundCallout/>

<PoemDisplay
    author="Pósa Lajos"
    title="Magyar vagyok"
>
Magyar vagyok, magyar. Magyarnak születtem.
Magyar nótát dalolt a dajka felettem.
Magyarul tanitott imádkozni anyám
És szeretni téged, gyönyörü szép hazám!

Lerajzolta képed szivem közepébe,
Beirta nevedet a lelkem mélyébe.
Áldja meg az Isten a keze vonását!
Áldja meg, áldja meg magyarok hazáját!

Széles e világnak fénye, gazdagsága
El nem csábit innen idegen országba.
A ki magyar, nem tud sehol boldog lenni!
Szép Magyarországot nem pótolja semmi!

Magyarnak születtem, magyar is maradok,
A hazáért élek, ha kell, meg is halok!
Ringó bölcsőm fáját magyar föld termette,
Koporsóm fáját is magyar föld növelje!
</PoemDisplay>

<ExtraContentDivider />

<Card style="margin: var(--spacing);">
    <iframe
        style="width: 100%; aspect-ratio: 16/9;"
        src="https://www.youtube.com/embed/8HvcHaKYo40?si=2CbuqP_FwM1h3uzZ"
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
        src="https://www.youtube.com/embed/yeIMkOQW1M8?si=40ctGzs9omsGbXmM"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</Card>

<FoundByRandomExplanation />
