"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ProductCategory } from "@/types/product";

interface ProductFiltersProps {
  categories: ProductCategory[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "all";
  const currentSort = searchParams.get("sort") ?? "title";
  const currentOrder = searchParams.get("order") ?? "asc";

  const [search, setSearch] = useState(currentSearch);

  const updateQuery = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search === currentSearch) {
        return;
      }

      updateQuery({
        search,
        page: "1",
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, currentSearch, updateQuery]);

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    updateQuery({
      category: event.target.value,
      page: "1",
    });
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const [sort, order] = event.target.value.split("-");

    updateQuery({
      sort,
      order,
      page: "1",
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name..."
            className="w-full rounded-lg border text-black border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category-filter"
            value={currentCategory}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border text-black border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="product-sort"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Sort by
          </label>

          <select
            id="product-sort"
            value={`${currentSort}-${currentOrder}`}
            onChange={handleSortChange}
            className="w-full rounded-lg border text-black border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="title-asc">Name: A → Z</option>

            <option value="title-desc">Name: Z → A</option>

            <option value="price-asc">Price: Low → High</option>

            <option value="price-desc">Price: High → Low</option>

            <option value="rating-desc">Rating: High → Low</option>

            <option value="rating-asc">Rating: Low → High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
