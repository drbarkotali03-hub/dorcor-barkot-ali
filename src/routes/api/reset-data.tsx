
import { createFileRoute } from '@tanstack/router';

export const Route = createFileRoute('/api/reset-data')({
  // This action now strictly handles API logic and delegates Firebase logic
  action: async ({ request }) => {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request method.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // Dynamically import the server-only function
      const { resetDataOnServer } = await import('@/lib/firebase.server');

      // Call the server function to handle the database interaction
      await resetDataOnServer();

      return new Response(JSON.stringify({ success: true, message: 'Data reset successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.error('[API Error] /api/reset-data:', error);
      return new Response(JSON.stringify({ success: false, message: error.message || 'An unknown server error occurred.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
