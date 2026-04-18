// src/routes/api/patients/index.ts
import { Route } from "@tanstack/react-router";
import { rootRoute } from "../../../root";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase"; // Using the new firebase.ts

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
      return { patients: [] };
    }
  },
});
