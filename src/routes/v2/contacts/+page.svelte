<script>
    import logoKolora from "$lib/images/logos/kolora_minimal.png";
    import logoWholesomeWare from "$lib/images/logos/wholesomeware_minimal_mono.png";
    import Header from "../../../components/v2/Header.svelte";
    import IrregularContainer from "../../../components/v2/IrregularContainer.svelte";
</script>

<Header selectedPageIndex={3} />
<main class="container-column">
    <h1>Elérhetőségek</h1>
    <div id="kolora" class="entity">
        <div class="img" style="background-image: url('{logoKolora}');"></div>
        <div class="links">
            <p style="rotate: -16deg;">
                <a href="mailto:koloraegyesulet@gmail.com" target="_blank">
                    <span>koloraegyesulet @gmail.com</span>
                </a>
            </p>
            <p style="rotate: -8deg;">
                <a
                    href="https://www.facebook.com/profile.php?id=100094619973134"
                    target="_blank"
                >
                    <span>Fb: Kolora Egyesület</span>
                </a>
            </p>
            <p style="rotate: 0deg;">
                <a
                    href="https://www.instagram.com/koloraegyesulet/"
                    target="_blank"
                >
                    <span>Insta: @koloraegyesulet</span>
                </a>
            </p>
            <p style="rotate: 8deg;">
                <a
                    href="https://www.youtube.com/@koloraegyesulet"
                    target="_blank"
                >
                    <span>YouTube: Kolora Egyesület</span>
                </a>
            </p>
            <p style="rotate: 16deg;">
                <a
                    href="https://www.facebook.com/groups/1307732380629023"
                    target="_blank"
                >
                    <span>író-költő-slammerek Fb csoport</span>
                </a>
            </p>
        </div>
    </div>
    <h2>WholesomeWare</h2>
    <p>
        Ha bármi kérdés vagy probléma merülne fel a weboldallal kapcsolatban,
        keress bátran!
    </p>
    <div id="wholesomeware" class="entity">
        <div class="links">
            <p style="rotate: 10deg;">
                <a href="mailto:jockahun@gmail.com" target="_blank">
                    <span>jockahun@gmail.com</span>
                </a>
            </p>
            <p style="rotate: 0deg;">
                <a
                    href="https://instagram.com/wholesomewarestuff"
                    target="_blank"
                >
                    <span>Insta: @wholesomewarestuff</span>
                </a>
            </p>
            <p style="rotate: -10deg;">
                <a href="https://m.me/CsakiTheOne" target="_blank">
                    <span>Messenger: Csáki</span>
                </a>
            </p>
        </div>
        <div
            class="img"
            style="background-image: url('{logoWholesomeWare}');"
        ></div>
    </div>
</main>

<style>
    main {
        align-items: center;
        --link-shape: polygon(0 40%, 100% 0, 98% 100%, 0 60%);
        --link-shape-reverse: polygon(0 0, 100% 40%, 100% 60%, 2% 100%);
    }

    .entity {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 4px;
        margin: 30px 0;
    }

    .entity .img {
        width: 192px;
        height: 192px;
        background-color: black;
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
    }

    .entity > .links {
        flex: 1;
        max-width: 320px;
    }

    .links > p {
        background-color: black;
        text-transform: uppercase;
        font-weight: bold;
        font-size: small;
        clip-path: var(--link-shape);
        padding: 4px;
        text-align: right;
    }

    .links > p:hover {
        scale: 1.05;
    }

    #wholesomeware .links > p {
        clip-path: var(--link-shape-reverse);
        text-align: left;
    }

    .links > p > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        gap: 10px;
        padding: 25px 10px 25px 20px;
        color: inherit;
        text-decoration: none;
        clip-path: var(--link-shape);
        background-color: white;
        color: black;
    }

    #wholesomeware .links > p > a {
        clip-path: var(--link-shape-reverse);
        padding: 25px 20px 25px 10px;
        justify-content: start;
    }

    .links > p > a:hover {
        background-color: var(--kolora-color-red);
        color: white;
    }
</style>
