"use client";

import { useState } from "react";
import { LoginModal } from "@/components/modals/login-modal";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";

interface FavoritesClientProps {
  books: Book[];
}

export function FavoritesClient({ books }: FavoritesClientProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!books) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Favorite Books
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Please sign in to view your favorite books.
        </p>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="Sign in to view favorites"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Your Favorite Books
      </h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven&apos;t added any favorite books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              initialIsFavorite={true}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          ))}
        </div>
      )}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to manage favorites"
      />
    </div>
  );
}
