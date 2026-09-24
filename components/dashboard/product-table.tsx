import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          No products found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or category filter.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-200" aria-label="Products">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Rating
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium text-gray-900">
                        {product.title}
                      </p>

                      {product.brand && (
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={
                      product.stock < 10
                        ? "text-sm font-medium text-red-600"
                        : "text-sm text-gray-600"
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  ★ {product.rating.toFixed(1)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
