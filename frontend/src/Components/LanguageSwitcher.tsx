import { useTranslation } from "react-i18next";
import { MdLanguage } from 'react-icons/md';
import { useTheme } from '../Contexts/DarkModeContext';
import { useEffect } from 'react';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  // Set initial font based on current language
  useEffect(() => {
    const currentLang = i18n.language;
    if (currentLang === "ar") {
      document.documentElement.classList.add("ArabicFont");
      document.documentElement.classList.remove("EnglishFont");
    } else {
      document.documentElement.classList.add("EnglishFont");
      document.documentElement.classList.remove("ArabicFont");
    }
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Set document direction
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    
    // Apply font based on language
    if (lng === "ar") {
      document.documentElement.classList.add("ArabicFont");
      document.documentElement.classList.remove("EnglishFont");
    } else {
      document.documentElement.classList.add("EnglishFont");
      document.documentElement.classList.remove("ArabicFont");
    }
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
      <div className={`absolute right-0 top-full mt-2 border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px] overflow-hidden ${
        theme === 'dark' 
          ? 'bg-zinc-900 border-zinc-800 text-zinc-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <button
          onClick={() => changeLanguage('en')}
          className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium w-full text-left transition-colors cursor-pointer ${
            theme === 'dark' 
              ? 'hover:bg-zinc-800' 
              : 'hover:bg-slate-100'
          } ${
            currentLanguage === 'en' 
              ? theme === 'dark' 
                ? 'bg-indigo-950/40 text-indigo-400 font-semibold' 
                : 'bg-indigo-50 text-indigo-600 font-semibold'
              : ''
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium w-full text-left transition-colors cursor-pointer ${
            theme === 'dark' 
              ? 'hover:bg-zinc-800' 
              : 'hover:bg-slate-100'
          } ${
            currentLanguage === 'ar' 
              ? theme === 'dark' 
                ? 'bg-indigo-950/40 text-indigo-400 font-semibold' 
                : 'bg-indigo-50 text-indigo-600 font-semibold'
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