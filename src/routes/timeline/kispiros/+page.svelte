<script>
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import VerticalTimelineItem from "../../../components/VerticalTimelineItem.svelte";
    import img2024_09_10 from "$lib/images/gallery/kispiros-muzi/Screenshot_20240910.png";
    import img2024_09_24 from "$lib/images/gallery/kispiros-muzi/Screenshot_20240924.png";
    import img2024_09_25 from "$lib/images/gallery/kispiros-muzi/Screenshot_20240925.png";
    import img2024_10_01 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241001.png";
    import img2024_10_02 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241002.png";
    import img2024_10_15 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241015.png";
    import img2024_11_02 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241102.png";
    import img2024_11_05 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241105.png";
    import img2024_11_17 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241117.png";
    import img2024_11_19 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241119.png";
    import img2024_11_23 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241123.png";
    import img2024_11_26 from "$lib/images/gallery/kispiros-muzi/Screenshot_20241126.png";

    const images = [
        {date: '2024. Szeptember 10.', image: img2024_09_10},
        {date: '2024. Szeptember 24.', image: img2024_09_24},
        {date: '2024. Szeptember 25.', image: img2024_09_25},
        {date: '2024. Október 1.', image: img2024_10_01},
        {date: '2024. Október 2.', image: img2024_10_02},
        {date: '2024. Október 15.', image: img2024_10_15},
        {date: '2024. November 2.', image: img2024_11_02},
        {date: '2024. November 5.', image: img2024_11_05},
        {date: '2024. November 17.', image: img2024_11_17},
        {date: '2024. November 19.', image: img2024_11_19},
        {date: '2024. November 23.', image: img2024_11_23},
        {date: '2024. November 26.', image: img2024_11_26},
    ];
</script>

<Header selectedTab="Idővonal" />
<main>
    <p>
        Bálint (a.k.a. Kis Piros) gyakran próbált a Museum-ba invitálni minket
        az év során.
    </p>

    {#each images as image, index}
        <VerticalTimelineItem
            title={image.date}
        >
            <p class="image-container">
                <img src={image.image} alt="" />
            </p>
        </VerticalTimelineItem>
    {/each}
</main>
<Footer />

<style>
    .image-container {
        text-align: center;
    }

    img {
        max-width: 200px;
        width: 50%;
    }
</style>