// src/api/friends.ts
import api from "../Utils/api";

export async function getFriends() {
  const res = await api.get("/friends/list", { withCredentials: true });
  return res.data.friends;
}


