import { signInWithPopup } from "firebase/auth";
import { initializeFirebase } from "./firebase";

const { auth, googleProvider } = initializeFirebase();

export function getCurrentUser() {
    return auth.currentUser;
}

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

export function deleteAccount() {
    const user = getCurrentUser();
    
    if (!user) {
        console.error("No user is currently signed in.");
        return;
    }

    return user.delete();
}