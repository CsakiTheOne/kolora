<script>
    const { ...rest } = $props();
</script>

<footer {...rest}>
    <p style="text-align: center;">
        <a
            href="https://www.facebook.com/profile.php?id=100094619973134"
            target="_blank"
        >
            <span class="mdi mdi-facebook"></span>
        </a>

        <a href="https://www.instagram.com/koloraegyesulet/" target="_blank">
            <span class="mdi mdi-instagram"></span>
        </a>

        <a href="https://www.youtube.com/@koloraegyesulet" target="_blank">
            <span class="mdi mdi-youtube"></span>
        </a>
    </p>
    <p style="text-align: center;">
        <a href="/impressum"> Impresszum </a>
        <a href="/data"> Adatkezelési irányelvek </a>
        <a href="/tos"> TOS </a>
    </p>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: var(--spacing);
        gap: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        text-align: center;
    }

    a {
        color: #fff;
    }

    a > span {
        font-size: 1.2rem;
        margin: 0 calc(var(--spacing) / 2);
    }
</style>
