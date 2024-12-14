<script>
    let isOpen = $state(false);
    let isLoggedIn = $state(false);
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
            <ul style="width: 200px;">
                {#if !isLoggedIn}
                    <button
                        onclick={() => {
                            isLoggedIn = true;
                        }}
                    >
                        Bejelentkezés
                    </button>
                {:else}
                    <button
                        onclick={() => {
                            isOpen = false;
                            isLoggedIn = false;
                        }}
                    >
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
        background: rgba(0, 0, 0, 0.5);
        z-index: 100 !important;
    }

    .account-dialog {
        position: fixed;
        top: calc(var(--spacing) / 2);
        right: calc(var(--spacing) / 2);
        border: none;
        border-radius: var(--corner-radius);
        background: var(--primary-color);
        color: var(--on-primary-color);
        padding: var(--spacing);
        z-index: 101 !important;
    }
</style>
