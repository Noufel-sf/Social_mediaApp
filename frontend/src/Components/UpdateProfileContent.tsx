import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { FiEdit } from "react-icons/fi";

export default function UpdateProfileDialogContent({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const { CurrentUser ,setCurrentUser } = useAuthStates();

  const [formData, setFormData] = useState({
    username: CurrentUser?.username || "",
    bio: CurrentUser?.bio || "",
  });

  const [preview, setPreview] = useState<string | null>(
    CurrentUser?.ProfileImg || null
  );
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  // Handle text inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setProfileImgFile(file);
    }
  };

  // Handle form submission
  const handleUpdateUserProfile = async () => {
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("bio", formData.bio);
      if (profileImgFile) {
        form.append("ProfileImg", profileImgFile);
      }

      const res = await api.put(`/auth/update/${CurrentUser?._id}`, form);

      console.log("✅ User updated:", res.data.user);
      setIsModalOpen(false);
      toast.success("Profile updated successfully");
      setCurrentUser(res.data.user);
      window.location.reload() ; 
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <img
            src={preview || "/user.png"}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/20 shadow-md"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-500 shadow-sm transition"
          >
            <FiEdit className="w-3.5 h-3.5" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-400">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your username"
          value={formData.username}
          onChange={handleInputChange} 
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-400">Bio</label>
        <textarea
          name="bio"
          placeholder="Tell something about yourself..."
          value={formData.bio}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleUpdateUserProfile}
        className="w-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold py-2.5 rounded-xl shadow-sm transition"
      >
        Save Changes
      </button>
    </div>
  );
}
