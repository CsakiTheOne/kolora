<script>
    function share() {
        const url = window.location.href;

        navigator.share({
            title: document.title,
            url: url,
        });
    }
</script>

<div>
    <p>
        Matricát találtál!
    </p>
    <button on:click={share}>
        Mentés / Megosztás
    </button>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color) !important;
        border-bottom-left-radius: var(--corner-radius);
        border-bottom-right-radius: var(--corner-radius);
    }

    button {
        background-color: var(--primary-color);
        color: var(--on-primary-color);
        border: none;
        border-radius: var(--corner-radius);
        padding: calc(var(--spacing) / 2);
    }
</style>