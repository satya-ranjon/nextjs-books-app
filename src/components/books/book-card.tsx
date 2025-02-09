"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { LoginModal } from "@/components/modals/login-modal";
import { Book } from "@/types/book";
import { FavoriteButton } from "./favorite-button";

interface BookCardProps {
  book: Book;
  initialIsFavorite: boolean;
  onLoginRequired?: () => void;
}

export function BookCard({
  book,
  initialIsFavorite,
  onLoginRequired,
}: BookCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => setShowLoginModal(false));

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
          <div className="absolute top-2 right-2">
            <FavoriteButton
              bookId={book.id}
              initialIsFavorite={initialIsFavorite}
              onLoginRequired={onLoginRequired}
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {book.title}
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200">
                {book.author}
              </p>
            </div>
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
