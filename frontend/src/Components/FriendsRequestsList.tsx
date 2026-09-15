import type { FriendRequest } from "../Utils/Types";
import { useTranslation } from "react-i18next";
import FriendRequestsItem from "../ui/FriendRequestsItem";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../ServisesApi/FriendRequestApi";

export default function FriendsRequestsList() {
  const { t } = useTranslation();

  const {
    data: friendRequests = [],
    isLoading,
    isError,
  } = useQuery<FriendRequest[]>({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  if (!isLoading && friendRequests.length === 0) return null;

  // (Optional) Handle loading or error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center p-4">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-[var(--primary-color)] p-2">{t("errorLoadingRequests")}</p>
    );

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl shadow-xs border bg-zinc-900 border-zinc-800 text-zinc-100">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
          {t("requestsTitle")}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-medium">
          {friendRequests.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {friendRequests.map((request) => (
          <FriendRequestsItem key={request._id} friendRequest={request} />
        ))}
      </div>
    </div>
  );
}
