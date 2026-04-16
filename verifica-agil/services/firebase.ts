// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhw7XtkB8_VmbRTNO5JRG6P_NhQ1k3xTI",
  authDomain: "fir-auth-69fd1.firebaseapp.com",
  projectId: "fir-auth-69fd1",
  storageBucket: "fir-auth-69fd1.firebasestorage.app",
  messagingSenderId: "151547981580",
  appId: "1:151547981580:web:f6f7289306cadd6ea8a329",
  measurementId: "G-63G653R448"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore(app);
