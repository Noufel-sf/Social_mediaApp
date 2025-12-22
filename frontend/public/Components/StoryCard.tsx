// components/StoryCard.jsx
import React from "react";
import { useTheme } from "../Contexts/DarkModeContext";

const StoryCard = ({ story, SeeStory}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center cursor-pointer group ${theme === "dark" ? "bg-[var(--dark-bg)] text-white" : "bg-white text-black"}`}
      onClick={SeeStory}
    >
      <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-blue-400 group-hover:scale-105 transition-transform">
        <img
          src={story.img}
          alt={story.user.Username}
          className="w-full h-full object-cover rounded-full border-2 border-white"
        />
       
      </div>
      <p className="text-xs  mt-1 truncate w-16 text-center">
        {story.user.Username}
      </p>
    </div>
  );
};

export default StoryCard;
