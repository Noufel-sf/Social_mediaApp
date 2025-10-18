import type { FriendRequest } from "../Utils/Types";
import api from "../Utils/api";

export async function getFriendRequests(): Promise<FriendRequest[]> {
  const res = await api.get("friends/request/all");
  return res.data.friendRequests;
}