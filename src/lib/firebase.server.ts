
import admin from 'firebase-admin';
import { type SiteData, siteDataSchema, getDefaultSiteData } from '@/lib/data';

let db: admin.database.Database | null = null;

function initializeFirebaseAdmin() {
  if (db) {
    return db;
  }
  
  if (admin.apps.length > 0) {
    db = admin.database();
    return db;
  }

  const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
  const databaseURL = process.env.VITE_FIREBASE_DATABASE_URL;

  if (!serviceAccountString || !databaseURL) {
    throw new Error('Firebase admin environment variables are not set.');
  }

  const serviceAccount = JSON.parse(serviceAccountString);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
  });

  db = admin.database();
  return db;
}

export async function saveDataToServer(data: SiteData): Promise<{ success: boolean; message: string }> {
  try {
    const validatedData = siteDataSchema.parse(data); // Zod validation
    const db = initializeFirebaseAdmin();
    await db.ref('data').set(validatedData);
    return { success: true, message: 'Data saved successfully.' };
  } catch (error: any) {
    console.error('Error saving data to Firebase:', error);
    return { success: false, message: error.message || 'Failed to save data.' };
  }
}

export async function resetDataOnServer(): Promise<{ success: boolean; message: string }> {
  try {
    const db = initializeFirebaseAdmin();
    const defaultData = getDefaultSiteData();
    await db.ref('data').set(defaultData);
    return { success: true, message: 'Data reset to default successfully.' };
  } catch (error: any) {
    console.error('Error resetting data in Firebase:', error);
    return { success: false, message: error.message || 'Failed to reset data.' };
  }
}
