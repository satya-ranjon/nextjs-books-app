"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export function BookSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Preserve the sort parameter
      const sort = searchParams.get("sort");
      if (sort) params.set("sort", sort);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== searchTerm) {
      const debounceTimeout = setTimeout(() => {
        startTransition(() => {
          const queryString = createQueryString("search", searchTerm);
          router.push(`${pathname}?${queryString}`, { scroll: false });
        });
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [searchTerm, pathname, router, createQueryString, searchParams]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by title, author, or description..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2.5 pl-10 pr-4 text-sm border rounded-lg 
          bg-white dark:bg-gray-800/50 
          border-gray-200 dark:border-gray-700 
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          transition-colors duration-200"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      {isPending && searchTerm !== searchParams.get("search") && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
