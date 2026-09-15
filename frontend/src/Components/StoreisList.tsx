import type { Story } from "../Utils/Types";
import StoryCard from "./StoryCard";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../ServisesApi/StoriesApi";

function StoriesList() {
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
      className="flex gap-4 overflow-x-auto p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xs no-scrollbar"
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
