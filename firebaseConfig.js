// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY44x1jL2yVBOLMWSKkOgc3CHLWT3QUok",
  authDomain: "chatbotapp-788c8.firebaseapp.com",
  projectId: "chatbotapp-788c8",
  storageBucket: "chatbotapp-788c8.appspot.com",
  messagingSenderId: "441210350798",
  appId: "1:441210350798:web:5ae1b87bf71cb7d36cf49f",
  measurementId: "G-7128Q9G5Z3"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_STORE = getFirestore(FIREBASE_APP);

export {FIREBASE_APP, FIREBASE_AUTH, FIREBASE_STORE};