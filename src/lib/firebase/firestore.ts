import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { initializeFirebase } from "./firebase";
import KoloraUser from "$lib/model/KoloraUser";

const db = initializeFirebase().firestore;

const firestore = {
    users: {
        get: (id: string): Promise<KoloraUser> => {
            return getDoc(doc(db, "users", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.log("No such user: ", id);
                        return Promise.reject("No such user: " + id);
                    }
                    return { ...new KoloraUser(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.log("Error getting user: ", error);
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
                    console.log("No such user: ", id);
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
    works: {},
};

export default firestore;