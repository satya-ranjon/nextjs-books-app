"use client";

import Image from "next/image";
import { useState } from "react";
import { LoginModal } from "../modals/login-modal";
import { Book } from "@/types/book";
import { FavoriteButton } from "./favorite-button";

interface BookCardProps {
  book: Book;
  initialIsFavorite: boolean;
}

export function BookCard({ book, initialIsFavorite }: BookCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden 
        ${showLoginModal ? "fixed inset-0 z-40 m-4 md:m-8 lg:m-12" : ""}`}>
        <div className="relative aspect-[3/4]">
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
              onLoginRequired={() => setShowLoginModal(true)}
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {book.author}
          </p>
          {book.description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {book.description}
            </p>
          )}
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
