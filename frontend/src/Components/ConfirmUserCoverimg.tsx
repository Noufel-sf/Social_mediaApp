import React, { useState } from "react";
import api from "../Utils/api";
import toast from "react-hot-toast";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useQueryClient } from "@tanstack/react-query";

interface ConfirmUserCoverImgProps {
  onCancel: () => void;
  onSuccess?: (newCoverUrl: string) => void;
  showConfirmCoverimg: boolean;
  newCover: string | File | null;
  userId: string;
}

const ConfirmUserCoverImg: React.FC<ConfirmUserCoverImgProps> = ({
  onCancel,
  onSuccess,
  showConfirmCoverimg,
  newCover,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { setCurrentUser } = useAuthStates();
  const [loading, setLoading] = useState(false);

  if (!showConfirmCoverimg) return null;

  const handleConfirmCoverimg = async () => {
    if (!newCover) return;
    setLoading(true);

    const form = new FormData();
    form.append("CoverImg", newCover);

    try {
      const res = await api.put(`/auth/update/usercoverimg/${userId}`, form);
      const updatedUser = res.data.user;

      setCurrentUser(updatedUser);
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      await queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });

      toast.success("Cover photo updated successfully!");
      if (onSuccess && updatedUser?.CoverImg) {
        onSuccess(updatedUser.CoverImg);
      } else {
        onCancel();
      }
    } catch (err) {
      toast.error("Failed to update cover photo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-slate-900 dark:text-zinc-100 shadow-md border-b border-slate-200 dark:border-zinc-800 transition-colors animate-in fade-in slide-in-from-top duration-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-medium text-xs sm:text-sm">
          You have unsaved changes to your cover photo
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-3.5 py-1.5 cursor-pointer text-xs sm:text-sm font-medium rounded-lg border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmCoverimg}
            disabled={loading}
            className="px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUserCoverImg;


