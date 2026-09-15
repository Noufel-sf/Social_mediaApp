import type { Story } from "../Utils/Types";

interface StoryCardProps {
  story: Story;
  SeeStory?: () => void;
}

const StoryCard = ({ story, SeeStory }: StoryCardProps) => {
  const image = story.storyFile || story.img || "/story.jpg";
  const username = story.author_id?.username || story.user?.Username || "User";

  return (
    <div
      className="flex flex-col items-center cursor-pointer group flex-shrink-0"
      onClick={SeeStory}
    >
      <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 group-hover:scale-105 transition-all shadow-xs">
        <img
          src={image}
          alt={username}
          className="w-full h-full object-cover rounded-full border-2 border-zinc-900"
        />
      </div>
      <p className="text-xs mt-1.5 font-medium truncate w-18 text-center text-zinc-300 group-hover:text-indigo-400 transition-colors">
        {username}
      </p>
    </div>
  );
};

export default StoryCard;
