
import { createServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { type SiteData, siteDataSchema, getDefaultSiteData } from "@/lib/data";
import admin from 'firebase-admin';

const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
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

  return admin.firestore();
};

const getSiteDataRef = () => {
  const db = initializeFirebaseAdmin();
  return db.collection('site').doc('data');
};

const fetchSiteData = createServerFn("GET", async (): Promise<SiteData> => {
  try {
    const doc = await getSiteDataRef().get();

    if (!doc.exists) {
      console.log("No site data found in Firestore, returning default data.");
      return getDefaultSiteData();
    }

    const data = doc.data();
    // Validate data against schema, return default on failure
    const parsed = siteDataSchema.safeParse(data);
    if (parsed.success) {
      return parsed.data;
    } else {
      console.warn("Firestore data validation failed, returning default data:", parsed.error);
      return getDefaultSiteData();
    }
  } catch (error) {
    console.error("Error fetching from Firestore:", error);
    // In case of a critical error (e.g., config issue), re-throw it so the client can see it.
    if (error instanceof Error && error.message.startsWith('CRITICAL:')) {
      throw error;
    }
    // For other errors, return default data to keep the site running.
    return getDefaultSiteData();
  }
});

const saveData = createServerFn("POST", async (data: SiteData) => {
  try {
    // Ensure data is valid before saving
    const validatedData = siteDataSchema.parse(data);
    await getSiteDataRef().set(validatedData, { merge: true }); // Use set with merge to be safe
    return { success: true, message: 'Data saved successfully to Firestore.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to save data:', error);
    return { success: false, message: error.message || 'Failed to save data.' };
  }
});

const resetData = createServerFn("POST", async () => {
  try {
    const defaultData = getDefaultSiteData();
    // Overwrite the document with the default data
    await getSiteDataRef().set(defaultData);
    return { success: true, message: 'Data reset to default successfully.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to reset data:', error);
    return { success: false, message: error.message || 'Failed to reset data.' };
  }
});

export function useSiteData() {
  const { data, ...rest } = useQuery({
    queryKey: ["site-data"],
    queryFn: async () => {
        const data = await fetchSiteData();
        return data
    },
    // Stale-while-revalidate strategy
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });

  return {
    data: data || getDefaultSiteData(), // Ensure data is never undefined
    saveData,
    resetData,
    ...rest,
  };
}
