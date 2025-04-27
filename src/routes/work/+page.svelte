<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import { initializeFirebase } from "$lib/firebase/firebase";
    import Work from "$lib/model/Work";
    import ChooseYourOwnAdventureDisplay from "../../components/WorkDisplays/ChooseYourOwnAdventureDisplay.svelte";
    import GalleryUtils from "$lib/GalleryUtils";
    import KoloraUser from "$lib/model/KoloraUser";
    import firestore from "$lib/firebase/firestore";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import SvelteMarkdown from "svelte-markdown";
    import MarkdownBlockedHtml from "../../components/markdown-renderers/MarkdownBlockedHtml.svelte";
    import MarkdownLink from "../../components/markdown-renderers/MarkdownLink.svelte";
    import MarkdownLinebreakParagraph from "../../components/markdown-renderers/MarkdownLinebreakParagraph.svelte";
    import { getCurrentUser } from "$lib/firebase/auth";
    import MarkdownStrictHtml from "../../components/markdown-renderers/MarkdownStrictHtml.svelte";
    import Divider from "../../components/Divider.svelte";

    let work: Work | null = $state(null);
    let authorName: string | null = $state(null);

    onMount(() => {
        const id = GalleryUtils.workId;
        if (!id) {
            window.history.back();
            return;
        }

        firestore.works
            .get(id)
            .then((fetchedWork) => {
                work = fetchedWork;
                return firestore.users.get(work.authorId);
            })
            .then((user: KoloraUser) => {
                console.log("user", user);
                if (user.isBanned) {
                    window.open(`/profile?id=${work?.authorId}`, "_self");
                }
                authorName = user.username;
            })
            .catch((err) => {
                window.history.back();
            });
    });
</script>

<SmallHeader
    path={[{ title: authorName, href: `/profile/?id=${work?.authorId}` }]}
    currentPage={work?.title}
/>
<main>
    <p>
        <a href={`/profile/?id=${work?.authorId}`}>{authorName}</a> - {work?.dateCreated}
    </p>
    <div class="title-row">
        <h2 style="flex: 1;">{work?.title}</h2>
        {#if work?.description}
            <span
                class="mdi mdi-information"
                onclick={() => {
                    alert(work?.description);
                }}
                onkeypress={(e) => {
                    if (e.key === "Enter") {
                        alert(work?.description);
                    }
                }}
                tabindex="0"
                role="button"
            ></span>
        {/if}
        <span
            class="mdi mdi-share-variant"
            onclick={() => {
                navigator.share({ url: window.location.href });
            }}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    navigator.share({ url: window.location.href });
                }
            }}
            tabindex="0"
            role="button"
        ></span>
    </div>

    <Divider />

    {#if work?.workType === "Choose your own adventure"}
        <ChooseYourOwnAdventureDisplay {work} />
    {:else if work?.workType === "Egyéb"}
        <a href={work?.content} target="_blank">
            <button class="btn">Megnyitás</button>
        </a>
    {:else}
        <SvelteMarkdown
            source={work?.content}
            renderers={{
                link: MarkdownLink,
                html: MarkdownStrictHtml,
                paragraph: MarkdownLinebreakParagraph,
            }}
        />
    {/if}
</main>
<Footer />

<style>
    .title-row {
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
        justify-content: space-between;
        align-items: center;
    }

    .title-row span {
        font-size: 1.3rem;
        cursor: pointer;
        translate: 0 4px;
    }
</style>
