<script>
    import "../../app.css";
    import Footer from "../../components/legacy/OldFooter.svelte";
</script>

<div>
    <slot />
    <Footer />
</div>

<style>
    div {
        --primary-color: #d86144;
        --secondary-color: #2e1709;
        --background-color: #d9c3a1;
        --on-primary-color: #fff;
        --on-background-color: #2e1709;
        --on-secondary-color: #d9c3a1;
        --spacing: 16px;
        --corner-radius: 24px;

        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 100svh;
        background-color: var(--background-color);
        color: var(--on-background-color);
        text-align: center;
    }
</style>
