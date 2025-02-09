// No 'use client' - this is a Server Component
import { BookList } from "@/components/books/book-list";
import { SortOption } from "@/types/book";
import { getFilteredBooks } from "./actions/book-actions";

interface PageProps {
  searchParams: { sort?: SortOption };
}

export default async function BooksPage({ searchParams }: PageProps) {
  const currentSort = (searchParams.sort || "title") as SortOption;
  const books = await getFilteredBooks(currentSort);

  return <BookList books={books} currentSort={currentSort} />;
}
