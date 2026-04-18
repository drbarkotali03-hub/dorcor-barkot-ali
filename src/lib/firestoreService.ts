// src/lib/firestoreService.ts
// This file contains helper functions for interacting with Firestore using server-side admin SDK.

import { createServerFn } from '@tanstack/start';
import * as admin from 'firebase-admin';

// A generic type for our documents
interface DocumentData {
  id?: string; // Documents will have an ID
  [key: string]: any; // And other properties of any type
}

// Initialize Firebase Admin if not already done
const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }
  return admin.firestore();
};

/**
 * Adds a new document to a specified collection in Firestore.
 * @param collectionName - The name of the collection (e.g., 'patients', 'appointments').
 * @param data - The data object to store.
 * @returns The ID of the newly created document.
 */
export const addDocument = createServerFn({ method: 'POST' }).handler(async ({ collectionName, data }: { collectionName: string; data: DocumentData }) => {
  try {
    const db = initializeFirebaseAdmin();
    const docRef = await db.collection(collectionName).add(data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error('Failed to add document');
  }
});

/**
 * Retrieves all documents from a specified collection.
 * @param collectionName - The name of the collection.
 * @returns An array of documents with their data.
 */
export const getDocuments = createServerFn({ method: 'GET' }).handler(async ({ collectionName }: { collectionName: string }): Promise<DocumentData[]> => {
  try {
    const db = initializeFirebaseAdmin();
    const querySnapshot = await db.collection(collectionName).get();
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error('Failed to retrieve documents');
  }
});

/**
 * Deletes a document from a collection by its ID.
 * @param collectionName - The name of the collection.
 * @param docId - The ID of the document to delete.
 */
export const deleteDocument = createServerFn({ method: 'DELETE' }).handler(async ({ collectionName, docId }: { collectionName: string; docId: string }) => {
  try {
    const db = initializeFirebaseAdmin();
    await db.collection(collectionName).doc(docId).delete();
    console.log("Document deleted with ID: ", docId);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error('Failed to delete document');
  }
});