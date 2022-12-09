// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { doc,  } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBruk6Xg3nqKL7Br0hzoT8o7Nlx3FjrQ40",
    authDomain: "marvel-quizz-91f44.firebaseapp.com",
    projectId: "marvel-quizz-91f44",
    storageBucket: "marvel-quizz-91f44.appspot.com",
    messagingSenderId: "111339901943",
    appId: "1:111339901943:web:7c7c3f645521e8358f94f2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
//TODO: move to AuthContext
export const auth = getAuth(app);

//initialisation de la DB
export const db = getFirestore();


