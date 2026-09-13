import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useTheme } from "../Contexts/DarkModeContext";
import api from "../Utils/api";
import type { FriendRequest } from "../Utils/Types";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function FriendRequestsItem({ friendRequest }: { friendRequest: FriendRequest }) {

  const { theme } = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const acceptRequestMutation = useMutation({
    mutationFn: async () => {
      await api.put(
        `/friends/accept/${friendRequest._id}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Friend request accepted");
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friendsList"] });
    },
    onError: (error) => {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept friend request");
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async () => {
      await api.put(
        `/friends/reject/${friendRequest._id}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Friend request rejected");
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
    onError: (error) => {
      console.error("Error rejecting friend request:", error);
      toast.error("Failed to reject friend request");
    },
  });



  return (
    <div
      className={`flex flex-col gap-4 p-4 rounded-md shadow-md cursor-pointer ${
        theme === "dark"
          ? "bg-[#18181b] text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={friendRequest.senderId.ProfileImg}
          alt="request userimg"
          className="rounded-full w-11 h-11 object-cover"
        />
        <h1 className="text-xl capitalize font-bold">
          {friendRequest.senderId.username}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          text={
            acceptRequestMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                {t("accepting...")}
              </span>
            ) : (
              t("accept")
            )
          }
          onClick={() => acceptRequestMutation.mutate()}
          disabled={acceptRequestMutation.isPending || rejectRequestMutation.isPending}
        />

        <Button
          text={
            rejectRequestMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                {t("deleting...")}
              </span>
            ) : (
              t("delete")
            )
          }
          onClick={() => rejectRequestMutation.mutate()}
          disabled={acceptRequestMutation.isPending || rejectRequestMutation.isPending}
        />
      </div>
    </div>
  );
}
