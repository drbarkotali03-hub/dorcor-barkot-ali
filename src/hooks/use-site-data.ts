
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type SiteData, siteDataSchema, getDefaultSiteData } from "@/lib/data";
import { doc, getDoc, setDoc } from 'firebase/firestore';
// Correcting the import path to the single source of truth for Firebase
import { db } from "@/firebase";

const fetchSiteData = async (): Promise<SiteData> => {
  try {
    const docRef = doc(db, 'site', 'data');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No site data found in Firestore, returning default data.");
      return getDefaultSiteData();
    }

    const data = docSnap.data();
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
    // For errors, return default data to keep the site running.
    return getDefaultSiteData();
  }
};

const saveData = async (data: SiteData) => {
  try {
    // Ensure data is valid before saving
    const validatedData = siteDataSchema.parse(data);
    const docRef = doc(db, 'site', 'data');
    await setDoc(docRef, validatedData, { merge: true }); // Use set with merge to be safe
    return { success: true, message: 'Data saved successfully to Firestore.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to save data:', error);
    return { success: false, message: error.message || 'Failed to save data.' };
  }
};

const resetData = async () => {
  try {
    const defaultData = getDefaultSiteData();
    const docRef = doc(db, 'site', 'data');
    // Overwrite the document with the default data
    await setDoc(docRef, defaultData);
    return { success: true, message: 'Data reset to default successfully.' };
  } catch (error: any) {
    console.error('[Firestore Error] Failed to reset data:', error);
    return { success: false, message: error.message || 'Failed to reset data.' };
  }
};

export function useSiteData() {
  const queryClient = useQueryClient();

  const { data, ...rest } = useQuery({
    queryKey: ["site-data"],
    queryFn: fetchSiteData,
    // Stale-while-revalidate strategy
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });

  const saveMutation = useMutation({
    mutationFn: saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-data"] });
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-data"] });
    },
  });

  return {
    data: data || getDefaultSiteData(), // Ensure data is never undefined
    loading: rest.isLoading,
    error: rest.error,
    refetch: rest.refetch,
    saveData: saveMutation.mutateAsync,
    resetData: resetMutation.mutateAsync,
  };
}
