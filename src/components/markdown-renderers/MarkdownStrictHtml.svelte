<script>
    const { text } = $props();
    const isSafeYouTubeIframe = text.match(
        /<iframe(?!.*(load|error)).*?src="https:\/\/www\.youtube\.com\/embed\/.*?"(?!.*(load|error)).*?<\/iframe>/,
    );
    const isSafeImg = text.match(/<img(?!.*(load|error)).*?src=".*?"(?!.*(load|error)).*?>/);
</script>

{#if isSafeYouTubeIframe || isSafeImg}
    {@html text}
{:else}
    {text}
{/if}
