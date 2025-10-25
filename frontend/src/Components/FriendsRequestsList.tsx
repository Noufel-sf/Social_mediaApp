import type { FriendRequest } from "../Utils/Types";
import { useTranslation } from "react-i18next";
import FriendRequestsItem from "../ui/FriendRequestsItem";
import { FriendRequests } from "../Utils/data";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../ServisesApi/FriendRequestApi";

export default function FriendsRequestsList() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const {
    data: friendRequests,
    isLoading,
    isError,
  } = useQuery<FriendRequest[]>({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  console.log(isError);
  const requests =  friendRequests || [];
  console.log("friend requests from ", requests);
  

  return (
    <div
      className={`flex flex-col gap-2 ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl capitalize">{t('requestsTitle')}</h1>

      {isLoading && <p>{t('loadingRequests')}</p>}
      {isError && <p>{t('errorLoadingRequests')}</p>}

      <div className="flex flex-col gap-4">
        {requests.map((request) => (
          <FriendRequestsItem
            key={request._id}
            friendRequest={request}
          />
        ))}
      </div>
    </div>
  );
}
