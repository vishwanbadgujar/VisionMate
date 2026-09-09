import React from "react";
import { COLORS } from "@/theme/colors";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-[${COLORS.bgSurface}] rounded-[20px] p-6 max-w-md w-full mx-4 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            className={`text-xl font-bold text-[${COLORS.textPrimary}] mb-4`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
