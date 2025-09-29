// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputSearchItem from "../ui/InputSearchItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";

// import { Button } from "../ui/button";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStates();
  console.log("user in topbar", user);
  
  const { t } = useTranslation();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <section
      className={`border-b border-gray-200 ${
        theme === "dark" ? " text-white" : " text-black"
      }`}
    >
      <div className="flex justify-between items-center py-6 px-5 gap-4">
        <Link to="/" className="flex gap-3 items-center flex-shrink-0">
          <h1 className="text-2xl md:text-3xl capitalize ">{t('social')}</h1>
        </Link>

        <div className="flex-1 flex justify-center max-w-md">
          <InputSearchItem />
        </div>

        <ul className="flex gap-5 items-center flex-shrink-0">
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="text-xl cursor-pointer bg-[var(--primary-color)] text-white py-2 px-2 rounded-full hover:text-gray-500 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </li>
      
          {user ? (
          <div className="flex items-center gap-3">
            <Link to={`/userprofile/${user._id}`}>
              <img
                className=" cursor-pointer rounded-full w-10"
                src={user.ProfileImg || "/profile-1.jpg"}
                alt={user.username}
              />
            </Link>
            <button
              onClick={logout}
              className="capitalize text-xl fonts font-bold cursor-pointer py-1 px-2 rounded-full text-white bg-[var(--primary-color)]"
            >
              <MdLogout className="inline text-xl" />
            </button>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
                  Log In
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="capitalize text-xl fonts font-bold cursor-pointer py-2 px-4 rounded-full text-white bg-[var(--primary-color)]">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}
        </ul>
      </div>
    </section>
  );
};

export default Topbar;
