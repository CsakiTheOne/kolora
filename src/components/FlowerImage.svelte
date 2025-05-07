<script lang="ts">
    import flowerShape from "$lib/images/utils/flower-shape.png";

    const { src, alt = "", style = "", outlineWidth = 0, ...rest } = $props();
</script>

<div class="flower" {style} {...rest}>
    <div class="tint" style="width: calc(100% + {outlineWidth * 2}px); mask-image: url('{flowerShape}'); top: -{outlineWidth}px; left: -{outlineWidth}px;"></div>
    <img
        class="picture"
        {src}
        {alt}
        style="mask-image: url('{flowerShape}');"
    />
</div>

<style>
    .tint {
        position: absolute;
        aspect-ratio: 1/1;
        background-color: var(--primary-color);
        mask-size: cover;
        mask-position: center;
    }

    img {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 256px;
        aspect-ratio: 1/1;
        object-fit: cover;
        mask-size: cover;
        mask-position: center;
    }
</style>
