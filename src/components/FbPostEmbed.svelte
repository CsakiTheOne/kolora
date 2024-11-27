<script>
    const {
        src,
        ...rest
    } = $props();
</script>

<iframe
    src={src}
    width="350"
    height="540"
    style="border:none;overflow:hidden"
    scrolling="no"
    frameborder="0"
    allowfullscreen
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    {...rest}
></iframe>
