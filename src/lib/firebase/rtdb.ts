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
    reports: {
        users: {
            getAll: (userId: string): Promise<string[]> => {
                return get(ref(db, `reports/users/${userId}`)).then((snapshot) => {
                    return snapshot.val() || [];
                });
            },
            reportUser: (userId: string, reporterId: string | undefined, reason: string): Promise<void> => {
                if (!reporterId) {
                    return Promise.reject("No reporter ID provided");
                }
                return set(ref(db, `reports/users/${userId}/${reporterId}`), reason);
            },
        },
        posts: {
            getAll: (postId: string): Promise<string[]> => {
                return get(ref(db, `reports/posts/${postId}`)).then((snapshot) => {
                    return snapshot.val() || [];
                });
            },
            reportPost: (postId: string, reporterId: string | undefined, reason: string): Promise<void> => {
                if (!reporterId) {
                    return Promise.reject("No reporter ID provided");
                }
                return set(ref(db, `reports/posts/${postId}/${reporterId}`), reason);
            },
            deleteReports: (postId: string): Promise<void> => {
                return remove(ref(db, `reports/posts/${postId}`));
            },
        },
    },
};

export default rtdb;