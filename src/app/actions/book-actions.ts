"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SortOption } from "@/types/book";

export async function getFilteredBooks(
  sortOption: SortOption,
  searchQuery: string = ""
) {
  try {
    const session = await getServerSession(authOptions);

    let orderBy = {};
    switch (sortOption) {
      case "title":
        orderBy = { title: "asc" };
        break;
      case "author":
        orderBy = { author: "asc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
    }

    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { author: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      orderBy,
      include: session?.user?.id
        ? {
            favorites: { where: { userId: session.user.id } },
          }
        : undefined,
    });

    return { books, error: null };
  } catch (error) {
    console.error("Database error:", error);
    return {
      books: [],
      error: "Unable to connect to the database. Please try again later.",
    };
  }
}
