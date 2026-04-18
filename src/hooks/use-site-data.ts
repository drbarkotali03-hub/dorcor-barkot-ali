
// src/hooks/use-site-data.ts
import { useState, useEffect, useCallback } from "react";
import { getData, type SiteData, getDefaultSiteData } from "@/lib/data";
// CORRECT: Import the RPC function directly. The framework handles the client/server boundary.
import { newSaveDataToServer } from "@/lib/firebase.server";

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
    fetchData();
  }, [fetchData]);

  const updateData = useCallback(async (newData: SiteData) => {
    try {
      // CORRECT: Directly call the server function. No more fetch!
      const result = await newSaveDataToServer(newData);
      if (!result.success) {
        throw new Error(result.message);
      }
      setLocalData(newData);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to save data: ${errorMessage}`);
      console.error(e);
      throw e;
    }
  }, []);

  return { data, updateData, loading, error, refetch: fetchData };
}
