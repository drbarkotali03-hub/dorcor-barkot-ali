
import { json, type RequestHandler } from "@tanstack/react-router";
import admin from "firebase-admin";
import { siteDataSchema } from "@/lib/data";

// Get the Firebase Admin SDK config from environment variables
const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SDK_CONFIG || "{}"
);

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate the incoming data
    const validatedData = siteDataSchema.parse(data);

    // Save the data to the Firebase Realtime Database
    await db.ref("data").set(validatedData);

    return json({ success: true, message: "Data saved successfully." });
  } catch (error) {
    console.error("Error saving data:", error);
    return json({ success: false, message: "Failed to save data." }, 500);
  }
};
