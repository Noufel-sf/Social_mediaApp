import React from "react";
import api from "../Utils/api";
import toast from "react-hot-toast";
import { useAuthStates } from "../ZustandStates/AuthStates";

interface ConfirmUserCoverImgProps {
  onCancel: () => void;
  showConfirmCoverimg: boolean;
  newCover: string | File | null;
  userId: string;
}

const ConfirmUserCoverImg: React.FC<ConfirmUserCoverImgProps> = ({
  onCancel,
  showConfirmCoverimg,
  newCover,
  userId
}) => {

    const { CurrentUser, setCurrentUser } = useAuthStates();

  if (!showConfirmCoverimg) return null;




const handleConfirmCoverimg = async () => {
  if (!newCover) return;

  const form = new FormData();
  form.append("CoverImg", newCover);

  try {
    const res = await api.put(`/auth/update/usercoverimg/${userId}`, form);

    const updatedUser = res.data.user;

    setCurrentUser(updatedUser);
    console.log("current user after cover update", CurrentUser );
    
    toast.success("✅ Cover photo updated");
    onCancel(); 
  } catch (err) {
    toast.error("Failed to update cover");
    console.error(err);
  }
};



  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#242526] text-white shadow-md border-b border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-medium text-sm sm:text-base">
          You have unsaved changes to your cover photo
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 cursor-pointer text-sm rounded-md border border-gray-500 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmCoverimg}
            className="px-3 py-1.5 text-sm rounded-md bg-[var(--primary-color)] cursor-pointer text-white transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUserCoverImg;


