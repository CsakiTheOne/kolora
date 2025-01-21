<script>
    const { text } = $props();
    const isSafeYouTubeIframe = text.match(
        /<iframe(?!.*(load|error)).*?src="https:\/\/www\.youtube\.com\/embed\/.*?"(?!.*(load|error)).*?<\/iframe>/,
    );
</script>

{#if isSafeYouTubeIframe}
    {@html text}
{:else}
    {text}
{/if}
