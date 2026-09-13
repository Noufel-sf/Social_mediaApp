import Button from "../ui/Button";
import { SidebarrItems } from "../Utils/data";
import SidebarrItem from "../ui/SidebarrItem";
import UserProfileCard from "./UserProfileCard";
import { useTheme } from "../Contexts/DarkModeContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddPostModel from "./AddPostModel";
import { useAuthStates } from "../ZustandStates/AuthStates";

function FirstColumn() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [showAddpost, setShowAddpost] = useState(false);
  const { CurrentUser } = useAuthStates();

  return (
    <div className="hidden lg:flex flex-col gap-6 md:w-1/4 lg:w-1/5 xl:w-1/5">
      <UserProfileCard
        imageUrl={CurrentUser?.ProfileImg || "/user.png"}
        Username={CurrentUser?.username || "Default User"}
        Usernickname={CurrentUser?.nickname || "@default"}
        bannerUrl={CurrentUser?.CoverImg || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80"}
        posts={250}
        followers={2022}
        following={590}
      />

      <div
        className={`flex flex-col gap-1 p-2 rounded-2xl shadow-xs border ${
          theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200/80"
        }`}
      >
        {SidebarrItems.map((item) => (
          <SidebarrItem
            key={item.id}
            icon={item.icon}
            text={t(item.textKey)}
            link={item.link}
          />
        ))}
      </div>

      {/* Create post button */}
      <Button text={t("createPost")} onClick={() => setShowAddpost(true)} />

      {showAddpost && <AddPostModel onClose={() => setShowAddpost(false)} />}
    </div>
  );
}

export default FirstColumn;
