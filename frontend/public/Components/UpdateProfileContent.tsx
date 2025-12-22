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
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-white p-2 rounded-full cursor-pointer hover:bg-[var(--secondary-color)]"
          >
            <FiEdit />
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
      <input
        type="text"
        name="username"
        placeholder="Full name"
        value={formData.username}
        onChange={handleInputChange} 
        className="w-full border p-2 rounded border-gray-300 text-black"
      />

      {/* Bio */}
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleInputChange}
        className="w-full border p-2 rounded border-gray-300 text-black"
      />

      {/* Save Button */}
      <button
        onClick={handleUpdateUserProfile}
        className="w-full bg-[var(--primary-color)] cursor-pointer text-white py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
