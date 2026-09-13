import type { Story } from "../Utils/Types";
import { useTheme } from "../Contexts/DarkModeContext";

interface StoryCardProps {
  story: Story;
  SeeStory?: () => void;
}

const StoryCard = ({ story, SeeStory }: StoryCardProps) => {
  const { theme } = useTheme();
  const image = story.storyFile || story.img || "/story.jpg";
  const username = story.author_id?.username || story.user?.Username || "User";

  return (
    <div
      className={`flex flex-col items-center cursor-pointer group flex-shrink-0 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
      onClick={SeeStory}
    >
      <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-blue-400 group-hover:scale-105 transition-transform">
        <img
          src={image}
          alt={username}
          className="w-full h-full object-cover rounded-full border-2 border-white"
        />
      </div>
      <p className="text-xs mt-1 truncate w-16 text-center">
        {username}
      </p>
    </div>
  );
};

export default StoryCard;
