import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import type { Post } from "../Utils/Types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import DeletePostMenu from "./DeletePostMenu";
import "swiper/css";
import "swiper/css/navigation";
import { useAuthStates } from "../ZustandStates/AuthStates";

const PostCard = ({ post }: { post: Post }) => {
  const { CurrentUser } = useAuthStates();
  const [isLiked, setIsLiked] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const isPostOwner = CurrentUser?._id === post.Author._id;

  const baseLikes =
    typeof post.likes === "number"
      ? post.likes
      : Array.isArray(post.likes)
      ? post.likes.length
      : 0;
  const currentLikes = isLiked ? baseLikes + 1 : baseLikes;

  return (
    <div
      dir="ltr"
      className="rounded-2xl shadow-xs w-full overflow-hidden transition-all duration-200 border bg-zinc-900 border-zinc-800 text-zinc-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 relative">
        <Link
          to={`/userprofile/${post.Author._id}`}
          className="flex items-center gap-3 group"
        >
          <img
            src={post.Author.ProfileImg ? post.Author.ProfileImg : "/user.png"}
            alt={post.Author.username}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {post.Author.username}
            </span>
            <span className="text-xs text-slate-400 dark:text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </Link>

        {isPostOwner && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeletePost((prev) => !prev);
            }}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            aria-label="Post options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}

        {showDeletePost && isPostOwner && (
          <DeletePostMenu
            setShowDeleteMenu={setShowDeletePost}
            PostId={post._id}
          />
        )}
      </div>

      {/* Media / Post Covers */}
      {post.PostCovers && post.PostCovers.length > 0 && (
        <div className="w-full max-h-[600px] overflow-hidden relative bg-black/40">
          {post.PostCovers.length === 1 ? (
            <>
              {post.PostCovers[0].endsWith(".mp4") ? (
                <video
                  src={post.PostCovers[0]}
                  controls
                  className="w-full max-h-[600px] object-contain mx-auto"
                />
              ) : (
                <img
                  src={post.PostCovers[0]}
                  alt="post cover"
                  className="w-full max-h-[600px] object-cover mx-auto"
                />
              )}
            </>
          ) : (
            <div className="relative">
              <Swiper
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation]}
                className="overflow-hidden"
              >
                {post.PostCovers.map((cover: string, idx: number) => (
                  <SwiperSlide key={idx} className="flex justify-center">
                    {cover.endsWith(".mp4") ? (
                      <video
                        src={cover}
                        controls
                        className="w-full max-h-[600px] object-contain"
                      />
                    ) : (
                      <img
                        src={cover}
                        alt={`post-${idx}`}
                        className="w-full max-h-[600px] object-cover"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button className="swiper-button-prev-custom cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs z-10 text-white flex items-center justify-center transition">
                <BsChevronLeft />
              </button>
              <button className="swiper-button-next-custom cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs z-10 text-white flex items-center justify-center transition">
                <BsChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1.5 focus:outline-none transition group"
            aria-label="Like post"
          >
            {isLiked ? (
              <FaHeart className="text-rose-500 w-5 h-5 animate-pulse" />
            ) : (
              <Heart className="w-5 h-5 text-slate-500 dark:text-zinc-400 group-hover:text-rose-500 transition-colors" />
            )}
          </button>

          <button
            className="text-slate-500 dark:text-zinc-400 hover:text-indigo-500 transition-colors"
            aria-label="Comments"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          <button
            className="text-slate-500 dark:text-zinc-400 hover:text-indigo-500 transition-colors"
            aria-label="Share"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <button
          className="text-slate-500 dark:text-zinc-400 hover:text-indigo-500 transition-colors"
          aria-label="Bookmark"
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-4 text-xs font-semibold text-zinc-300">
        {currentLikes.toLocaleString()} likes
      </div>

      {/* Post Text Content */}
      <div className="px-4 py-2 text-sm leading-relaxed">
        <Link
          to={`/userprofile/${post.Author._id}`}
          className="font-bold mr-2 text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          {post.Author.username}
        </Link>
        <span className="text-zinc-200 whitespace-pre-wrap">
          {post.content}
        </span>
      </div>

      {/* Timestamp */}
      <div className="px-4 pb-3 pt-1 text-[11px] text-zinc-500">
        {new Date(post.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default PostCard;
