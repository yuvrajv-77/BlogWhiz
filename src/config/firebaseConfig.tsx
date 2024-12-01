// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDT26cfVX9gymSs9eiW3Ne-LV6CjHqthmA',
  authDomain: 'next-blog-c1013.firebaseapp.com',
  projectId: 'next-blog-c1013',
  storageBucket: 'next-blog-c1013.appspot.com',
  messagingSenderId: '1056956541595',
  appId: "1:1056956541595:web:70fe4f575037c086e7343e",
  measurementId: "G-BD7WEYC1GM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);