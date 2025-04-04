<script lang="ts">
    import { onMount } from "svelte";
    import { loginWithGoogle, logout } from "$lib/firebase/auth";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type { User } from "firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import type KoloraUser from "$lib/model/KoloraUser";
    import Backdrop from "./Backdrop.svelte";
    import UserManager from "$lib/UserManager.svelte";

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
        <div class="account-dialog">
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
                    {#if UserManager.instance.koloraUser.roles.includes("admin") || UserManager.instance.koloraUser.roles.includes("kolora_member")}
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
                            logout();
                        }}
                    >
                        <span class="mdi mdi-logout"></span>
                        Kijelentkezés
                    </button>
                {/if}
            </ul>
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
