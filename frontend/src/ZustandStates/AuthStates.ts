import { currentUser } from './../Utils/data';
import { create } from "zustand";
import api from "../Utils/api";
import type { User } from "../Utils/Types";
import toast from "react-hot-toast";


interface AuthState {
  CurrentUser: User | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  logout: () => Promise<void>;
  FetchCurrentUserData: () => Promise<User | null>;
}

export const useAuthStates = create<AuthState>((set) => ({
  CurrentUser: null,
  loading: false,

  setCurrentUser: (user) => {
    set({ CurrentUser: user });
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
       toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    set({ CurrentUser: null });
  },


  
  FetchCurrentUserData: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/currentuser", { withCredentials: true });
      set({ CurrentUser: res.data, loading: false });
      return res.data;
    } catch (err) {
      console.error("❌ Failed to fetch user:", err);
      set({ CurrentUser: null, loading: false });
    }
  },


}));