// src/lib/data.ts
// Firebase-powered data abstraction layer

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface DoctorInfo {
  name: string;
  title: string;
  bmdc: string;
  intro: string;
  imageUrl: string;
}

export interface Chamber {
  id: string;
  name: string;
  address: string;
  schedule: string[];
  phones: string[];
  hotline?: string;
  website?: string;
  facebook?: string;
  mapQuery: string;
  googleMapsLink?: string; // Add this line
}

export interface ContactInfo {
  whatsappNumbers: string[];
  phoneNumbers: string[];
  website: string;
  facebook: string;
  /** @deprecated kept for backward compatibility */
  whatsapp?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface SiteSettings {
  siteTitle: string;
  logo: string;
  adminPassword: string;
}

export interface SiteData {
  doctor: DoctorInfo;
  qualifications: string[];
  memberships: string[];
  experience: string[];
  services: string[];
  chambers: Chamber[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  settings: SiteSettings;
}

const DEFAULT_DATA: SiteData = {
  doctor: {
    name: "Professor Dr. Md. Barkot Ali",
    title: "Newborn, Child & Adolescent Health Specialist",
    bmdc: "A-25803",
    intro: "With decades of experience in pediatric care, Professor Dr. Md. Barkot Ali is one of the most trusted child health specialists in Khulna. He provides compassionate, evidence-based care for newborns, children, and adolescents.",
    imageUrl: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
  },
  qualifications: [
    "MBBS (Dhaka)",
    "DCH",
    "FCPS (India)",
    "FRCPCH (UK)",
  ],
  memberships: [
    "Member, Bangladesh Medical Association (BMA)",
    "Member, Bangladesh Pediatric Association (BPA)",
    "Fellow, Royal College of Paediatrics and Child Health (UK)",
  ],
  experience: [
    "Former Child Specialist – Bangladesh Navy Hospital (CMH Khulna)",
    "Former Head of Pediatrics – GMC",
    "Professor & Head of Pediatrics – MSMC",
  ],
  services: [
    "Newborn Care",
    "Child & Adolescent Treatment",
    "Vaccination & Immunization",
    "Fever & Infection Treatment",
    "Growth Monitoring",
    "Nutrition Advice",
  ],
  chambers: [
    {
      id: "1",
      name: "Khadija Villa",
      address: "Holding No-20, Ward No-5, KDA Market Road (Rishipara), Daulatpur, Khulna",
      schedule: [
        "Daily 5 PM – 9 PM",
        "Monday Closed",
        "Friday 9 AM – 12 PM",
      ],
      phones: ["01784-052339", "01972-050951"],
      mapQuery: "Khadija Villa Daulatpur Khulna",
      googleMapsLink: "https://maps.app.goo.gl/u5Kzv5Gz8jCHaQd56", // Example link
    },
    {
      id: "2",
      name: "Popular Diagnostic Centre Ltd. (Khulna)",
      address: "House #37, KDA Avenue, Moylapota-Sheikhpara",
      schedule: [
        "Tuesday, Wednesday, Thursday",
        "10 AM – 1 PM",
      ],
      phones: [],
      hotline: "09666787821",
      website: "www.populardiagnostic.com",
      facebook: "facebook.com/populardiagnostickhulna",
      mapQuery: "Popular Diagnostic Centre Khulna",
      googleMapsLink: "https://maps.app.goo.gl/5rCgCpmWpU3x1jBE7", // Example link
    },
  ],
  gallery: [],
  contact: {
    whatsappNumbers: ["01712-050951"],
    phoneNumbers: ["01784-052339"],
    website: "www.populardiagnostic.com",
    facebook: "facebook.com/populardiagnostickhulna",
  },
  settings: {
    siteTitle: "Dr. Barkot Ali - Child Specialist Khulna",
    logo: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
    adminPassword: "Barkot Ali",
  },
};

// The document where all site data is stored in Firestore
const siteDataRef = doc(db, "site", "main");

/**
 * Fetches the site data from Firestore.
 * If no data is found, it returns the default data.
 */
export async function getData(): Promise<SiteData> {
  try {
    const docSnap = await getDoc(siteDataRef);
    if (docSnap.exists()) {
      const firestoreData = docSnap.data() as Partial<SiteData>;
      // Merge with default to ensure all fields are present
      return { ...DEFAULT_DATA, ...firestoreData };
    } else {
      console.log("No site data found in Firestore, using default data.");
      return DEFAULT_DATA;
    }
  } catch (error) {
    console.error("Error fetching site data from Firestore:", error);
    return DEFAULT_DATA;
  }
}

/**
 * Saves the entire site data object to Firestore.
 * @param data The complete site data to save.
 */
export async function setData(data: SiteData): Promise<void> {
  try {
    await setDoc(siteDataRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving site data to Firestore:", error);
    throw new Error("Failed to save data.");
  }
}

/**
 * Resets the site data in Firestore to the default values.
 */
export async function resetData(): Promise<void> {
  try {
    await setDoc(siteDataRef, DEFAULT_DATA);
  } catch (error) {
    console.error("Error resetting site data in Firestore:", error);
    throw new Error("Failed to reset data.");
  }
}

export function getDefaultData(): SiteData {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
