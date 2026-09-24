export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-5 w-32 rounded bg-gray-200" />

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="grid md:grid-cols-2">
            <div className="min-h-80 bg-gray-100 md:min-h-125" />

            <div className="space-y-5 p-6 md:p-8">
              <div className="h-6 w-32 rounded bg-gray-200" />
              <div className="h-10 w-3/4 rounded bg-gray-200" />
              <div className="h-24 rounded bg-gray-200" />

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 rounded-xl bg-gray-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}