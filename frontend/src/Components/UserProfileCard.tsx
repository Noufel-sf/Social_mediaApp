import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../Contexts/DarkModeContext'

function UserProfileCard({imageUrl , Username , Usernickname } : {imageUrl :string , Username  :string, Usernickname :string}) {
  const { theme } = useTheme();

  return (
    <Link to={`/userprofile`}>
    <div className={`flex items-center gap-2 p-5 rounded-2xl cursor-pointer hover:bg-gray-300 transition duration-500 bg-[var(--primary-color)] ${theme === "dark" ? " text-white" : "bg-[#ffff] text-black"}`}>
        <img src={imageUrl} alt="profile" className='w-10 h-10 rounded-full' />
        <div className="flex flex-col gap-2">
            <h1 className='text-white' >{Username}</h1>
            <h3 className='text-white'>{Usernickname}</h3>
        </div>
    </div>
    </Link>
  )
}

export default UserProfileCard  