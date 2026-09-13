import React, { useState } from "react";
import {
  MdImage,
  MdVideocam,
  MdPoll,
  MdKeyboardArrowDown,
  MdEmojiEmotions,
} from "react-icons/md";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { Link } from "react-router-dom";

type PostComposerProps = {
  userAvatar?: string;
  onPost?: (content: string, privacy: string) => void;
};

const PostComposer: React.FC<PostComposerProps> = ({
  userAvatar = "/user.png",
}) => {
  const [content, setContent] = useState("");
  const [privacy] = useState("Public");

  const { CurrentUser } = useAuthStates();

  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-xs">
      {/* Top row: avatar + input */}
      <div className="flex items-center gap-3 mb-3">
        <Link to={`/userprofile/${CurrentUser?._id}`} className="flex-shrink-0">
          <img
            src={userAvatar}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
          />
        </Link>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Share something with your community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-full outline-none text-sm transition bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 border border-transparent focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
            aria-label="Add emoji"
          >
            <MdEmojiEmotions className="text-xl" />
          </button>
        </div>
      </div>

      {/* Bottom row: media buttons + privacy */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-medium transition cursor-pointer">
            <MdImage className="text-base text-indigo-500" />
            <span>Image</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-medium transition cursor-pointer">
            <MdVideocam className="text-base text-emerald-500" />
            <span>Video</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-medium transition cursor-pointer">
            <MdPoll className="text-base text-amber-500" />
            <span>Poll</span>
          </button>
        </div>

        {/* Privacy badge */}
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition">
          <span>🌍</span>
          <span>{privacy}</span>
          <MdKeyboardArrowDown className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default PostComposer;
