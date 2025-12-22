import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import type { User } from '../Utils/Types'




function ChatFriends({ userFriends, friendsLoading, friendsError, selectedChatUser, setSelectedChatUser }: {
  userFriends: User[],
  friendsLoading: boolean,
  friendsError: boolean,
  selectedChatUser: User | null,
  setSelectedChatUser: (friend: User) => void
}) {


  return (
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto p-3">
            {friendsLoading && (
              <div className="flex justify-center items-center h-full">
                <TailSpin height="40" width="40" color="var(--primary-color)" />
              </div>
            )}
            {friendsError && (
              <p className="text-center text-red-500">Failed to load friends</p>
            )}
            {userFriends.map((friend: User) => (
              <div
                key={friend._id}
                className={`flex items-center gap-3 rounded-2xl p-3 cursor-pointer hover:bg-black ${
                  selectedChatUser?._id === friend._id
                    ? "bg-[var(--primary-color)]"
                    : ""
                }`}
                onClick={() => setSelectedChatUser(friend)}
              >
                <img
                  src={friend.ProfileImg}
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{friend.username}</p>
                </div>
              </div>
            ))}
          </div>
  )
}

export default ChatFriends