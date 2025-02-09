"use client";

import { SortOption } from "@/types/book";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface BookSortFormProps {
  currentSort: SortOption;
}

export function BookSortForm({ currentSort }: BookSortFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSort = (value: string) => {
    if (value === currentSort) return;

    startTransition(() => {
      router.push(`${pathname}?${createQueryString("sort", value)}`, {
        scroll: false,
      });
    });
  };

  return (
    <div className="relative">
      <select
        name="sort"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="w-full px-4 py-2.5 text-sm appearance-none
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700 
          text-gray-900 dark:text-gray-100
          rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          transition-colors duration-200
          disabled:opacity-50"
        disabled={isPending}>
        <option value="title">Title (A-Z)</option>
        <option value="author">Author (A-Z)</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isPending && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
