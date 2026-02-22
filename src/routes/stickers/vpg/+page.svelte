<script>
    import Card from "../../../components/stickers-legacy/Card.svelte";
    import ExtraContentDivider from "../../../components/stickers-legacy/ExtraContentDivider.svelte";
    import FoundByRandomExplanation from "../../../components/stickers-legacy/FoundByRandomExplanation.svelte";
    import PoemDisplay from "../../../components/stickers-legacy/PoemDisplay.svelte";
    import StickerFoundCallout from "../../../components/stickers-legacy/StickerFoundCallout.svelte";
</script>

<StickerFoundCallout/>

<PoemDisplay
    author="Csáki"
    title="Tartózkodó kérelem (Csokonai Vitéz Mihály verse alapján)"
>
A hatalmas iskolának,
Ellenőrző könyve bánt.
Ön lehet írja sebemnek,
Jószívű, kedves tanár!

Piros tollának tintája
Eleven hajnali tűz,
Ellenőrzőben aláírása
Sok ezer gondot szűl.

Teljesítsd TZ ötösökkel,
Diákod amire kért:
Havi ezer osztálypénzzel
Fizetek jó jegyekért.
</PoemDisplay>

<ExtraContentDivider />

<Card style="margin: var(--spacing); padding: var(--spacing);">
    <img
        style="display: inline-block; width: 64px; border-radius: var(--corner-radius);"
        src="https://play-lh.googleusercontent.com/DNvr43nHsocrp4RE92jmC_BZTHoIuOqv-CNIl9r0BWFGgsC8cJS6GTPC49HzUeKgZwg"
        alt="app logó"
    />
    <h2 style="display: block; margin-top: 1rem;">
        Interaktív Költemények
    </h2>
    <p style="margin: var(spacing) 0;">
        Ismered a "choose your own adventure" könyveket? Többször elolvashatod
        és mindig máshogy végződnek. Na ilyen műveket írok a saját appomban. Ha
        droidos vagy, lesd meg!
    </p>
    <a
        style="display: block; margin-top: 1rem;"
        href="https://play.google.com/store/apps/details?id=com.csakitheone.interactive_poems"
        target="_blank"
    >
        Play Áruház megnyitása
    </a>
</Card>

<FoundByRandomExplanation />
