import { create } from "zustand";
import api from "../Utils/api";
import { mockDb } from "../Utils/mockDb";
import type { User } from "../Utils/Types";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../Utils/socket";

interface AuthState {
  CurrentUser: User | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  logout: () => Promise<void>;
  FetchCurrentUserData: () => Promise<User | null>;
}

export const useAuthStates = create<AuthState>((set) => ({
  CurrentUser: null,
  loading: true,

  setCurrentUser: (user) => {
    set({ CurrentUser: user });
    if (user?._id) {
      connectSocket(user._id); // connect socket after login
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      mockDb.logout();
      disconnectSocket();
      set({ CurrentUser: null, loading: false });
      toast.success("Logged out successfully");
    }
  },

  FetchCurrentUserData: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/currentuser", { withCredentials: true });
      if (!res.data || !res.data._id) {
        set({ CurrentUser: null, loading: false });
        disconnectSocket();
        return null;
      }

      set({ CurrentUser: res.data, loading: false });

      if (res.data?._id) {
        connectSocket(res.data._id); // reconnect on refresh
      }

      return res.data;
    } catch {
      set({ CurrentUser: null, loading: false });
      disconnectSocket();
      return null;
    }
  },
}));
