// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH77i84xie86eM-QD3bxVWPTzhgEusOa0",
  authDomain: "smart-deals-7bb64.firebaseapp.com",
  projectId: "smart-deals-7bb64",
  storageBucket: "smart-deals-7bb64.firebasestorage.app",
  messagingSenderId: "811641022596",
  appId: "1:811641022596:web:9d61c2aee53d9a3286bad1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
