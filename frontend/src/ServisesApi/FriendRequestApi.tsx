import type { FriendRequest } from "../Utils/Types";

import api from "../Utils/api";

export async function getFriendRequests(): Promise<FriendRequest[]> {
  const res = await api.get("/friends/all", {
  });
  return res.data.friendRequests;
}