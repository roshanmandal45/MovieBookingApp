// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnyNHAIkK3soCLCfRXMjjQyTQhmvtBuh4",
  authDomain: "moviesuggestion-d6b45.firebaseapp.com",
  projectId: "moviesuggestion-d6b45",
  storageBucket: "moviesuggestion-d6b45.firebasestorage.app",
  messagingSenderId: "182351124866",
  appId: "1:182351124866:web:0b0b9f419d0ff9358b979b",
  measurementId: "G-8382J0PJ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);