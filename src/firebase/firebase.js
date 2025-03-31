// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4zWTCkqUm2404rkmbPkE5keo9IIkNTOA",
  authDomain: "chat-bedac.firebaseapp.com",
  projectId: "chat-bedac",
  storageBucket: "chat-bedac.firebasestorage.app",
  messagingSenderId: "546459299891",
  appId: "1:546459299891:web:0a0bc817c659e6bbbeb346"
};


// 🔥 Firebase অ্যাপ ইনিশিয়ালাইজ
const app = initializeApp(firebaseConfig);

// 🔥 Authentication & Firestore ইন্সট্যান্স তৈরি
const auth = getAuth(app);
const db = getFirestore(app);

// 🔥 Anonymous Login ফাংশন
const signInUser = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Login Error:", error);
  }
};

export { db, auth, signInUser };