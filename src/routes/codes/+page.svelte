<script>
    import KoloraLocalDb from "$lib/KoloraLocalDb";
    import Alert from "../../components/Alert.svelte";
    import Badge from "../../components/Badge.svelte";
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
        class="btn"
        onclick={() => {
            KoloraLocalDb.tryCode(code);
            code = "";
        }}
    >
        Beváltás
    </button>
    <Alert icon="test-tube" title="Kísérlet">
        Ez a funkció még kísérleti állapotban van. A jövőben bármi megváltozhat
        vagy akár az egész funkció el is tűnhet.
    </Alert>
</main>
<Footer />
