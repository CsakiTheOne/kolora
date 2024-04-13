import { initializeApp, type FirebaseApp } from "firebase/app";

export function initializeFirebase(): FirebaseApp {
    const firebaseConfig = {
        apiKey: "AIzaSyDuQVyLeoNnoV_wZSD_DN0kVFUPYHULJSU",
        authDomain: "kolora.firebaseapp.com",
        projectId: "kolora",
        storageBucket: "kolora.appspot.com",
        messagingSenderId: "421028054170",
        appId: "1:421028054170:web:7cc766131bb9e131e10b23",
        measurementId: "G-M6YRY1BZF5"
    };

    return initializeApp(firebaseConfig);
}