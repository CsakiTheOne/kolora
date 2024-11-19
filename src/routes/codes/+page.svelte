<script>
    import KoloraStaticDb from "$lib/KoloraStaticDb";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";

    let code = $state("");
</script>

<Header selectedTab="Kódok" />
<main>
    <p>
        Járj Kolorás rendezvényekre és légy figyelmes! Néha kódokra bukkanhatsz,
        amiket ide tudsz beírni extra tartalmakért és meglepetésekért. (Ezen a
        weboldalon is van egy elrejtve.)
    </p>
    <input
        type="text"
        bind:value={code}
        autocomplete="off"
        placeholder="Adj meg egy kódot"
    />
    <button
        class="elevated-button"
        onclick={() => {
            KoloraStaticDb.tryCode(code);
            code = "";
        }}
    >
        Beváltás
    </button>
    <p>
        <abbr title="A funkcióval kapcsolatban bármi megváltozhat vagy akár teljesen meg is szűnhet.">
            <span class="mdi mdi-test-tube"></span>
            Kísérleti funkció
        </abbr>
    </p>
</main>
<Footer />

<style>
    input {
        width: 100%;
        padding: var(--spacing);
        border: 2px solid var(--primary-color);
        border-radius: var(--corner-radius);
        background-color: transparent;
        color: var(--on-background-color);
        font-size: 1.2rem;
        text-security: disc;
        -webkit-text-security: disc;
        -moz-text-security: disc;
        input-security: dics;
        transition: all 0.1s ease-in-out;
    }

    input:focus {
        border: 3px solid var(--primary-variant-color);
        outline: none;
    }
</style>
