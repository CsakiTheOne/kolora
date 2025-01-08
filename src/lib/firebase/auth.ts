import { signInWithPopup } from "firebase/auth";
import { initializeFirebase } from "./firebase";

const { auth, googleProvider } = initializeFirebase();

export function loginWithGoogle() {
    signInWithPopup(auth, googleProvider).catch((error) => {
        console.error("Google login error:", error);
    });
}

export function logout() {
    auth.signOut().catch((error) => {
        console.error("Logout error:", error);
    });
}