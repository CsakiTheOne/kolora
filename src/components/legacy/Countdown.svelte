<script>
    import { onMount } from "svelte";

    const {
        targetDateTime,
        backgroundColor = "var(--primary-color)",
        color = "var(--on-primary-color)",
        style = "",
        ...props
    } = $props();

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state("0");
    let seconds = $state("0");

    function updateTime() {
        const now = new Date();
        // @ts-ignore
        const diff = targetDateTime - now;
        if (diff < 0) {
            days = 0;
            hours = 0;
            minutes = "00";
            seconds = "00";
            return;
        }
        days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesInt = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        minutes = `${minutesInt < 10 ? "0" : ""}${minutesInt}`;
        const secondsInt = Math.floor((diff % (1000 * 60)) / 1000);
        seconds = `${secondsInt < 10 ? "0" : ""}${secondsInt}`;
    }

    onMount(() => {
        updateTime();

        const timer = setInterval(() => {
            updateTime();
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    });
</script>

<div
    class="countdown"
    style="--background-color: {backgroundColor}; --color: {color}; {style}"
    {...props}
>
    {#if days > 0}
        <div
            style="display: flex; flex-direction: row; justify-content: center; gap: .2rem; padding-bottom: .2rem;"
        >
            <h1 class="section">{days}</h1>
            <h1 class="section">nap</h1>
        </div>
    {/if}
    <h1 class="section">{hours}</h1>
    <h1 class="section">:</h1>
    <h1 class="section">{minutes}</h1>
    <h1 class="section">.</h1>
    <h1 class="section">{seconds}</h1>
</div>

<style>
    .countdown {
        display: initial;
    }

    .section {
        display: inline-block;
        position: relative;
        background-color: var(--background-color);
        color: var(--color);
        border-radius: var(--corner-radius);
        min-width: 2.3rem;
        font-weight: bold;
        padding: 0.5rem;
        text-align: center;
        overflow: hidden;
        transition: all 0.1s ease-out;
    }

    .section::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: #00000020;
    }
</style>
