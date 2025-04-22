<div class="location-dot"></div>

<style>
    .location-dot {
        display: inline-block;
        width: 16px;
        aspect-ratio: 1;
        background: var(--kolora-color-blue);
        border: 2px solid white;
        border-radius: 50%;
        translate: 0 2px;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% {
            outline: 1px solid var(--kolora-color-blue-variant);
        }
        100% {
            outline: 16px solid transparent;
        }
    }
</style>
