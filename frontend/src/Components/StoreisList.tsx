import type { Story } from "../Utils/Types";
import StoryCard from "./StoryCard";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../ServisesApi/StoriesApi";

function StoriesList() {
  const { theme } = useTheme();

  const { data: stories } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  const storiesToRender = stories || [];

  const SeeStory = (id: string) => {
    console.log("Story clicked:", id);
  };

  return (
    <div
      className={`flex gap-3 overflow-x-auto p-4 border rounded-xl no-scrollbar ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      {storiesToRender.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
          SeeStory={() => SeeStory(story._id)}
        />
      ))}
    </div>
  );
}

export default StoriesList;
