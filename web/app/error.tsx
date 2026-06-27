"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-serif text-4xl">We hit a snag</h1>
        <p className="mt-3 text-ink-2">Please try again, or head back home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset} variant="ghost">Try again</Button>
          <Button href="/">Back home</Button>
        </div>
      </div>
    </div>
  );
}
