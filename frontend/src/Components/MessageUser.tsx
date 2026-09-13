
const MessageUser = ({ user, lastMessage, isOnline }: { user: any; lastMessage: string; isOnline: boolean }) => {
  const avatar = user.imageUrl || user.ProfileImg || "/user.png";
  const displayName = user.Username || user.username || "User";

  return (
    <div className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={avatar}
          alt={displayName}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold truncate text-slate-800 dark:text-zinc-200">{displayName}</h4>
        <p className="text-[11px] text-slate-400 dark:text-zinc-400 truncate">{lastMessage}</p>
      </div>
    </div>
  );
};

export default MessageUser;
