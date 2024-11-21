<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
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
        class="outlined-input secret-input"
        autocomplete="off"
        placeholder="Adj meg egy kódot"
    />
    <button
        class="elevated-button"
        onclick={() => {
            KoloraLocalDb.tryCode(code);
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