import { doc, getDoc, onSnapshot, setDoc, addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { initializeFirebase } from "./firebase";
import KoloraUser from "$lib/model/KoloraUser";
import Work from "$lib/model/Work";

const db = initializeFirebase().firestore;

const firestore = {
    users: {
        get: (id: string): Promise<KoloraUser> => {
            console.log(`get`);
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
                return Promise.reject(error);
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
    },
};

export default firestore;