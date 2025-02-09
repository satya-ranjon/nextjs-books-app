export interface Book {
  title: string;
  id: string;
  author: string;
  coverImage: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
