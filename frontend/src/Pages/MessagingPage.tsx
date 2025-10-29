import { Search, Edit2, Info, Phone, Video, ThumbsUp } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import Topbar from "../Components/TopBar";
import { useTheme } from "../Contexts/DarkModeContext";
import { useDirection } from "../hooks/useDirection";
import { getSocket } from "../Utils/socket";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../ServisesApi/UserFriendsApi";
import { getMessages } from "../ServisesApi/ChatApi";
import type { Message, User } from "../Utils/Types";
import { TailSpin } from "react-loader-spinner";
import { ChatRightFriendsbar } from "../Components/ChatRightFriendsbar";
import MessagesInput from "../Components/MessagesInput";

const MessengerPage = () => {
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { theme } = useTheme();
  const { forceLTR } = useDirection();
  const { CurrentUser } = useAuthStates();
  const [showMessages, setShowMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // === Fetch Friends ===
  const {
    data: userFriends = [],
    isLoading: friendsLoading,
    isError: friendsError,
  } = useQuery({
    queryKey: ["friendsList", CurrentUser?._id],
    queryFn: getFriends,
    enabled: !!CurrentUser,
  });

  // === Fetch Messages ===
  const {
    data: messagesData = [],
    isLoading: messagesLoading,
    isError: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", selectedChatUser?._id],
    queryFn: () => getMessages(selectedChatUser!._id),
    enabled: !!selectedChatUser,
  });

  // === SOCKET EVENTS ===
  useEffect(() => {
    if (!CurrentUser) return;

    const socket = getSocket(); // ✅ Always get latest active socket
    if (!socket) return;

    const handleConnect = () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("request_online_users");
    };

    const handleOnlineUsers = (users: string[]) => setOnlineUsers(users);

    const handleUserStatus = ({
      userId,
      status,
    }: {
      userId: string;
      status: string;
    }) => {
      setOnlineUsers((prev) =>
        status === "online"
          ? [...new Set([...prev, userId])]
          : prev.filter((id) => id !== userId)
      );
    };

    const handlePrivateMessage = (msg: Message) => {
      if (
        msg.senderId._id === selectedChatUser?._id ||
        msg.receiverId._id === selectedChatUser?._id
      ) {
        refetchMessages();
      }
    };

    const handleMessageSent = (msg: Message) => {
      if (msg.receiverId._id === selectedChatUser?._id) {
        refetchMessages();
      }
    };

    socket.on("connect", handleConnect);
    socket.on("online_users", handleOnlineUsers);
    socket.on("user_status", handleUserStatus);
    socket.on("private_message", handlePrivateMessage);
    socket.on("message_sent", handleMessageSent);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("online_users", handleOnlineUsers);
      socket.off("user_status", handleUserStatus);
      socket.off("private_message", handlePrivateMessage);
      socket.off("message_sent", handleMessageSent);
    };
  }, [selectedChatUser, CurrentUser, refetchMessages]);

  // === SEND MESSAGE ===
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChatUser || !newMessage.trim()) return;

    const socket = getSocket(); 
    if (!socket || !socket.connected) {
      console.warn("⚠️ Socket not connected — cannot send message");
      return;
    }

    socket.emit("private_message", {
      receiverId: selectedChatUser._id,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };



  return (
    <div
      {...forceLTR()}
      className={`w-full h-screen flex flex-col gap-4 lg:px-12 py-3 ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      <Topbar />

      <div className="flex flex-col md:flex-row md:justify-between gap-8 h-screen w-full">
        {/* === LEFT SIDEBAR === */}
        <div className={`lg:flex flex-col border-r p-4 w-1/4 hidden`}>
          {selectedChatUser && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={selectedChatUser.ProfileImg}
                  alt={selectedChatUser.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="mt-2 font-semibold">{selectedChatUser.username}</h2>
                <span
                  className={`text-xs ${
                    onlineUsers.includes(selectedChatUser._id)
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers.includes(selectedChatUser._id)
                    ? "Active now"
                    : "Offline"}
                </span>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button className="p-3 bg-[var(--primary-color)] rounded-full">
                  🔍
                </button>
                <button className="p-3 bg-[var(--primary-color)] rounded-full">
                  🔔
                </button>
                <button className="p-3 bg-[var(--primary-color)] rounded-full">
                  ⚙️
                </button>
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

        {/* === MIDDLE CHAT === */}
        <div className={` flex-col w-full ${showMessages ? "hidden" : "flex"}`}>
          {selectedChatUser && (
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-3xl">
                {selectedChatUser.username}
              </h2>
              <div className="flex gap-3 text-gray-600">
                <Info className="w-5 h-5 cursor-pointer" />
                <Phone className="w-5 h-5 cursor-pointer" />
                <Video className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          )}

          {/* === MESSAGES === */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messagesLoading && (
              <div className="flex justify-center items-center h-full">
                <TailSpin height="40" width="40" color="var(--primary-color)" />
              </div>
            )}

            {messagesError && (
              <p className="text-center text-red-500">
                Failed to load messages
              </p>
            )}

            {!messagesLoading &&
              messagesData.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.senderId._id === CurrentUser?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                      msg.senderId._id === CurrentUser?._id
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

            {!messagesLoading && messagesData.length === 0 && (
              <p className="text-center text-gray-400 text-sm">
                No messages yet
              </p>
            )}
          </div>

          {/* === MESSAGE INPUT === */}
          {selectedChatUser && (
            <MessagesInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSend={handleSend}
            />
          )}
        </div>

        {/* === RIGHT SIDEBAR === */}
        <ChatRightFriendsbar
            userFriends={userFriends}
            friendsLoading={friendsLoading}
            friendsError={friendsError}
            selectedChatUser={selectedChatUser}
            ShowMessages ={showMessages}
            setSelectedChatUser={setSelectedChatUser}
        />
      </div>
    </div>
  );
};

export default MessengerPage;
