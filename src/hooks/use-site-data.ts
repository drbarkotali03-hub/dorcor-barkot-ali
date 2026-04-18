
// src/hooks/use-site-data.ts
import { useState, useEffect, useCallback } from "react";
import { getData, type SiteData, getDefaultSiteData } from "@/lib/data";
import { saveData } from "@/lib/api"; // Import the new save function

export function useSiteData() {
  const [data, setLocalData] = useState<SiteData>(getDefaultSiteData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await getData();
      setLocalData(fetchedData);
    } catch (e) {
      setError("Failed to load site data. Please try again later.");
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [fetchData]);

  const updateData = useCallback(async (newData: SiteData) => {
    try {
      await saveData(newData); // Use the new API function
      setLocalData(newData); 
    } catch (e) {
      setError("Failed to save data. Please check your connection.");
      console.error(e);
      throw e; 
    }
  }, []);

  return { data, updateData, loading, error, refetch: fetchData };
}
