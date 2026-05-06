import { doc, getDoc, onSnapshot, setDoc, addDoc, collection, getDocs, where, query, deleteDoc, updateDoc, arrayUnion, getCountFromServer, DocumentReference, type DocumentData, orderBy, runTransaction } from "firebase/firestore";
import { initializeFirebase } from "./firebase";
import KoloraUser from "$lib/model/KoloraUser";

const db = initializeFirebase().firestore;

const firestore = {
    users: {
        getAll: (): Promise<KoloraUser[]> => {
            return getDocs(collection(db, "users"))
                .then((querySnapshot) => {
                    const users: KoloraUser[] = [];
                    querySnapshot.forEach((doc) => {
                        users.push({ ...new KoloraUser(), ...doc.data(), id: doc.id });
                    });
                    return users;
                })
                .catch((error) => {
                    console.error("Error getting users: ", error);
                    return Promise.reject(error);
                });
        },
        get: (id: string): Promise<KoloraUser> => {
            return getDoc(doc(db, "users", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        return { ...new KoloraUser(), id: id };
                    }
                    return { ...new KoloraUser(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.error("Error getting user: ", error);
                    return Promise.reject(error);
                });
        },
        set: (id: string, data: object): Promise<void> => {
            return setDoc(doc(db, "users", id), data, { merge: true });
        },
        visitPlace: (userId: string, poiId: string): Promise<void> => {
            return updateDoc(doc(db, "users", userId), {
                visitedPlaces: arrayUnion(poiId),
            });
        },
        listen: (id: string, callback: (user: KoloraUser) => void): () => void => {
            const docRef = doc(db, "users", id);
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    callback({ ...new KoloraUser(), ...doc.data(), id: doc.id });
                } else {
                    console.error("No such user: ", id);
                }
            });
            return unsubscribe;
        },
        setDefaultsIfNeeded: (id: string, name: string | null): Promise<void> => {
            let newUserData = { ...new KoloraUser(), id: id };
            return firestore.users.get(id).then((user) => {
                newUserData = { ...newUserData, ...user };
                if (!user.username && name) {
                    newUserData.username = name;
                }
                if (!user.createdAt) {
                    newUserData.createdAt = new Date().toLocaleString("hu-HU");
                }
                if (newUserData === user) {
                    return Promise.resolve();
                } else {
                    return firestore.users.set(id, newUserData);
                }
            }).catch((error) => {
                console.error("Error getting user: ", error);
            });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "users", id));
        },
    },
    artists: {
        getAll: (): Promise<object[]> => {
            return getDocs(collection(db, "artists"))
                .then((querySnapshot) => {
                    const artists: object[] = [];
                    querySnapshot.forEach((doc) => {
                        artists.push({ ...doc.data(), id: doc.id });
                    });
                    return artists;
                })
                .catch((error) => {
                    console.error("Error getting artists: ", error);
                    return Promise.reject(error);
                });
        },
        set: (id: string, data: object | null): Promise<void> => {
            if (!data) {
                return deleteDoc(doc(db, "artists", id));
            }
            return setDoc(doc(db, "artists", id), data, { merge: true });
        },
        add: (data: object): Promise<DocumentReference<DocumentData, DocumentData>> => {
            return addDoc(collection(db, "artists"), data);
        },
        listen: (callback: (artists: object[]) => void): () => void => {
            const colRef = collection(db, "artists");
            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const artists: object[] = [];
                querySnapshot.forEach((doc) => {
                    artists.push({ ...doc.data(), id: doc.id });
                });
                callback(artists);
            });
            return unsubscribe;
        },
    },
    "event-2026-04-11": {
        getAllStats: (): Promise<{ stickerId: string; source: string; visitedAt: string }[]> => {
            return getDocs(collection(db, "2026-04-11"))
                .then((querySnapshot) => {
                    const stats: { stickerId: string; source: string; visitedAt: string }[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        stats.push({
                            stickerId: data.stickerId,
                            source: data.source,
                            visitedAt: data.visitedAt,
                        });
                    });
                    return stats;
                })
                .catch((error) => {
                    console.error("Error getting stats: ", error);
                    return Promise.reject(error);
                });
        },
        listenAll: (callback: (stats: { stickerId: string; source: string; visitedAt: string }[]) => void): () => void => {
            const colRef = collection(db, "2026-04-11");
            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const stats: { stickerId: string; source: string; visitedAt: string }[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    stats.push({
                        stickerId: data.stickerId,
                        source: data.source,
                        visitedAt: data.visitedAt,
                    });
                });
                callback(stats);
            });
            return unsubscribe;
        },
        getStatsAfter: (startDate: Date): Promise<{ stickerId: string; source: string; visitedAt: string }[]> => {
            const startDateString = startDate.toLocaleString("hu-HU");
            const statsQuery = query(collection(db, "2026-04-11"), where("visitedAt", ">", startDateString), orderBy("visitedAt", "asc"));
            return getDocs(statsQuery)
                .then((querySnapshot) => {
                    const stats: { stickerId: string; source: string; visitedAt: string }[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        stats.push({
                            stickerId: data.stickerId,
                            source: data.source,
                            visitedAt: data.visitedAt,
                        });
                    });
                    return stats;
                })
                .catch((error) => {
                    console.error("Error getting stats: ", error);
                    return Promise.reject(error);
                });
        },
        visitSticker: (stickerId: string, source: string): Promise<DocumentReference<DocumentData, DocumentData>> => {
            if (!source) {
                return Promise.reject(new Error(`Not storing visit to sticker ${stickerId}: missing source. This is probably not a new visit.`));
            }
            const visitData = {
                stickerId: stickerId,
                source: source,
                visitedAt: new Date().toLocaleString("hu-HU"),
            };
            return addDoc(collection(db, "2026-04-11"), visitData);
        },
        deleteRecordByDate: (visitedAt: string): Promise<void> => {
            const statsQuery = query(collection(db, "2026-04-11"), where("visitedAt", "==", visitedAt));
            return getDocs(statsQuery)
                .then((querySnapshot) => {
                    const deletePromises: Promise<void>[] = [];
                    querySnapshot.forEach((doc) => {
                        deletePromises.push(deleteDoc(doc.ref));
                    });
                    return Promise.all(deletePromises).then(() => { });
                })
                .catch((error) => {
                    console.error("Error deleting record by date: ", error);
                    return Promise.reject(error);
                });
        },
        deleteAllStats: (): Promise<void> => {
            return runTransaction(db, async (transaction) => {
                const statsQuery = query(collection(db, "2026-04-11"));
                const querySnapshot = await getDocs(statsQuery);
                querySnapshot.forEach((doc) => {
                    transaction.delete(doc.ref);
                });
            }).catch((error) => {
                console.error("Error deleting stats: ", error);
                return Promise.reject(error);
            });
        },
    },
};

export default firestore;