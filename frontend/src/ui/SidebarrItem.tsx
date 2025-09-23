import React from 'react'
import { Link } from 'react-router'
import { useTheme } from '../Contexts/DarkModeContext'

function SidebarrItem({icon, text, link} :{icon:React.ReactNode, text:string, link:string}) {
  const { theme } = useTheme();

  return (
    <Link to={link}>
    <div className={`flex items-center gap-2 cursor-pointer px-8 py-4 focus:border-r-[var(--primary-color)] ${theme === "dark" ? " text-white" : " text-black"}`}>
        {icon}
        <h2 className='text-2xl capitalize'>{text}</h2>
    </div>
    </Link>
  )
}

export default SidebarrItem