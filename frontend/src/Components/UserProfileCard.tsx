import type React from "react";
import { useTheme } from "../Contexts/DarkModeContext";
import { Link } from "react-router-dom";
import { useAuthStates } from "../ZustandStates/AuthStates";

type UserProfileCardProps = {
  imageUrl: string;
  Username: string;
  Usernickname: string;
  bannerUrl?: string;
  posts?: number;
  followers?: number;
  following?: number;
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  imageUrl,
  Username,
  Usernickname,
  bannerUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
  posts = 250,
  followers = 2022,
  following = 590,
}) => {
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();

  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        theme === "dark" ? "bg-[#18181b]" : "bg-white"
      } shadow-sm border ${
        theme === "dark" ? "border-gray-800" : "border-gray-100"
      }`}
    >
      {/* Banner */}
      <div className="relative h-24 w-full overflow-hidden">
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Avatar overlapping banner */}
      <div className="relative flex flex-col items-center -mt-12 pb-4">
        <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
          <img
            src={imageUrl}
            alt={Username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + handle */}
        <h3
          className={`mt-2 text-base font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {Username}
        </h3>
        <p className="text-xs text-gray-400">{Usernickname}</p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-4 w-full px-4">
          <div className="flex flex-col items-center">
            <p
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {posts}
            </p>
            <p className="text-[11px] text-gray-400">Post</p>
          </div>
          <div className="flex flex-col items-center">
            <p
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {followers}
            </p>
            <p className="text-[11px] text-gray-400">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {following}
            </p>
            <p className="text-[11px] text-gray-400">Following</p>
          </div>
        </div>

        {/* My Profile button */}
        <Link
        to={`/userprofile/${CurrentUser?._id}`}
        className="w-full px-4 mt-4">
          <button className="w-full bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] cursor-pointer text-white text-sm font-semibold py-2.5 rounded-full transition">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
