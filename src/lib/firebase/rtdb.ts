import { get, ref, remove, set } from "firebase/database";
import { initializeFirebase } from "./firebase";

const db = initializeFirebase().database;

const rtdb = {
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