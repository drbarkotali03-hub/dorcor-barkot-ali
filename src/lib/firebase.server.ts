'''
import { createServerFn } from '@tanstack/start/server';
import admin from 'firebase-admin';
import { siteDataSchema, type SiteData, getDefaultSiteData } from '@/lib/data';

// This function will only ever be imported on the server
export function initializeFirebaseAdmin() {
  // Ensure this is only run on the server
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

// This function will also only be imported on the server
export const saveDataToServer = createServerFn(
  'POST',
  async () => {
    'use server';
    // The data is automatically passed from the client by createServerFn
    // We need to get it from the request context
    // This is a placeholder, as the actual data passing is handled by the framework
    // The function passed to createServerFn receives the arguments from the client call.
    // Let's adjust this.
  }
);

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
    throw new Error(error.message || 'An unknown server error occurred during reset.');
  }
});

// Correct way to handle arguments with createServerFn
const saveFn = async (data: SiteData) => {
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
};

export const newSaveDataToServer = createServerFn('POST', saveFn);

'''