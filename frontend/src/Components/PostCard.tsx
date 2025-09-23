// components/PostCard.jsx
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import type { Post } from "../Utils/Types";
import { useTheme } from "../Contexts/DarkModeContext";


const PostCard = ({ post }: { post: Post }) => {
  const { theme } = useTheme();

  return (
    <div dir="ltr" className={`rounded-xl shadow-sm w-full post-content ${theme === "dark" ? "bg-[var(--dark-bg)] text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={post.Author.imageUrl}
            alt={post.Author.Username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{post.Author.Username}</span>
            <span className="text-xs text-gray-500">{new Date(post.createdAt).toDateString()}</span>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      {/* Image */}
      {post.imgUrl && (
        <div className="w-full max-h-[600px] overflow-hidden">
          <img
            src={post.imgUrl}
            alt="post"
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <Send className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
        </div>
        <Bookmark className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Likes */}
      {post.likes > 0  && (
        <div className="px-4 text-sm font-semibold">{post.likes} likes</div>
      )}

      {/* Content */}
      <div className="px-4 py-2 text-sm">
        <span className="font-semibold mr-2">{post.Author.Username}</span>
        {post.content}
      </div>

      {/* Comments */}
      {post.comments > 0 && (
        <div className="px-4 text-sm text-gray-500 cursor-pointer">
          View all {post.comments} comments
        </div>
      )}

      {/* Timestamp */}
      <div className="px-4 py-2 text-xs text-gray-400">
        {new Date(post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default PostCard;
