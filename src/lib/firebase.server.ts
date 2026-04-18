
import { createServerFn } from '@tanstack/start/server';
import admin from 'firebase-admin';
import { siteDataSchema, type SiteData, getDefaultSiteData } from '@/lib/data';

// This function is now local to this module and NOT exported.
// This is the key to preventing the 'import-protection' error.
function initializeFirebaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('initializeFirebaseAdmin should only be called on the server.');
  }

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

// EXPORT 1: The RPC function to reset data. It's safe to import this on the client.
export const resetDataOnServer = createServerFn('POST', async () => {
  'use server';
  console.log('Resetting data on the server...');
  try {
    const defaultData = getDefaultSiteData();
    const db = initializeFirebaseAdmin();
    await db.ref('data').set(defaultData);
    console.log('Data reset successfully on the server.');
    return { success: true, message: 'Data reset successfully.' };
  } catch (error: any) {
    console.error('[Server Function Error] resetDataOnServer:', error);
    // It's better to throw a generic error message to the client
    throw new Error('An unknown server error occurred during reset.');
  }
});

// EXPORT 2: The RPC function to save data. It's also safe to import on the client.
export const newSaveDataToServer = createServerFn('POST', async (data: SiteData) => {
  'use server';
  console.log('Saving data on the server...');
  try {
    siteDataSchema.parse(data); // Validate data
    const db = initializeFirebaseAdmin();
    await db.ref('data').set(data);
    console.log('Data saved successfully on the server.');
    return { success: true, message: 'Data saved successfully.' };
  } catch (error: any) {
    console.error('[Server Function Error] saveDataToServer:', error);
    throw new Error(error.message || 'An unknown server error occurred.');
  }
});
