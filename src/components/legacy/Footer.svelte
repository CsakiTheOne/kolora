<script>
    const { ...rest } = $props();
</script>

<footer {...rest}>
    <p>
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

        <a href="/contacts">
            <span class="mdi mdi-dots-horizontal"></span>
        </a>
    </p>
    <p>
        <a href="/impressum"> Impresszum </a>
        <a href="/data"> Adatkezelési irányelvek </a>
        <a href="/tos"> TOS </a>
    </p>
    <p style="text-align: right;">
        &copy; {new Date().getFullYear()} Kolora Egyesület<br />
        Weboldalt készítette: WholesomeWare
    </p>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--spacing) / 2);
        gap: calc(var(--spacing) / 2);
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
