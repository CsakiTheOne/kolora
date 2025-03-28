<script lang="ts">
    import { onMount } from "svelte";
    import { loginWithGoogle, logout } from "$lib/firebase/auth";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type { User } from "firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import type KoloraUser from "$lib/model/KoloraUser";
    import Backdrop from "./Backdrop.svelte";

    let isOpen = $state(false);
    let user: User | null = $state(null);
    let koloraUser: KoloraUser | null = $state(null);

    const { auth } = initializeFirebase();

    onMount(() => {
        let userListener: any = null;
        const authListener = auth.onAuthStateChanged((newUser) => {
            user = newUser;
            if (user) {
                firestore.users
                    .get(user.uid)
                    .then((user) => (koloraUser = user));
                firestore.users.setDefaultsIfNeeded(user.uid, user.displayName);
                userListener = firestore.users.listen(user.uid, (user) => {
                    koloraUser = user;
                });
            } else {
                koloraUser = null;
                if (userListener) {
                    userListener();
                    userListener = null;
                }
            }
        });

        return () => {
            authListener();
        };
    });
</script>

<span
    class={"mdi" + (user ? " mdi-account-circle" : " mdi-login")}
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
                    {#if user && koloraUser}
                        Helló, {koloraUser.username}!
                    {:else}
                        Jelentkezz be!
                    {/if}
                </b>
            </p>
            <ul>
                {#if !user}
                    <button onclick={loginWithGoogle}>
                        <span class="mdi mdi-login"></span>
                        Bejelentkezés Google fiókkal
                    </button>
                {/if}
                {#if user && koloraUser}
                    <button
                        onclick={() => {
                            isOpen = false;
                            window.location.href = `/profile/?id=${user!!.uid}`;
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
                    {#if koloraUser.roles.includes("admin") || koloraUser.roles.includes("kolora_member")}
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
