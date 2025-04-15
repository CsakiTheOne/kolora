<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type KoloraUser from "$lib/model/KoloraUser";
    import { ROLES } from "$lib/model/KoloraUser";
    import { onMount } from "svelte";
    import Alert from "../Alert.svelte";

    let users: KoloraUser[] = $state([]);
    let userQuery = $state("");
    let filteredUsers: KoloraUser[] = $derived(
        users
            .filter((user) => {
                return (
                    user.username
                        .toLowerCase()
                        .includes(userQuery.toLowerCase()) ||
                    user.id.toLowerCase().includes(userQuery.toLowerCase()) ||
                    user.roles
                        .map((role) => role.toLowerCase())
                        .includes(userQuery.toLowerCase())
                );
            })
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            }),
    );

    function loadUsers() {
        firestore.users.getAll().then((newUsers) => {
            users = newUsers;
        });
    }

    onMount(() => {
        loadUsers();
    });
</script>

<input
    type="text"
    class="outlined-input"
    placeholder="Keresés"
    value={userQuery}
    oninput={(e: any) => {
        userQuery = e.target?.value;
    }}
/>
<Alert>
    <p>
        Kiosztható szerepkörök:<br />
        {Object.values(ROLES).join(", ")}
    </p>
</Alert>
{#each filteredUsers as user}
    <div class="card">
        <button
            class="btn"
            onclick={() => {
                window.open(`/profile?id=${user.id}`, "_blank");
            }}
        >
            {user.username}
        </button>
        <p>Id: {user.id}</p>
        <p>Regisztráció dátuma: {user.createdAt}</p>
        <p>Szerepkörök:</p>
        <input
            type="text"
            class="outlined-input"
            placeholder="Szerepkörök"
            value={user.roles.join(", ")}
            oninput={(e: any) => {
                const newRoles = e.target?.value
                    .split(",")
                    .map((r: string) => r.trim());
                firestore.users.set(user.id, {
                    ...user,
                    roles: newRoles,
                });
            }}
        />
        <p>
            <input
                type="checkbox"
                name="isBanned"
                bind:checked={user.isBanned}
                oninput={(e: any) => {
                    firestore.users
                        .set(user.id, {
                            ...user,
                            isBanned: e.target?.checked,
                        })
                        .then(() => loadUsers());
                }}
            />
            <label for="isBanned">Tiltás</label>
        </p>
    </div>
{/each}

<style>
    .card {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
        padding: var(--spacing);
        background-color: var(--secondary-color);
        border-radius: var(--corner-radius);
    }
</style>
