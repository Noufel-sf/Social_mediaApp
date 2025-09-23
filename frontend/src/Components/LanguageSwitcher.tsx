import { useTranslation } from "react-i18next";
import { MdLanguage } from 'react-icons/md';
import { useTheme } from '../Contexts/DarkModeContext';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Disable RTL - keep everything LTR
    // document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = "ltr"; // Force LTR always
    document.documentElement.lang = lng;
  };

  const currentLanguage = i18n.language;

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 text-2xl cursor-pointer hover:text-gray-500 transition"
        aria-label="Change language"
      >
        <MdLanguage />
        <span className="text-sm font-medium">
          {currentLanguage === 'ar' ? 'ع' : 'EN'}
        </span>
      </button>
      
      {/* Dropdown menu */}
      <div className={`absolute right-0 top-full mt-2 border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[130px] ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={() => changeLanguage('en')}
          className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left rounded-t-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-gray-100'
          } ${
            currentLanguage === 'en' 
              ? theme === 'dark' 
                ? 'bg-blue-900/20 text-blue-400' 
                : 'bg-blue-50 text-blue-600'
              : ''
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left rounded-b-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-gray-100'
          } ${
            currentLanguage === 'ar' 
              ? theme === 'dark' 
                ? 'bg-blue-900/20 text-blue-400' 
                : 'bg-blue-50 text-blue-600'
              : ''
          }`}
        >
          🇸🇦 العربية
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;