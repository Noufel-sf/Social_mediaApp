import React from "react";

type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function Button({ text, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full cursor-pointer px-4 py-2 font-medium text-white transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]"
      }`}
    >
      {text}
    </button>
  );
}
