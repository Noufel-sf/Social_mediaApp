import type React from 'react'
import { Link } from 'react-router-dom'

function SidebarrItem({icon, text, link} :{icon:React.ReactNode, text:string, link:string}) {

  return (
    <Link to={link} className="w-full">
      <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 group font-medium text-sm text-zinc-200 hover:text-white hover:bg-zinc-800/80">
        <span className="text-xl text-zinc-400 group-hover:text-indigo-400 transition-colors">
          {icon}
        </span>
        <span className="capitalize tracking-tight">{text}</span>
      </div>
    </Link>
  )
}

export default SidebarrItem