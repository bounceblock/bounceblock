"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Opens the Stripe billing portal for the current customer. */
export function BillingPortalButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url as string;
      else alert(data.error ?? "Billing portal isn't available yet.");
    } catch {
      alert("Could not open the billing portal.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={go} variant="ghost" className={className}>
      {loading ? "Loading…" : "Manage billing"}
    </Button>
  );
}
