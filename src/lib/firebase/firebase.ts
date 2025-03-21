import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDuQVyLeoNnoV_wZSD_DN0kVFUPYHULJSU",
        authDomain: "kolora.firebaseapp.com",
        databaseURL: "https://kolora-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "kolora",
        storageBucket: "kolora.firebasestorage.app",
        messagingSenderId: "421028054170",
        appId: "1:421028054170:web:7cc766131bb9e131e10b23",
        measurementId: "G-M6YRY1BZF5"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    return {
        app: app,
        auth: auth,
        googleProvider: googleProvider,
        firestore: getFirestore(app),
        database: getDatabase(app),
    };
}