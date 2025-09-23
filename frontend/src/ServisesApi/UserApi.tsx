import axios from "axios";
import type { User } from "../Utils/Types";
import api from "../Utils/api";

export const GetUserProfileDetailsById = async (id: string): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
