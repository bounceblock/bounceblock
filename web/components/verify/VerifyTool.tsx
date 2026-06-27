"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SAMPLE_CSV } from "@/lib/sample-data";
import type { PreviewResult, PreviewMapping, PreviewSample } from "@/lib/verification/preview";

const PREVIEW_LIMIT = 100;
type Step = "upload" | "map" | "loading" | "results" | "error";
type Field = keyof PreviewMapping;
type FullStatus = "idle" | "processing" | "done";

const FIELDS: { key: Field; label: string; hint: RegExp }[] = [
  { key: "email", label: "Email", hint: /e-?mail/i },
  { key: "phone", label: "Phone", hint: /phone|mobile|cell|tel/i },
  { key: "name", label: "Name", hint: /name|contact/i },
  { key: "company", label: "Company", hint: /company|organi|account|business/i },
];

function autodetect(headers: string[]): PreviewMapping {
  const m: PreviewMapping = {};
  for (const f of FIELDS) {
    const hit = headers.find((h) => f.hint.test(h));
    if (hit) m[f.key] = hit;
  }
  return m;
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function VerifyTool() {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<PreviewMapping>({});
  const [result, setResult] = useState<PreviewResult | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fullStatus, setFullStatus] = useState<FullStatus>("idle");
  const [cleanReady, setCleanReady] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function ingest(parsed: Papa.ParseResult<Record<string, string>>, name: string) {
    const fields = (parsed.meta.fields ?? []).filter(Boolean);
    const data = parsed.data.filter((r) => Object.values(r).some((v) => v && String(v).trim()));
    if (!fields.length || !data.length) {
      setError("That file didn't contain any rows we could read. Please upload a CSV with a header row.");
      setStep("error");
      return;
    }
    setFileName(name);
    setHeaders(fields);
    setRows(data);
    setMapping(autodetect(fields));
    setStep("map");
  }

  function handleFile(file: File) {
    if (!/\.csv$/i.test(file.name) && file.type !== "text/csv") {
      setError("Please upload a .csv file.");
      setStep("error");
      return;
    }
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => ingest(res, file.name),
      error: () => {
        setError("We couldn't parse that file. Please try another CSV.");
        setStep("error");
      },
    });
  }

  function loadSample() {
    Papa.parse<Record<string, string>>(SAMPLE_CSV, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => ingest(res, "sample_leads.csv"),
    });
  }

  async function runPreview() {
    if (!mapping.email && !mapping.phone) {
      setError("Map at least an email or phone column to verify.");
      return;
    }
    setError("");
    setFullStatus("idle");
    setStep("loading");
    try {
      const res = await fetch("/api/verify/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: rows.slice(0, PREVIEW_LIMIT), mapping }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Verification failed.");
      setResult(data as PreviewResult);
      setStep("results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed.");
      setStep("error");
    }
  }

  async function getFull() {
    setFullStatus("processing");
    try {
      const res = await fetch("/api/verify/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, mapping }),
      });
      if (res.status === 401) {
        // Live mode: full results are gated behind signup.
        window.location.href = "/signup?next=/verify";
        return;
      }
      const data = await res.json();
      if (res.status === 402) {
        setFullStatus("idle");
        setError("You've used your monthly allowance. Upgrade your plan for more verifications.");
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Processing failed.");
      downloadCsv(data.cleanCsv, "bounceblock_clean.csv");
      setCleanReady(data.cleanRows ?? 0);
      setFullStatus("done");
    } catch (e) {
      setFullStatus("idle");
      setError(e instanceof Error ? e.message : "Processing failed.");
    }
  }

  function reset() {
    setStep("upload");
    setFileName("");
    setHeaders([]);
    setRows([]);
    setMapping({});
    setResult(null);
    setError("");
    setFullStatus("idle");
    setCleanReady(0);
  }

  // ── UPLOAD ──
  if (step === "upload") {
    return (
      <div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload a CSV file"
          className={cn(
            "cursor-pointer rounded-xl border border-dashed bg-raised p-12 text-center shadow-s1 transition",
            dragging ? "border-brand bg-brand-wash" : "border-hair hover:border-brand"
          )}
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-brand-wash text-brand-deep">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-4 font-semibold">Drop your CSV to clean it</p>
          <p className="mt-1 text-[13.5px] text-ink-3">or click to browse — we auto-detect your columns</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-3">
            <LockIcon /> Encrypted · auto-deleted in 24h
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            aria-label="CSV file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
        <p className="mt-4 text-center text-sm text-ink-2">
          Don&rsquo;t have one handy?{" "}
          <button onClick={loadSample} className="font-medium text-brand-deep underline">
            Try with sample data
          </button>
        </p>
      </div>
    );
  }

  // ── ERROR ──
  if (step === "error") {
    return (
      <div className="rounded-xl border border-hair bg-raised p-10 text-center shadow-s1">
        <p className="font-serif text-xl">Something went wrong</p>
        <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-ink-2">{error}</p>
        <div className="mt-5">
          <Button onClick={reset} variant="ghost">Try again</Button>
        </div>
      </div>
    );
  }

  // ── MAP ──
  if (step === "map") {
    return (
      <div className="rounded-xl border border-hair bg-raised p-7 shadow-s1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{fileName}</p>
            <p className="text-[13px] text-ink-3">{rows.length.toLocaleString()} rows · we&rsquo;ll preview the first {Math.min(rows.length, PREVIEW_LIMIT)}</p>
          </div>
          <button onClick={reset} className="text-[13px] text-ink-3 hover:text-ink">Change file</button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <label key={f.key} className="grid gap-1.5">
              <span className="text-[12.5px] font-medium text-ink-2">
                {f.label}
                {f.key === "email" || f.key === "phone" ? "" : <span className="text-ink-3"> (optional)</span>}
              </span>
              <select
                value={mapping[f.key] ?? ""}
                onChange={(e) => setMapping((m) => ({ ...m, [f.key]: e.target.value || undefined }))}
                className="rounded-md border border-hair bg-canvas px-3 py-2.5 text-[14.5px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash"
              >
                <option value="">— none —</option>
                {headers.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {error && <p className="mt-4 text-[13px] text-invalid">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={runPreview}>Verify {Math.min(rows.length, PREVIEW_LIMIT)} rows free →</Button>
          <span className="text-[12.5px] text-ink-3">No credit card · results in seconds</span>
        </div>
      </div>
    );
  }

  // ── LOADING ──
  if (step === "loading") {
    return (
      <div className="rounded-xl border border-hair bg-raised p-14 text-center shadow-s1">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-hair border-t-brand" />
        <p className="mt-5 font-serif text-lg">Verifying your list…</p>
        <p className="mt-1 text-[13.5px] text-ink-3">Checking deliverability, validating phones, finding duplicates</p>
      </div>
    );
  }

  // ── RESULTS ──
  return result ? (
    <ResultsCard result={result} onReset={reset} onGetFull={getFull} fullStatus={fullStatus} cleanReady={cleanReady} />
  ) : null;
}

function ResultsCard({
  result,
  onReset,
  onGetFull,
  fullStatus,
  cleanReady,
}: {
  result: PreviewResult;
  onReset: () => void;
  onGetFull: () => void;
  fullStatus: FullStatus;
  cleanReady: number;
}) {
  const { analyzed, email, phone, duplicates, qualityScore, cleanCount, samples, mock } = result;
  const problems = email.invalid + email.unknown + email.catchAll + duplicates;
  const pct = (n: number) => (analyzed ? Math.round((n / analyzed) * 100) : 0);

  const bars = [
    { k: "Valid", n: email.valid, color: "var(--valid)" },
    { k: "Catch-all / unknown", n: email.catchAll + email.unknown, color: "var(--unknown)" },
    { k: "Invalid", n: email.invalid, color: "var(--invalid)" },
    { k: "Duplicate", n: duplicates, color: "var(--ink-3)" },
  ];

  const C = 2 * Math.PI * 49;
  const offset = C * (1 - qualityScore / 100);

  return (
    <div className="rounded-xl border border-hair bg-raised p-7 shadow-s3">
      <div className="flex flex-wrap items-center gap-6 border-b border-hair pb-6">
        <div className="relative h-[118px] w-[118px] shrink-0">
          <svg width="118" height="118" viewBox="0 0 118 118">
            <circle cx="59" cy="59" r="49" fill="none" stroke="#EDE8DE" strokeWidth="12" />
            <circle
              cx="59" cy="59" r="49" fill="none" stroke="url(#qg)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={offset} transform="rotate(-90 59 59)"
            />
            <defs>
              <linearGradient id="qg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2EA94E" />
                <stop offset="1" stopColor="#1B7FD4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <b className="block font-serif text-[34px] font-semibold leading-none">{qualityScore}</b>
              <span className="text-[10.5px] uppercase tracking-wider text-ink-3">Quality</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-xl">Your list, scored</h3>
          <p className="mt-1 text-[14px] text-ink-2">
            {analyzed.toLocaleString()} contacts analyzed · {problems.toLocaleString()} problems found
          </p>
          {phone.total > 0 && (
            <p className="mt-1 text-[13px] text-ink-3">Phones: {phone.valid}/{phone.total} active</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3.5">
        {bars.map((b) => (
          <div key={b.k} className="grid grid-cols-[140px_1fr_44px] items-center gap-3 text-[13.4px]">
            <span className="flex items-center gap-2 font-medium text-ink-2">
              <i className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
              {b.k}
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-sunk">
              <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${pct(b.n)}%`, background: b.color }} />
            </span>
            <span className="text-right font-semibold tabular-nums">{pct(b.n)}%</span>
          </div>
        ))}
      </div>

      {samples.length > 0 && (
        <div className="mt-6 grid gap-1.5">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-ink-3">Sample findings</p>
          {samples.map((s, i) => (
            <SampleRow key={i} s={s} />
          ))}
        </div>
      )}

      {mock && (
        <p className="mt-5 flex items-start gap-2 rounded-md border border-unknown/30 bg-unknown/5 px-3.5 py-2.5 text-[12.5px] text-ink-2">
          <span className="mt-0.5 text-unknown">●</span>
          Demo results — add your ZeroBounce &amp; NumVerify API keys for live verification.
        </p>
      )}

      {fullStatus === "done" ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-brand/25 bg-brand-wash/60 px-5 py-4">
          <div>
            <b className="text-[15px]">Downloaded {cleanReady.toLocaleString()} clean leads ✓</b>
            <span className="block text-[12.8px] text-ink-2">Saved as bounceblock_clean.csv</span>
          </div>
          <Button onClick={onReset} variant="ghost">Verify another list</Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-brand/25 bg-brand-wash/60 px-5 py-4">
          <div>
            <b className="text-[15px]">{cleanCount.toLocaleString()} clean leads ready</b>
            <span className="block text-[12.8px] text-ink-2">Process the full list and download the clean file</span>
          </div>
          <Button onClick={onGetFull}>{fullStatus === "processing" ? "Processing…" : "Get full results →"}</Button>
        </div>
      )}

      {fullStatus !== "done" && (
        <button onClick={onReset} className="mt-5 text-[13px] text-ink-3 underline hover:text-ink">
          Verify another list
        </button>
      )}
    </div>
  );
}

function SampleRow({ s }: { s: PreviewSample }) {
  const tone = {
    valid: "bg-valid/12 text-valid",
    invalid: "bg-invalid/12 text-invalid",
    unknown: "bg-unknown/15 text-[#A9761B]",
    dupe: "bg-ink/[.06] text-ink-2",
  }[s.tone];
  return (
    <div className="flex items-center gap-3 rounded-lg border border-hair bg-canvas px-3 py-2.5 text-[13px]">
      <span className="truncate text-ink-2">{s.value}</span>
      <span className={cn("ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", tone)}>{s.label}</span>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
