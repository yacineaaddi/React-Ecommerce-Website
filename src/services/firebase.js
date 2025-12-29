// Import Firebase core
import firebase from "firebase/compat/app";

// Import Firestore and Auth services
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Firebase configuration — values are loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase app instance using the config
export const app = firebase.initializeApp(firebaseConfig);

// Reference to Firestore database service
export const db = firebase.firestore();
