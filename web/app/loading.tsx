export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" aria-label="Loading" role="status">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-hair border-t-brand" />
    </div>
  );
}
