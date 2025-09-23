import type { Post } from "../Utils/Types";
import toast from "react-hot-toast";
import api from "../Utils/api";

export async function getPosts(): Promise<Post[]> {
  const res = await api.get("/api/posts"); // replace with your backend endpoint later
    if (!res.ok) {
        toast.error("Failed to fetch posts");
    }
  return res.data;
}
