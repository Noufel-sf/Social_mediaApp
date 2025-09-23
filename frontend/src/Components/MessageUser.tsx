import type { User } from "../Utils/Types";

const MessageUser = ({ user, lastMessage, isOnline }: { user: User; lastMessage: string; isOnline: boolean }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition">
      {/* Avatar */}
      <div className="relative">
        <img
          src={user.imageUrl}
          alt={user.Username}
          className="w-12 h-12 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-1 right-1 block w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold truncate">{user.Username}</h4>
        <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
      </div>
    </div>
  );
};

export default MessageUser;
