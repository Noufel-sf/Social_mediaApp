import { Search, Edit2, Info, Phone, Video, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { chats, currentUser } from "../Utils/data";
import Topbar from "../Components/TopBar";
import { useTheme } from "../Contexts/DarkModeContext";

const MessengerPage = () => {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const { theme } = useTheme();
  return (
    <div
      className={`w-full h-screen flex flex-col gap-4 px-12 py-3 ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <Topbar />
      <div className="flex flex-col md:flex-row md:justify-between gap-8  h-screen w-full">
        {/* === LEFT SIDEBAR (Chat Details) === */}
        <div className="hidden lg:flex flex-col  border-r p-4 w-1/4">
          {selectedChat && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={selectedChat.user.avatar}
                  alt={selectedChat.user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="mt-2 font-semibold">{selectedChat.user.name}</h2>
                <span className="text-xs text-green-500">Active now</span>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button className="p-2 bg-gray-100 rounded-full">🔍</button>
                <button className="p-2 bg-gray-100 rounded-full">🔔</button>
                <button className="p-2 bg-gray-100 rounded-full">⚙️</button>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <details className="cursor-pointer">
                  <summary className="font-medium">Chat Info</summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium">Customize Chat</summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium">Media, Files</summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium">Privacy & Support</summary>
                </details>
              </div>
            </>
          )}
        </div>

        {/* === MIDDLE (Chat Window) === */}
        <div className="flex flex-col w-full">
          {/* Chat header */}
          {selectedChat && (
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="font-semibold text-3xl">
                  {selectedChat.user.name}
                </h2>
                <span className="text-xs text-green-500">Active now</span>
              </div>
              <div className="flex gap-3 text-gray-600">
                <Info className="w-5 h-5 cursor-pointer" />
                <Phone className="w-5 h-5 cursor-pointer" />
                <Video className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedChat?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.senderId === currentUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                    msg.senderId === currentUser.id
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t">
            <input
              type="text"
              placeholder="Aa"
              className="flex-1 px-3 py-2 rounded-full border outline-none text-sm"
            />
            <button className="text-[var(--primary-color)]">GIF</button>
            <button className="text-[var(--primary-color)]">😊</button>
            <button className="text-[var(--primary-color)]">
              <ThumbsUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* === RIGHT SIDEBAR (Chats List) === */}
        <div className="hidden lg:flex flex-col w-1/4 border-l">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Chats</h2>
            <Edit2 className="w-5 h-5 text-gray-600 cursor-pointer" />
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 p-3 border-b">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Messenger"
              className="flex-1 text-sm outline-none border-none focus:ring-0"
            />
          </div>

          {/* Chat list */}
          <div className="hidden flex-col gap-3 flex-1 lg:flex overflow-y-auto p-3">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 rounded-2xl p-3 cursor-pointer hover:bg-black ${
                  selectedChat?.id === chat.id
                    ? "bg-[var(--primary-color)]"
                    : ""
                }`}
              >
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{chat.user.name}</p>
                  <p className="text-xs  truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
