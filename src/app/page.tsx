// No 'use client' - this is a Server Component
import { BookList } from "@/components/books/book-list";
import { SortOption } from "@/types/book";
import { getFilteredBooks } from "./actions/book-actions";
import { BookSearchForm } from "@/components/books/book-search-form";
import { BookSortForm } from "@/components/books/book-sort-form";

interface PageProps {
  searchParams: {
    sort?: SortOption;
    search?: string;
  };
}

export default async function BooksPage({ searchParams }: PageProps) {
  const currentSort = (searchParams.sort || "title") as SortOption;
  const searchQuery = searchParams.search || "";
  const { books, error } = await getFilteredBooks(currentSort, searchQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
          Discover Books
        </h1>
        {error ? (
          <div className="text-red-500 text-center py-8 bg-red-50 dark:bg-red-900/10 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Books
                  </label>
                  <BookSearchForm />
                </div>
                <div className="md:w-48">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <BookSortForm currentSort={currentSort} />
                </div>
              </div>
            </div>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Found {books.length} book{books.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </div>
            <BookList books={books} />
          </>
        )}
      </div>
    </div>
  );
}
