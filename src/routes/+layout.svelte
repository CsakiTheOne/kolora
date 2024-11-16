<script>
    import "@mdi/font/css/materialdesignicons.min.css";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import { onMount } from "svelte";
    import "../app.css";
    
    onMount(() => {
        initializeFirebase();
    });
</script>

<slot />
