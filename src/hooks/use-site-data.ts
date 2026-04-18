
// src/hooks/use-site-data.ts
import { useState, useEffect, useCallback } from "react";
import { getData, type SiteData, getDefaultSiteData } from "@/lib/data";

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
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save data.");
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
