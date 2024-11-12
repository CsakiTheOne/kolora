<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import HeaderTabRow from "../../components/HeaderTabRow.svelte";
</script>

<Header selectedTab="Elérhetőségek" />
<main>
    <h2>Kolora Egyesület</h2>
    <p>
        <a href="mailto:koloraegyesulet@gmail.com" target="_blank">
            <span class="mdi mdi-email"></span>
            Email: koloraegyesulet@gmail.com
        </a>
    </p>
    <p>
        <a
            href="https://www.facebook.com/profile.php?id=100094619973134"
            target="_blank"
        >
            <span class="mdi mdi-facebook"></span>
            Facebook: Kolora Egyesület
        </a>
    </p>
    <p>
        <a href="https://www.instagram.com/koloraegyesulet/" target="_blank">
            <span class="mdi mdi-instagram"></span>
            Instagram: @koloraegyesulet
        </a>
    </p>
    <p>
        <a href="https://www.youtube.com/@koloraegyesulet" target="_blank">
            <span class="mdi mdi-youtube"></span>
            YouTube: Kolora Egyesület
        </a>
    </p>
    <p>
        <a
            href="https://www.facebook.com/groups/1307732380629023"
            target="_blank"
        >
            <span class="mdi mdi-account-group"></span>
            fehérvári író-költő-slammerek Facebook csoport
        </a>
    </p>

    <h2>WholesomeWare</h2>
    <p>
        Ha bármi probléma vagy kérdés van az oldallal kapcsolatban, ezeken a
        módokon elérhetsz:
    </p>
    <p>
        <a href="mailto:jockahun@gmail.com" target="_blank">
            <span class="mdi mdi-email"></span>
            Email: jockahun@gmail.com
        </a>
    </p>
    <p>
        <a href="https://instagram.com/wholesomewarestuff" target="_blank">
            <span class="mdi mdi-instagram"></span>
            Instagram: @wholesomewarestuff
        </a>
    </p>
</main>
<Footer />

<style>
    main {
        display: grid;
        grid-template-columns: [full-start] 0 [main-start] 1fr [main-end] 0 [full-end];
        gap: var(--spacing);
        padding: var(--spacing) 0;
        text-align: left;
    }

    @media (min-width: 720px) {
        main {
            grid-template-columns: [full-start] 20% [main-start] 1fr [main-end] 20% [full-end];
        }
    }

    :global(main > *) {
        grid-column: main;
        object-fit: cover;
    }
</style>
