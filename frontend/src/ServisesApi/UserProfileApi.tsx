import type { User } from "../Utils/Types";
import api from "../Utils/api";

export const getUserProfilePageData = async (id: string): Promise<User> => {
  const { data } = await api.get(`/auth/${id}`);
  return data.user;
};
