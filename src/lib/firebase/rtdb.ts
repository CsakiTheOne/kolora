import { get, ref, remove, set } from "firebase/database";
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
};

export default rtdb;