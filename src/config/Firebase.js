// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moviesuggestion-d6b45.firebaseapp.com",
  projectId: "moviesuggestion-d6b45",
  storageBucket: "moviesuggestion-d6b45.firebasestorage.app",
  messagingSenderId: "182351124866",
  appId: "1:182351124866:web:0b0b9f419d0ff9358b979b",
  measurementId: "G-8382J0PJ16",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
