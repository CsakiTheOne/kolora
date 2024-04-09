<script>
    export let minimumAge = 16;
    export let message = "";
</script>

<div>
    <span>{minimumAge}</span>
    <p>{message}</p>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        padding: 4px 8px;
        width: 100%;
    }

    span {
        display: inline-block;
        padding: 2px;
        font-size: 0.7rem;
        border: yellow 4px solid;
        border-radius: 50%;
    }

    p {
        padding: 4px 8px;
        font-size: .9rem;
    }
</style>
