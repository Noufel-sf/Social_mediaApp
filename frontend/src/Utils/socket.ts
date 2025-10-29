// src/Utils/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      withCredentials: true,
      query: { userId }, // send user ID to backend
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket manually disconnected");
  }
};

export const getSocket = () => socket;
