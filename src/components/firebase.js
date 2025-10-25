import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATMdM7uAEp-wSc4HzbTgRmq0rqy9ozLAE",
  authDomain: "electro-97f7b.firebaseapp.com",
  projectId: "electro-97f7b",
  storageBucket: "electro-97f7b.firebasestorage.app",
  messagingSenderId: "209367535867",
  appId: "1:209367535867:web:b9cc3789ae080bdb69e05e",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
