
import { doc, getDoc, setDoc } from "firebase/firestore";
import { z } from "zod";
import { db } from "@/firebase";

const REPO_URL = "https://github.com/drbarkotali03-hub/dorcor-barkot-ali";

export const siteDataSchema = z.object({
  doctor: z.object({
    name: z.string(),
    title: z.string(),
    bmdc: z.string(),
    imageUrl: z.string().url(),
    intro: z.string(),
  }),
  qualifications: z.array(z.string()),
  memberships: z.array(z.string()),
  services: z.array(z.string()),
  experience: z.array(z.string()).optional(), // Made optional for safety
  chambers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      address: z.string(),
      schedule: z.array(z.string()),
      phones: z.array(z.string()),
      hotline: z.string().optional(),
      website: z.string().optional(),
      facebook: z.string().optional(),
      mapQuery: z.string(),
      googleMapsLink: z.string().url().optional(),
      embedMapLink: z.string().url().optional(),
    })
  ),
  gallery: z.array(
    z.object({
      id: z.string(),
      imageUrl: z.string().url(),
      caption: z.string(),
    })
  ),
  contact: z.object({
    whatsappNumbers: z.array(z.string()),
    phoneNumbers: z.array(z.string()),
    website: z.string().url(),
    facebook: z.string().url(),
  }),
  settings: z.object({
    siteTitle: z.string(),
    logo: z.string().url(),
    adminPassword: z.string(),
  }),
});

export type SiteData = z.infer<typeof siteDataSchema>;
export type Chamber = SiteData["chambers"][0];
export type GalleryItem = SiteData["gallery"][0];

export function getDefaultSiteData(): SiteData {
  return {
    doctor: {
      name: "Professor Dr. Md. Barkot Ali",
      title: "MBBS, FCPS (Pediatrics), MD (Neonatology)",
      bmdc: "A-28256",
      imageUrl: `https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png`,
      intro:
        "Dr. Md. Barkot Ali is a distinguished Child Specialist with extensive experience in pediatrics and neonatology. He is dedicated to providing the highest quality care for children, from newborns to adolescents. With a focus on compassionate and comprehensive treatment, Dr. Ali ensures the well-being of every child he sees.",
    },
    qualifications: [
      "MBBS - Sher-e-Bangla Medical College",
      "FCPS (Pediatrics) - Bangladesh College of Physicians and Surgeons (BCPS)",
      "MD (Neonatology) - Bangabandhu Sheikh Mujib Medical University (BSMMU)",
      `Fellow, Newborn Medicine - Royal Alexandra Hospital, Edmonton, Canada`,
    ],
    memberships: [
      "Bangladesh Medical & Dental Council (BMDC)",
      "Bangladesh Pediatric Association (BPA)",
      "Bangladesh Neonatal Forum (BNF)",
      "American Academy of Pediatrics (AAP)",
    ],
    services: [
      "Newborn Care",
      "Child & Adolescent Treatment",
      "Vaccination & Immunization",
      "Fever & Infection Treatment",
      "Growth Monitoring",
      "Nutrition Advice",
    ],
    experience: [],
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
        googleMapsLink: "https://maps.app.goo.gl/u5Kzv5Gz8jCHaQd56",
        embedMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.8344265934503!2d89.5398363759914!3d22.844937222855584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9aac91a55555%3A0x15a6b5870425010e!2sKhadija%20Villa!5e0!3m2!1sen!2sbd!4v1713432791459!5m2!1sen!2sbd",
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
        googleMapsLink: "https://maps.app.goo.gl/5rCgCpmWpU3x1jBE7",
        embedMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.669527923759!2d89.55393937599049!3d22.81439992524385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff901b351de589%3A0x6331a9b89ce32918!2sPopular%20Diagnostic%20Centre%2C%20Khulna!5e0!3m2!1sen!2sbd!4v1713432864708!5m2!1sen!2sbd",
      },
    ],
    gallery: [],
    contact: {
      whatsappNumbers: ["01712-050951"],
      phoneNumbers: ["01784-032951"],
      website: new URL(REPO_URL).hostname,
      facebook: "facebook.com/drbarkotali",
    },
    settings: {
      siteTitle: "Dr. Barkot Ali - Child Specialist Khulna",
      logo: `https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png`,
      adminPassword: "Barkot Ali",
    },
  };
}

const docRef = doc(db, "site", "data");

export async function getData(): Promise<SiteData> {
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return siteDataSchema.parse(data);
    } else {
      console.log("No data available, returning default data.");
      return getDefaultSiteData();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return getDefaultSiteData();
  }
}

export async function setData(data: SiteData): Promise<void> {
  try {
    const validatedData = siteDataSchema.parse(data);
    await setDoc(docRef, validatedData, { merge: true });
  } catch (error) {
    console.error("Validation failed or error setting data:", error);
    throw error;
  }
}
