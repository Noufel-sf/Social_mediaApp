import type { User } from "../Utils/Types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
// import { FriendRequests } from "../Utils/data";
import { getFriendSuggestions } from "../ServisesApi/FriendSeggestionsApi";
import FriendSuggestionItem from "../ui/FriendSeggestionItem";
import { TailSpin } from "react-loader-spinner";

export default function FriendSuggestionsList() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const {
    data: friendSuggestions,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["friendSuggestions"],
    queryFn: getFriendSuggestions,
  });

  const Suggestions = friendSuggestions || [];
  console.log("friend suggestions from ", Suggestions);

  return (
    <div
      className={`flex flex-col gap-4 ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl capitalize mb-2">{t("suggestionsTitle")}</h1>

      {isLoading && (
        <TailSpin
          height="50"
          width="50"
          color={"var(--primary-color)"}
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {isError && <p>{t("errorLoadingRequests")}</p>}

      <div className="flex flex-col gap-4">
        {Suggestions.map((request) => (
          <FriendSuggestionItem key={request._id} friendSuggestion={request} />
        ))}
      </div>
    </div>
  );
}
