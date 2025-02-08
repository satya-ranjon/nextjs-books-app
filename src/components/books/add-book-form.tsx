"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddBookFormProps {
  onSuccess?: () => void;
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      coverImage: formData.get("coverImage"),
      description: formData.get("description"),
    };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add book");

      router.refresh();
      (e.target as HTMLFormElement).reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">
          Cover Image URL
        </label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          required
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors">
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
