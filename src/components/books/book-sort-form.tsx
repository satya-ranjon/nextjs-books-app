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
    <div className="mb-4">
      <select
        name="sort"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="border rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 disabled:opacity-50"
        disabled={isPending}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      {isPending && (
        <span className="ml-2 text-sm text-gray-500">Sorting...</span>
      )}
    </div>
  );
}
