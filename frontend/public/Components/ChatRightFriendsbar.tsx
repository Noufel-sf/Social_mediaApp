import React from "react";
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
  ShowMessages :boolean ;
  friendsError: boolean;
  selectedChatUser: User | null;
  setSelectedChatUser: (chat: User | null) => void;
}) => {

  return (
    <div className={ ` lg:flex flex-col w-full bg-[#18181b] md:w-1/4 p-5 lg:p-2 md:border-l `}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Chats</h2>
        <Edit2 className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      <div className="flex items-center gap-2 p-3 border-b">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Messenger"
          className="flex-1 text-sm outline-none border-none focus:ring-0"
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
}

