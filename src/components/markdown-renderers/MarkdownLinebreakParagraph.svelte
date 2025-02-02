<script>
    const { text } = $props();
</script>

<p>
    {@html text.replace(/\n/g, "<br />")}
</p>
