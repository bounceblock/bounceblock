export default function Loading() {
  return (
    <div className="min-h-screen p-6 md:p-9">
      <div className="mx-auto max-w-5xl animate-pulse space-y-5">
        <div className="h-8 w-52 rounded-lg bg-sunk" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-sunk" />
          ))}
        </div>
        <div className="h-40 rounded-xl bg-sunk" />
      </div>
    </div>
  );
}
