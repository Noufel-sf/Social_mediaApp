import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useTheme } from "../Contexts/DarkModeContext";
import api from "../Utils/api";
import { IoPersonAdd } from "react-icons/io5";
import { useAuthStates } from "../ZustandStates/AuthStates";
import toast from "react-hot-toast";




export default function FriendSuggestionItem({ friendSuggestion }) {
  
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { CurrentUser } = useAuthStates();



  const handleAddFriend = async () => {
    if (!CurrentUser) return;
    try {
      console.log("adding friend request");
        await api.post(`/friends/request/send/${friendSuggestion.senderId._id}`, {
          userId: CurrentUser._id,
        });
      toast.success(t("friendRequestSent"));
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };



  return (
    <div
      className={`flex flex-col gap-4 p-6 rounded-md shadow-md  ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={friendSuggestion.senderId.ProfileImg}
          alt="request userimg"
          className="rounded-full w-11"
        />
        <div className="flex flex-col gap-1">

        <h1 className="text-sm capitalize font-bold">
          {friendSuggestion.senderId.username}
        </h1>
        <h1 className="text-sm capitalize font-bold">
          {friendSuggestion.senderId.nickname}
        </h1>
        </div>
        <div className="flex items-center gap-2 bg-[var(--primary-color)] p-2 rounded-full ml-auto">
          <IoPersonAdd size={18} className="cursor-pointer" onClick={handleAddFriend} />
        </div>
      </div>
    </div>
    );
  }
