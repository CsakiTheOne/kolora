import { get, ref, remove, set, update } from "firebase/database";
import { initializeFirebase } from "./firebase";

const db = initializeFirebase().database;

const rtdb = {
    config: {
        feeds: {
            /**
             * The maximum distance in meters from the sticker to open the poi page from the feeds page.
             * If the user goes out of this distance, the poi page can still be viewed, but not opened with a button.
             */
            getDistanceToOpen: (): Promise<number> => {
                return get(ref(db, "config/feeds/distance_to_open")).then((snapshot) => {
                    return snapshot.exists() ? snapshot.val() : 10;
                });
            },
            setDistanceToOpen: (distance: number): Promise<void> => {
                return set(ref(db, "config/feeds/distance_to_open"), distance);
            },
            /**
             * The maximum distance in meters from the sticker to view the poi page.
             * If the user goes out of this distance, the poi page will be closed.
             */
            getDistanceToView: (): Promise<number> => {
                return get(ref(db, "config/feeds/distance_to_view")).then((snapshot) => {
                    return snapshot.exists() ? snapshot.val() : 50;
                });
            },
            setDistanceToView: (distance: number): Promise<void> => {
                return set(ref(db, "config/feeds/distance_to_view"), distance);
            },
            /**
             * The url to open when the qr code is scanned and there is no poi nearby.
             */
            getQrCodeFallbackUrl: (): Promise<string> => {
                return get(ref(db, "config/feeds/qr_code_fallback_url")).then((snapshot) => {
                    return snapshot.exists() ? snapshot.val() : "https://example.com";
                });
            },
            setQrCodeFallbackUrl: (url: string): Promise<void> => {
                return set(ref(db, "config/feeds/qr_code_fallback_url"), url);
            },
        },
    },
    posts: {
        likes: {
            getCount: (postId: string): Promise<number> => {
                return get(ref(db, `posts/likes/${postId}`)).then((snapshot) => {
                    return snapshot.size;
                });
            },
            getUser: (postId: string, userId: string | undefined): Promise<boolean> => {
                if (!userId) {
                    return Promise.resolve(false);
                }
                return get(ref(db, `posts/likes/${postId}/${userId}`)).then((snapshot) => {
                    return snapshot.exists() && snapshot.val() === true;
                });
            },
            like: (postId: string, userId: string | undefined): Promise<void> => {
                if (!userId) {
                    return Promise.reject("No user ID provided");
                }
                return set(ref(db, `posts/likes/${postId}/${userId}`), true);
            },
            unlike: (postId: string, userId: string | undefined): Promise<void> => {
                if (!userId) {
                    return Promise.reject("No user ID provided");
                }
                return remove(ref(db, `posts/likes/${postId}/${userId}`));
            },
        },
    },
    feszt2026: {
        artworkStats: {
            /**
             * Get the view count for an artwork by slug
             */
            getViewCount: (artworkSlug: string): Promise<number> => {
                return get(ref(db, `feszt2026/artwork_stats/${artworkSlug}/views`)).then((snapshot) => {
                    return snapshot.exists() ? snapshot.val() : 0;
                });
            },
            /**
             * Increment the view count for an artwork by slug
             */
            incrementViewCount: async (artworkSlug: string): Promise<void> => {
                try {
                    const snapshot = await get(ref(db, `feszt2026/artwork_stats/${artworkSlug}/views`));
                    const currentViews = snapshot.exists() ? snapshot.val() : 0;
                    await set(ref(db, `feszt2026/artwork_stats/${artworkSlug}/views`), currentViews + 1);
                } catch {
                    // If there's an error, ensure the field exists with a value
                    await set(ref(db, `feszt2026/artwork_stats/${artworkSlug}`), {
                        views: 1,
                    });
                }
            },
        },
    },
};

export default rtdb;