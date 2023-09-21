// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLCWKKEBAu_kM-3JGBrOjaG7Jv8JZlAKs",
    authDomain: "podcast-app-react-aeec6.firebaseapp.com",
    projectId: "podcast-app-react-aeec6",
    storageBucket: "podcast-app-react-aeec6.appspot.com",
    messagingSenderId: "354678768944",
    appId: "1:354678768944:web:491b318c518cbd09d3b4f5",
    measurementId: "G-8FWTBMF3S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };