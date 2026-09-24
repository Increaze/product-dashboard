"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/api/product";

interface ProductEditFormProps {
  productId: number;
  initialPrice: number;
  initialStock: number;
}

export function ProductEditForm({
  productId,
  initialPrice,
  initialStock,
}: ProductEditFormProps) {
  const router = useRouter();

  const [price, setPrice] = useState(String(initialPrice));
  const [stock, setStock] = useState(String(initialStock));
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setError("Stock must be a whole number greater than or equal to 0.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedProduct = await updateProduct(productId, {
        price: parsedPrice,
        stock: parsedStock,
      });

      setMessage(
        `Product updated successfully. Price: $${updatedProduct.price.toFixed(
          2,
        )}, Stock: ${updatedProduct.stock}.`,
      );
      router.refresh();
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Edit product</h2>

        <p className="mt-1 text-sm text-gray-500">
          Update the product price and available stock.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
        aria-label="Edit product"
      >
        <div>
          <label
            htmlFor="product-price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              $
            </span>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              disabled={isSaving}
              className="w-full rounded-lg border text-black
               border-gray-300 py-2.5 pl-8 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="product-stock"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Stock
          </label>

          <input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            disabled={isSaving}
            className="w-full rounded-lg border text-black border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
}
