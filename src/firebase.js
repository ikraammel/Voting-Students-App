import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNDiVyPHTKNjsMWzZDvSzhef8bls7920",
  authDomain: "ensas-tp-938d1.firebaseapp.com",
  projectId: "ensas-tp-938d1",
  storageBucket: "ensas-tp-938d1.firebasestorage.app",
  messagingSenderId: "216358548198",
  appId: "1:216358548198:web:6adde5f7239a3ab10e8127",
  measurementId: "G-KVSCW182JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase exportés
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
