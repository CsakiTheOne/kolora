<script lang="ts">
    import { onMount } from "svelte";

    let btn: HTMLButtonElement | null = null;

    onMount(() => {
        function scrollListener() {
            if (!btn) return;
            if (window.scrollY > 350) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
            btn.style.opacity = "" + window.scrollY / 2000;
        }

        document.addEventListener("scroll", scrollListener);

        return () => {
            document.removeEventListener("scroll", scrollListener);
        };
    });
</script>

<button
    bind:this={btn}
    onclick={() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }}
    aria-label="Scroll to top"
>
    <span class="mdi mdi-format-vertical-align-top"></span>
</button>

<style>
    button {
        display: none;
        opacity: 0;
        position: fixed;
        bottom: calc(var(--spacing) * 2);
        right: calc(var(--spacing) * 2);
        font-size: 1.3rem;
        padding: calc(var(--spacing) / 2);
        appearance: none;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        border: none;
        border-radius: var(--corner-radius);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
</style>
