import type React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../Contexts/DarkModeContext'

function SidebarrItem({icon, text, link} :{icon:React.ReactNode, text:string, link:string}) {
  const { theme } = useTheme();

  return (
    <Link to={link} className="w-full">
      <div
        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 group font-medium text-sm ${
          theme === "dark"
            ? "text-zinc-200 hover:text-white hover:bg-zinc-800/80"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
        }`}
      >
        <span className="text-xl text-slate-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {icon}
        </span>
        <span className="capitalize tracking-tight">{text}</span>
      </div>
    </Link>
  )
}

export default SidebarrItem