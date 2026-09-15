import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";

function InputSearchItem() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full hidden md:block">
      <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-lg pointer-events-none" />
      <input 
        type="text" 
        placeholder={t('search')} 
        className="w-full py-2 pl-10 pr-4 text-xs font-normal rounded-full border outline-none transition-colors bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500" 
      />
    </div>
  )
}

export default InputSearchItem