import React, { useEffect, useState } from "react";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { FaHeart } from "react-icons/fa6";

import type { Post } from "../Utils/Types";
import { useTheme } from "../Contexts/DarkModeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import DeletePostMenu from "./DeletePostMenu";
import "swiper/css";
import "swiper/css/navigation";
import { useAuthStates } from "../ZustandStates/AuthStates";

const PostCard = ({ post }: { post: Post }) => {
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();
  const [isLiked, setIsLiked] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const isPostOwner = CurrentUser?._id === post.Author._id; // Check if the current user is the author of the post

  return (
    <div
      dir="ltr"
      className={`rounded-xl shadow-sm w-full post-content ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 relative">
        <div className="flex items-center gap-3">
          <img
            src={post.Author.ProfileImg ? post.Author.ProfileImg : "/user.png"}
            alt={"post img"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {post.Author.username}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent menu from closing immediately because we have the custom hook that change the state immediately
            setShowDeletePost((prev) => !prev);
          }}
        >
          <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        {showDeletePost && isPostOwner && (
          <DeletePostMenu
            setShowDeleteMenu={setShowDeletePost}
            PostId={post._id}
          />
        )}
      </div>

      {post.PostCovers && post.PostCovers.length > 0 && (
        <div className="w-full max-h-[600px] overflow-hidden relative">
          {post.PostCovers.length === 1 ? (
            <>
              {post.PostCovers[0].endsWith(".mp4") ? (
                <video
                  src={post.PostCovers[0]}
                  controls
                  className="w-full max-h-[600px] object-contain "
                />
              ) : (
                <img
                  src={post.PostCovers[0]}
                  alt="post"
                  className="w-full max-h-[600px] object-contain "
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
                className="rounded-lg overflow-hidden"
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
                        className="w-full max-h-[600px] object-contain"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button className="swiper-button-prev-custom cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--primary-color)] z-10 text-white flex items-center justify-center">
                <BsChevronLeft />
              </button>
              <button className="swiper-button-next-custom cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--primary-color)] z-10 text-white flex items-center justify-center">
                <BsChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          {isLiked ? (
            <FaHeart className="text-red-600 w-6 h-6" onClick={() => setIsLiked(!isLiked)} />
          ) : (
            <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" onClick={() => setIsLiked(!isLiked)} />
          )}

          <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <Send className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
        </div>
        <Bookmark className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Likes */}

      <div className="px-4 text-sm font-semibold">{post.likes} likes</div>

      {/* Content */}
      <div className="px-4 py-2 text-sm">
        <span className="font-semibold mr-2">{post.Author.username}</span>
        {post.content}
      </div>

      {/* Comments */}
      
      {/* {post.comments?.length > 0 && (
        <div className="px-4 text-sm text-gray-500 cursor-pointer">
          View all {post.comments?.length} comments
        </div>
      )} */}

      {/* Timestamp */}
      <div className="px-4 py-2 text-xs text-gray-400">
        {new Date(post.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default PostCard;
