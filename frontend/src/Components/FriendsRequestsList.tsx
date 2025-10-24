import type { FriendRequest } from "../Utils/Types";
import { useTranslation } from "react-i18next";
import FriendRequestsItem from "../ui/FriendRequestsItem";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../ServisesApi/FriendRequestApi";

export default function FriendsRequestsList() {
  const { theme } = useTheme();
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
    <div
      className={`flex flex-col gap-2 ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl capitalize">{t("requestsTitle")}</h1>

      <div className="flex flex-col gap-4">
        {friendRequests.map((request) => (
          <FriendRequestsItem key={request._id} friendRequest={request} />
        ))}
      </div>
    </div>
  );
}
