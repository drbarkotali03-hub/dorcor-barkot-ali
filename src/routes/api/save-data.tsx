
import { createFileRoute } from '@tanstack/react-router';
import { siteDataSchema, type SiteData } from '@/lib/data';

// We are NOT using the `json` helper anymore

export const Route = createFileRoute('/api/save-data')({
  // This action runs on the server
  action: async ({ request }) => {
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request method.' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      const admin = (await import('firebase-admin')).default;

      const initializeFirebaseAdmin = () => {
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
      };

      const db = initializeFirebaseAdmin();
      const data: SiteData = await request.json();

      siteDataSchema.parse(data);

      await db.ref('data').set(data);

      return new Response(
        JSON.stringify({ success: true, message: 'Data saved successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error: any) {
      console.error('[API Error] /api/save-data:', error);
      return new Response(
        JSON.stringify({ success: false, message: error.message || 'An unknown server error occurred.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
});
