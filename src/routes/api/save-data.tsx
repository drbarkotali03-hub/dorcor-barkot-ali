
import { createFileRoute, json } from '@tanstack/react-router';
import admin from 'firebase-admin';
import { siteDataSchema, type SiteData } from '@/lib/data';

// Helper function to initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
  // Access environment variables on the server
  const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
  const databaseURL = process.env.VITE_FIREBASE_DATABASE_URL;

  if (!serviceAccountString) {
    throw new Error('FIREBASE_ADMIN_SDK_CONFIG environment variable is not set.');
  }
  if (!databaseURL) {
    throw new Error("VITE_FIREBASE_DATABASE_URL environment variable is not set.");
  }

  // Parse the service account JSON
  const serviceAccount = JSON.parse(serviceAccountString);

  // Initialize the app if it's not already initialized
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL,
    });
  }
  return admin.database();
}

// Create the file-based route for /api/save-data
export const Route = createFileRoute('/api/save-data')({
  // This action will handle the POST request
  action: async ({ request }) => {
    if (request.method !== 'POST') {
      return json({ success: false, message: 'Invalid request method.' }, { status: 405 });
    }

    try {
      const data: SiteData = await request.json();

      // Validate the incoming data
      siteDataSchema.parse(data);

      // Initialize Firebase Admin and get a database reference
      const db = initializeFirebaseAdmin();

      // Set the data at the 'data' path in your Realtime Database
      await db.ref('data').set(data);

      return json({ success: true, message: 'Data saved successfully.' });
    } catch (error: any) {
      console.error('Error saving data:', error);
      // Return a detailed error message for debugging
      return json({ success: false, message: error.message || 'Failed to save data.' }, { status: 500 });
    }
  },
});
