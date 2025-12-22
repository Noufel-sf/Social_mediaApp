import type { Post } from "../Utils/Types";
import PostCard from "./PostCard";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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

  const postsToRender = posts || []; // Provide fallback empty array

  // console.log("Posts to render:", postsToRender);
  // console.log("Query state - Loading:", isLoading, "Error:", isError);

  // {isLoading && <Spinner />}

  return (
    <div className="flex flex-col gap-2 items-center">
      {/* {isLoading && (
        <TailSpin
          height="80"
          width="100"
          color={"var(--primary-color)"}
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      )} */}
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
