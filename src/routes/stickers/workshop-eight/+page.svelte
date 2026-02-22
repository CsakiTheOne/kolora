<script>
    import Card from "../../../components/stickers-legacy/Card.svelte";
    import ExtraContentDivider from "../../../components/stickers-legacy/ExtraContentDivider.svelte";
    import PoemDisplay from "../../../components/stickers-legacy/PoemDisplay.svelte";
    import StickerFoundCallout from "../../../components/stickers-legacy/StickerFoundCallout.svelte";
    import FoundByRandomExplanation from "../../../components/stickers-legacy/FoundByRandomExplanation.svelte";
</script>

<StickerFoundCallout/>

<PoemDisplay author="Reményik Sándor" title="Szó és tett">
Néha úgy érzem, mintha tűkön állnék;
Tettekre vágyom,
Mert untat már e balga tűzijáték,
E meddő nyargalás a szavakon.
Ó, akik tenni és hallgatni tudtak!
Őket irigylem, bámulom nagyon.

Azt mondjátok: a szó is hatalom?
A szó is tett? - Sovány vigasztalás!
Üres, üres, üres a szóbeszéd, -
És több kellene... és valami más!
Mert szörnyű, szörnyű, nyomorult - kevés
Az én részem:
E férfiatlan, hitvány fecsegés!

E sok-sok üres szóra, ami éget,
Ráütni úgy szeretnék
Az életemmel egy piros pecsétet,
Hadd lenne omló véremtől veres,
S aki olvasná, megnyugodnék benne:
Így; most már hiteles.
</PoemDisplay>

<ExtraContentDivider/>

<Card style="margin: var(--spacing);">
    <iframe
        style="width: 100%; aspect-ratio: 16/9;"
        src="https://www.youtube.com/embed/g1VaFg9DzFE?si=7iSuwn9bFMn275AB"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</Card>

<FoundByRandomExplanation />
