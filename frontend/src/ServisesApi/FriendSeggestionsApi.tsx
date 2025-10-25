import type { User } from "../Utils/Types";
import api from "../Utils/api";
import toast from "react-hot-toast";

export async function getFriendSuggestions(): Promise<User[]> {
  try {
    const res = await api.get("/friends/suggestions", { withCredentials: true });
    console.log("✅ Suggestion data received:", res.data);
    
    return res.data.friendSuggestions || [];
  } catch (error) {
    toast.error("Failed to fetch friend suggestions");
    return [];
  }
}