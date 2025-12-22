import React, { useState } from "react";
import { MdImage, MdVideocam, MdPoll, MdKeyboardArrowDown, MdEmojiEmotions } from "react-icons/md";
import { useTheme } from "../Contexts/DarkModeContext";

type PostComposerProps = {
  userAvatar?: string;
  onPost?: (content: string, privacy: string) => void;
};

const PostComposer: React.FC<PostComposerProps> = ({
  userAvatar = "/user.png",
}) => {
  const { theme } = useTheme();
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("Public");

 

  return (
    <div className={`rounded-2xl shadow-sm p-4 ${
      theme === "dark"
        ? "bg-[#18181b] shadow-gray-900"
        : "bg-white shadow-sm"
    }`}>
      {/* Top row: avatar + input */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userAvatar}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Share something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-full outline-none text-sm transition focus:ring-2 ${
              theme === "dark"
                ? "bg-[#27272a] text-white placeholder:text-gray-500 focus:ring-blue-900"
                : "bg-gray-50 placeholder:text-gray-400 focus:ring-blue-100"
            }`}
          />
          <button className={`absolute right-3 top-1/2 -translate-y-1/2 ${
            theme === "dark"
              ? "text-gray-500 hover:text-gray-300"
              : "text-gray-400 hover:text-gray-600"
          }`}>
            <MdEmojiEmotions className="text-xl" />
          </button>
        </div>
      </div>

      {/* Bottom row: media buttons + privacy */}
      <div className={`flex items-center justify-between pt-2 border-t ${
        theme === "dark" ? "border-gray-800" : "border-gray-100"
      }`}>
        <div className="flex items-center gap-1">
          <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
            theme === "dark"
              ? "hover:bg-[#27272a] text-gray-300"
              : "hover:bg-gray-50 text-gray-700"
          }`}>
            <MdImage className={`text-lg ${
              theme === "dark" ? "text-blue-500" : "text-blue-600"
            }`} />
            <span className="hidden sm:inline">Image</span>
          </button>
          <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
            theme === "dark"
              ? "hover:bg-[#27272a] text-gray-300"
              : "hover:bg-gray-50 text-gray-700"
          }`}>
            <MdVideocam className={`text-lg ${
              theme === "dark" ? "text-green-500" : "text-green-600"
            }`} />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
            theme === "dark"
              ? "hover:bg-[#27272a] text-gray-300"
              : "hover:bg-gray-50 text-gray-700"
          }`}>
            <MdPoll className={`text-lg ${
              theme === "dark" ? "text-purple-500" : "text-purple-600"
            }`} />
            <span className="hidden sm:inline">Poll</span>
          </button>
        </div>

        {/* Privacy dropdown */}
        <div className="relative">
          <button className={`flex items-center gap-1 px-3 py-2 rounded-lg transition text-sm ${
            theme === "dark"
              ? "hover:bg-[#27272a] text-gray-300"
              : "hover:bg-gray-50 text-gray-700"
          }`}>
            <span>🌍</span>
            <span>{privacy}</span>
            <MdKeyboardArrowDown className="text-base" />
          </button>
          {/* You can add a dropdown menu here */}
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
