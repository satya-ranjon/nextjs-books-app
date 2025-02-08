"use client";

import Image from "next/image";
import { Book } from "@/types/book";
import { FaHeart } from "react-icons/fa";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { LoginModal } from "@/components/modals/login-modal";

interface BookCardProps {
  book: Book;
  initialIsFavorite?: boolean;
}

export function BookCard({ book, initialIsFavorite = false }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => setShowLoginModal(false));

  const toggleFavorite = async () => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id }),
      });
      if (!response.ok) throw new Error("Failed to toggle favorite");
      setIsFavorite(!isFavorite);
      router.refresh();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative group rounded-lg shadow-md overflow-hidden transition-all hover:scale-105 border dark:border-gray-700">
        <div className="relative h-48 w-full">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {book.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{book.author}</p>
            </div>
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }>
              <FaHeart
                className={`h-5 w-5 ${
                  isFavorite ? "text-red-500 dark:text-red-400" : ""
                }`}
              />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {book.description}
          </p>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to add favorites"
      />
    </>
  );
}
