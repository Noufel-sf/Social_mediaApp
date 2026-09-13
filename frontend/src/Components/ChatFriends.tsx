import { TailSpin } from 'react-loader-spinner'
import type { User } from '../Utils/Types'

function ChatFriends({
  userFriends,
  friendsLoading,
  friendsError,
  selectedChatUser,
  setSelectedChatUser,
}: {
  userFriends: User[];
  friendsLoading: boolean;
  friendsError: boolean;
  selectedChatUser: User | null;
  setSelectedChatUser: (friend: User) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1">
      {friendsLoading && (
        <div className="flex justify-center items-center h-32">
          <TailSpin height="30" width="30" color="var(--primary-color)" />
        </div>
      )}
      {friendsError && (
        <p className="text-center text-xs text-rose-500 py-4">Failed to load friends</p>
      )}
      {userFriends.map((friend: User) => {
        const isSelected = selectedChatUser?._id === friend._id;
        return (
          <div
            key={friend._id}
            className={`flex items-center gap-3 rounded-xl p-2.5 cursor-pointer transition-all ${
              isSelected
                ? "bg-indigo-600 text-white shadow-xs"
                : "hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-slate-800 dark:text-zinc-200"
            }`}
            onClick={() => setSelectedChatUser(friend)}
          >
            <div className="relative flex-shrink-0">
              <img
                src={friend.ProfileImg}
                alt={friend.username}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{friend.username}</p>
              <p className={`text-xs truncate ${isSelected ? "text-indigo-100" : "text-slate-400 dark:text-zinc-400"}`}>
                {friend.nickname || `@${friend.username.toLowerCase()}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatFriends;