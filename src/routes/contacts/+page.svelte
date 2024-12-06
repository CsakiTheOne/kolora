<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import logoKolora from "$lib/images/logos/kolora.png";
    import logoWholesomeWare from "$lib/images/logos/wholesomeware.png";
</script>

<Header selectedTab="Elérhetőségek" />
<main>
    <p class="logo-container">
        <img src={logoKolora} alt="" />
    </p>
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

    <p class="logo-container">
        <img src={logoWholesomeWare} alt="" />
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
    <p>
        <a href="https://m.me/CsakiTheOne" target="_blank">
            <span class="mdi mdi-facebook-messenger"></span>
            Messenger: Csáki
        </a>
    </p>

    <!--h2>Általában erre vagyunk</h2>
    <iframe
        title="Museum Café"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.3903565053556!2d18.40735387631114!3d47.18937167115461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f7aef6eb0f7b%3A0xd732c4ac54d33b21!2sMuseum%20Caf%C3%A9!5e0!3m2!1sen!2shu!4v1731753946627!5m2!1sen!2shu"
        width="100%"
        height="350"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
    ></iframe-->
</main>
<Footer />

<style>
    .logo-container {
        text-align: center;
    }

    .logo-container > img {
        max-width: 128px;
        width: 25%;
        border-radius: 50%;
        transition: transform 0.2s;
    }

    .logo-container > img:hover {
        transform: scale(1.1);
    }

    .logo-container > img:active {
        transform: scale(0.9);
    }

    h2 {
        text-align: center;
    }
</style>
