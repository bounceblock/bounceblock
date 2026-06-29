"use client";

import { useState } from "react";
import type { WidgetKey } from "@/lib/tools";
import { MoreToolWidget } from "./CalculatorWidgets";

// ── tiny shared UI (exported for CalculatorWidgets) ──────────────────────────
export type Tone = "valid" | "invalid" | "warn" | "neutral";
export const toneCls: Record<Tone, string> = {
  valid: "border-brand/30 bg-brand-wash/50 text-brand-deep",
  invalid: "border-invalid/30 bg-invalid/5 text-invalid",
  warn: "border-unknown/40 bg-unknown/5 text-[#A9761B]",
  neutral: "border-hair bg-sunk/40 text-ink-2",
};

export function Result({ tone, title, lines }: { tone: Tone; title: string; lines?: string[] }) {
  return (
    <div className={`mt-4 rounded-xl border px-4 py-3.5 text-[14px] ${toneCls[tone]}`}>
      <div className="font-semibold">{title}</div>
      {lines?.map((l, i) => <div key={i} className="mt-1 text-[13px] opacity-90">{l}</div>)}
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg border border-hair bg-raised px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash";
export const btnCls =
  "rounded-full bg-brand px-5 py-3 text-[14px] font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60";

// ── reference data (kept small + representative) ─────────────────────────────
export const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "throwawaymail.com", "yopmail.com", "trashmail.com", "getnada.com", "sharklasers.com",
  "maildrop.cc", "dispostable.com", "fakeinbox.com", "mailnesia.com", "mohmal.com",
  "spamgourmet.com", "mailcatch.com", "tempinbox.com", "discard.email", "emailondeck.com",
]);
const TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmail.co": "gmail.com", "gmaill.com": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com",
  "outlok.com": "outlook.com", "outloo.com": "outlook.com", "iclod.com": "icloud.com",
};
const SPAM_WORDS = [
  "free", "guarantee", "winner", "cash", "urgent", "act now", "limited time", "click here",
  "buy now", "risk-free", "100%", "cheap", "earn money", "double your", "no cost", "credit card",
  "congratulations", "prize", "exclusive deal", "order now", "lowest price", "discount",
];

export const ROLE_PREFIXES = new Set([
  "info", "sales", "support", "admin", "administrator", "contact", "hello", "help", "office",
  "billing", "accounts", "accounting", "marketing", "team", "hr", "jobs", "careers", "press",
  "media", "legal", "privacy", "security", "abuse", "postmaster", "webmaster", "noreply",
  "no-reply", "donotreply", "enquiries", "inquiries", "service", "orders", "feedback", "mail",
]);
const FREE_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "live.com",
  "msn.com", "protonmail.com", "proton.me", "gmx.com", "mail.com", "yandex.com", "zoho.com",
]);
export const domainRe = /^[a-z0-9.-]+\.[a-z]{2,}$/;
export const ipv4Re = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
// DNSBL zones that respond to public resolvers (Spamhaus blocks them, so it's omitted).
export const DNSBLS = ["b.barracudacentral.org", "dnsbl.sorbs.net", "bl.spamcop.net", "all.s5h.net"];

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Query a DNS record type via DNS-over-HTTPS (Google). Returns answer strings. */
export async function dnsResolve(name: string, type: "MX" | "TXT" | "A" | "PTR"): Promise<string[]> {
  const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`);
  const data = await r.json();
  return ((data.Answer ?? []) as { data: string }[]).map((a) => a.data.replace(/^"|"$/g, "").replace(/\.$/, ""));
}

/** Small copy-to-clipboard output box for the generators. */
export function CodeOut({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-4">
      <div className="text-[12.5px] font-medium text-ink-2">{label}</div>
      <div className="mt-1.5 flex items-start gap-2 rounded-xl border border-hair bg-sunk/40 p-3">
        <code className="flex-1 break-all font-mono text-[12.5px] text-ink">{value}</code>
        <button
          className="shrink-0 rounded-md border border-hair bg-raised px-2.5 py-1 text-[12px] font-medium text-ink-2 hover:border-brand hover:text-brand-deep"
          onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// ── widget ───────────────────────────────────────────────────────────────────
export function ToolWidget({ widget }: { widget: WidgetKey }) {
  switch (widget) {
    case "email-verifier": return <ApiCheck kind="email" placeholder="name@company.com" label="Verify email" />;
    case "phone-validator": return <ApiCheck kind="phone" placeholder="+1 415 555 2671" label="Validate phone" />;
    case "email-syntax": return <SyntaxCheck />;
    case "disposable": return <DisposableCheck />;
    case "mx-lookup": return <MxLookup />;
    case "spf": return <RecordLint kind="spf" />;
    case "dmarc": return <RecordLint kind="dmarc" />;
    case "dkim": return <RecordLint kind="dkim" />;
    case "spam-subject": return <SpamSubject />;
    case "bounce-calc": return <BounceCalc />;
    case "deliverability": return <DeliverabilityTest />;
    case "spf-gen": return <SpfGenerator />;
    case "dkim-gen": return <DkimGenerator />;
    case "dmarc-gen": return <DmarcGenerator />;
    case "blacklist": return <DnsblCheck mode="domain" />;
    case "ip-reputation": return <DnsblCheck mode="ip" />;
    case "catch-all": return <CatchAllCheck />;
    case "role-account": return <RoleAccountCheck />;
    case "carrier": return <PhoneInfo kind="carrier" />;
    case "hlr": return <PhoneInfo kind="hlr" />;
    case "email-finder": return <EmailFinder />;
    case "reverse-email": return <ReverseEmail />;
    case "company-domain": return <CompanyDomain />;
    case "list-cleaner": return <ListCleaner />;
    default: return <MoreToolWidget widget={widget} />;
  }
}

export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">{children}</div>;
}

// email + phone hit the rate-limited API (mock-capable)
function ApiCheck({ kind, placeholder, label }: { kind: "email" | "phone"; placeholder: string; label: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Record<string, unknown> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setLoading(true); setErr(null); setRes(null);
    try {
      const r = await fetch("/api/tools/check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, value }) });
      const data = await r.json();
      if (!r.ok) setErr(data.error ?? "Something went wrong.");
      else setRes(data);
    } catch { setErr("Network error. Please try again."); }
    setLoading(false);
  }

  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder={placeholder} value={value}
          onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Checking…" : label}</button>
      </div>
      {err && <Result tone="invalid" title={err} />}
      {res && kind === "email" && (
        <Result
          tone={res.status === "valid" ? "valid" : res.status === "invalid" ? "invalid" : "warn"}
          title={`Status: ${String(res.status).toUpperCase()}`}
          lines={[
            res.didYouMean ? `Did you mean ${res.didYouMean}?` : "",
            res.subStatus ? `Detail: ${res.subStatus}` : "",
            res.mock ? "Demo mode — connect ZeroBounce for live results." : "",
          ].filter(Boolean) as string[]}
        />
      )}
      {res && kind === "phone" && (
        <Result
          tone={res.valid ? "valid" : "invalid"}
          title={res.valid ? `Valid · ${String(res.lineType)}` : "Invalid or unreachable"}
          lines={[
            res.carrier ? `Carrier: ${res.carrier}` : "",
            res.country ? `Country: ${res.country}` : "",
            res.mock ? "Demo mode — connect NumVerify for live results." : "",
          ].filter(Boolean) as string[]}
        />
      )}
    </Shell>
  );
}

function SyntaxCheck() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const v = value.trim().toLowerCase();
    if (!emailRe.test(v)) { setOut({ tone: "invalid", title: "Invalid syntax", lines: ["Not a well-formed email address."] }); return; }
    const domain = v.split("@")[1];
    if (TYPOS[domain]) { setOut({ tone: "warn", title: "Likely typo", lines: [`Did you mean ${v.split("@")[0]}@${TYPOS[domain]}?`] }); return; }
    setOut({ tone: "valid", title: "Valid syntax", lines: ["The address is well-formed. (Syntax only — not a deliverability check.)"] });
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="name@company.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Check syntax</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function DisposableCheck() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const v = value.trim().toLowerCase();
    if (!emailRe.test(v)) { setOut({ tone: "invalid", title: "Enter a valid email address" }); return; }
    const domain = v.split("@")[1];
    if (DISPOSABLE.has(domain)) setOut({ tone: "invalid", title: "Disposable domain", lines: [`${domain} is a known throwaway-email provider.`] });
    else setOut({ tone: "valid", title: "Not a known disposable domain", lines: ["This domain isn't in our disposable list. Full verification adds deeper risk checks."] });
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="name@temp-mail.org" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Check domain</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function MxLookup() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  async function run() {
    const domain = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) { setOut({ tone: "invalid", title: "Enter a valid domain", lines: ["e.g. example.com"] }); return; }
    setLoading(true); setOut(null);
    try {
      const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`);
      const data = await r.json();
      const answers: { data: string }[] = data.Answer ?? [];
      if (answers.length === 0) setOut({ tone: "warn", title: "No MX records found", lines: [`${domain} has no mail servers — addresses here will likely bounce.`] });
      else setOut({ tone: "valid", title: `${answers.length} mail server(s)`, lines: answers.map((a) => a.data.replace(/\.$/, "")) });
    } catch { setOut({ tone: "neutral", title: "Lookup unavailable", lines: ["Couldn't reach the DNS resolver from your browser."] }); }
    setLoading(false);
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="example.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Looking up…" : "Look up MX"}</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function RecordLint({ kind }: { kind: "spf" | "dmarc" | "dkim" }) {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const v = value.trim();
    const issues: string[] = [];
    if (kind === "spf") {
      if (!/^v=spf1/i.test(v)) issues.push("Should start with v=spf1.");
      const lookups = (v.match(/\b(include|a|mx|ptr|exists|redirect)[:=]/gi) ?? []).length;
      if (lookups > 10) issues.push(`~${lookups} DNS-lookup mechanisms — over the 10-lookup limit.`);
      if (!/[~\-?+]all\b/i.test(v)) issues.push("No all mechanism (~all or -all) at the end.");
    } else if (kind === "dmarc") {
      if (!/^v=DMARC1/i.test(v)) issues.push("Should start with v=DMARC1.");
      const p = v.match(/\bp=(none|quarantine|reject)\b/i);
      if (!p) issues.push("Missing policy tag (p=none|quarantine|reject).");
      else if (/none/i.test(p[1])) issues.push("Policy is p=none — monitoring only, not enforcing.");
      if (!/\brua=/i.test(v)) issues.push("No aggregate-report address (rua=) — you won't get reports.");
    } else {
      if (!/\bv=DKIM1\b/i.test(v)) issues.push("Missing v=DKIM1.");
      if (!/\bk=/i.test(v)) issues.push("Missing key type (k=rsa).");
      if (!/\bp=[A-Za-z0-9+/]+/.test(v)) issues.push("Missing or empty public key (p=).");
    }
    if (!v) setOut({ tone: "invalid", title: "Paste a record to check" });
    else if (issues.length === 0) setOut({ tone: "valid", title: "Looks good", lines: ["No common problems found in the record syntax."] });
    else setOut({ tone: "warn", title: `${issues.length} issue(s) found`, lines: issues });
  }
  const ph = kind === "spf" ? "v=spf1 include:_spf.google.com ~all" : kind === "dmarc" ? "v=DMARC1; p=reject; rua=mailto:dmarc@you.com" : "v=DKIM1; k=rsa; p=MIGfMA0...";
  return (
    <Shell>
      <textarea className={`${inputCls} min-h-[88px] font-mono text-[13px]`} placeholder={ph} value={value} onChange={(e) => setValue(e.target.value)} />
      <button className={`${btnCls} mt-3`} onClick={run} disabled={!value.trim()}>Check record</button>
      {out && <Result {...out} />}
    </Shell>
  );
}

function SpamSubject() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const s = value.trim();
    const lower = s.toLowerCase();
    const hits = SPAM_WORDS.filter((w) => lower.includes(w));
    const caps = s.replace(/[^A-Za-z]/g, "").length > 0 && s === s.toUpperCase() && /[A-Z]/.test(s);
    const bangs = (s.match(/[!$]/g) ?? []).length;
    let score = hits.length * 12 + (caps ? 25 : 0) + bangs * 8 + (s.length > 60 ? 10 : 0);
    score = Math.min(100, score);
    const lines = [
      hits.length ? `Spam-trigger words: ${hits.join(", ")}` : "No obvious spam-trigger words.",
      caps ? "Avoid ALL-CAPS subject lines." : "",
      bangs > 1 ? "Too much !/$ punctuation." : "",
      s.length > 60 ? "Long subject — aim for under ~50 characters." : "",
    ].filter(Boolean);
    setOut({ tone: score >= 50 ? "invalid" : score >= 20 ? "warn" : "valid", title: `Spam-risk score: ${score}/100`, lines });
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="FREE gift — act now!!!" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Score it</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function BounceCalc() {
  const [sent, setSent] = useState("");
  const [bounced, setBounced] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const s = Number(sent), b = Number(bounced);
    if (!s || s < 0 || b < 0 || b > s) { setOut({ tone: "invalid", title: "Enter valid numbers", lines: ["Bounced can't exceed sent."] }); return; }
    const rate = (b / s) * 100;
    const tone: Tone = rate < 2 ? "valid" : rate < 5 ? "warn" : "invalid";
    const verdict = rate < 2 ? "Safe — under the ~2% threshold." : rate < 5 ? "Elevated — verify your list before the next send." : "High risk — clean this list before sending again.";
    setOut({ tone, title: `Bounce rate: ${rate.toFixed(2)}%`, lines: [verdict] });
  }
  return (
    <Shell>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Emails sent
          <input className={inputCls} type="number" min={0} placeholder="10000" value={sent} onChange={(e) => setSent(e.target.value)} /></label>
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Emails bounced
          <input className={inputCls} type="number" min={0} placeholder="240" value={bounced} onChange={(e) => setBounced(e.target.value)} /></label>
      </div>
      <button className={`${btnCls} mt-3`} onClick={run} disabled={!sent || !bounced}>Calculate</button>
      {out && <Result {...out} />}
    </Shell>
  );
}

// ── Phase-2 widgets ──────────────────────────────────────────────────────────

export function cleanDomain(v: string) {
  return v.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").replace(/.*@/, "");
}

// All-in-one MX + SPF + DMARC + DKIM scan
function DeliverabilityTest() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ label: string; tone: Tone; detail: string }[] | null>(null);

  async function run() {
    const domain = cleanDomain(value);
    if (!domainRe.test(domain)) { setRows([{ label: "Domain", tone: "invalid", detail: "Enter a valid domain, e.g. yourcompany.com" }]); return; }
    setLoading(true); setRows(null);
    const out: { label: string; tone: Tone; detail: string }[] = [];
    try {
      const mx = await dnsResolve(domain, "MX");
      out.push(mx.length ? { label: "MX (mail servers)", tone: "valid", detail: `${mx.length} found · ${mx[0].split(" ").pop()}` } : { label: "MX (mail servers)", tone: "invalid", detail: "No MX records — this domain can't receive mail." });

      const txt = await dnsResolve(domain, "TXT");
      const spf = txt.find((t) => /^v=spf1/i.test(t));
      out.push(spf ? { label: "SPF", tone: /[~\-]all/i.test(spf) ? "valid" : "warn", detail: spf.length > 60 ? spf.slice(0, 60) + "…" : spf } : { label: "SPF", tone: "invalid", detail: "No SPF record found." });

      const dmTxt = await dnsResolve(`_dmarc.${domain}`, "TXT");
      const dmarc = dmTxt.find((t) => /^v=DMARC1/i.test(t));
      const policy = dmarc?.match(/p=(none|quarantine|reject)/i)?.[1]?.toLowerCase();
      out.push(dmarc ? { label: "DMARC", tone: policy === "none" ? "warn" : "valid", detail: policy ? `Policy: p=${policy}` : "Published" } : { label: "DMARC", tone: "invalid", detail: "No DMARC record found." });

      const selectors = ["google", "default", "selector1", "selector2", "s1", "k1", "dkim", "mail"];
      const dkimHits = await Promise.all(selectors.map(async (s) => {
        try { const r = await dnsResolve(`${s}._domainkey.${domain}`, "TXT"); return r.some((t) => /DKIM1|p=[A-Za-z0-9]/i.test(t)) ? s : null; } catch { return null; }
      }));
      const found = dkimHits.filter(Boolean) as string[];
      out.push(found.length ? { label: "DKIM", tone: "valid", detail: `Found at selector: ${found[0]}` } : { label: "DKIM", tone: "warn", detail: "No DKIM at common selectors (yours may differ)." });
    } catch {
      out.push({ label: "DNS", tone: "neutral", detail: "Couldn't reach the DNS resolver. Try again." });
    }
    setRows(out); setLoading(false);
  }

  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="yourcompany.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Scanning…" : "Run test"}</button>
      </div>
      {rows && (
        <div className="mt-4 grid gap-2.5">
          {rows.map((r) => (
            <div key={r.label} className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-[13.5px] ${toneCls[r.tone]}`}>
              <span className="font-semibold">{r.label}</span>
              <span className="text-right opacity-90 break-all">{r.detail}</span>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

const SPF_SERVICES = [
  { id: "google.com", label: "Google Workspace", inc: "_spf.google.com" },
  { id: "outlook.com", label: "Microsoft 365", inc: "spf.protection.outlook.com" },
  { id: "amazonses.com", label: "Amazon SES", inc: "amazonses.com" },
  { id: "mailchimp", label: "Mailchimp", inc: "servers.mcsv.net" },
  { id: "sendgrid.net", label: "SendGrid", inc: "sendgrid.net" },
  { id: "zoho.com", label: "Zoho Mail", inc: "zoho.com" },
  { id: "mailgun.org", label: "Mailgun", inc: "mailgun.org" },
];

function SpfGenerator() {
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [policy, setPolicy] = useState("~all");
  const includes = SPF_SERVICES.filter((s) => sel[s.id]).map((s) => `include:${s.inc}`);
  const record = `v=spf1 ${includes.join(" ")}${includes.length ? " " : ""}${policy}`.replace(/\s+/g, " ").trim();
  const lookups = includes.length;
  return (
    <Shell>
      <div className="grid gap-2 sm:grid-cols-2">
        {SPF_SERVICES.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-[14px] text-ink-2">
            <input type="checkbox" checked={!!sel[s.id]} onChange={(e) => setSel({ ...sel, [s.id]: e.target.checked })} className="accent-brand" />
            {s.label}
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] text-ink-2">
        <span className="font-medium">Policy:</span>
        {[["~all", "Softfail (recommended)"], ["-all", "Hardfail (strict)"], ["?all", "Neutral"]].map(([v, l]) => (
          <label key={v} className="flex items-center gap-1.5"><input type="radio" name="spf-all" checked={policy === v} onChange={() => setPolicy(v)} className="accent-brand" />{l}</label>
        ))}
      </div>
      <CodeOut label="Your SPF record (publish as a TXT record on your root domain)" value={record} />
      {lookups > 10 && <Result tone="warn" title="Over the 10-lookup limit" lines={["Too many includes can break SPF — consolidate senders."]} />}
    </Shell>
  );
}

function DkimGenerator() {
  const [selector, setSelector] = useState("");
  const [domain, setDomain] = useState("");
  const [key, setKey] = useState("");
  const sel = selector.trim() || "selector1";
  const dom = cleanDomain(domain) || "yourdomain.com";
  const pub = key.replace(/\s+/g, "").replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "");
  const host = `${sel}._domainkey.${dom}`;
  const record = `v=DKIM1; k=rsa; p=${pub || "<your-public-key>"}`;
  return (
    <Shell>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Selector
          <input className={inputCls} placeholder="selector1" value={selector} onChange={(e) => setSelector(e.target.value)} /></label>
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Domain
          <input className={inputCls} placeholder="yourdomain.com" value={domain} onChange={(e) => setDomain(e.target.value)} /></label>
      </div>
      <textarea className={`${inputCls} mt-3 min-h-[80px] font-mono text-[12.5px]`} placeholder="Paste the public key from your email provider" value={key} onChange={(e) => setKey(e.target.value)} />
      <CodeOut label="DNS host / name" value={host} />
      <CodeOut label="TXT record value" value={record} />
    </Shell>
  );
}

function DmarcGenerator() {
  const [policy, setPolicy] = useState("none");
  const [rua, setRua] = useState("");
  const [pct, setPct] = useState("100");
  const parts = [`v=DMARC1`, `p=${policy}`];
  if (rua.trim()) parts.push(`rua=mailto:${rua.trim()}`);
  if (pct && pct !== "100") parts.push(`pct=${pct}`);
  parts.push("adkim=s", "aspf=s");
  const record = parts.join("; ");
  return (
    <Shell>
      <div className="flex flex-wrap items-center gap-4 text-[13.5px] text-ink-2">
        <span className="font-medium">Policy:</span>
        {[["none", "Monitor"], ["quarantine", "Quarantine"], ["reject", "Reject"]].map(([v, l]) => (
          <label key={v} className="flex items-center gap-1.5"><input type="radio" name="dmarc-p" checked={policy === v} onChange={() => setPolicy(v)} className="accent-brand" />{l}</label>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Report address (rua)
          <input className={inputCls} placeholder="dmarc@yourdomain.com" value={rua} onChange={(e) => setRua(e.target.value)} /></label>
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Apply to % of mail
          <input className={inputCls} type="number" min={1} max={100} value={pct} onChange={(e) => setPct(e.target.value)} /></label>
      </div>
      <CodeOut label="DMARC record (publish as TXT at _dmarc.yourdomain.com)" value={record} />
    </Shell>
  );
}

function DnsblCheck({ mode }: { mode: "domain" | "ip" }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ label: string; tone: Tone; detail: string }[] | null>(null);

  async function dnsblStatus(ip: string, zone: string): Promise<Tone> {
    const reversed = ip.split(".").reverse().join(".");
    try {
      const r = await fetch(`https://dns.google/resolve?name=${reversed}.${zone}&type=A`);
      const data = await r.json();
      if (Array.isArray(data.Answer) && data.Answer.length) return "invalid"; // listed
      if (data.Status === 3) return "valid"; // NXDOMAIN = not listed
      return "neutral";
    } catch { return "neutral"; }
  }

  async function run() {
    const raw = value.trim();
    setLoading(true); setRows(null);
    let ip = raw;
    const out: { label: string; tone: Tone; detail: string }[] = [];
    try {
      if (mode === "domain") {
        const domain = cleanDomain(raw);
        if (!domainRe.test(domain)) { setRows([{ label: "Input", tone: "invalid", detail: "Enter a valid domain." }]); setLoading(false); return; }
        const a = await dnsResolve(domain, "A");
        ip = a.find((x) => ipv4Re.test(x)) ?? "";
        if (!ip) { setRows([{ label: domain, tone: "warn", detail: "Couldn't resolve an IPv4 address for this domain." }]); setLoading(false); return; }
        out.push({ label: "Resolved IP", tone: "neutral", detail: ip });
      } else {
        if (!ipv4Re.test(raw)) { setRows([{ label: "Input", tone: "invalid", detail: "Enter a valid IPv4 address, e.g. 203.0.113.5" }]); setLoading(false); return; }
        const ptr = await dnsResolve(`${raw.split(".").reverse().join(".")}.in-addr.arpa`, "PTR").catch(() => []);
        out.push({ label: "Reverse DNS (PTR)", tone: ptr.length ? "valid" : "warn", detail: ptr.length ? ptr[0] : "No PTR record — receivers may distrust this IP." });
      }
      const results = await Promise.all(DNSBLS.map((z) => dnsblStatus(ip, z)));
      const listed = results.filter((t) => t === "invalid").length;
      const unknown = results.filter((t) => t === "neutral").length;
      DNSBLS.forEach((z, i) => out.push({ label: z, tone: results[i], detail: results[i] === "invalid" ? "Listed" : results[i] === "valid" ? "Not listed" : "Unverifiable" }));
      out.unshift({ label: "Summary", tone: listed ? "invalid" : "valid", detail: listed ? `Listed on ${listed} blacklist(s)` : `Clean${unknown ? ` (${unknown} unverifiable)` : ""}` });
    } catch { out.push({ label: "Lookup", tone: "neutral", detail: "Lookup unavailable — try again." }); }
    setRows(out); setLoading(false);
  }

  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder={mode === "domain" ? "example.com" : "203.0.113.5"} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Checking…" : "Check"}</button>
      </div>
      {rows && (
        <div className="mt-4 grid gap-2">
          {rows.map((r, i) => (
            <div key={i} className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-[13px] ${toneCls[r.tone]}`}>
              <span className="font-mono">{r.label}</span><span className="font-semibold">{r.detail}</span>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

// catch-all reuses the email-check API (mock-capable)
function CatchAllCheck() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  async function run() {
    let email = value.trim().toLowerCase();
    if (!email.includes("@")) email = `contact@${cleanDomain(email)}`; // allow a bare domain
    if (!emailRe.test(email)) { setOut({ tone: "invalid", title: "Enter an email or domain" }); return; }
    setLoading(true); setOut(null);
    try {
      const r = await fetch("/api/tools/check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "email", value: email }) });
      const d = await r.json();
      if (!r.ok) { setOut({ tone: "invalid", title: d.error ?? "Error" }); }
      else {
        const status = String(d.status).toLowerCase();
        const isCatch = status.includes("catch") || d.subStatus === "catch-all";
        setOut(isCatch
          ? { tone: "warn", title: "Catch-all domain", lines: ["This domain accepts mail for any address — a specific mailbox can't be confirmed. Send cautiously.", d.mock ? "Demo mode — connect ZeroBounce for live SMTP results." : ""].filter(Boolean) as string[] }
          : { tone: status === "invalid" ? "invalid" : "valid", title: status === "invalid" ? "Not catch-all (and address looks invalid)" : "Not a catch-all domain", lines: [d.mock ? "Demo mode — connect ZeroBounce for live SMTP results." : ""].filter(Boolean) as string[] });
      }
    } catch { setOut({ tone: "neutral", title: "Lookup unavailable" }); }
    setLoading(false);
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="name@company.com or company.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Checking…" : "Check domain"}</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function RoleAccountCheck() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const v = value.trim().toLowerCase();
    if (!emailRe.test(v)) { setOut({ tone: "invalid", title: "Enter a valid email address" }); return; }
    const local = v.split("@")[0].replace(/[._-]?\d+$/, "");
    const isRole = ROLE_PREFIXES.has(local) || ROLE_PREFIXES.has(local.split(/[._-]/)[0]);
    setOut(isRole
      ? { tone: "warn", title: "Role account", lines: [`"${v.split("@")[0]}" is a shared/role mailbox. These engage poorly — consider segmenting or excluding.`] }
      : { tone: "valid", title: "Not a role account", lines: ["This looks like a personal mailbox."] });
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="info@company.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Check</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

// carrier + HLR reuse the phone-check API (mock-capable)
function PhoneInfo({ kind }: { kind: "carrier" | "hlr" }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  async function run() {
    setLoading(true); setOut(null);
    try {
      const r = await fetch("/api/tools/check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "phone", value }) });
      const d = await r.json();
      if (!r.ok) { setOut({ tone: "invalid", title: d.error ?? "Error" }); }
      else if (!d.valid) { setOut({ tone: "invalid", title: "Invalid or unreachable number" }); }
      else {
        const lines = [
          d.carrier ? `Carrier: ${d.carrier}` : "",
          d.lineType ? `Line type: ${d.lineType}` : "",
          d.country ? `Country: ${d.country}` : "",
          d.mock ? "Demo mode — connect NumVerify for live results." : "",
        ].filter(Boolean) as string[];
        setOut({ tone: "valid", title: kind === "hlr" ? "Active · reachable" : `Carrier found`, lines });
      }
    } catch { setOut({ tone: "neutral", title: "Lookup unavailable" }); }
    setLoading(false);
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="+1 415 555 2671" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={loading || !value.trim()}>{loading ? "Looking up…" : kind === "hlr" ? "HLR lookup" : "Find carrier"}</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function EmailFinder() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [domain, setDomain] = useState("");
  const [out, setOut] = useState<string[] | null>(null);
  function run() {
    const f = first.trim().toLowerCase().replace(/[^a-z]/g, "");
    const l = last.trim().toLowerCase().replace(/[^a-z]/g, "");
    const d = cleanDomain(domain);
    if (!f || !d || !domainRe.test(d)) { setOut(null); return; }
    const patterns = Array.from(new Set([
      `${f}.${l}`, `${f}${l}`, `${f[0]}${l}`, `${f}`, `${f}_${l}`, `${f}-${l}`, `${l}.${f}`, `${l}${f[0]}`, `${f[0]}.${l}`,
    ].filter((p) => p && !p.endsWith("."))));
    setOut(patterns.map((p) => `${p}@${d}`));
  }
  return (
    <Shell>
      <div className="grid gap-3 sm:grid-cols-3">
        <input className={inputCls} placeholder="First" value={first} onChange={(e) => setFirst(e.target.value)} />
        <input className={inputCls} placeholder="Last" value={last} onChange={(e) => setLast(e.target.value)} />
        <input className={inputCls} placeholder="company.com" value={domain} onChange={(e) => setDomain(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
      </div>
      <button className={`${btnCls} mt-3`} onClick={run} disabled={!first.trim() || !domain.trim()}>Find likely emails</button>
      {out && (
        <div className="mt-4 grid gap-2">
          {out.map((e) => (
            <div key={e} className="flex items-center justify-between rounded-lg border border-hair bg-sunk/30 px-4 py-2.5 text-[13.5px]">
              <code className="font-mono text-ink">{e}</code>
              <button className="text-[12.5px] font-medium text-brand-deep" onClick={() => navigator.clipboard?.writeText(e)}>Copy</button>
            </div>
          ))}
          <p className="mt-1 text-[12.5px] text-ink-3">Likely patterns, not confirmed mailboxes — verify before sending.</p>
        </div>
      )}
    </Shell>
  );
}

function ReverseEmail() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ tone: Tone; title: string; lines?: string[] } | null>(null);
  function run() {
    const v = value.trim().toLowerCase();
    if (!emailRe.test(v)) { setOut({ tone: "invalid", title: "Enter a valid email address" }); return; }
    const [local, domain] = v.split("@");
    const flags: string[] = [];
    flags.push(`Domain: ${domain}`);
    if (FREE_DOMAINS.has(domain)) flags.push("Type: free webmail (not a business domain)");
    else if (DISPOSABLE.has(domain)) flags.push("Type: disposable / throwaway domain");
    else flags.push("Type: business / custom domain");
    if (ROLE_PREFIXES.has(local.replace(/[._-]?\d+$/, "").split(/[._-]/)[0])) flags.push("Role account (shared mailbox)");
    const tone: Tone = DISPOSABLE.has(domain) ? "invalid" : FREE_DOMAINS.has(domain) ? "warn" : "valid";
    setOut({ tone, title: "Address breakdown", lines: flags });
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="name@company.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Analyse</button>
      </div>
      {out && <Result {...out} />}
    </Shell>
  );
}

function CompanyDomain() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<string[] | null>(null);
  function run() {
    const slug = value.trim().toLowerCase().replace(/\b(inc|llc|ltd|corp|co|company|group|the)\b/g, "").replace(/[^a-z0-9]/g, "");
    if (!slug) { setOut(null); return; }
    setOut([`${slug}.com`, `${slug}.io`, `${slug}.co`, `get${slug}.com`, `${slug}app.com`, `${slug}.net`]);
  }
  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="Acme Corporation" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} onClick={run} disabled={!value.trim()}>Find domains</button>
      </div>
      {out && (
        <div className="mt-4 grid gap-2">
          {out.map((d) => (
            <a key={d} href={`https://${d}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-hair bg-sunk/30 px-4 py-2.5 text-[13.5px] hover:border-brand">
              <code className="font-mono text-ink">{d}</code><span className="text-[12.5px] text-brand-deep">Open →</span>
            </a>
          ))}
          <p className="mt-1 text-[12.5px] text-ink-3">Likely candidates — confirm the real one before using it.</p>
        </div>
      )}
    </Shell>
  );
}

function ListCleaner() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<{ clean: string[]; stats: string[] } | null>(null);
  function run() {
    const raw = value.split(/[\s,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean);
    const total = raw.length;
    const seen = new Set<string>();
    const clean: string[] = [];
    let dupes = 0, invalid = 0, role = 0, disposable = 0;
    for (const e of raw) {
      if (!emailRe.test(e)) { invalid++; continue; }
      if (seen.has(e)) { dupes++; continue; }
      seen.add(e);
      const [local, domain] = e.split("@");
      if (DISPOSABLE.has(domain)) { disposable++; continue; }
      if (ROLE_PREFIXES.has(local.replace(/[._-]?\d+$/, "").split(/[._-]/)[0])) { role++; continue; }
      clean.push(e);
    }
    setOut({ clean, stats: [`${total} in · ${clean.length} clean out`, `${dupes} duplicates removed`, `${invalid} invalid removed`, `${role} role accounts flagged`, `${disposable} disposable removed`] });
  }
  return (
    <Shell>
      <textarea className={`${inputCls} min-h-[120px] font-mono text-[13px]`} placeholder={"alice@company.com\nbob@company.com\ninfo@temp-mail.org"} value={value} onChange={(e) => setValue(e.target.value)} />
      <button className={`${btnCls} mt-3`} onClick={run} disabled={!value.trim()}>Clean list</button>
      {out && (
        <>
          <div className="mt-4 grid gap-1.5 rounded-xl border border-brand/25 bg-brand-wash/40 p-4 text-[13px] text-ink-2">
            {out.stats.map((s) => <div key={s}>{s}</div>)}
          </div>
          {out.clean.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-medium text-ink-2">Cleaned list</span>
                <button className="text-[12.5px] font-medium text-brand-deep" onClick={() => navigator.clipboard?.writeText(out.clean.join("\n"))}>Copy all</button>
              </div>
              <textarea readOnly className={`${inputCls} mt-1.5 min-h-[100px] font-mono text-[12.5px]`} value={out.clean.join("\n")} />
            </div>
          )}
          <p className="mt-2 text-[12.5px] text-ink-3">Browser-only syntax/dedupe/role cleanup. For live mailbox + catch-all verification, upload to BounceBlock.</p>
        </>
      )}
    </Shell>
  );
}
