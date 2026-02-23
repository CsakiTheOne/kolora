<script>
    import logoKolora from "$lib/images/logos/kolora_minimal.png";
    import logoWholesomeWare from "$lib/images/logos/wholesomeware_minimal.png";
    import IrregularContainer from "../../../components/v2/IrregularContainer.svelte";
</script>

<main>
    <h1>Elérhetőségek</h1>
    <h2>Kolora Egyesület</h2>
    <div id="kolora" class="entity">
        <IrregularContainer>
            <img src={logoKolora} alt="" style="padding: 30px;" />
        </IrregularContainer>
        <div class="links">
            <p style="rotate: -18deg; translate: -25px 0;">
                <a href="mailto:koloraegyesulet@gmail.com" target="_blank">
                    koloraegyesulet
                    @gmail.com
                </a>
            </p>
            <p style="rotate: -7deg; translate: -15px 0;">
                <a
                    href="https://www.facebook.com/profile.php?id=100094619973134"
                    target="_blank"
                >
                    Fb: Kolora Egyesület
                </a>
            </p>
            <p style="rotate: 1deg; translate: -15px 0;">
                <a
                    href="https://www.instagram.com/koloraegyesulet/"
                    target="_blank"
                >
                    Insta: @koloraegyesulet
                </a>
            </p>
            <p style="rotate: 8deg; translate: -25px 0;">
                <a
                    href="https://www.youtube.com/@koloraegyesulet"
                    target="_blank"
                >
                    YouTube: Kolora Egyesület
                </a>
            </p>
            <p style="rotate: 20deg; translate: -45px 0;">
                <a
                    href="https://www.facebook.com/groups/1307732380629023"
                    target="_blank"
                >
                    fehérvári író-költő-slammerek Fb csoport
                </a>
            </p>
        </div>
    </div>
    <h2>WholesomeWare</h2>
    <div id="wholesomeware" class="entity">
        <div class="links">
            <p style="rotate: 10deg; translate: 35px 0;">
                <a href="mailto:jockahun@gmail.com" target="_blank">
                    jockahun@gmail.com
                </a>
            </p>
            <p style="rotate: 3deg; translate: 20px 0;">
                <a
                    href="https://instagram.com/wholesomewarestuff"
                    target="_blank"
                >
                    Insta: @wholesomewarestuff
                </a>
            </p>
            <p style="rotate: -10deg; translate: 25px 0;">
                <a href="https://m.me/CsakiTheOne" target="_blank">
                    Messenger: Csáki
                </a>
            </p>
        </div>
        <IrregularContainer>
            <img src={logoWholesomeWare} alt="" />
        </IrregularContainer>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        padding: 50px 6px;
    }

    .entity {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .entity img {
        width: 100%;
        height: auto;
    }

    :global(.entity > *:has(img)) {
        width: 250px;
        max-width: 40%;
    }

    :global(.entity > .outer > .inner) {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        padding: 20px;
    }

    .links {
        z-index: 2;
    }

    .links > p {
        background-color: white;
        text-transform: uppercase;
        font-size: small;
        font-weight: bold;
        clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%);
        padding: 4px;
        text-align: right;
    }

    #wholesomeware .links > p {
        clip-path: polygon(0 0, 100% 40%, 100% 60%, 0 100%);
        text-align: left;
    }

    .links > p > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        gap: 10px;
        padding: 25px 10px 25px 30%;
        color: inherit;
        text-decoration: none;
        clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%);
        background-color: black;
        color: white;
    }

    #wholesomeware .links > p > a {
        clip-path: polygon(0 0, 100% 40%, 100% 60%, 0 100%);
        padding: 25px 30% 25px 10px;
        justify-content: start;
    }

    .links > p > a:hover {
        background-color: var(--kolora-color-red);
        color: black;
    }
</style>
