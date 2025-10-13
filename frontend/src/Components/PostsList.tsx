import type { Post } from "../Utils/Types";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../ServisesApi/PostsApi";
import { Posts } from "../Utils/data";

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
  console.log("Query state - Loading:", isLoading, "Error:", isError);
  

  return (
    <div className="flex flex-col gap-2 items-center">
      {isLoading && <p>Loading posts...</p>}
      {isError && <p>Error loading posts, showing default.</p>}
      {!isLoading && !isError && postsToRender.length === 0 && (
        <p>No posts available.</p>
      )}

      {postsToRender.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;
