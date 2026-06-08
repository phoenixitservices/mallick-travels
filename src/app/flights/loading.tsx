export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <div className="animate-pulse space-y-6">

        <div className="h-40 rounded-3xl bg-gray-300" />

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 rounded-3xl bg-gray-200"
          />
        ))}
      </div>
    </main>
  );
}