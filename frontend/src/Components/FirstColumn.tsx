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
    <div className="hidden lg:flex flex-col gap-8 md:w-1/4 lg:w-1/5 xl:w-1/5">
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
        className={`flex flex-col gap-2 rounded-2xl items-center ${
          theme === "dark" ? "bg-[#18181b]" : "bg-white"
        }`}
      >
        {SidebarrItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-300 p-2 rounded-lg w-full"
          >
            <SidebarrItem
              icon={item.icon}
              text={t(item.textKey)}
              link={item.link}
            />
          </div>
        ))}
      </div>

      {/* IMPORTANT: pass onClick (capital C) */}
      <Button text={t("createPost")} onClick={() => setShowAddpost(true)} />

      {showAddpost && <AddPostModel onClose={() => setShowAddpost(false)} />}
    </div>
  );
}

export default FirstColumn;
