
// src/lib/api.ts
import type { SiteData } from "./data";

export async function saveData(data: SiteData): Promise<void> {
  try {
    const response = await fetch("/api/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to save data to the server.");
    }
  } catch (error) {
    console.error("Error in saveData API call:", error);
    throw error; // Re-throw to be caught by the calling function
  }
}
