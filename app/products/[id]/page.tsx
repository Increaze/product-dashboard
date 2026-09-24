import { getProductById } from "@/lib/api/product";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditForm } from "@/components/products/product-edit-form";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    order?: "asc" | "desc";
    page?: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const filters = await searchParams;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  let product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  const backParams = new URLSearchParams();

  if (filters.search) {
    backParams.set("search", filters.search);
  }

  if (filters.category) {
    backParams.set("category", filters.category);
  }

  if (filters.sort) {
    backParams.set("sort", filters.sort);
  }

  if (filters.order) {
    backParams.set("order", filters.order);
  }

  if (filters.page) {
    backParams.set("page", filters.page);
  }

  const backUrl = backParams.toString()
    ? `/?${backParams.toString()}`
    : "/";

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href={backUrl}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to products
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-80 bg-gray-50 md:min-h-125">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-contain p-8"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {product.category}
                </span>

                {product.brand && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <p className="mt-4 leading-7 text-gray-600">
                {product.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {product.stock}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ★ {product.rating.toFixed(1)}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Discount</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {product.discountPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  Product ID
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  #{product.id}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ProductEditForm
  productId={product.id}
  initialPrice={product.price}
  initialStock={product.stock}
/>
      </div>
    </main>
  );
}