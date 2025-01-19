import { doc, getDoc, onSnapshot, setDoc, addDoc, collection, getDocs, where, query, deleteDoc } from "firebase/firestore";
import { initializeFirebase } from "./firebase";
import KoloraUser from "$lib/model/KoloraUser";
import Work from "$lib/model/Work";
import KoloraEvent from "$lib/model/KoloraEvent";

const db = initializeFirebase().firestore;

const firestore = {
    users: {
        get: (id: string): Promise<KoloraUser> => {
            return getDoc(doc(db, "users", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.error("No such user: ", id);
                        return Promise.reject("No such user: " + id);
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
        setNameIfNotExists: (id: string, name: string | null): Promise<void> => {
            return firestore.users.get(id).then((user) => {
                if (!user.username && name) {
                    return firestore.users.set(id, { username: name });
                }
            }).catch((error) => {
                console.log("Error setting name if not exists: ", error);
                return firestore.users.set(id, { username: name });
            });
        },
    },
    works: {
        get: (id: string): Promise<Work> => {
            return getDoc(doc(db, "works", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.error("No such work: ", id);
                        return Promise.reject("No such work: " + id);
                    }
                    return { ...new Work(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.error("Error getting work: ", error);
                    return Promise.reject(error);
                });
        },
        set: (id: string, data: object): Promise<void> => {
            return setDoc(doc(db, "works", id), data, { merge: true });
        },
        save: (work: Work, authorId: string): Promise<void> => {
            if (work.id) {
                const workRef = doc(db, "works", work.id);
                return setDoc(workRef, { ...work, authorId }, { merge: true });
            } else {
                return addDoc(collection(db, "works"), { ...work, authorId })
                    .then((docRef) => {
                        work.id = docRef.id;
                        return firestore.works.save(work, authorId);
                    });
            }
        },
        getAll: (): Promise<Work[]> => {
            return getDocs(collection(db, "works"))
                .then((querySnapshot) => {
                    const works: Work[] = [];
                    querySnapshot.forEach((doc) => {
                        works.push({ ...new Work(), ...doc.data(), id: doc.id });
                    });
                    return works;
                })
                .catch((error) => {
                    console.error("Error getting works: ", error);
                    return Promise.reject(error);
                });
        },
        getAllByAuthor: (authorId: string): Promise<Work[]> => {
            return getDocs(query(collection(db, "works"), where("authorId", "==", authorId)))
                .then((querySnapshot) => {
                    const works: Work[] = [];
                    querySnapshot.forEach((doc) => {
                        works.push({ ...new Work(), ...doc.data(), id: doc.id });
                    });
                    return works;
                })
                .catch((error) => {
                    console.error("Error getting works: ", error);
                    return Promise.reject(error);
                });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "works", id));
        },
    },
    events: {
        get: (id: string): Promise<KoloraEvent> => {
            return getDoc(doc(db, "events", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.error("No such event: ", id);
                        return Promise.reject("No such event: " + id);
                    }
                    return { ...new KoloraEvent(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.error("Error getting event: ", error);
                    return Promise.reject(error);
                });
        },
        set: (id: string, data: object): Promise<void> => {
            return setDoc(doc(db, "events", id), data, { merge: true });
        },
        getAll: (): Promise<KoloraEvent[]> => {
            return getDocs(collection(db, "events"))
                .then((querySnapshot) => {
                    const events: KoloraEvent[] = [];
                    querySnapshot.forEach((doc) => {
                        events.push({ ...new KoloraEvent(), ...doc.data(), id: doc.id });
                    });
                    return events;
                })
                .catch((error) => {
                    console.error("Error getting events: ", error);
                    return Promise.reject(error);
                });
        },
        getAllLinkable: (): Promise<KoloraEvent[]> => {
            return getDocs(query(collection(db, "events"), where("allowWorkLinking", "==", true)))
                .then((querySnapshot) => {
                    const events: KoloraEvent[] = [];
                    querySnapshot.forEach((doc) => {
                        events.push({ ...new KoloraEvent(), ...doc.data(), id: doc.id });
                    });
                    return events;
                })
                .catch((error) => {
                    console.error("Error getting events: ", error);
                    return Promise.reject(error);
                });
        },
    }
};

export default firestore;