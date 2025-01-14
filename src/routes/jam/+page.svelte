<script>
    import Countdown from "../../components/Countdown.svelte";
    import Footer from "../../components/Footer.svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";

    const dateAnnouncement = new Date("2025-04-11T00:00:00");
</script>

<SmallHeader
    path={[{ title: "Galéria", href: "/gallery" }]}
    currentPage="Költészet napi kalandozás"
/>
<div class="secondary-header">
    <h1>Költészet napi kalandozás</h1>
    <Countdown
        targetDateTime={dateAnnouncement}
        backgroundColor="var(--on-primary-color)"
        color="var(--primary-color)"
    />
</div>
<main>
    <p>
        Idén egy kalandra invitállak benneteket, ahol a történet írás találkozik
        a játékokkal.
    </p>
</main>
<Footer />

<style>
    .secondary-header {
        display: grid;
        gap: var(--spacing);
        padding: var(--spacing) 0;
        text-align: center;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
    }
</style>
