import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";

function UserProfileCard({
  imageUrl,
  Username,
  Usernickname,
}: {
  imageUrl: string;
  Username: string;
  Usernickname: string;
}) {
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();

  return (
    <Link to={`/userprofile/${CurrentUser?._id}`}>
      <div
        className={`flex items-center gap-2 p-5 rounded-2xl cursor-pointer hover:bg-gray-300 transition duration-500 bg-[var(--primary-color)] ${
          theme === "dark" ? " text-white" : "bg-[#ffff] text-black"
        }`}
      >
        <img
          src={imageUrl}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-white">{Username}</h1>
          <h3 className="text-white">{Usernickname}</h3>
        </div>
      </div>
    </Link>
  );
}

export default UserProfileCard;
