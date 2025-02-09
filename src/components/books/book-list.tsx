"use client";

import { useState } from "react";
import { Book, SortOption } from "@/types/book";
import { BookCard } from "./book-card";
import { BookSortForm } from "./book-sort-form";

// Client component
interface BookListClientProps {
  initialBooks: Book[];
}

export function BookListClient({ initialBooks }: BookListClientProps) {
  const [books] = useState<Book[]>(initialBooks);
  const [sortOption] = useState<SortOption>("title");

  const sortBooks = (books: Book[], option: SortOption) => {
    return [...books].sort((a, b) => {
      switch (option) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
  };

  const sortedBooks = sortBooks(books, sortOption);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
        Books
      </h1>
      <BookSortForm currentSort={sortOption} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
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

interface BookListProps {
  books: Book[];
  currentSort: SortOption;
}

export function BookList({ books, currentSort }: BookListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
        Books
      </h1>
      <BookSortForm currentSort={currentSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
