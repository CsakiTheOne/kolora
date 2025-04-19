<script lang="ts">
    import firestore from "$lib/firebase/firestore";
    import type { ReportContentType } from "$lib/model/Report";
    import Report from "$lib/model/Report";
    import { onMount } from "svelte";

    let loading = $state(true);

    let reports: Report[] = $state([]);
    let selectedReportContentType: ReportContentType = $state("post");

    function loadReports() {
        loading = true;
        firestore.reports.getAll().then((newReports) => {
            reports = newReports.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            });
            loading = false;
        });
    }

    onMount(() => {
        loadReports();
    });
</script>

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
                    firestore.posts.get(report.contentId).then((post) => {
                        alert(`CONTENT:\n${post?.content}`);
                        confirm("Megnyitod a felhasználó profilját?") &&
                            window.open(
                                `/profile?id=${post?.authorId}`,
                                "_blank",
                            );
                        if (post?.attachmentWorkId) {
                            confirm("Megnyitod a poszthoz csatolt művet?") &&
                                window.open(
                                    `/work?id=${post?.attachmentWorkId}`,
                                    "_blank",
                                );
                        }
                    });
                } else if (selectedReportContentType === "user") {
                    window.open(`/profile?id=${report.contentId}`, "_blank");
                } else if (selectedReportContentType === "work") {
                    window.open(`/work?id=${report.contentId}`, "_blank");
                }
            }}
        >
            {report.contentId}
        </button>
        <p>
            Jelentő: <a href="/profile?id={report.userId}" target="_blank"
                >{report.userId}</a
            >
        </p>
        <p>Indok: {report.reason}</p>
        <p>{report.createdAt}</p>
        <button
            class="btn"
            style="width: 100%;"
            onclick={() => {
                if (confirm("Biztos törölni szeretnéd ezt a jelentést?")) {
                    firestore.reports.delete(report.id).then(() => {
                        loadReports();
                    });
                }
            }}
        >
            <span class="mdi mdi-delete"></span>
            Törlés
        </button>
    </div>
{/each}

<style>
    .card {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) / 2);
        padding: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--on-secondary-color);
        border-radius: var(--corner-radius);
    }
</style>
