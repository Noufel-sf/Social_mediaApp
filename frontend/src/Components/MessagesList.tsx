import { Edit2, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import MessageUser from "./MessageUser";
import { Messages } from '../Utils/data'
import { useTheme } from "../Contexts/DarkModeContext";



const MessagesList = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`w-full max-w-sm ${theme === "dark" ? "bg-[#18181b] text-white" : "bg-white"} rounded-2xl shadow-md border-gray-100 overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-500">
        <h2 className="text-lg font-bold">{t('messagesTitle')}</h2>
        <Edit2 className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 p-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={t('searchMessages')}
          className="flex-1 text-sm outline-none border-none focus:ring-0"
        />
      </div>

      {/* Tabs (only Requests) */}
      <div className="flex gap-4 px-4  text-sm">
        <button className="text-gray-500 hover:text-black">{t('requests')}(7)</button>
      </div>

      {/* Messages */}
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {Messages.map((msg: any) => (
          <MessageUser key={msg.id} lastMessage={msg.lastMessage} isOnline={msg.isOnline} user={msg.user}/>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
