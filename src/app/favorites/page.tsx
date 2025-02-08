import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/books/book-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Favorite Books</h1>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Please sign in to view your favorite books.
        </p>
      </div>
    );
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      book: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Books</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven&apos;t added any favorite books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(({ book }) => (
            <BookCard key={book.id} book={book} initialIsFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}
