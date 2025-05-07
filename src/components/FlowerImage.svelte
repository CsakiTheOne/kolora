<script lang="ts">
    import flowerShape from "$lib/images/utils/flower-shape.png";

    const { src, alt = "", style = "", ...rest } = $props();
</script>

<img
    class="picture"
    {src}
    {alt}
    style="mask-image: url('{flowerShape}'); {style}"
    {...rest}
/>

<style>
    img {
        object-fit: cover;
        mask-size: cover;
        mask-position: center;
    }
</style>