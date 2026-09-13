import React from "react";



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
    children: React.ReactNode;
}

export default function AddStoryDialog({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center bg-black/60 backdrop-blur-xs z-50">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative transition-colors text-slate-900 dark:text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Add a new story</h2>
        {children}
      </div>
    </div>
  );
}
