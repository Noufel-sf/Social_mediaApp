import { Search, Edit2, Info, Phone, Video, ThumbsUp } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import Topbar from "../Components/TopBar";
import { useTheme } from "../Contexts/DarkModeContext";
import { useDirection } from "../hooks/useDirection";
import socket from "../Utils/socket";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../ServisesApi/UserFriendsApi";
import type { Chat, Message } from "../Utils/Types";

// =========================
// === Component Start ====
// =========================
const MessengerPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { theme } = useTheme();
  const { forceLTR } = useDirection();
  const { CurrentUser } = useAuthStates();

  // === Socket Events ===
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("request_online_users");
    });

    socket.on("online_users", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on(
      "user_status",
      ({ userId, status }: { userId: string; status: string }) => {
        console.log(`User ${userId} is now ${status}`);
        setOnlineUsers((prev) =>
          status === "online"
            ? [...new Set([...prev, userId])]
            : prev.filter((id) => id !== userId)
        );
      }
    );

    socket.on("private_message", (msg: Message) => {
      console.log("Incoming message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("message_sent", (msg: Message) => {
      console.log("You sent:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("online_users");
      socket.off("user_status");
      socket.off("private_message");
      socket.off("message_sent");
    };
  }, []);



    const { data: userFriends = [], isLoading } = useQuery({
    queryKey: ["friendsList", CurrentUser?._id],
    queryFn: getFriends,
    enabled: !!CurrentUser, // only fetch if user logged in
  });




  // === Send Message ===
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;

    socket.emit("private_message", {
      receiverId: selectedChat.user._id,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div
      {...forceLTR()}
      className={`w-full h-screen flex flex-col gap-4 px-12 py-3 ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <Topbar />
      <div className="flex flex-col md:flex-row md:justify-between gap-8 h-screen w-full">
        {/* === LEFT SIDEBAR === */}
        <div className="hidden lg:flex flex-col border-r p-4 w-1/4">
          {selectedChat && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={selectedChat.user.ProfileImg}
                  alt={selectedChat.user.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="mt-2 font-semibold">
                  {selectedChat.user.username}
                </h2>
                <span
                  className={`text-xs ${
                    onlineUsers.includes(selectedChat.user._id)
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers.includes(selectedChat.user._id)
                    ? "Active now"
                    : "Offline"}
                </span>
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
          {selectedChat && (
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="font-semibold text-3xl">
                  {selectedChat.user.username}
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
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.senderId._id === currentUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                    msg.senderId._id === currentUser.id
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
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-3 border-t"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 px-3 py-2 rounded-full border outline-none text-sm"
            />
            <button
              type="submit"
              className="text-[var(--primary-color)] font-semibold"
            >
              Send
            </button>
            <button className="text-[var(--primary-color)]">GIF</button>
            <button className="text-[var(--primary-color)]">😊</button>
            <button className="text-[var(--primary-color)]">
              <ThumbsUp className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* === RIGHT SIDEBAR (Chats List) === */}
        <div className="hidden lg:flex flex-col w-1/4 border-l">
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

          <div className="hidden flex-col gap-3 flex-1 lg:flex overflow-y-auto p-3">
            {userFriends.map((friend) => (
              <div
                key={friend._id}
                className={`flex items-center gap-3 rounded-2xl p-3 cursor-pointer hover:bg-black ${
                  selectedChat?.user?._id === friend._id
                    ? "bg-[var(--primary-color)]"
                    : ""
                }`}
                onClick={() =>
                  setSelectedChat({
                    user: friend,
                  })
                }
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
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
