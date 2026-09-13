import type { Story } from "../Utils/Types";
import api from "../Utils/api";

export async function getStories(): Promise<Story[]> {
  
  try {
      const res = await api.get("/stories/all");
      return res.data;
  } catch (error) {
      // toast.error("Failed to fetch stories");
      throw new Error("Failed to fetch stories");
  }
  
};
