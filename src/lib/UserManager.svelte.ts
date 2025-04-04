import { onAuthStateChanged, type User } from "firebase/auth";
import KoloraUser from "./model/KoloraUser";
import { initializeFirebase } from "./firebase/firebase";
import firestore from "./firebase/firestore";

export default class UserManager {
    static instance = new UserManager();

    /**
     * Firebase user object. This is the user object returned by Firebase Authentication.
     */
    firebaseUser = $state<User | null>(null);
    /**
     * Kolora user object. This is the user object returned by Kolora's Firestore database.
     */
    koloraUser = $state<KoloraUser | null>(null);
    /**
     * Derived store that returns true if both firebaseUser and koloraUser are not null.
     */
    isLoggedIn = $derived(this.firebaseUser && this.koloraUser);
    isMounted = $state(false);
    isLoaded = $state(false);

    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        UserManager.instance = this;
    }

    mount(): (() => void) {
        if (this.isMounted) return () => { };
        this.isMounted = true;

        const { auth } = initializeFirebase();
        let userListener: (() => void) | null = null;
        const authListener = onAuthStateChanged(auth, (user) => {
            this.firebaseUser = user;
            if (user) {
                userListener = firestore.users.listen(user.uid, (userData) => {
                    this.koloraUser = userData;
                    this.isLoaded = true;
                });
            } else {
                if (userListener) {
                    userListener();
                    userListener = null;
                }
                this.koloraUser = null;
                this.isLoaded = true;
            }
        });

        return () => {
            if (userListener) {
                userListener();
                userListener = null;
            }
            authListener();
            this.isMounted = false;
        }
    }
}