<script>
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
    });
</script>

<Header />
<main>
    
</main>
<Footer />