
import { Route } from "@tanstack/react-router";
import { rootRoute } from "../../../root";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../../firebase";

// Initialize Firestore
const db = getFirestore(app);

// A new route for the patient list
export const patientListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/api/patients",
  loader: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const patients = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { patients };
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Return an empty array or handle the error as needed
      return { patients: [] };
    }
  },
});
