import type React from "react";
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
  const { CurrentUser } = useAuthStates();

  return (
    <div className="rounded-2xl overflow-hidden shadow-xs border transition-colors bg-zinc-900 border-zinc-800">
      {/* Banner */}
      <div className="relative h-24 w-full overflow-hidden bg-zinc-800">
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Avatar overlapping banner */}
      <div className="relative flex flex-col items-center -mt-12 pb-4">
        <div className="w-20 h-20 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-md">
          <img
            src={imageUrl}
            alt={Username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + handle */}
        <h3 className="mt-2 text-base font-bold text-zinc-100">
          {Username}
        </h3>
        <p className="text-xs text-zinc-400">{Usernickname}</p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-4 w-full px-4">
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-white">
              {posts}
            </p>
            <p className="text-[11px] text-zinc-400">Post</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-white">
              {followers}
            </p>
            <p className="text-[11px] text-zinc-400">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-white">
              {following}
            </p>
            <p className="text-[11px] text-zinc-400">Following</p>
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
