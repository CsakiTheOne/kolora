<script lang="ts">
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import UserManager from "$lib/UserManager.svelte";
    import UsersDashboard from "../../components/dashboard/UsersDashboard.svelte";

    let selectedTab = $state("users");

    $effect(() => {
        if (!UserManager.instance.isLoaded) {
            return;
        }
        if (
            !UserManager.instance.isLoggedIn ||
            !UserManager.instance.koloraUser!!.roles.includes(ROLES.ADMIN)
        ) {
            window.location.replace("/");
        }
    });
</script>

<SmallHeader currentPage="Dashboard" />
<div class="dashboard">
    <nav>
        <button
            class={`btn ${selectedTab !== "users" && "text-btn"}`}
            onclick={() => (selectedTab = "users")}
        >
            <span class="mdi mdi-account"></span>
            Felhasználók
        </button>
    </nav>
    <main>
        {#if selectedTab === "users"}
            <UsersDashboard />
        {/if}
    </main>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-grow: 1;
        align-items: center;
    }

    nav {
        align-self: stretch;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--secondary-color);
    }

    nav .btn {
        min-width: 156px;
    }

    .dashboard > main {
        flex-grow: 1;
    }

    @media (max-width: 768px) {
        nav {
            padding: calc(var(--spacing) / 2);
        }

        nav .btn {
            font-size: 0;
            min-width: auto;
        }

        nav .btn > span {
            font-size: initial;
        }
    }
</style>
