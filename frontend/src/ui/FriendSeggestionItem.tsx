import { useTranslation } from "react-i18next";
import { useTheme } from "../Contexts/DarkModeContext";
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
  const { theme } = useTheme();
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
    <div
      className={`flex flex-col gap-4 p-6 rounded-md shadow-md  ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-4">
        <Link to={`/userprofile/${friendSuggestion._id}`}>
          <div className="flex items-center gap-2">
            <img
              src={friendSuggestion.ProfileImg}
              alt="request userimg"
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-sm capitalize font-bold">
                {friendSuggestion.username}
              </h1>
              <h1 className="text-sm capitalize font-bold">
                {friendSuggestion.nickname}
              </h1>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2 bg-[var(--primary-color)] p-2 rounded-full ml-auto">
          <IoPersonAdd
            size={18}
            className="cursor-pointer"
            onClick={handleAddFriend}
          />
        </div>
      </div>
    </div>
  );
}
