// lib/firebase.ts - Firebase Configuration
// Initialize Firebase with configuration

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek",
  authDomain: "de-barkot-ali-web.firebaseapp.com",
  databaseURL: "https://de-barkot-ali-web-default-rtdb.firebaseio.com",
  projectId: "de-barkot-ali-web",
  storageBucket: "de-barkot-ali-web.firebasestorage.app",
  messagingSenderId: "392212737235",
  appId: "1:392212737235:web:9018d9f385f4332ce17826",
  measurementId: "G-EFFCTX7JEW"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only on client-side
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics not available:", error);
  }
}

export { app, analytics };
export default app;
