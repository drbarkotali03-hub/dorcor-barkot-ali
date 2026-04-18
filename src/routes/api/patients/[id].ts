// src/routes/api/patients/[id].ts
import { Route } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; // Using the new firebase.ts
import { patientListRoute } from "./index";

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
        console.error("No such patient!");
        return { patient: null };
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      return { patient: null };
    }
  },
});
