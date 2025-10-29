import React from "react";
import { ThumbsUp } from "lucide-react";

function MessagesInput({
  newMessage,
  setNewMessage,
  handleSend,
}: {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
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
        className="bg-[var(--primary-color)] text-sm cursor-pointer p-2 rounded-full hover:bg-[var(--secondary-color)] transition duration-300 font-semibold"
      >
        Send
      </button>

      <button className="bg-[var(--primary-color)] text-sm cursor-pointer p-2 rounded-full hover:bg-[var(--secondary-color)] transition duration-300 font-semibold">
        <ThumbsUp className="w-5 h-5" />
      </button>
    </form>
  );
}

export default MessagesInput;
