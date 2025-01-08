<script lang="ts">
    import ThemeManager from "$lib/ThemeManager";
    import { onMount } from "svelte";
    import { loginWithGoogle, logout } from "$lib/firebase/auth";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import type { User } from "firebase/auth";

    const enableAccountFeatures = false;

    let isOpen = $state(false);
    let preferredMusicApp = $state("Spotify");
    let user: User | null = $state(null);

    const { auth } = initializeFirebase();

    onMount(() => {
        auth.onAuthStateChanged((newUser) => {
            user = newUser;
        });
    });

    function changeMusicApp() {
        const supportedApps = ["Spotify", "YouTube Music", "YouTube"];
        const currentIndex = supportedApps.indexOf(preferredMusicApp);
        preferredMusicApp =
            supportedApps[(currentIndex + 1) % supportedApps.length];
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
                {#if user}
                    Helló, {user.displayName}!
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
                <button onclick={() => ThemeManager.toggleDarkLight()}>
                    <span class="mdi mdi-brightness-6"></span>
                    Téma váltás
                </button>
                {#if user}
                    <!--
                    <button>
                        <span class="mdi mdi-library-shelves"></span>
                        Műveim
                    </button>
                    <div style="display: flex; flex-wrap: nowrap;">
                        <button style="flex: 1;" onclick={changeMusicApp}>
                            <span class="mdi mdi-music-note"></span>
                            Preferált zene app<br />
                            {preferredMusicApp}
                        </button>
                        <button
                            style="flex: 0;"
                            onclick={() => {
                                alert('A "Hallgassunk random valamit" gomb a te preferált zene appod fogja megnyitni.');
                            }}
                            aria-label="Segítség"
                        >
                            <span class="mdi mdi-help-circle"></span>
                        </button>
                    </div>
                    -->
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
