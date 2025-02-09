"use client";

import { useCallback, useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function LoginModal({ isOpen, onClose, title }: LoginModalProps) {
  const modalRef = useClickOutside(() => {
    onClose();
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4 z-50">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200">
            <FaGithub />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
