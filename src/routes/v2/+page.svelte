<script>
    import Header from "../../components/v2/Header.svelte";
import IrregularContainer from "../../components/v2/IrregularContainer.svelte";
</script>

<Header selectedPageIndex={0} />
<main class="container-column">
    <h1>Kolora weboldal redesign</h1>
    <p>
        A weboldalunk újratervezés alatt van. Ezen az oldalon megtekintheted a
        fejlesztés alatt álló új design-t.
    </p>
    <h2>Oldalak készen és tervezés alatt</h2>
    <p>
        Ezek az oldalak mind készítés alatt vannak és nagy változtatásokon
        mennek keresztül.
    </p>
    <a
        href="/v2/contacts"
        class="irregular-box-container"
        style="align-self: flex-start"
    >
        <button class="irregular-box">Elérhetőségek</button>
    </a>
    <h2>Ihletek</h2>
    <IrregularContainer>
        <iframe
            width="100%"
            style="aspect-ratio: 16 / 9"
            src="https://www.youtube.com/embed/9KdP2idt6LE?si=kk8qKLDm29sz1i2T"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    </IrregularContainer>
</main>
