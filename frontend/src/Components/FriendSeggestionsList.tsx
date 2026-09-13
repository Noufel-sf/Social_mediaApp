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
  // console.log("friend suggestions from ", Suggestions);

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-2xl shadow-xs border ${
        theme === "dark"
          ? "bg-zinc-900 border-zinc-800 text-zinc-100"
          : "bg-white border-slate-200/80 text-slate-900"
      }`}
    >
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          {t("suggestionsTitle")}
        </h3>
        <span className="text-xs text-indigo-500 font-medium">{Suggestions.length}</span>
      </div>

      {isLoading && (
        <div className="flex justify-center p-4">
          <TailSpin
            height="32"
            width="32"
            color={"var(--primary-color)"}
            ariaLabel="loading"
          />
        </div>
      )}
      {isError && <p className="text-xs text-red-500">{t("errorLoadingRequests")}</p>}

      <div className="flex flex-col gap-2.5">
        {Suggestions.map((request) => (
          <FriendSuggestionItem key={request._id} friendSuggestion={request} />
        ))}
      </div>
    </div>
  );
}
