"use client";

import { useRef } from "react";
import { signIn } from "next-auth/react";
import { FaTimes, FaGithub, FaGoogle } from "react-icons/fa";
import { useClickOutside } from "@/hooks/use-click-outside";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function LoginModal({
  isOpen,
  onClose,
  title = "Sign in to continue",
}: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm p-6 relative shadow-xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <FaTimes className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
            <FaGithub className="h-5 w-5" />
            <span>Sign in with GitHub</span>
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <FaGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
