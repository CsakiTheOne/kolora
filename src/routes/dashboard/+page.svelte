<script lang="ts">
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import firebase from "firebase/compat/app";
    import { onMount } from "svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import Footer from "../../components/Footer.svelte";
    import POI from "$lib/model/POI";
    import type Report from "$lib/model/Report";
    import type { ReportContentType } from "$lib/model/Report";
    import Alert from "../../components/Alert.svelte";
    import UserManager from "$lib/UserManager.svelte";
    import UsersDashboard from "../../components/dashboard/UsersDashboard.svelte";
    import PoisDashboard from "../../components/dashboard/PoisDashboard.svelte";
    import ReportsDashboard from "../../components/dashboard/ReportsDashboard.svelte";

    let selectedTab = $state("users");

    $effect(() => {
        if (!UserManager.instance.isLoaded) {
            return;
        }
        if (
            !UserManager.instance.isLoggedIn ||
            !(
                UserManager.instance.koloraUser!!.roles.includes(ROLES.ADMIN) ||
                UserManager.instance.koloraUser!!.roles.includes(
                    ROLES.KOLORA_MEMBER,
                )
            )
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
        <button
            class={`btn ${selectedTab !== "places" && "text-btn"}`}
            onclick={() => (selectedTab = "places")}
        >
            <span class="mdi mdi-map-marker"></span>
            Helyek
        </button>
        <button
            class={`btn ${selectedTab !== "reports" && "text-btn"}`}
            onclick={() => (selectedTab = "reports")}
        >
            <span class="mdi mdi-flag"></span>
            Jelentések
        </button>
    </nav>
    <main>
        {#if selectedTab === "users"}
            <UsersDashboard />
        {:else if selectedTab === "places"}
            <PoisDashboard />
        {:else if selectedTab === "reports"}
            <ReportsDashboard />
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
