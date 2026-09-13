import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useTheme } from '../Contexts/DarkModeContext';

function InputSearchItem() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="relative w-full hidden md:block">
      <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-lg pointer-events-none" />
      <input 
        type="text" 
        placeholder={t('search')} 
        className={`w-full py-2 pl-10 pr-4 text-xs font-normal rounded-full border outline-none transition-colors ${
          theme === "dark" 
            ? "bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500" 
            : "bg-slate-100 border-slate-200/80 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white"
        }`} 
      />
    </div>
  )
}

export default InputSearchItem