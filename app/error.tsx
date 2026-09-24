"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <section
        role="alert"
        className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
      >
        <h1 className="text-xl font-semibold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          We couldn&apos;t load the product catalogue.
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </section>
    </main>
  );
}