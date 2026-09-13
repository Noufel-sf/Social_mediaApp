import React from "react";
import { Send, ThumbsUp } from "lucide-react";

function MessagesInput({
  newMessage,
  setNewMessage,
  handleSend,
}: {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const handleQuickLike = () => {
    setNewMessage("👍");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 p-3 border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 dark:border-zinc-700/80 bg-slate-50 dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
      />

      {newMessage.trim() ? (
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer p-2.5 rounded-full transition-all duration-150 shadow-sm flex items-center justify-center"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleQuickLike}
          className="p-2.5 rounded-full text-indigo-500 hover:bg-indigo-50 dark:hover:bg-zinc-800 transition cursor-pointer"
          title="Send thumbs up"
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}

export default MessagesInput;
