// src/components/Modal.tsx
import React, { Children } from "react";
import { Outlet } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
    children: React.ReactNode;
}

export default function UpdateProfileDialog({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Update user profile</h2>
        {children}
      </div>
    </div>
  );
}
