import { Edit2, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MessageUser from "./MessageUser";
import { Messages } from '../Utils/data'

const MessagesList = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-sm rounded-2xl shadow-xs border overflow-hidden transition-colors bg-zinc-900 border-zinc-800 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-800/70">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
          {t('messagesTitle')}
        </h2>
        <Link to="/messages" className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 transition">
          <Edit2 className="w-4 h-4 cursor-pointer" />
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
          <Search className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          <input
            type="text"
            placeholder={t('searchMessages')}
            className="w-full text-xs outline-none bg-transparent text-zinc-200 placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-1.5 text-xs text-zinc-400 border-b border-zinc-800/50">
        <span className="font-semibold text-indigo-400">Primary</span>
        <button className="hover:text-zinc-200 transition cursor-pointer">
          {t('requests')} (7)
        </button>
      </div>

      {/* Messages */}
      <div className="divide-y divide-zinc-800/60 max-h-[360px] overflow-y-auto">
        {Messages.map((msg: any) => (
          <Link key={msg.id} to="/messages" className="block">
            <MessageUser lastMessage={msg.lastMessage} isOnline={msg.isOnline} user={msg.user}/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
