// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjOalri5o_cpC73k9-kM1A3J2100jbDQc",
  authDomain: "react-trade-shift.firebaseapp.com",
  projectId: "react-trade-shift",
  storageBucket: "react-trade-shift.firebasestorage.app",
  messagingSenderId: "850743277333",
  appId: "1:850743277333:web:fbf1fa8919368fc7e3db1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
