<script lang="ts">
    import { loginWithGoogle, logout } from "$lib/firebase/auth";
    import Backdrop from "./Backdrop.svelte";
    import UserManager from "$lib/UserManager.svelte";
    import { ROLES } from "$lib/model/KoloraUser";
    import { scale } from "svelte/transition";

    let isOpen = $state(false);
</script>

<span
    class={"mdi" +
        (UserManager.instance.isLoggedIn
            ? " mdi-account-circle"
            : " mdi-login")}
    onclick={() => (isOpen = !isOpen)}
    onkeydown={(e) => e.key === "Enter" && (isOpen = !isOpen)}
    tabindex="0"
    role="button"
></span>

{#if isOpen}
    <Backdrop close={() => (isOpen = false)}>
        <div
            class="account-dialog"
            transition:scale={{ duration: 200, start: 0.8 }}
        >
            <span class="mdi mdi-account-circle" style="font-size: 3rem;">
            </span>
            <p style="word-wrap: normal;">
                <b>
                    {#if UserManager.instance.isLoggedIn}
                        Helló, {UserManager.instance.koloraUser!!.username}!
                    {:else}
                        Jelentkezz be!
                    {/if}
                </b>
            </p>
            <ul>
                {#if !UserManager.instance.firebaseUser}
                    <button onclick={loginWithGoogle}>
                        <span class="mdi mdi-login"></span>
                        Bejelentkezés Google fiókkal
                    </button>
                {/if}
                {#if UserManager.instance.isLoggedIn}
                    <button
                        onclick={() => {
                            isOpen = false;
                            window.location.href = `/profile/?id=${UserManager.instance.firebaseUser!!.uid}`;
                        }}
                    >
                        <span class="mdi mdi-account-circle"></span>
                        Profil és műveim
                    </button>
                    <button
                        onclick={() => {
                            isOpen = false;
                            window.location.href = "/edit";
                        }}
                    >
                        <span class="mdi mdi-plus"></span>
                        Új alkotás
                    </button>
                    {#if UserManager.instance.koloraUser?.roles.includes(ROLES.KOLORA_MEMBER)}
                        <button
                            onclick={() => {
                                isOpen = false;
                                window.location.href = "/member-tools";
                            }}
                        >
                            <span class="mdi mdi-tools"></span>
                            Eszközök és források
                        </button>
                    {/if}
                    {#if UserManager.instance.koloraUser?.roles.includes(ROLES.ADMIN)}
                        <button
                            onclick={() => {
                                isOpen = false;
                                window.location.href = "/dashboard";
                            }}
                        >
                            <span class="mdi mdi-shield-account"></span>
                            Dashboard
                        </button>
                    {/if}
                    <button
                        onclick={() => {
                            isOpen = false;
                            window.location.href = "/codes";
                        }}
                    >
                        <span class="mdi mdi-gift"></span>
                        Kód beváltása
                    </button>
                    <button
                        onclick={() => {
                            isOpen = false;
                            logout();
                        }}
                    >
                        <span class="mdi mdi-logout"></span>
                        Kijelentkezés
                    </button>
                {/if}
            </ul>
            <a
                href="/tos"
                style="color: var(--on-primary-color); font-size: .8rem;"
            >
                Felhasználói feltételek
            </a>
        </div>
    </Backdrop>
{/if}

<style>
    .account-dialog {
        position: fixed;
        top: calc(var(--spacing) / 2);
        right: calc(var(--spacing) / 2);
        width: 280px;
        border: none;
        border-radius: var(--corner-radius);
        display: flex;
        flex-direction: column;
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: var(--spacing);
        gap: calc(var(--spacing) / 2);
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border-radius: var(--corner-radius);
        overflow: hidden;
    }

    button {
        border-radius: 0;
    }
</style>
