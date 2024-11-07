<script>
    const {
        src,
        ...rest
    } = $props();
</script>

<iframe title="" {...rest} src={`${src}/preview`} frameborder="0"></iframe>

<style>
    iframe {
        aspect-ratio: 16 / 9;
    }
</style>