import type { Story } from "../Utils/Types";
import StoryCard from "./StoryCard";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../ServisesApi/StoriesApi";
import { Storys } from "../Utils/data";

function StoriesList() {
  const { theme } = useTheme();

  const { data: stories, isLoading, isError } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  const storiesToRender = stories || Storys;

  // console.log(stories);

  const SeeStory = (id: string) => {
    console.log("Story clicked:", id);
  };

  return (
    <div
      className={`flex gap-2 overflow-x-auto p-4 border border-gray-300 rounded-xl ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-white"
          : "bg-white text-black"
      }`}
    >
      {isLoading && console.log("Loading stories...")}
      

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
