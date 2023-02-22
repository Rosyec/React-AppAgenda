// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmKEJr-cOGduyeS8NLt4kKbD-40hDqwss",
  authDomain: "react-agenda-73a01.firebaseapp.com",
  projectId: "react-agenda-73a01",
  storageBucket: "react-agenda-73a01.appspot.com",
  messagingSenderId: "776088229448",
  appId: "1:776088229448:web:1c64f24cf2731b550e2a7d",
  measurementId: "G-X6MNJ322T9"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDatabase = getDatabase(FirebaseApp);
export const FirebaseFirestore = getFirestore(FirebaseApp);