import type { Post } from "../Utils/Types";
import toast from "react-hot-toast";
import api from "../Utils/api";

export async function getPosts(): Promise<Post[]> {
  try {
    console.log("🔍 Fetching posts from /posts/all");
    const res = await api.get("/posts/all"); // Remove /api since it's already in the base URL
    console.log("📦 Posts response:", res.data);
    return res.data.posts;
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    toast.error("Failed to fetch posts");
    return [];
  }
}

