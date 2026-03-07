<script lang="ts">
    import { onMount } from "svelte";


    let id: string = $state('');

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id') || '';
    });
</script>

<main class="container-column">
    <h1>Költészet napi kincsvadászat 2026 - Matrica</h1>
    <p>Matrica ID: {id}</p>
</main>