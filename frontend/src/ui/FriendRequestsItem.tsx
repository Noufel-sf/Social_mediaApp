import React from 'react'
import { useTranslation } from "react-i18next";
import Button from './Button'
import { useTheme } from '../Contexts/DarkModeContext'

export  default function FriendRequestsItem({RequestUsername, RequestUserImg} : {RequestUsername:string , RequestUserImg:string}) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col gap-4 p-4 rounded-md shadow-md cursor-pointer ${theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"}`}>
        <div className="flex items-center gap-4">

        <img src={RequestUserImg} alt="request userimg" className='rounded-full w-11' />
        <h1 className='text-xl capitalize font-bold'>{RequestUsername}</h1>

        </div>
        <div className="flex items-center gap-2">
            <Button text={t('accept')}></Button>
            <Button text={t('delete')}></Button>
        </div>
    </div>
  )
}
// #83ef