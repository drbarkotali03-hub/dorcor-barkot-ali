
import { createFileRoute, json } from '@tanstack/react-router';
import { siteDataSchema, type SiteData } from '@/lib/data';

// NOTE: We are NOT importing 'firebase-admin' at the top level anymore.

export const Route = createFileRoute('/api/save-data')({
  // This action will only run on the server
  action: async ({ request }) => {
    if (request.method !== 'POST') {
      return json({ success: false, message: 'Invalid request method.' }, { status: 405 });
    }

    try {
      // 1. Dynamically import 'firebase-admin' inside the server-only action
      const admin = (await import('firebase-admin')).default;

      // 2. Helper function to initialize Firebase Admin SDK
      const initializeFirebaseAdmin = () => {
        const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
        const databaseURL = process.env.VITE_FIREBASE_DATABASE_URL;

        if (!serviceAccountString) {
          throw new Error('Server Error: FIREBASE_ADMIN_SDK_CONFIG is not set.');
        }
        if (!databaseURL) {
          throw new Error("Server Error: VITE_FIREBASE_DATABASE_URL is not set.");
        }

        // Initialize only if no apps are running
        if (admin.apps.length === 0) {
          const serviceAccount = JSON.parse(serviceAccountString);
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL,
          });
        }
        return admin.database();
      };

      // 3. Get data and save to DB
      const db = initializeFirebaseAdmin();
      const data: SiteData = await request.json();

      // Validate data before saving
      siteDataSchema.parse(data);

      await db.ref('data').set(data);

      return json({ success: true, message: 'Data saved successfully.' });
    } catch (error: any) {
      // Log the detailed error on the server for debugging
      console.error('[API Error] /api/save-data:', error);
      return json({ success: false, message: error.message || 'An unknown server error occurred.' }, { status: 500 });
    }
  },
});

