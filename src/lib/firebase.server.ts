
import admin from 'firebase-admin';
import { type SiteData, siteDataSchema, getDefaultSiteData } from '@/lib/data';

// Debounce to prevent multiple initializations
let firestore: admin.firestore.Firestore | null = null;

function initializeFirebaseAdmin() {
  if (firestore) {
    return firestore;
  }

  if (admin.apps.length > 0) {
    firestore = admin.firestore();
    return firestore;
  }

  const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;
  if (!serviceAccountString) {
    throw new Error('CRITICAL: FIREBASE_ADMIN_SDK_CONFIG environment variable is not set.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e: any) {
    throw new Error(`Failed to parse Firebase service account JSON: ${e.message}`);
  }

  firestore = admin.firestore();
  return firestore;
}

// The single source of truth for the site data document
function getSiteDataRef() {
  const db = initializeFirebaseAdmin();
  return db.collection('site').doc('data');
}

/**
 * Saves the entire site data object to a single Firestore document.
 */
export async function saveDataToServer(data: SiteData): Promise<{ success: boolean; message: string }> {
  try {
    // Ensure data is valid before saving
    const validatedData = siteDataSchema.parse(data);
    await getSiteDataRef().set(validatedData, { merge: true }); // Use set with merge to be safe
    return { success: true, message: 'Data saved successfully to Firestore.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to save data:', error);
    return { success: false, message: error.message || 'Failed to save data.' };
  }
}

/**
 * Resets the site data to its default state in Firestore.
 */
export async function resetDataOnServer(): Promise<{ success: boolean; message: string }> {
  try {
    const defaultData = getDefaultSiteData();
    // Overwrite the document with the default data
    await getSiteDataRef().set(defaultData);
    return { success: true, message: 'Data reset to default successfully.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to reset data:', error);
    return { success: false, message: error.message || 'Failed to reset data.' };
  }
}

// --- CRUD Functions for Patients (Secure Server-Side Operations) ---

export async function getPatients() {
  const db = initializeFirebaseAdmin();
  const snapshot = await db.collection('patients').orderBy('name').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addPatient(patient: { name: string }) {
  if (!patient.name || patient.name.trim() === '') {
    throw new Error('Patient name cannot be empty.');
  }
  const db = initializeFirebaseAdmin();
  const docRef = await db.collection('patients').add({ name: patient.name.trim() });
  return { id: docRef.id, name: patient.name.trim() };
}

export async function deletePatient(id: string) {
  if (!id) throw new Error('Document ID is required for deletion.');
  const db = initializeFirebaseAdmin();
  await db.collection('patients').doc(id).delete();
  return { success: true, message: `Patient ${id} deleted.` };
}
