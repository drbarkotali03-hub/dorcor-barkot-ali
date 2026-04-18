
import { Route } from "@tanstack/react-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../../firebase";
import { patientListRoute } from "./index";

// Initialize Firestore
const db = getFirestore(app);

// Route for a single patient
export const patientRoute = new Route({
  getParentRoute: () => patientListRoute,
  path: "/$id",
  loader: async ({ params }) => {
    try {
      const docRef = doc(db, "patients", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { patient: { id: docSnap.id, ...docSnap.data() } };
      } else {
        // Handle the case where the patient is not found
        console.error("No such patient!");
        return { patient: null };
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      // Handle the error as needed
      return { patient: null };
    }
  },
});
