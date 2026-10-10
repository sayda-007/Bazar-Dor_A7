export default function CategoryLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl animate-pulse px-4 py-10 sm:px-6">
      <div className="mb-6 h-4 w-32 rounded bg-gray-200" />

      <div className="mb-8 rounded-3xl bg-gray-200 p-8">
        <div className="h-8 w-48 rounded bg-gray-300" />
        <div className="mt-4 h-4 w-64 max-w-full rounded bg-gray-300" />
      </div>

      <div className="mb-6 h-7 w-48 rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div className="mt-5 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
            <div className="mt-6 h-7 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}