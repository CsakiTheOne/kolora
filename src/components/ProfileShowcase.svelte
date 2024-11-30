<script>
    const {
        image,
        name,
        title = "",
        onclick = () => {},
        ...rest
    } = $props();
</script>

<div class="profile-showcase" role="button" {onclick} tabindex="0" {...rest}>
    <img src={image} alt={name} />
    <div>
        <h4>{name}</h4>
        <p>{title}</p>
    </div>
</div>

<style>
    .profile-showcase {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--spacing) / 2);
        padding: calc(var(--spacing) / 2);
    }

    .profile-showcase img {
        width: 92px;
        aspect-ratio: 1;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-showcase * {
        text-align: center;
    }
</style>
