<script>
    import { loginWithGoogle } from "$lib/firebase/auth";
    import UserManager from "$lib/UserManager.svelte";
    import { onMount } from "svelte";
    import SmallHeader from "../../../components/SmallHeader.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Divider from "../../../components/Divider.svelte";

    $effect(() => {
        if (!UserManager.instance.isLoaded) return;

        if (!UserManager.instance.isLoggedIn) {
            loginWithGoogle();
        }
    });
</script>

<SmallHeader currentPage="" />
<main>
    {#if UserManager.instance.isLoggedIn}
        <h2>Kész a fiókod!</h2>
        <Divider />
        <a href="/profile/?id={UserManager.instance.koloraUser?.id}">
            <button class="btn" style="width: 100%;">
                <span class="mdi mdi-account"></span>
                Profil megtekintése
            </button>
        </a>
        <button class="btn" onclick={() => window.close()}>
            <span class="mdi mdi-close"></span>
            Lap bezárása
        </button>
    {:else}
        <h2>Kolora fiók létrehozása...</h2>
        <Divider />
        <button class="btn" onclick={loginWithGoogle}>
            Ha nem történik semmi, akkor koppints ide a folytatáshoz.
        </button>
    {/if}
</main>
<Footer />