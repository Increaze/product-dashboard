"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
}

export function Pagination({
  total,
  limit,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  function goToPage(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <nav
      aria-label="Product pagination"
      className="flex flex-col gap-4 border-t border-gray-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-gray-900">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-medium text-gray-900">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900">
          {total}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span
          aria-current="page"
          className="px-2 text-sm font-medium text-gray-700"
        >
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}