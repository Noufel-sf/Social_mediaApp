import api from "../Utils/api";
import type { Message } from "../Utils/Types";

export const getMessages = async (receiverId: string): Promise<Message[]> => {
  const res = await api.get(`/messages/${receiverId}`);
  return res.data;
};
