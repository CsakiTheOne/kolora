<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";
    import { onMount } from "svelte";
    import { loginWithGoogle, logout } from "$lib/firebase/auth";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type { User } from "firebase/auth";
    import firestore from "$lib/firebase/firestore";
    import type KoloraUser from "$lib/model/KoloraUser";

    const enableAccountFeatures = false;

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
                firestore.users.setNameIfNotExists(user.uid, user.displayName);
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

    function changeMusicApp() {
        const supportedServices = ["Spotify", "YouTube Music", "YouTube"];
        const currentIndex =
            supportedServices.indexOf(koloraUser!!.preferredMusicService) ?? -1;
        const newService =
            supportedServices[(currentIndex + 1) % supportedServices.length];
        firestore.users.set(user!!.uid, { preferredMusicService: newService });
    }
</script>

{#if enableAccountFeatures}
    <span
        class={"mdi" + (user ? " mdi-account-circle" : " mdi-login")}
        onclick={() => (isOpen = !isOpen)}
        onkeydown={(e) => e.key === "Enter" && (isOpen = !isOpen)}
        tabindex="0"
        role="button"
    ></span>
{/if}

{#if isOpen}
    <div
        class="account-dialog-container"
        onclick={() => (isOpen = false)}
        onkeydown={(e) => e.key === "Enter" && (isOpen = false)}
        tabindex="0"
        role="button"
    >
        <div
            class="account-dialog"
            role="button"
            onclick={(e) => e.stopPropagation()}
            onkeydown={(e) => e.key === "Enter" && e.stopPropagation()}
            tabindex="0"
        >
            <p>
                <span class="mdi mdi-account-circle"></span>
                {#if user && koloraUser}
                    Helló, {koloraUser.username}!
                {:else}
                    Jelentkezz be!
                {/if}
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
                        <span class="mdi mdi-library-shelves"></span>
                        Profil és műveim
                    </button>
                    <div style="display: flex; flex-wrap: nowrap;">
                        <button style="flex: 1;" onclick={changeMusicApp}>
                            <span class="mdi mdi-music-note"></span>
                            Preferált zene app<br />
                            {koloraUser!!.preferredMusicService ?? "Még nincs"}
                        </button>
                        <button
                            style="flex: 0;"
                            onclick={() => {
                                alert(
                                    'A "Hallgassunk random valamit" gomb a te preferált zene appod fogja megnyitni.',
                                );
                            }}
                            aria-label="Segítség"
                        >
                            <span class="mdi mdi-help-circle"></span>
                        </button>
                    </div>
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
    </div>
{/if}

<style>
    .account-dialog-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 100 !important;
    }

    .account-dialog {
        position: fixed;
        top: calc(var(--spacing) / 2);
        right: calc(var(--spacing) / 2);
        width: 250px;
        border: none;
        border-radius: var(--corner-radius);

        display: flex;
        flex-direction: column;
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: var(--spacing);
        gap: calc(var(--spacing) / 2);

        z-index: 101 !important;
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
