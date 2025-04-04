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

    let loading = $state(true);
    let selectedTab = $state("users");

    let users: KoloraUser[] = $state([]);
    let userQuery = $state("");
    let filteredUsers: KoloraUser[] = $derived(
        users.filter((user) => {
            return (
                user.username.toLowerCase().includes(userQuery.toLowerCase()) ||
                user.id.toLowerCase().includes(userQuery.toLowerCase()) ||
                user.roles
                    .map((role) => role.toLowerCase())
                    .includes(userQuery.toLowerCase())
            );
        }),
    );

    let places: POI[] = $state([]);
    let selectedPlaceId: string | null = $state(null);
    const selectedPlace = $derived(
        places.find((p) => p.id === selectedPlaceId),
    );

    let reports: Report[] = $state([]);
    let selectedReportContentType: ReportContentType = $state("post");

    function getTabData() {
        if (
            !UserManager.instance.isLoggedIn ||
            !(
                UserManager.instance.koloraUser!!.roles.includes(ROLES.ADMIN) ||
                UserManager.instance.koloraUser!!.roles.includes(ROLES.KOLORA_MEMBER)
            )
        ) {
            window.location.replace("/");
            return;
        }

        if (selectedTab === "users") {
            loading = true;
            firestore.users.getAll().then((newItems) => {
                users = newItems;
                loading = false;
            });
        } else if (selectedTab === "places") {
            loading = true;
            firestore.pois.getAll().then((newItems) => {
                places = newItems.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                if (places.length > 0 && !selectedPlace) {
                    selectedPlaceId = places[0].id;
                }
                loading = false;
            });
        } else if (selectedTab === "reports") {
            loading = true;
            firestore.reports.getAll().then((newItems) => {
                reports = newItems;
                loading = false;
            });
        }
    }

    $effect(() => {
        if (UserManager.instance.isLoaded) {
            getTabData();
        }
        selectedTab;
    });
</script>

<SmallHeader currentPage="Dashboard" />
<div class="dashboard">
    <nav>
        <button class="btn" disabled={loading} onclick={() => getTabData()}>
            <span class="mdi mdi-refresh"></span>
            Frissítés
        </button>
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
                            const newRoles = e.target?.value.split(", ");
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
                            checked={user.isBanned}
                            oninput={(e: any) => {
                                firestore.users
                                    .set(user.id, {
                                        ...user,
                                        isBanned: e.target?.checked,
                                    })
                                    .then(() => getTabData());
                            }}
                        />
                        <label for="isBanned">Tiltás</label>
                    </p>
                </div>
            {/each}
        {:else if selectedTab === "places"}
            <select
                class="outlined-input"
                disabled={loading}
                value={selectedPlaceId}
                oninput={(e: any) => {
                    selectedPlaceId = e.target?.value;
                }}
            >
                {#each places as place}
                    <option value={place.id}>
                        {place.name.length > 0 ? place.name : "Névtelen"}
                    </option>
                {/each}
            </select>
            <button
                class="btn text-btn"
                disabled={loading}
                onclick={() => {
                    firestore.pois.add(new POI()).then((newPlaceId) => {
                        getTabData();
                        selectedPlaceId = newPlaceId;
                    });
                }}
            >
                <span class="mdi mdi-plus"></span>
                Új hely hozzáadása
            </button>
            {#if selectedPlaceId && selectedPlace}
                <input
                    type="text"
                    disabled={loading}
                    class="outlined-input"
                    placeholder="Név"
                    value={selectedPlace.name}
                    oninput={(e: any) => {
                        firestore.pois
                            .set(selectedPlaceId!, {
                                ...selectedPlace,
                                name: e.target?.value,
                            })
                            .then(() => {
                                places = places.map((p) => {
                                    if (p.id === selectedPlaceId) {
                                        return {
                                            ...p,
                                            name: e.target?.value,
                                        };
                                    }
                                    return p;
                                });
                            });
                    }}
                />

                <textarea
                    disabled={loading}
                    class="outlined-input"
                    style="resize: none;"
                    placeholder="Leírás"
                    value={selectedPlace.description}
                    onchange={(e: any) => {
                        firestore.pois.set(selectedPlaceId!, {
                            ...selectedPlace,
                            description: e.target?.value,
                        });
                    }}
                ></textarea>

                <input
                    type="text"
                    disabled={loading}
                    class="outlined-input"
                    placeholder="Google Térkép link"
                    value={selectedPlace.googleMapsLink}
                    oninput={(e: any) => {
                        firestore.pois.set(selectedPlaceId!, {
                            ...selectedPlace,
                            googleMapsLink: e.target?.value,
                        });
                    }}
                />

                <input
                    type="text"
                    disabled={loading}
                    class="outlined-input"
                    placeholder="Pozíció"
                    value={`${selectedPlace.latitude},${selectedPlace.longitude}`}
                    oninput={(e: any) => {
                        const newValue: string = e.target?.value;
                        if (newValue.includes("google.com/maps/")) {
                            const lat = parseFloat(
                                newValue.split("@")[1].split(",")[0],
                            );
                            const lon = parseFloat(
                                newValue.split("@")[1].split(",")[1],
                            );
                            firestore.pois
                                .set(selectedPlaceId!, {
                                    ...selectedPlace,
                                    latitude: lat,
                                    longitude: lon,
                                })
                                .then(() => getTabData());
                            return;
                        }
                        firestore.pois
                            .set(selectedPlaceId!, {
                                ...selectedPlace,
                                latitude: parseFloat(
                                    e.target?.value.split(",")[0],
                                ),
                                longitude: parseFloat(
                                    e.target?.value.split(",")[1],
                                ),
                            })
                            .then(() => getTabData());
                    }}
                />

                <div>
                    <input
                        type="checkbox"
                        disabled={loading}
                        name="allowPosting"
                        checked={selectedPlace.allowPosting}
                        oninput={(e: any) => {
                            firestore.pois.set(selectedPlaceId!, {
                                ...selectedPlace,
                                allowPosting: e.target?.checked,
                            });
                        }}
                    />
                    <label for="allowPosting">Bejegyzések engedélyezése</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        disabled={loading}
                        name="showSoonScreen"
                        checked={selectedPlace.showSoonScreen}
                        oninput={(e: any) => {
                            firestore.pois.set(selectedPlaceId!, {
                                ...selectedPlace,
                                showSoonScreen: e.target?.checked,
                            });
                        }}
                    />
                    <label for="showSoonScreen">
                        "Hamarosan" képernyő mutatása
                    </label>
                </div>

                <a
                    href={`/poi?id=${selectedPlaceId}&ignoreLocation=1`}
                    target="_blank"
                >
                    <button class="btn" style="width: 100%;">
                        <span class="mdi mdi-open-in-new"></span>
                        Megnyitás új lapon
                    </button>
                </a>

                <button
                    class="btn"
                    onclick={() => {
                        navigator.clipboard.writeText(
                            `${window.location.origin}/poi?id=${selectedPlaceId}`,
                        );
                    }}
                >
                    <span class="mdi mdi-content-copy"></span>
                    Link másolása NFC íráshoz
                </button>

                <button
                    class="btn"
                    onclick={() => {
                        const res = prompt(
                            "Biztos törölni szeretnéd ezt a helyet? Ha igen, írd be a hely nevét!",
                        );
                        if (res === selectedPlace?.name) {
                            firestore.pois.delete(selectedPlaceId!).then(() => {
                                getTabData();
                            });
                        }
                    }}
                >
                    <span class="mdi mdi-delete"></span>
                    Törlés
                </button>
            {/if}
        {:else if selectedTab === "reports"}
            <select
                class="outlined-input"
                disabled={loading}
                value={selectedReportContentType}
                oninput={(e: any) => {
                    selectedReportContentType = e.target?.value;
                }}
            >
                <option value="post">Posztok</option>
                <option value="user">Felhasználók</option>
                <option value="work">Művek</option>
            </select>
            {#each reports.filter((r) => r.contentType === selectedReportContentType && r.contentId) as report}
                <div class="card">
                    <button
                        class="btn"
                        onclick={() => {
                            if (selectedReportContentType === "post") {
                                firestore.posts
                                    .get(report.contentId)
                                    .then((post) => {
                                        alert(`CONTENT:\n${post?.content}`);
                                        confirm(
                                            "Megnyitod a felhasználó profilját?",
                                        ) &&
                                            window.open(
                                                `/profile?id=${post?.authorId}`,
                                                "_blank",
                                            );
                                        if (post?.attachmentWorkId) {
                                            confirm(
                                                "Megnyitod a poszthoz csatolt művet?",
                                            ) &&
                                                window.open(
                                                    `/work?id=${post?.attachmentWorkId}`,
                                                    "_blank",
                                                );
                                        }
                                    });
                            } else if (selectedReportContentType === "user") {
                                window.open(
                                    `/profile?id=${report.contentId}`,
                                    "_blank",
                                );
                            } else if (selectedReportContentType === "work") {
                                window.open(
                                    `/work?id=${report.contentId}`,
                                    "_blank",
                                );
                            }
                        }}
                    >
                        {report.contentId}
                    </button>
                    <p>
                        Jelentő: <a
                            href="/profile?id={report.userId}"
                            target="_blank">{report.userId}</a
                        >
                    </p>
                    <p>Indok: {report.reason}</p>
                    <p>{report.createdAt}</p>
                    <button
                        class="btn"
                        style="width: 100%;"
                        onclick={() => {
                            if (
                                confirm(
                                    "Biztos törölni szeretnéd ezt a jelentést?",
                                )
                            ) {
                                firestore.reports.delete(report.id).then(() => {
                                    getTabData();
                                });
                            }
                        }}
                    >
                        <span class="mdi mdi-delete"></span>
                        Törlés
                    </button>
                </div>
            {/each}
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

    .dashboard > nav {
        align-self: stretch;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background-color: var(--secondary-color);
    }

    .dashboard > main {
        flex-grow: 1;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
        padding: var(--spacing);
        background-color: var(--secondary-color);
        border-radius: var(--corner-radius);
    }

    @media (max-width: 768px) {
        nav .btn {
            font-size: 0;
        }

        nav .btn > span {
            font-size: initial;
        }
    }
</style>
