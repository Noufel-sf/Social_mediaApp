import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useAuthStates } from "../ZustandStates/AuthStates";

export default function AddStoryContent({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const { CurrentUser } = useAuthStates();

  const [preview, setPreview] = useState<string | null>(null);
  const [storyFile, setStoryFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");


  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setStoryFile(file);
    }
  };
  

  const handleAddStory = async () => {
    if (!storyFile) {
      toast.error("Please select an image or video");
      return;
    }

    try {
      const form = new FormData();
      form.append("Author_id", CurrentUser?._id || "");
      form.append("caption", caption);
      form.append("storyFile", storyFile);

      await api.post("/stories/create", form);
      toast.success("✅ Story added successfully!");
      setIsModalOpen(false);
      setPreview(null);

    } catch (err) {
      console.error("❌ Failed to add story:", err);
      toast.error("Failed to add story");
    }
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Story Preview */}
      <div className="flex flex-col items-center p-4 ">
        <div className="relative w-full h-full">
          {preview ? (
            <>
              {storyFile?.type.startsWith("video/") ? (
                <video
                  src={preview}
                  controls
                  className="w-full h-full  object-cover border"
                />
              ) : (
                <img
                  src={preview}
                  alt="Story Preview"
                  className="w-full h-full rounded-lg object-cover "
                />
              )}
            </>
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center border text-gray-500">
              No Story
            </div>
          )}
          <label
            htmlFor="story-upload"
            className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-white p-2 rounded-full cursor-pointer hover:bg-[var(--secondary-color)]"
          >
            ➕
          </label>
          <input
            id="story-upload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Caption */}
      <textarea
        placeholder="Write a caption (optional)"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* Add Story Button */}
      <button
        onClick={handleAddStory}
        className="w-full bg-[var(--primary-color)] cursor-pointer text-white py-2 rounded"
      >
        Add Story
      </button>
    </div>
  );
}
