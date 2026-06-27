"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { PlanId } from "@/lib/plans";

/** Starts a Stripe Checkout session for a plan; sends anonymous users to signup. */
export function CheckoutButton({
  plan,
  variant = "ghost",
  className,
  children,
}: {
  plan: PlanId;
  variant?: "accent" | "ghost" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        router.push(`/signup?next=/pricing`);
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
      } else {
        alert(data.error ?? "Could not start checkout. Please try again.");
      }
    } catch {
      alert("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={go} variant={variant} className={className}>
      {loading ? "Loading…" : children}
    </Button>
  );
}
