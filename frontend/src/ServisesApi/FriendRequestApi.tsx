import type { FriendRequest } from "../Utils/Types";
import api from "../Utils/api";

export async function getFriendRequests(): Promise<FriendRequest[]> {
  const res = await api.get("/api/friend-requests");
  return res.data;
}