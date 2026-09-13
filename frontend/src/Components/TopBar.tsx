import { useState } from "react";
import { Link } from "react-router-dom";
import InputSearchItem from "../ui/InputSearchItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";
import {
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdMenu,
  MdClose,
  MdHome,
  MdChat,
} from "react-icons/md";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const { CurrentUser, logout } = useAuthStates();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <section
      className={` border-b-2  py-4 ${
        theme === "light"
          ? " text-black border-gray-200"
          : " text-white border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between py-3 px-4 md:px-6 lg:px-8  mx-auto">
        {/* LEFT: Logo + Search */}
        <div className="flex items-center gap-4 flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
            <h1 className="capitalize font-bold text-lg  sm:block">
              CozMeet
            </h1>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-xs">
            <InputSearchItem />
          </div>
        </div>

        {/* CENTER: Navigation Icons (Desktop only) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 text-[var(--primary-color)] transition"
          >
            <MdHome className="text-xl" />
            <span className="hidden lg:inline text-sm font-semibold">Home</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            <MdChat className="text-xl" />
          </Link>
         
        </nav>

        {/* RIGHT: Actions + User */}
        <div className="flex items-center gap-3">
          {/* Language switcher - desktop only */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Theme toggle - desktop only */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center w-9 h-9 cursor-pointer rounded-full hover:bg-gray-100 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-xl" />
            ) : (
              <MdDarkMode className="text-xl" />
            )}
          </button>

          {/* User section */}
          {CurrentUser ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to={`/userprofile/${CurrentUser._id}`}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <img
                  className="rounded-full w-9 h-9 object-cover border-2 border-gray-200"
                  src={CurrentUser.ProfileImg || "/user.png"}
                  alt={CurrentUser.username}
                />
                <span className="hidden lg:block text-sm font-semibold">
                  {CurrentUser.username}
                </span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center cursor-pointer justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
                aria-label="Logout"
              >
                <MdLogout className="text-xl text-[var(--primary-color)]" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <button className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-2xl"
            aria-label="Open sidebar"
          >
            <MdMenu />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          theme === "light" ? "bg-white" : "bg-[#18181b]"
        } transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 flex flex-col p-6 shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl">
            <MdClose />
          </button>
        </div>

        <div className="space-y-6">
          {CurrentUser ? (
            <div className="flex flex-col gap-4">
              <Link
                to={`/userprofile/${CurrentUser._id}`}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  className="rounded-full w-11 h-11 object-cover border-2 border-gray-300"
                  src={CurrentUser.ProfileImg || "/user.png"}
                  alt={CurrentUser.username}
                />
                <span className="capitalize font-semibold">
                  {CurrentUser.username}
                </span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="flex items-center cursor-pointer gap-2 w-full text-sm font-medium py-2 px-3 rounded-lg bg-[var(--primary-color)] hover:bg-gray-200 transition"
              >
                <MdLogout className="text-xl" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setSidebarOpen(false)}>
                <button className="w-full text-sm font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                  Log In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                <button className="w-full text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 text-sm py-2 px-3 rounded-lg hover:bg-gray-100 transition"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-xl text-[var(--primary-color)]" />
            ) : (
              <MdDarkMode className="text-xl text-purple-500" />
            )}
            <span>Toggle Theme</span>
          </button>

          <LanguageSwitcher />
          <Link to="messages" onClick={() => setSidebarOpen(false)}>
            <button className="w-full flex items-center gap-2 text-sm py-2 px-3 rounded-lg hover:bg-gray-100 transition">
              <MdChat className="text-xl" />
              <span>Messages</span>
            </button>
          </Link>
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </section>
  );
};

export default Topbar;
