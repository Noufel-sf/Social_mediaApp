import { useTranslation } from "react-i18next";
import api from "../Utils/api";
import type { User } from "../Utils/Types";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { useAuthStates } from "../ZustandStates/AuthStates";
import toast from "react-hot-toast";

export default function FriendSuggestionItem({
  friendSuggestion,
}: {
  friendSuggestion: User;
}) {
  const { t } = useTranslation();
  const { CurrentUser } = useAuthStates();



  const handleAddFriend = async () => {
    if (!CurrentUser) return;
    try {
      console.log("adding friend request");
      await api.post(`/friends/send/${friendSuggestion._id}`, {
        userId: CurrentUser._id,
      });
      toast.success(t("friendRequestSent"));
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error("error Adding Friend");
    }
  };



  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border transition-all bg-zinc-800/60 border-zinc-800 text-zinc-100 hover:border-zinc-700">
      <Link
        to={`/userprofile/${friendSuggestion._id}`}
        className="flex items-center gap-3 min-w-0 group"
      >
        <img
          src={friendSuggestion.ProfileImg || "/user.png"}
          alt={friendSuggestion.username}
          className="rounded-full w-9 h-9 object-cover flex-shrink-0 border border-zinc-700 group-hover:scale-105 transition-transform"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold truncate group-hover:text-indigo-400 transition-colors">
            {friendSuggestion.username}
          </span>
          <span className="text-[11px] text-zinc-500 truncate">
            {friendSuggestion.nickname?.startsWith('@') ? friendSuggestion.nickname : `@${friendSuggestion.nickname || friendSuggestion.username}`}
          </span>
        </div>
      </Link>

      <button
        onClick={handleAddFriend}
        title="Add Friend"
        className="flex-shrink-0 p-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
      >
        <IoPersonAdd size={15} />
      </button>
    </div>
  );
}
