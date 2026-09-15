import { Link, useNavigate } from "react-router-dom";
import InputSearchItem from "../ui/InputSearchItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuthStates } from "../ZustandStates/AuthStates";
import {
  MdLogout,
  MdHome,
  MdChat,
} from "react-icons/md";

const Topbar = () => {
  const { CurrentUser, logout } = useAuthStates();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 transition-colors duration-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* LEFT: Logo + Search */}
        <div className="flex items-center gap-4 flex-1">
          <Link to="/" className="flex gap-2.5 items-center group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent sm:block">
              CozMeet
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:block flex-1 max-w-xs">
            <InputSearchItem />
          </div>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="flex items-center gap-1.5">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-zinc-200 hover:text-indigo-400 hover:bg-zinc-800/80 transition-colors"
          >
            <MdHome className="text-xl" />
            <span className="hidden md:inline text-sm font-semibold">Feed</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-zinc-200 hover:text-indigo-400 hover:bg-zinc-800/80 transition-colors"
          >
            <MdChat className="text-xl" />
            <span className="hidden md:inline text-sm font-semibold">Chat</span>
          </Link>
        </nav>

        {/* RIGHT: Actions + User */}
        <div className="flex items-center gap-2.5">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* User section */}
          {CurrentUser ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-800">
              <Link
                to={`/userprofile/${CurrentUser._id}`}
                className="flex items-center gap-2 p-1 pr-2 sm:pr-3 rounded-full hover:bg-zinc-800 transition"
              >
                <img
                  className="rounded-full w-8 h-8 object-cover border border-indigo-500/40"
                  src={CurrentUser.ProfileImg || "/user.png"}
                  alt={CurrentUser.username}
                />
                <span className="hidden sm:block text-sm font-semibold text-zinc-200">
                  {CurrentUser.username}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer justify-center w-9 h-9 rounded-xl hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 transition"
                aria-label="Logout"
                title="Logout"
              >
                <MdLogout className="text-lg" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="text-sm font-medium px-4 py-2 rounded-xl text-zinc-200 hover:bg-zinc-800 transition cursor-pointer">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm font-medium px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-xs cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
