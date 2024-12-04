<script>
    let isOpen = $state(false);
</script>

<!--span
    class="mdi mdi-account-circle"
    onclick={() => (isOpen = !isOpen)}
    tabindex="0"
    role="button"
></span-->

{#if isOpen}
    <div class="account-dialog-container" onclick={() => isOpen = !isOpen}>
        <div class="account-dialog">test</div>
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
        background: var(--primary-variant-color);
        color: var(--on-primary-variant-color);
        padding: var(--spacing);
        z-index: 101 !important;
    }
</style>
