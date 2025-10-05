import React, { useRef } from "react";
import { useTheme } from "../Contexts/DarkModeContext";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useClickOutside } from "../hooks/useClickOutside";

interface DeletePostMenuProps {
  setShowDeleteMenu: React.Dispatch<React.SetStateAction<boolean>>;
  PostId: string;
}

export default function DeletePostMenu({
  setShowDeleteMenu,
  PostId,
}: DeletePostMenuProps) {
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setShowDeleteMenu(false));

  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/delete/${PostId}`);
      toast.success("Post deleted successfully");
      setShowDeleteMenu(false);
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div
      ref={menuRef}
      className={`absolute right-2 mt-2 w-40 rounded-lg shadow-lg border top-1 z-50 transition-all duration-150 ease-out transform origin-top ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <button
        onClick={handleDeletePost}
        className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 transition"
      >
        Delete Post
      </button>
      <button
        onClick={() => setShowDeleteMenu(false)}
        className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Cancel
      </button>
    </div>
  );
}
