import { create } from "zustand";
import api from "../Utils/api";
import type { User } from "../Utils/Types";
import toast from "react-hot-toast";


interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  FetchCurrentUserData: () => Promise<void>;
}

export const useAuthStates = create<AuthState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => {
    set({ user });
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
       toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    set({ user: null });
  },

  FetchCurrentUserData: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/me", { withCredentials: true });
      set({ user: res.data.user, loading: false });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      set({ user: null, loading: false });
    }
  },
}));
