<script lang="ts">
    import { onMount } from "svelte";

    const { ...rest } = $props();

    let footerContainer: HTMLElement | null = $state(null);
    let isFooterReachingBottom = $state(false);

    $effect(() => {
        isFooterReachingBottom = footerContainer
            ? footerContainer.getBoundingClientRect().bottom >=
              window.innerHeight
            : false;
    });
</script>

<div class="footer-container" bind:this={footerContainer}>
    <svg
        width="100%"
        height="10px"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        style="margin-bottom: -1px;"
    >
        <path
            d="M 0 10 L 8 2 L 15 6 L 22 3 L 30 7 L 38 2 L 45 5 L 52 2 L 60 6 L 68 3 L 75 7 L 82 5 L 90 2 L 100 10 Z"
            fill="#121212"
            stroke="none"
        />
    </svg>
    <footer {...rest}>
        <p>
            <a
                href="https://www.facebook.com/profile.php?id=100094619973134"
                target="_blank"
            >
                <span class="mdi mdi-facebook"></span>
            </a>

            <a
                href="https://www.instagram.com/koloraegyesulet/"
                target="_blank"
            >
                <span class="mdi mdi-instagram"></span>
            </a>

            <a href="https://www.youtube.com/@koloraegyesulet" target="_blank">
                <span class="mdi mdi-youtube"></span>
            </a>

            <a href="/contacts">
                <span class="mdi mdi-dots-horizontal"></span>
            </a>
        </p>
        <p>
            <a href="/impressum"> Impresszum </a>
            <a href="/data"> Adatkezelési irányelvek </a>
        </p>
        <p style="text-align: right;">
            &copy; {new Date().getFullYear()} Kolora Egyesület<br />
            Weboldalt készítette: WholesomeWare
        </p>
    </footer>
    {#if !isFooterReachingBottom}
        <svg
            width="100%"
            height="10px"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            style="transform: rotate(180deg);"
        >
            <path
                d="M 0 10 L 8 2 L 15 6 L 22 3 L 30 7 L 38 2 L 45 5 L 52 2 L 60 6 L 68 3 L 75 7 L 82 5 L 90 2 L 100 10 Z"
                fill="#121212"
                stroke="none"
            />
        </svg>{/if}
</div>

<style>
    .footer-container {
        display: flex;
        flex-direction: column;
    }

    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        background-color: #121212;
        color: white;
        text-align: center;
    }

    a > span {
        font-size: 1.2rem;
        margin: 0 0.5rem;
    }
</style>
