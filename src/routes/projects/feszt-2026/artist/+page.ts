import { KoloraFeszt2026 } from "$lib/events/Feszt2026/Feszt2026";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
    const slug = url.searchParams.get("slug");

    if (!slug) {
        throw error(400, "Artist slug is required");
    }

    const artist = KoloraFeszt2026.artists.find((a) => a.slug === slug);

    if (!artist) {
        throw error(404, "Artist not found");
    }

    return { artist };
};
