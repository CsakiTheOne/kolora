<script>
    import Card from "../../../components/Card.svelte";
    import ExtraContentDivider from "../../../components/ExtraContentDivider.svelte";
    import FoundByRandomExplanation from "../../../components/FoundByRandomExplanation.svelte";
    import PoemDisplay from "../../../components/PoemDisplay.svelte";
    import StickerFoundCallout from "../../../components/StickerFoundCallout.svelte";
</script>

<StickerFoundCallout/>

<PoemDisplay author="Csáki" title="Teszt versike">
A rózsa vörös, az ibolya kék.
Ha a kódom működne, annak nagyon örülnék.
</PoemDisplay>

<ExtraContentDivider/>

<Card style="margin: var(--spacing); padding: var(--spacing);">
    Yippeee!
    <p>
        Minden matricán / QR kódon lesz egy vers és egy vagy több extra tartalom.
        Ezek az extra dolgok itt fognak megjelenni. Mik lehetnek itt?
        Videók, zenék, buli meghívók és ki tudja még mi.
        Találjátok meg mindet és megtudjátok!
    </p>
</Card>

<FoundByRandomExplanation />
