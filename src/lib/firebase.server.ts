
import admin from 'firebase-admin';
import { siteDataSchema, type SiteData, getDefaultSiteData } from '@/lib/data';

// This function will only ever be imported on the server
export function initializeFirebaseAdmin() {
  const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
  const databaseURL = process.env.VITE_FIREBASE_DATABASE_URL;

  if (!serviceAccountString || !databaseURL) {
    throw new Error('Firebase environment variables are not set on the server.');
  }

  if (admin.apps.length === 0) {
    const serviceAccount = JSON.parse(serviceAccountString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL,
    });
  }
  return admin.database();
}

// This function will also only be imported on the server
export async function saveDataToServer(data: SiteData) {
  // 1. Validate the incoming data
  siteDataSchema.parse(data);

  // 2. Initialize DB connection
  const db = initializeFirebaseAdmin();

  // 3. Save to Firebase
  await db.ref('data').set(data);
}

export async function resetDataOnServer() {
    const defaultData = getDefaultSiteData();
    const db = initializeFirebaseAdmin();
    await db.ref('data').set(defaultData);
}
