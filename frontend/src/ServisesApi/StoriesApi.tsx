import type { Story } from "../Utils/Types";
import api from "../Utils/api";
import toast from "react-hot-toast";

export async function getStories(): Promise<Story[]> {
  const res = await api.get("/api/stories");
  if (!res.ok) {
    toast.error("Failed to fetch stories");
    throw new Error("Failed to fetch stories");
  }
  return res.data;
}
