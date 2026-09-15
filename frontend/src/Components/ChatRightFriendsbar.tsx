import { Edit2, Search } from "lucide-react";
import ChatFriends from "./ChatFriends";
import type { User } from "../Utils/Types";

export const ChatRightFriendsbar = ({
  userFriends,
  friendsLoading,
  friendsError,
  selectedChatUser,
  setSelectedChatUser,
}: {
  userFriends: User[];
  friendsLoading: boolean;
  ShowMessages: boolean;
  friendsError: boolean;
  selectedChatUser: User | null;
  setSelectedChatUser: (chat: User | null) => void;
}) => {
  return (
    <div className="lg:flex flex-col w-full md:w-80 p-3 bg-zinc-900 md:border-l border-zinc-800 transition-colors">
      <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-800">
        <h2 className="text-base font-bold tracking-tight text-zinc-100">
          Direct Messages
        </h2>
        <Edit2 className="w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer transition-colors" />
      </div>

      <div className="flex items-center gap-2 px-3 py-2 my-2 bg-zinc-800/80 rounded-xl">
        <Search className="w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="flex-1 text-xs outline-none bg-transparent text-zinc-200 placeholder:text-zinc-500"
        />
      </div>

      <ChatFriends
        userFriends={userFriends}
        friendsLoading={friendsLoading}
        friendsError={friendsError}
        selectedChatUser={selectedChatUser}
        setSelectedChatUser={setSelectedChatUser}
      />
    </div>
  );
};
