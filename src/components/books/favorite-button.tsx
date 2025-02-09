"use client";

import { useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleFavorite } from "@/app/actions/favorite-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FavoriteButtonProps {
  bookId: string;
  initialIsFavorite: boolean;
  onLoginRequired?: () => void;
}

export function FavoriteButton({
  bookId,
  initialIsFavorite,
  onLoginRequired,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleFavorite = async () => {
    startTransition(async () => {
      const result = await toggleFavorite(bookId);

      if (result.error === "Authentication required" && onLoginRequired) {
        onLoginRequired();
        return;
      }

      if (result.error === "Maximum favorites limit reached") {
        toast.error(result.message);
        return;
      }

      if (result.success) {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
          toast.success("Added to favorites");
        } else {
          toast.success("Removed from favorites");
        }
        router.refresh();
      }
    });
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={`p-2 rounded-full transition-colors duration-200 
        ${
          isFavorite
            ? "text-red-500 hover:text-red-600"
            : "text-gray-400 hover:text-red-500"
        } ${isPending ? "opacity-50" : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </button>
  );
}
