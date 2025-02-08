"use client";

import { useState } from "react";
import { LoginModal } from "@/components/modals/login-modal";

export function FavoritesClient() {
  const [showLoginModal, setShowLoginModal] = useState(true);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Favorite Books
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Please sign in to view your favorite books.
        </p>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to view favorites"
      />
    </>
  );
}
