// src/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek",
  authDomain: "de-barkot-ali-web.firebaseapp.com",
  databaseURL: "https://de-barkot-ali-web-default-rtdb.firebaseio.com",
  projectId: "de-barkot-ali-web",
  storageBucket: "de-barkot-ali-web.appspot.com",
  messagingSenderId: "392212737235",
  appId: "1:392212737235:web:9018d9f385f4332ce17826",
  measurementId: "G-EFFCTX7JEW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
