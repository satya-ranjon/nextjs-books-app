import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/books/book-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  favorites?: { userId: string }[];
}

export default async function BooksPage() {
  const session = await getServerSession(authOptions);

  const books = (await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: session?.user?.id
      ? {
          favorites: {
            where: {
              userId: session.user.id,
            },
          },
        }
      : undefined,
  })) as Book[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100 ">
        Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            initialIsFavorite={(book?.favorites?.length ?? 0) > 0}
          />
        ))}
      </div>
    </div>
  );
}
