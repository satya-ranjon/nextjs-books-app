"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { FaBook, FaHeart, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle";
import { useClickOutside } from "@/hooks/use-click-outside";

import { AddBookModal } from "../modals/add-book-modal";
import { LoginModal } from "../modals/login-modal";

export function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const authModalRef = useRef<HTMLDivElement>(null);
  const loginModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setShowDropdown(false));
  useClickOutside(authModalRef, () => setShowAuthModal(false));
  useClickOutside(loginModalRef, () => setShowLoginModal(false));

  const handleAddBookClick = () => {
    if (!session) {
      setShowLoginModal(true);
    } else {
      setShowAddBookModal(true);
    }
  };

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <FaBook className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  BookApp
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
                  Books
                </Link>
                <Link
                  href="/favorites"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
                  <div className="flex items-center space-x-1">
                    <FaHeart className="h-4 w-4" />
                    <span>Favorites</span>
                  </div>
                </Link>
                <button
                  onClick={handleAddBookClick}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                  <FaPlus className="h-4 w-4" />
                  <span>Add Book</span>
                </button>
              </div>
            </div>

            {/* Right side - Auth and Theme */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 focus:outline-none">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-600" />
                    )}
                  </button>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        {session.user?.name}
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal || showAuthModal}
        onClose={() => {
          setShowLoginModal(false);
          setShowAuthModal(false);
        }}
        title="Sign in to add books"
      />

      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
      />
    </>
  );
}
