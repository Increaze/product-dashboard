import { SummaryGrid } from "@/components/dashboard/summary-grid";
import { ProductTable } from "@/components/dashboard/product-table";
import { ProductFilters } from "@/components/dashboard/product-filters";
import { getProductCategories, getProducts } from "@/lib/api/product";
import { Pagination } from "@/components/dashboard/pagination";
interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    order?: "asc" | "desc";
    page?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const category = params.category ?? "";
  const sort = params.sort ?? "title";
  const order = params.order ?? "asc";

  const page = Math.max(Number(params.page ?? "1"), 1);

  const limit = 10;
  const skip = (page - 1) * limit;

  const [data, categories] = await Promise.all([
    getProducts({
      limit,
      skip,
      search,
      category,
      sortBy: sort,
      order,
    }),
    getProductCategories(),
  ]);

  const products = data.products;

  const lowStockCount = products.filter((product) => product.stock < 10).length;

  const averageRating =
    products.length > 0
      ? products.reduce((total, product) => total + product.rating, 0) /
        products.length
      : 0;

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-gray-500">Operations</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Product Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Monitor your product catalogue and manage inventory.
          </p>
        </header>

        <SummaryGrid
          totalProducts={data.total}
          lowStock={lowStockCount}
          averageRating={averageRating}
          inventoryValue={inventoryValue}
        />

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse and manage your product catalogue.
            </p>
          </div>

          <ProductFilters categories={categories} />

          <div className="mt-4">
            <ProductTable products={products} />
            <Pagination total={data.total} limit={limit} currentPage={page} />
          </div>
        </section>
      </div>
      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Product Dashboard · Built with Next.js, React, TypeScript and Tailwind
        CSS
      </footer>
    </main>
  );
}
