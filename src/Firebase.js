import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";

// export const firebase = require("firebase");
// export const firebaseui = require("firebaseui");

const firebaseConfig = {
  apiKey: "AIzaSyCyFxXgK7KzhRE3Dk8Vv99l-cJEh58EuD4",
  authDomain: "relaxani-management.firebaseapp.com",
  projectId: "relaxani-management",
  storageBucket: "relaxani-management.appspot.com",
  messagingSenderId: "456140342756",
  appId: "1:456140342756:web:7d343bbba5eb0fdd6973f1",
  measurementId: "G-8EXXE9EQVD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const ui = new firebaseui.auth.AuthUI(auth);
