<script>
    import Card from "./Card.svelte";

    const {
        targetDate,
        targetTime,
        ...props
    } = $props();

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state('0');
    let seconds = $state('0');

    setInterval(() => {
        const now = new Date();
        const target = new Date(`${targetDate}T${targetTime}`);
        const diff = target - now;
        days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesInt = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        minutes = `${minutesInt < 10 ? '0' : ''}${minutesInt}`;
        const secondsInt = Math.floor((diff % (1000 * 60)) / 1000);
        seconds = `${secondsInt < 10 ? '0' : ''}${secondsInt}`;
    }, 1000);
</script>

<div {...props}>
    <h1 class="section">{days}</h1>
    <h1 class="section">-</h1>
    <h1 class="section">{hours}</h1>
    <h1 class="section">:</h1>
    <h1 class="section">{minutes}</h1>
    <h1 class="section">.</h1>
    <h1 class="section">{seconds}</h1>
</div>

<style>
    .section {
        display: inline-block;
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: calc(var(--corner-radius) / 2);
        min-width: 2.3rem;
        font-weight: bold;
        padding: 0.5rem;
    }
</style>