import React, { useRef } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useClickOutside } from "../hooks/useClickOutside";
import { useQueryClient } from "@tanstack/react-query";

interface DeletePostMenuProps {
  setShowDeleteMenu: React.Dispatch<React.SetStateAction<boolean>>;
  PostId: string;
}

export default function DeletePostMenu({
  setShowDeleteMenu,
  PostId,
}: DeletePostMenuProps) {
  const queryClient = useQueryClient();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setShowDeleteMenu(false));

  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/delete/${PostId}`);
      toast.success("Post deleted successfully");
      setShowDeleteMenu(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-2 mt-2 w-40 rounded-xl shadow-xl border border-zinc-800 bg-zinc-900 text-zinc-100 top-1 z-50 transition-all duration-150 ease-out transform origin-top overflow-hidden"
    >
      <button
        onClick={handleDeletePost}
        className="w-full cursor-pointer text-left px-4 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition"
      >
        Delete Post
      </button>
      <button
        onClick={() => setShowDeleteMenu(false)}
        className="w-full cursor-pointer text-left px-4 py-2.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition"
      >
        Cancel
      </button>
    </div>
  );
}
