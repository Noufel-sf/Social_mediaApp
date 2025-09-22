// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputSearchItem from "../ui/InputSearchItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Contexts/DarkModeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// import { Button } from "../ui/button";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
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

        <ul className="flex gap-5 flex-shrink-0">
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="text-2xl  cursor-pointer hover:text-gray-500 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-[var(--primary-color)] px-4 py-2 hover:bg-[var(--secondary-color)] text-white font-medium rounded-full"
            >
              {t('login')}
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-[var(--primary-color)] px-4 py-2 hover:bg-[var(--secondary-color)] text-white font-medium rounded-full"
            >
              {t('signup')}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Topbar;
