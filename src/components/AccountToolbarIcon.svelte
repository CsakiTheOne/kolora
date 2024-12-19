<script>
    import ThemeManager from "$lib/ThemeManager";

    let isOpen = $state(false);
    let isLoggedIn = $state(false);
    let preferredMusicApp = $state("Spotify");

    function changeMusicApp() {
        const supportedApps = ["Spotify", "YouTube Music", "YouTube"];
        const currentIndex = supportedApps.indexOf(preferredMusicApp);
        preferredMusicApp =
            supportedApps[(currentIndex + 1) % supportedApps.length];
    }
</script>

<!--span
    class="mdi mdi-account-circle"
    onclick={() => (isOpen = !isOpen)}
    onkeydown={(e) => e.key === "Enter" && (isOpen = !isOpen)}
    tabindex="0"
    role="button"
></span-->

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
                {#if isLoggedIn}
                    Helló {"{felhasználónév}"}!
                {:else}
                    Jelentkezz be!
                {/if}
            </p>
            <ul>
                {#if !isLoggedIn}
                    <button
                        onclick={() => {
                            isLoggedIn = true;
                        }}
                    >
                        <span class="mdi mdi-login"></span>
                        Bejelentkezés
                    </button>
                {/if}
                <button onclick={() => ThemeManager.toggleDarkLight()}>
                    <span class="mdi mdi-brightness-6"></span>
                    Téma váltás
                </button>
                {#if isLoggedIn}
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
                    <button
                        onclick={() => {
                            isOpen = false;
                            isLoggedIn = false;
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
