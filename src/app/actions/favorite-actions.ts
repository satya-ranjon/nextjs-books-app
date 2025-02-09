"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const MAX_FAVORITES = 2;

export async function toggleFavorite(bookId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Authentication required" };
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        bookId,
        userId: session.user.id,
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return { success: true };
    }

    // Check if user has reached the maximum number of favorites
    const favoriteCount = await prisma.favorite.count({
      where: {
        userId: session.user.id,
      },
    });

    if (favoriteCount >= MAX_FAVORITES) {
      return {
        error: "Maximum favorites limit reached",
        message: `You can only favorite up to ${MAX_FAVORITES} books. Please remove a book from favorites before adding a new one.`,
      };
    }

    await prisma.favorite.create({
      data: {
        bookId,
        userId: session.user.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/favorites");
    return { success: true };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { error: "Failed to update favorite" };
  }
}
