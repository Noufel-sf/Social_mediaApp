import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useTheme } from '../Contexts/DarkModeContext';

function InputSearchItem() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="relative w-full hidden md:block">
      <IoIosSearch className="absolute left-2 top-3" />
      <input 
        type="text" 
        placeholder={t('search')} 
        className={`border border-gray-200 outline-none rounded-full w-full p-2 pl-8 ${theme === "dark" ? "bg-[var(--dark-bg)] text-white" : "bg-white text-black"}`} 
      />
    </div>
  )
}

export default InputSearchItem