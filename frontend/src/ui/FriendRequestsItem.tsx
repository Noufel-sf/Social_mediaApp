import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useTheme } from "../Contexts/DarkModeContext";
import api from "../Utils/api";
import { useAuthStates } from "../ZustandStates/AuthStates";
import toast from "react-hot-toast";

export default function FriendRequestsItem({ friendRequest }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { CurrentUser } = useAuthStates();

  const handleAcceptRequest = async () => {
    if (!CurrentUser) return;

    try {
      await api.post(`/friends/request/accept/${friendRequest._id}`, {
        withCredentials: true,
      });

      toast.success("Friend request accepted");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeleteRequest = async () => {
    if (!CurrentUser) return;

    try {
      await api.post(`/friends/request/reject/${friendRequest._id}`, {
        withCredentials: true,
      });

      toast.success("Friend request rejected");
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 p-4 rounded-md shadow-md cursor-pointer ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={friendRequest.senderId.ProfileImg}
          alt="request userimg"
          className="rounded-full w-11"
        />
        <h1 className="text-xl capitalize font-bold">
          {friendRequest.senderId.username}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button text={t("accept")} onClick={handleAcceptRequest}></Button>
        <Button text={t("delete")} onClick={handleDeleteRequest}></Button>
      </div>
    </div>
  );
}
// #83ef
