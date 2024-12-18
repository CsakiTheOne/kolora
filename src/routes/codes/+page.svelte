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
    <Alert icon="information" title="Kódok">
        Járj Kolorás rendezvényekre, kövesd a Kolorás oldalakat és légy
        figyelmes! Néha kódokra bukkanhatsz, amiket ide tudsz beírni extra
        tartalmakért és meglepetésekért.
    </Alert>
    <Alert icon="test-tube">
        Ez a funkció még kísérleti állapotban van. A jövőben bármi megváltozhat
        vagy akár az egész funkció el is tűnhet.
    </Alert>
    <div class="adaptive-col-row" style="align-items: stretch;">
        <input
            type="text"
            bind:value={code}
            class="outlined-input secret-input"
            autocomplete="off"
            placeholder="Adj meg egy kódot"
        />
        <div style="display: flex; align-items: center; justify-content: center;">
            <button
                class="btn"
                style="min-width: calc(100% - 2 * var(--spacing));"
                onclick={() => {
                    KoloraLocalDb.tryCode(code);
                    code = "";
                }}
            >
                Beváltás
            </button>
        </div>
    </div>
</main>
<Footer />
