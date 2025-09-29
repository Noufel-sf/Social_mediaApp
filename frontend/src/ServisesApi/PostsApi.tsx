import type { Post } from "../Utils/Types";
import toast from "react-hot-toast";
import api from "../Utils/api";

export async function getPosts(): Promise<Post[]> {
  const res = await api.get("/api/posts/all"); // replace with your backend endpoint later
  toast.success("Posts fetched successfully!");
  return res.data;
}

