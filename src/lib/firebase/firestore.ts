import { doc, getDoc, onSnapshot, setDoc, addDoc, collection, getDocs, where, query, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeFirebase } from "./firebase";
import KoloraUser from "$lib/model/KoloraUser";
import Work from "$lib/model/Work";
import POI from "$lib/model/POI";
import Post from "$lib/model/Post";
import Report from "$lib/model/Report";

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
            return firestore.users.get(id).then((user) => {
                let newUserData = { ...user };
                if (!user.username && name) {
                    newUserData.username = name;
                }
                if (!user.createdAt) {
                    newUserData.createdAt = new Date().toLocaleString("hu-HU");
                }
                return firestore.users.set(id, newUserData);
            }).catch((error) => {
                console.log("Error setting name if not exists: ", error);
            });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "users", id));
        }
    },
    pois: {
        get: (id: string): Promise<POI> => {
            return getDoc(doc(db, "pois", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.error("No such POI: ", id);
                        return Promise.reject("No such POI: " + id);
                    }
                    return { ...new POI(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.error("Error getting POI: ", error);
                    return Promise.reject(error);
                });
        },
        getAll: (): Promise<POI[]> => {
            return getDocs(collection(db, "pois"))
                .then((querySnapshot) => {
                    const pois: POI[] = [];
                    querySnapshot.forEach((doc) => {
                        pois.push({ ...new POI(), ...doc.data(), id: doc.id });
                    });
                    return pois;
                })
                .catch((error) => {
                    console.error("Error getting POIs: ", error);
                    return Promise.reject(error);
                }
                );
        },
        set: (id: string, data: POI): Promise<void> => {
            return setDoc(doc(db, "pois", id), data, { merge: true });
        },
        add: (data: POI): Promise<string> => {
            return addDoc(collection(db, "pois"), { ...data })
                .then((docRef) => {
                    return docRef.id;
                });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "pois", id));
        }
    },
    posts: {
        get: (id: string): Promise<Post> => {
            return getDoc(doc(db, "posts", id))
                .then((doc) => {
                    if (!doc.exists()) {
                        console.error("No such post: ", id);
                        return Promise.reject("No such post: " + id);
                    }
                    return { ...new Post(), ...doc.data(), id: doc.id };
                })
                .catch((error) => {
                    console.error("Error getting post: ", error);
                    return Promise.reject(error);
                });
        },
        getAllByAuthor: (authorId: string): Promise<Post[]> => {
            return getDocs(query(collection(db, "posts"), where("authorId", "==", authorId)))
                .then((querySnapshot) => {
                    const posts: Post[] = [];
                    querySnapshot.forEach((doc) => {
                        posts.push({ ...new Post(), ...doc.data(), id: doc.id });
                    });
                    return posts;
                })
                .catch((error) => {
                    console.error("Error getting posts: ", error);
                    return Promise.reject(error);
                });
        },
        getAllByPoi: (poiId: string): Promise<Post[]> => {
            return getDocs(query(collection(db, "posts"), where("poiId", "==", poiId)))
                .then((querySnapshot) => {
                    const posts: Post[] = [];
                    querySnapshot.forEach((doc) => {
                        posts.push({ ...new Post(), ...doc.data(), id: doc.id });
                    });
                    return posts;
                })
                .catch((error) => {
                    console.error("Error getting posts: ", error);
                    return Promise.reject(error);
                });
        },
        add: (post: Post): Promise<string> => {
            return addDoc(collection(db, "posts"), { ...post })
                .then((docRef) => {
                    return docRef.id;
                });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "posts", id));
        },
        deleteAllByUser: (userId: string): Promise<void[]> => {
            return getDocs(query(collection(db, "posts"), where("authorId", "==", userId)))
                .then((querySnapshot) => {
                    const deletePromises: Promise<void>[] = [];
                    querySnapshot.forEach((doc) => {
                        deletePromises.push(deleteDoc(doc.ref));
                    });
                    return Promise.all(deletePromises);
                })
                .catch((error) => {
                    console.error("Error deleting posts: ", error);
                    return Promise.reject(error);
                });
        },
        deleteAllByPoi: (poiId: string): Promise<void[]> => {
            return getDocs(query(collection(db, "posts"), where("poiId", "==", poiId)))
                .then((querySnapshot) => {
                    const deletePromises: Promise<void>[] = [];
                    querySnapshot.forEach((doc) => {
                        deletePromises.push(deleteDoc(doc.ref));
                    });
                    return Promise.all(deletePromises);
                })
                .catch((error) => {
                    console.error("Error deleting posts: ", error);
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
        set: (id: string, data: object): Promise<void> => {
            return setDoc(doc(db, "works", id), data, { merge: true });
        },
        save: (work: Work, authorId: string, onIdReceived: (id: string) => void = () => { }): Promise<void> => {
            if (work.id) {
                const workRef = doc(db, "works", work.id);
                return setDoc(workRef, { ...work, authorId }, { merge: true });
            } else {
                return addDoc(collection(db, "works"), { ...work, authorId })
                    .then((docRef) => {
                        onIdReceived(docRef.id);
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
        getAllByUser: (authorId: string): Promise<Work[]> => {
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
        deleteAllByUser: (userId: string): Promise<void[]> => {
            return getDocs(query(collection(db, "works"), where("authorId", "==", userId)))
                .then((querySnapshot) => {
                    const deletePromises: Promise<void>[] = [];
                    querySnapshot.forEach((doc) => {
                        deletePromises.push(deleteDoc(doc.ref));
                    });
                    return Promise.all(deletePromises);
                })
                .catch((error) => {
                    console.error("Error deleting works: ", error);
                    return Promise.reject(error);
                });
        },
    },
    reports: {
        send: (report: Report): Promise<string> => {
            return addDoc(collection(db, "reports"), { ...report })
                .then((docRef) => {
                    return docRef.id;
                });
        },
        getAll: (): Promise<Report[]> => {
            return getDocs(collection(db, "reports"))
                .then((querySnapshot) => {
                    const reports: Report[] = [];
                    querySnapshot.forEach((doc) => {
                        reports.push({ ...new Report(), ...doc.data(), id: doc.id });
                    });
                    return reports;
                })
                .catch((error) => {
                    console.error("Error getting reports: ", error);
                    return Promise.reject(error);
                });
        },
        delete: (id: string): Promise<void> => {
            return deleteDoc(doc(db, "reports", id));
        },
    },
};

export default firestore;