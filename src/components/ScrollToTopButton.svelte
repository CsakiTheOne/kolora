<script>
    import { onMount } from "svelte";

    onMount(() => {
        document.addEventListener("scroll", () => {
            const button = document.querySelector("button");
            if (button) {
                if (window.scrollY > 150) {
                    button.style.display = "block";
                } else {
                    button.style.display = "none";
                }
                button.style.opacity = '' + (window.scrollY / 1000);
            }
        });
    });
</script>

<button
    onclick={() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }}
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
        padding: var(--spacing);
        appearance: none;
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        border: none;
        border-radius: var(--corner-radius);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
</style>
