import type { FriendRequest } from "../Utils/Types";
import api from "../Utils/api";

export async function getFriendSuggestions(): Promise<FriendRequest[]> {
  const res = await api.get("friends/suggestions");
  return res.data.friendSuggestions;
}