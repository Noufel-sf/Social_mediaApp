import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useQueryClient } from "@tanstack/react-query";

export default function AddStoryContent({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      setIsModalOpen(false);
      setPreview(null);

    } catch (err) {
      console.error("❌ Failed to add story:", err);
      toast.error("Failed to add story");
    }
  };

  return (
    <div className="space-y-4">
      {/* Story Preview */}
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          {preview ? (
            <>
              {storyFile?.type.startsWith("video/") ? (
                <video
                  src={preview}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={preview}
                  alt="Story Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500 gap-2">
              <span className="text-3xl">📷</span>
              <span className="text-xs font-medium">Click the button below to upload photo or video</span>
            </div>
          )}

          <label
            htmlFor="story-upload"
            className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full cursor-pointer shadow-lg transition"
            title="Upload media"
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
      <div className="space-y-1">
        <textarea
          placeholder="Write a caption (optional)..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={2}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      {/* Add Story Button */}
      <button
        onClick={handleAddStory}
        className="w-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold py-2.5 rounded-xl shadow-sm transition"
      >
        Share Story
      </button>
    </div>
  );
}
