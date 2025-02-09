import { Book } from "@/types/book";
import { BookCard } from "./book-card";

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            No books found
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          initialIsFavorite={(book?.favorites?.length ?? 0) > 0}
        />
      ))}
    </div>
  );
}
