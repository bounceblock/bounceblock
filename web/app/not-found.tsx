import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-4xl">Page not found</h1>
        <p className="mt-3 text-ink-2">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <div className="mt-6">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </div>
  );
}
