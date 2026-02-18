import { doc, getDoc, onSnapshot, setDoc, addDoc, collection, getDocs, where, query, deleteDoc, updateDoc, arrayUnion, getCountFromServer } from "firebase/firestore";
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
        }
    },
};

export default firestore;