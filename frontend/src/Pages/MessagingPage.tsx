import { Info, Phone, Video } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import Topbar from "../Components/TopBar";
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
  const { forceLTR } = useDirection();
  const { CurrentUser } = useAuthStates();
  const [showMessages] = useState(false);
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
      className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100"
    >
      <Topbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row rounded-2xl shadow-xs border border-zinc-800 overflow-hidden bg-zinc-900 min-h-[550px] max-h-[calc(100vh-120px)]">
          
          {/* === LEFT SIDEBAR: ACTIVE USER INFO (DESKTOP) === */}
          {selectedChatUser && (
            <div className="hidden xl:flex flex-col border-r border-zinc-800 p-6 w-72 bg-zinc-900/60">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={selectedChatUser.ProfileImg || "/user.png"}
                    alt={selectedChatUser.username}
                    className="w-20 h-20 rounded-full object-cover border-2 border-zinc-800 shadow-sm"
                  />
                  {onlineUsers.includes(selectedChatUser._id) && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
                  )}
                </div>
                <h2 className="mt-3 font-bold text-base text-zinc-100">
                  {selectedChatUser.username}
                </h2>
                <span
                  className={`text-xs font-medium mt-0.5 ${
                    onlineUsers.includes(selectedChatUser._id)
                      ? "text-emerald-500"
                      : "text-zinc-500"
                  }`}
                >
                  {onlineUsers.includes(selectedChatUser._id) ? "Active now" : "Offline"}
                </span>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button title="Search in conversation" className="p-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer">
                  <Info className="w-4 h-4" />
                </button>
                <button title="Phone call" className="p-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer">
                  <Phone className="w-4 h-4" />
                </button>
                <button title="Video call" className="p-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer">
                  <Video className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-8 space-y-3 text-xs font-medium text-zinc-400 divide-y divide-zinc-800">
                <div className="pt-3 flex justify-between items-center cursor-pointer hover:text-indigo-400 transition">
                  <span>Chat Privacy & Safety</span>
                  <span>›</span>
                </div>
                <div className="pt-3 flex justify-between items-center cursor-pointer hover:text-indigo-400 transition">
                  <span>Shared Media & Links</span>
                  <span>›</span>
                </div>
                <div className="pt-3 flex justify-between items-center cursor-pointer hover:text-indigo-400 transition">
                  <span>Notifications & Sound</span>
                  <span>›</span>
                </div>
              </div>
            </div>
          )}

          {/* === MIDDLE CHAT PANEL === */}
          <div className="flex-1 flex flex-col min-w-0 bg-zinc-900">
            {selectedChatUser ? (
              <>
                {/* Chat Top Bar */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-800 bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={selectedChatUser.ProfileImg || "/user.png"}
                        alt={selectedChatUser.username}
                        className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                      />
                      {onlineUsers.includes(selectedChatUser._id) && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-sm sm:text-base text-zinc-100">
                        {selectedChatUser.username}
                      </h2>
                      <p className="text-xs text-zinc-500">
                        {onlineUsers.includes(selectedChatUser._id) ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    <button className="p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer">
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-zinc-950/40">
                  {messagesLoading && (
                    <div className="flex justify-center items-center h-full">
                      <TailSpin height="36" width="36" color="var(--primary-color)" />
                    </div>
                  )}

                  {messagesError && (
                    <p className="text-center text-xs text-red-500">
                      Failed to load messages
                    </p>
                  )}

                  {!messagesLoading &&
                    messagesData.map((msg, idx) => {
                      const isMe = msg.senderId._id === CurrentUser?._id;
                      return (
                        <div
                          key={idx}
                          className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`px-4 py-2.5 text-sm leading-relaxed max-w-sm sm:max-w-md ${
                              isMe
                                ? "bg-indigo-600 text-white rounded-2xl rounded-tr-xs shadow-2xs"
                                : "bg-zinc-800 text-zinc-100 border border-zinc-700/60 rounded-2xl rounded-tl-xs shadow-2xs"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}

                  {!messagesLoading && messagesData.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-12">
                      <p className="text-sm">No messages yet.</p>
                      <p className="text-xs mt-1">Say hello to start the conversation! 👋</p>
                    </div>
                  )}
                </div>

                {/* Messages Input */}
                <MessagesInput
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSend={handleSend}
                />
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-950/20">
                <div className="w-16 h-16 rounded-2xl bg-indigo-950/40 text-indigo-400 flex items-center justify-center mb-4 shadow-xs">
                  <Info className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-200">
                  Select a Conversation
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mt-1.5 leading-relaxed">
                  Choose a friend from the right panel to view messages, share updates, and chat in real time.
                </p>
              </div>
            )}
          </div>

          {/* === RIGHT SIDEBAR: FRIENDS DIRECTORY === */}
          <ChatRightFriendsbar
            userFriends={userFriends}
            friendsLoading={friendsLoading}
            friendsError={friendsError}
            selectedChatUser={selectedChatUser}
            ShowMessages={showMessages}
            setSelectedChatUser={setSelectedChatUser}
          />
        </div>
      </main>
    </div>
  );
};

export default MessengerPage;
