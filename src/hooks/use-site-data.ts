
import { createServerFn, useQuery } from "@tanstack/react-start";
import { type SiteData, siteDataSchema, getDefaultSiteData } from "@/lib/data";
import { getSiteDataRef, saveDataToServer, resetDataOnServer } from "@/lib/firebase.server";

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
  return saveDataToServer(data);
});

const resetData = createServerFn("POST", async () => {
  return resetDataOnServer();
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
