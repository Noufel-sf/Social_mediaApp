import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";

interface ChatBoxProps {
  user: any;
  onBack: () => void;
}

const ChatBox = ({ user, onBack }: ChatBoxProps) => {
  const [messages, setMessages] = useState([
    { id: 1, from: "me", text: "Hey 👋", timestamp: "10:00 AM" },
    { id: 2, from: "them", text: "Hello! How are you?", timestamp: "10:02 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      from: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, msg]);
    setNewMessage("");
    // 👉 later: emit to backend/socket here
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[600px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-zinc-800 bg-zinc-900/90">
        <ArrowLeft
          className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-zinc-200 transition"
          onClick={onBack}
        />
        <img
          src={user.avatar}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover border border-zinc-700"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-zinc-100">{user.username}</span>
          <span className="text-xs text-emerald-400">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-sm max-w-[70%] ${
                msg.from === "me"
                  ? "bg-indigo-600 text-white rounded-br-none shadow-sm"
                  : "bg-zinc-800 text-zinc-100 border border-zinc-700/60 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
              <div className="text-[10px] mt-1 opacity-70">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-zinc-800 bg-zinc-900">
        <input
          type="text"
          placeholder="Message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 p-2.5 rounded-full text-white hover:bg-indigo-500 transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
