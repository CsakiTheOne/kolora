<script>
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";

    let id = $state('');

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const workId = params.get('workId');
        if (!workId) {
            window.history.back();
            return;
        }
        id = params.get('id') || '';
    });
</script>

<Header selectedTab="Galéria" />
<main>
    <p>ID: {id}</p>
</main>
<Footer />
