// src/hooks/use-site-data.ts
import { useState, useEffect, useCallback } from "react";
import { getData, setData, type SiteData, getDefaultData } from "@/lib/data";

export function useSiteData() {
  const [data, setLocalData] = useState<SiteData>(getDefaultData());
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
    fetchData();
  }, [fetchData]);

  const updateData = useCallback(async (newData: SiteData) => {
    try {
      await setData(newData);
      setLocalData(newData); // Update local state immediately after successful save
    } catch (e) {
      setError("Failed to save data. Please check your connection.");
      console.error(e);
      // Optionally, you might want to revert the local state or show an error message
      throw e; // Re-throw the error to be caught by the caller if needed
    }
  }, []);

  return { data, updateData, loading, error, refetch: fetchData };
}
