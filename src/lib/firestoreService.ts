// src/lib/firestoreService.ts
// This file contains helper functions for interacting with Firestore.

import { db } from './firebase'; // We import the initialized db from our firebase.ts file
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// A generic type for our documents
interface DocumentData {
  id?: string; // Documents will have an ID
  [key: string]: any; // And other properties of any type
}

/**
 * Adds a new document to a specified collection in Firestore.
 * @param collectionName - The name of the collection (e.g., 'patients', 'appointments').
 * @param data - The data object to store.
 * @returns The ID of the newly created document.
 */
export const addDocument = async (collectionName: string, data: DocumentData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error('Failed to add document');
  }
};

/**
 * Retrieves all documents from a specified collection.
 * @param collectionName - The name of the collection.
 * @returns An array of documents with their data.
 */
export const getDocuments = async (collectionName: string): Promise<DocumentData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error('Failed to retrieve documents');
  }
};

/**
 * Deletes a document from a collection by its ID.
 * @param collectionName - The name of the collection.
 * @param docId - The ID of the document to delete.
 */
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted with ID: ", docId);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error('Failed to delete document');
  }
};
