export default function Loading() {
  return (
    <div className="min-h-screen p-6 md:p-9">
      <div className="animate-pulse space-y-5">
        <div className="h-8 w-44 rounded-lg bg-sunk" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-sunk" />
          ))}
        </div>
      </div>
    </div>
  );
}
