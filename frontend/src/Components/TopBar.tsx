import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputSearchItem from "../ui/InputSearchItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { MdDarkMode, MdLightMode, MdLogout, MdMenu, MdClose } from "react-icons/md";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const { CurrentUser, logout } = useAuthStates();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <section
      className={`border-b border-gray-200 ${theme == "light" ? "text-black" : "text-white"}`}
    >
      <div className="flex items-center justify-between py-4  px-5 gap-4">
        {/* === LEFT: Logo === */}
        <div className="flex items-center w-full justify-between">
          {/* Mobile menu toggle */}
          <Link to="/" className="flex gap-3 items-center">
            <img src="/logo.svg" alt="Logo" className=" w-38" />
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-3xl"
            aria-label="Open sidebar"
          >
            <MdMenu />
          </button>

        </div>

        {/* === CENTER: Search === */}
        {/* <div className="flex-1 hidden md:flex justify-center max-w-md">
          <InputSearchItem />
        </div> */}

        {/* === RIGHT (Desktop Only) === */}
        <ul className="hidden md:flex gap-5  items-center">
          <li>
            <LanguageSwitcher />
          </li>

          <li>
            <button
              onClick={toggleTheme}
              className="text-xl cursor-pointer bg-white text-[var(--primary-color)] py-2 px-2 rounded-full hover:opacity-80 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </li>

          {CurrentUser ? (
            <li className="flex items-center gap-3">
              <Link to={`/userprofile/${CurrentUser._id}`}>
                <img
                  className="cursor-pointer rounded-full w-22 h-11 object-cover border-2 border-[var(--primary-color)]"
                  src={CurrentUser.ProfileImg || "/user.png"}
                  alt={CurrentUser.username}
                />
              </Link>
              <button
                onClick={logout}
                className="capitalize text-xl font-bold cursor-pointer py-2 px-3 rounded-full text-[var(--primary-color)] bg-white hover:bg-gray-100 transition"
              >
                <MdLogout className="inline text-xl" />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button className="capitalize text-base font-bold cursor-pointer py-2 px-5 rounded-full text-white bg-[var(--primary-color)] hover:opacity-90 transition whitespace-nowrap">
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="capitalize text-base font-bold cursor-pointer py-2 px-5 rounded-full text-white bg-[var(--primary-color)] hover:opacity-90 transition whitespace-nowrap">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* === MOBILE SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--primary-color)] text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 flex flex-col p-6`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-3xl">
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
                  className="rounded-full w-11 h-11 object-cover border-2 border-white"
                  src={CurrentUser.ProfileImg || "/user.png"}
                  alt={CurrentUser.username}
                />
                <span className="capitalize font-semibold">{CurrentUser.username}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 w-full text-lg font-medium py-2 px-3 rounded-lg bg-white text-[var(--primary-color)]"
              >
                <MdLogout className="text-2xl" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" onClick={() => setSidebarOpen(false)}>
                <button className="w-full text-lg font-bold bg-white text-[var(--primary-color)] py-2 rounded-lg">
                  Log In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                <button className="w-full text-lg font-bold bg-white text-[var(--primary-color)] py-2 rounded-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 text-lg bg-white text-[var(--primary-color)] py-2 px-3 rounded-lg"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            <span>Toggle Theme</span>
          </button>

          <LanguageSwitcher />
        </div>
      </div>

      {/* === OVERLAY === */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </section>
  );
};

export default Topbar;
