// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cms-ds-f9841.firebaseapp.com",
  projectId: "cms-ds-f9841",
  storageBucket: "cms-ds-f9841.appspot.com",
  messagingSenderId: "1015216867660",
  appId: "1:1015216867660:web:74592fa05a630e86d0e7e9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
