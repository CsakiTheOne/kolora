<script>
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { onMount } from "svelte";
    import "../../stickers.css";
    import Footer from "../../components/Footer.svelte";
    
    onMount(() => {
        initializeFirebase();
    });
</script>

<slot />
<Footer />
