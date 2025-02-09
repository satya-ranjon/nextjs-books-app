export interface Book {
  title: string;
  id: string;
  author: string;
  coverImage: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  favorites?: { userId: string }[];
}

export type SortOption = "title" | "author" | "newest" | "oldest";

export interface BookSortOptions {
  field: SortOption;
  direction: "asc" | "desc";
}
