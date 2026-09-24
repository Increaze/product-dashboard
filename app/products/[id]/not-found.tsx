import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Back to products
        </Link>
      </section>
    </main>
  );
}