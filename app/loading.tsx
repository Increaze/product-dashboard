export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="mt-3 h-9 w-72 rounded bg-gray-200" />

          <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>

          <div className="mt-8 h-16 rounded-xl border border-gray-200 bg-white" />

          <div className="mt-4 h-96 rounded-xl border border-gray-200 bg-white" />
        </div>
      </div>
    </main>
  );
}