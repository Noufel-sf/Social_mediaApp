import { useTranslation } from "react-i18next";
import api from "../Utils/api";
import type { FriendRequest } from "../Utils/Types";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function FriendRequestsItem({ friendRequest }: { friendRequest: FriendRequest }) {

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
    <div className="flex flex-col gap-2.5 p-3 rounded-xl border transition-all bg-zinc-800/60 border-zinc-800 text-zinc-100">
      <div className="flex items-center gap-3">
        <img
          src={friendRequest.senderId.ProfileImg || "/user.png"}
          alt={friendRequest.senderId.username}
          className="rounded-full w-9 h-9 object-cover border border-slate-200 dark:border-zinc-700"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold capitalize truncate">
            {friendRequest.senderId.username}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">
            Wants to connect
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => acceptRequestMutation.mutate()}
          disabled={acceptRequestMutation.isPending || rejectRequestMutation.isPending}
          className="flex-1 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-50"
        >
          {acceptRequestMutation.isPending ? t("accepting...") : t("accept")}
        </button>

        <button
          onClick={() => rejectRequestMutation.mutate()}
          disabled={acceptRequestMutation.isPending || rejectRequestMutation.isPending}
          className="py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-50"
        >
          {rejectRequestMutation.isPending ? t("deleting...") : t("delete")}
        </button>
      </div>
    </div>
  );
}
