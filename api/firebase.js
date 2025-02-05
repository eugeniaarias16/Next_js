// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9dsjJZpS45wr4X2zIZgCwo2TIsdF-mbE",
  authDomain: "nextjs-coder-4dc3e.firebaseapp.com",
  databaseURL: "https://nextjs-coder-4dc3e-default-rtdb.firebaseio.com",
  projectId: "nextjs-coder-4dc3e",
  storageBucket: "nextjs-coder-4dc3e.firebasestorage.app",
  messagingSenderId: "217351805339",
  appId: "1:217351805339:web:693c1dfe1828128e93e93e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);