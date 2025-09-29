import type { Post } from "../Utils/Types";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../ServisesApi/PostsApi";

function PostsList() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const postsToRender = posts ;
  console.log("Posts to render:", postsToRender);
  

  return (
    <div className="flex flex-col gap-2 items-center">
      {isLoading && <p>Loading posts...</p>}
      {isError && <p>Error loading posts, showing default.</p>}

      {postsToRender.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;
