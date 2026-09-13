import { useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaImage, FaVideo } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import toast from "react-hot-toast";
import api from "../Utils/api";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQueryClient } from "@tanstack/react-query";

type AddPostModelProps = {
  onClose: () => void;
};

export default function AddPostModel({ onClose }: AddPostModelProps) {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();

  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };
  const Author = CurrentUser ? CurrentUser._id : "";

  
  const CreatePost = async (
    content: string,
    files: File[],
    Author: string
  ) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("Author", Author);
    console.log("formData before files ", formData);

    files.forEach((file) => {
      formData.append("PostCovers", file);
    });

    try {
      console.log("sending data ", formData);
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await api.post("/posts/create", formData, {
        withCredentials: true,
        headers: {},
      });
      toast.success("Your post is on the main page!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Post added successfully", response.data);
    } catch (err) {
      console.error("Error adding post:", err);
      toast.error("Failed to add post");
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && files.length === 0) return;

    CreatePost(content, files, Author);
    setContent("");
    setFiles([]);
    onClose();
  };

  return (
  <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}>
       {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      <div
        className={`relative ${
          theme === "dark" ? "bg-[var(--dark-bg)] text-white" : "bg-white"
        } w-full max-w-xl rounded-lg shadow-lg z-10`}
      >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h2 className="font-semibold text-lg">Create a post</h2>
          <button
            onClick={onClose}
            className="text-xl hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 p-2 rounded-full transition"
          >
            <FiX />
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={CurrentUser ? CurrentUser.ProfileImg || "/profile-1.jpg" : "/profile-1.jpg"}
            alt={CurrentUser?.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium">{CurrentUser?.username}</span>
            <span className="text-sm text-gray-500">Post to Anyone</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitPost} className="px-4 flex flex-col">
          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full min-h-[120px] border-none outline-none resize-none text-lg bg-transparent"
          />

          {files.length > 0 && (
            <div className="px-0 py-3">
              {files.length === 1 ? (
                <>
                  {files[0].type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt={files[0].name}
                      className="max-h-72 w-auto rounded-lg object-contain mx-auto"
                    />
                  )}
                  {files[0].type.startsWith("video/") && (
                    <video
                      src={URL.createObjectURL(files[0])}
                      controls
                      className="max-h-72 w-auto rounded-lg object-contain mx-auto"
                    />
                  )}
                </>
              ) : (
                <div className="relative">
                  <Swiper
                    navigation={{
                      nextEl: ".swiper-button-next-custom",
                      prevEl: ".swiper-button-prev-custom",
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    modules={[Navigation]}
                    className="max-h-72 rounded-lg overflow-hidden"
                  >
                    {files.map((file, idx) => {
                      const previewUrl = URL.createObjectURL(file);
                      return (
                        <SwiperSlide key={idx} className="flex justify-center">
                          {file.type.startsWith("image/") && (
                            <img
                              src={previewUrl}
                              alt={file.name}
                              className="max-h-72 w-full object-contain"
                            />
                          )}
                          {file.type.startsWith("video/") && (
                            <video
                              src={previewUrl}
                              controls
                              className="max-h-72 w-full object-contain"
                            />
                          )}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>

                  {/* Navigation Buttons */}
                  <button className="swiper-button-prev-custom cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--primary-color)] z-10 text-white flex items-center justify-center">
                    <BsChevronLeft />
                  </button>
                  <button className="swiper-button-next-custom cursor-pointer bg-[var(--primary-color)] absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full z-10 text-white flex items-center justify-center">
                    <BsChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <button
                type="button"
                className="hover:text-[var(--primary-color)] transition"
              >
                <HiOutlineEmojiHappy className="text-xl" />
              </button>

              <label className="cursor-pointer hover:text-[var(--primary-color)] transition">
                <FaImage className="text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <label className="cursor-pointer hover:text-[var(--primary-color)] transition">
                <FaVideo className="text-xl" />
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!content.trim() && files.length === 0}
              className="flex items-center cursor-pointer gap-2 bg-[var(--primary-color)] text-white px-5 py-2 rounded-full font-medium hover:bg-[var(--secondary-color)] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post <FiSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
