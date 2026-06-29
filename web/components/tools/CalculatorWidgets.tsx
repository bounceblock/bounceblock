"use client";

/**
 * Phase-3 free tools (SEO_PLAN §7A): calculators + checkers, each with a
 * Basic / Advanced mode toggle. Calculators run entirely client-side; the
 * checkers reuse the DNS-over-HTTPS helpers from ToolWidget. Routed here from
 * ToolWidget's switch default so the original file stays focused.
 */

import { useState } from "react";
import type { WidgetKey } from "@/lib/tools";
import {
  Shell, Result, CodeOut, inputCls, btnCls, toneCls, type Tone,
  dnsResolve, cleanDomain, domainRe, ipv4Re, emailRe, DNSBLS,
  DISPOSABLE, ROLE_PREFIXES,
} from "./ToolWidget";

// ── shared helpers ───────────────────────────────────────────────────────────
type Mode = "basic" | "advanced";
const n = (v: string) => { const x = parseFloat(v); return isFinite(x) ? x : 0; };
const fmt = (x: number) => (isFinite(x) ? x : 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
const money = (x: number) => "$" + fmt(x);
const pct = (x: number) => `${(isFinite(x) ? x : 0).toFixed(2)}%`;
const grade = (s: number) => (s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 55 ? "D" : "F");
const gradeTone = (s: number): Tone => (s >= 80 ? "valid" : s >= 60 ? "warn" : "invalid");

function ModeTabs({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="mb-5 inline-flex rounded-full border border-hair bg-sunk/40 p-1 text-[13px]">
      {(["basic", "advanced"] as Mode[]).map((m) => (
        <button key={m} type="button" onClick={() => setMode(m)}
          className={`rounded-full px-4 py-1.5 font-medium capitalize transition ${mode === m ? "bg-brand text-white shadow-glow" : "text-ink-2 hover:text-ink"}`}>
          {m}
        </button>
      ))}
    </div>
  );
}

function NumField({ label, value, set, placeholder, suffix }: { label: string; value: string; set: (v: string) => void; placeholder?: string; suffix?: string }) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">{label}
      <div className="relative">
        <input className={inputCls} type="number" min={0} placeholder={placeholder} value={value} onChange={(e) => set(e.target.value)} />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-ink-3">{suffix}</span>}
      </div>
    </label>
  );
}

function Stats({ headline, tone, items, note }: { headline?: string; tone?: Tone; items: { label: string; value: string; hint?: string }[]; note?: string }) {
  return (
    <div className="mt-5">
      {headline && <div className={`rounded-xl border px-4 py-3 text-[15px] font-semibold ${toneCls[tone ?? "neutral"]}`}>{headline}</div>}
      {items.length > 0 && (
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.label} className="rounded-xl border border-hair bg-sunk/30 px-4 py-3">
              <div className="text-[11.5px] font-medium uppercase tracking-wide text-ink-3">{it.label}</div>
              <div className="mt-0.5 text-[18px] font-semibold text-ink">{it.value}</div>
              {it.hint && <div className="mt-0.5 text-[12px] text-ink-3">{it.hint}</div>}
            </div>
          ))}
        </div>
      )}
      {note && <p className="mt-3 text-[12.5px] text-ink-3">{note}</p>}
    </div>
  );
}

const benchNote = "Benchmarks vary by industry — use them as a guide, then test against your own audience.";

// ── 1. Open rate calculator ──────────────────────────────────────────────────
function OpenRate() {
  const [mode, setMode] = useState<Mode>("basic");
  const [sent, setSent] = useState("");
  const [opens, setOpens] = useState("");
  const [bounced, setBounced] = useState("");
  const [unique, setUnique] = useState("");
  const s = n(sent);
  const delivered = Math.max(0, s - n(bounced));
  const basicRate = s ? (n(opens) / s) * 100 : 0;
  const uniqueRate = delivered ? (n(unique) / delivered) * 100 : 0;
  const totalRate = delivered ? (n(opens) / delivered) * 100 : 0;
  const rate = mode === "basic" ? basicRate : uniqueRate;
  const tone: Tone = rate >= 20 ? "valid" : rate >= 12 ? "warn" : "invalid";
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <NumField label="Emails sent" value={sent} set={setSent} placeholder="10000" />
        {mode === "basic" ? (
          <NumField label="Opens" value={opens} set={setOpens} placeholder="2200" />
        ) : (
          <NumField label="Bounced" value={bounced} set={setBounced} placeholder="240" />
        )}
        {mode === "advanced" && <>
          <NumField label="Unique opens" value={unique} set={setUnique} placeholder="2100" />
          <NumField label="Total opens" value={opens} set={setOpens} placeholder="3400" />
        </>}
      </div>
      {s > 0 && (
        <Stats headline={`Open rate: ${pct(rate)}`} tone={tone}
          items={mode === "basic" ? [
            { label: "Open rate", value: pct(basicRate), hint: "opens ÷ sent" },
          ] : [
            { label: "Delivered rate", value: pct(s ? (delivered / s) * 100 : 0), hint: `${fmt(delivered)} delivered` },
            { label: "Unique open rate", value: pct(uniqueRate), hint: "unique ÷ delivered" },
            { label: "Total open rate", value: pct(totalRate), hint: "total ÷ delivered" },
          ]}
          note={rate >= 20 ? "Above the ~20% benchmark — healthy. " + benchNote : "Below the ~20% benchmark. Verify your list to lift the delivered base. " + benchNote} />
      )}
    </Shell>
  );
}

// ── 2. List growth calculator ────────────────────────────────────────────────
function ListGrowth() {
  const [mode, setMode] = useState<Mode>("basic");
  const [start, setStart] = useState("");
  const [added, setAdded] = useState("");
  const [unsub, setUnsub] = useState("");
  const [decay, setDecay] = useState("2");
  const [months, setMonths] = useState("12");
  const st = n(start), net = n(added) - n(unsub);
  const rate = st ? (net / st) * 100 : 0;
  const ending = st + net;
  let projected = st;
  const d = n(decay) / 100, m = Math.min(120, Math.max(0, Math.round(n(months))));
  for (let i = 0; i < m; i++) projected = Math.max(0, (projected + net) * (1 - d));
  const tone: Tone = net > 0 ? "valid" : net < 0 ? "invalid" : "neutral";
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-3">
        <NumField label="Starting subscribers" value={start} set={setStart} placeholder="20000" />
        <NumField label="New sign-ups" value={added} set={setAdded} placeholder="1800" />
        <NumField label="Unsubscribes" value={unsub} set={setUnsub} placeholder="400" />
        {mode === "advanced" && <>
          <NumField label="Monthly decay" value={decay} set={setDecay} placeholder="2" suffix="%/mo" />
          <NumField label="Project ahead" value={months} set={setMonths} placeholder="12" suffix="mo" />
        </>}
      </div>
      {st > 0 && (
        <Stats headline={`Net growth: ${net >= 0 ? "+" : ""}${fmt(net)} (${pct(rate)})`} tone={tone}
          items={mode === "basic" ? [
            { label: "Ending list", value: fmt(ending) },
            { label: "Growth rate", value: pct(rate), hint: "net ÷ starting" },
          ] : [
            { label: "Ending list (this period)", value: fmt(ending) },
            { label: `Projected after ${m} mo`, value: fmt(projected), hint: `with ${n(decay)}%/mo decay` },
            { label: "Net monthly add", value: `${net >= 0 ? "+" : ""}${fmt(net)}` },
            { label: "Effective growth", value: pct(st ? ((projected - st) / st) * 100 / Math.max(1, m) : 0), hint: "avg/mo after decay" },
          ]}
          note="Email lists decay ~2–2.5%/mo as addresses go stale — projection counts only reachable contacts." />
      )}
    </Shell>
  );
}

// ── 3. Email ROI calculator ──────────────────────────────────────────────────
function EmailRoi() {
  const [mode, setMode] = useState<Mode>("basic");
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [list, setList] = useState("");
  const [open, setOpen] = useState("22");
  const [ctr, setCtr] = useState("12");
  const [conv, setConv] = useState("3");
  const [aov, setAov] = useState("80");
  const opens = n(list) * n(open) / 100;
  const clicks = opens * n(ctr) / 100;
  const conversions = clicks * n(conv) / 100;
  const advRevenue = conversions * n(aov);
  const rev = mode === "basic" ? n(revenue) : advRevenue;
  const c = n(cost);
  const roi = c ? ((rev - c) / c) * 100 : 0;
  const perDollar = c ? rev / c : 0;
  const tone: Tone = roi >= 100 ? "valid" : roi >= 0 ? "warn" : "invalid";
  const ready = mode === "basic" ? c > 0 : n(list) > 0 && c >= 0;
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      {mode === "basic" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <NumField label="Campaign cost" value={cost} set={setCost} placeholder="500" suffix="$" />
          <NumField label="Revenue generated" value={revenue} set={setRevenue} placeholder="4200" suffix="$" />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <NumField label="List size" value={list} set={setList} placeholder="25000" />
          <NumField label="Send cost" value={cost} set={setCost} placeholder="500" suffix="$" />
          <NumField label="Open rate" value={open} set={setOpen} placeholder="22" suffix="%" />
          <NumField label="Click rate (of opens)" value={ctr} set={setCtr} placeholder="12" suffix="%" />
          <NumField label="Conversion rate (of clicks)" value={conv} set={setConv} placeholder="3" suffix="%" />
          <NumField label="Avg order value" value={aov} set={setAov} placeholder="80" suffix="$" />
        </div>
      )}
      {ready && (
        <Stats headline={`ROI: ${roi >= 0 ? "+" : ""}${roi.toFixed(0)}%`} tone={tone}
          items={mode === "basic" ? [
            { label: "Return per $1", value: `$${perDollar.toFixed(2)}` },
            { label: "Net profit", value: money(rev - c) },
          ] : [
            { label: "Projected revenue", value: money(advRevenue) },
            { label: "Conversions", value: fmt(conversions) },
            { label: "Return per $1", value: `$${perDollar.toFixed(2)}` },
            { label: "Net profit", value: money(rev - c) },
          ]}
          note="A verified list lifts deliverability — which raises opens, clicks and every number downstream." />
      )}
    </Shell>
  );
}

// ── 4. Spam complaint rate calculator ────────────────────────────────────────
function ComplaintRate() {
  const [mode, setMode] = useState<Mode>("basic");
  const [delivered, setDelivered] = useState("");
  const [complaints, setComplaints] = useState("");
  const rows = [
    { key: "gmail", label: "Gmail" },
    { key: "yahoo", label: "Yahoo / AOL" },
    { key: "other", label: "Other" },
  ] as const;
  const [adv, setAdv] = useState<Record<string, { d: string; c: string }>>({ gmail: { d: "", c: "" }, yahoo: { d: "", c: "" }, other: { d: "", c: "" } });
  const setAdvCell = (k: string, f: "d" | "c", v: string) => setAdv((p) => ({ ...p, [k]: { ...p[k], [f]: v } }));
  const basicRate = n(delivered) ? (n(complaints) / n(delivered)) * 100 : 0;
  const advTotals = rows.reduce((acc, r) => ({ d: acc.d + n(adv[r.key].d), c: acc.c + n(adv[r.key].c) }), { d: 0, c: 0 });
  const advRate = advTotals.d ? (advTotals.c / advTotals.d) * 100 : 0;
  const rate = mode === "basic" ? basicRate : advRate;
  const tone: Tone = rate < 0.1 ? "valid" : rate < 0.3 ? "warn" : "invalid";
  const verdict = rate < 0.1 ? "Healthy — under the 0.1% target." : rate < 0.3 ? "Watch out — over the 0.1% target, approaching the 0.3% limit." : "Over the 0.3% hard limit — providers will throttle or block you.";
  const ready = mode === "basic" ? n(delivered) > 0 : advTotals.d > 0;
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      {mode === "basic" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <NumField label="Emails delivered" value={delivered} set={setDelivered} placeholder="50000" />
          <NumField label="Spam complaints" value={complaints} set={setComplaints} placeholder="45" />
        </div>
      ) : (
        <div className="grid gap-2.5">
          {rows.map((r) => (
            <div key={r.key} className="grid grid-cols-[1fr_1fr_1fr] items-end gap-2.5">
              <span className="pb-3 text-[13px] font-medium text-ink-2">{r.label}</span>
              <NumField label="Delivered" value={adv[r.key].d} set={(v) => setAdvCell(r.key, "d", v)} placeholder="25000" />
              <NumField label="Complaints" value={adv[r.key].c} set={(v) => setAdvCell(r.key, "c", v)} placeholder="20" />
            </div>
          ))}
        </div>
      )}
      {ready && (
        <Stats headline={`Complaint rate: ${rate.toFixed(3)}%`} tone={tone}
          items={mode === "basic" ? [
            { label: "Per 1,000 emails", value: (rate * 10).toFixed(2), hint: "complaints / 1k" },
            { label: "Target", value: "< 0.10%" },
          ] : [
            ...rows.map((r) => ({ label: r.label, value: n(adv[r.key].d) ? `${((n(adv[r.key].c) / n(adv[r.key].d)) * 100).toFixed(3)}%` : "—" })),
            { label: "Overall", value: `${advRate.toFixed(3)}%` },
          ]}
          note={verdict} />
      )}
    </Shell>
  );
}

// ── 5. Freemail revenue loss calculator ──────────────────────────────────────
function FreemailRevenue() {
  const [mode, setMode] = useState<Mode>("basic");
  const [list, setList] = useState("");
  const [freePct, setFreePct] = useState("");
  const [rev, setRev] = useState("");
  const [gap, setGap] = useState("70");
  const [churn, setChurn] = useState("2");
  const freeCount = n(list) * n(freePct) / 100;
  const gapMul = mode === "basic" ? 1 : n(gap) / 100;
  const lost = freeCount * n(rev) * gapMul;
  const annual = lost * (1 + n(churn) / 100 * 12) ; // churn compounds the leak
  const tone: Tone = lost > 0 ? "warn" : "neutral";
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-3">
        <NumField label="List size" value={list} set={setList} placeholder="40000" />
        <NumField label="% free / disposable" value={freePct} set={setFreePct} placeholder="18" suffix="%" />
        <NumField label="Revenue per valid contact" value={rev} set={setRev} placeholder="6" suffix="$" />
        {mode === "advanced" && <>
          <NumField label="Conversion gap" value={gap} set={setGap} placeholder="70" suffix="%" />
          <NumField label="Monthly churn" value={churn} set={setChurn} placeholder="2" suffix="%" />
        </>}
      </div>
      {n(list) > 0 && n(rev) > 0 && (
        <Stats headline={`Estimated revenue at risk: ${money(lost)}`} tone={tone}
          items={mode === "basic" ? [
            { label: "Free / disposable contacts", value: fmt(freeCount) },
            { label: "Revenue at risk", value: money(lost) },
          ] : [
            { label: "Free / disposable contacts", value: fmt(freeCount) },
            { label: "Per-campaign loss", value: money(lost), hint: `${n(gap)}% conversion gap` },
            { label: "Annualised", value: money(annual), hint: "with churn" },
            { label: "Share of list", value: pct(n(freePct)) },
          ]}
          note="An estimate from your inputs — verify and enrich signups at the form to stop the leak." />
      )}
    </Shell>
  );
}

// ── 6. Email verification ROI calculator ─────────────────────────────────────
function VerifyCalc() {
  const [mode, setMode] = useState<Mode>("basic");
  const [list, setList] = useState("");
  const [invalid, setInvalid] = useState("");
  const [costK, setCostK] = useState("1");
  const [campaigns, setCampaigns] = useState("12");
  const caught = n(list) * n(invalid) / 100;
  const clean = Math.max(0, n(list) - caught);
  const projBounce = 0.5; // residual after a verification pass
  const perCampaignSaved = (caught / 1000) * n(costK);
  const annualSaved = perCampaignSaved * n(campaigns);
  const tone: Tone = "valid";
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <NumField label="List size" value={list} set={setList} placeholder="50000" />
        <NumField label="Estimated invalid rate" value={invalid} set={setInvalid} placeholder="15" suffix="%" />
        {mode === "advanced" && <>
          <NumField label="Cost per 1,000 sends" value={costK} set={setCostK} placeholder="1.00" suffix="$" />
          <NumField label="Campaigns / year" value={campaigns} set={setCampaigns} placeholder="12" />
        </>}
      </div>
      {n(list) > 0 && (
        <Stats headline={`~${fmt(caught)} invalid addresses caught`} tone={tone}
          items={mode === "basic" ? [
            { label: "Clean list size", value: fmt(clean) },
            { label: "Bounce rate after", value: `${n(invalid).toFixed(1)}% → ~${projBounce}%` },
          ] : [
            { label: "Clean list size", value: fmt(clean) },
            { label: "Bounce rate after", value: `${n(invalid).toFixed(1)}% → ~${projBounce}%` },
            { label: "Saved per campaign", value: money(perCampaignSaved), hint: "wasted sends avoided" },
            { label: "Saved per year", value: money(annualSaved), hint: `${n(campaigns)} campaigns` },
          ]}
          note="Beyond wasted sends, verifying protects sender reputation and lifts deliverability on every future send." />
      )}
    </Shell>
  );
}

// ── 7. Bounce rate predictor ─────────────────────────────────────────────────
const SOURCES = [
  { id: "double", label: "Double opt-in", base: 0.5 },
  { id: "single", label: "Single opt-in", base: 1.5 },
  { id: "form", label: "Website / signup form", base: 3 },
  { id: "lead", label: "Lead magnet / gated content", base: 5 },
  { id: "purchased", label: "Purchased / rented", base: 14 },
  { id: "scraped", label: "Scraped / appended", base: 22 },
];
const AGES = [
  { id: "fresh", label: "Under 1 month", add: 0 },
  { id: "recent", label: "1–6 months", add: 1.5 },
  { id: "old", label: "6–12 months", add: 3.5 },
  { id: "stale", label: "Over 12 months", add: 7 },
];
function Select({ label, value, set, options }: { label: string; value: string; set: (v: string) => void; options: { id: string; label: string }[] }) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">{label}
      <select className={inputCls} value={value} onChange={(e) => set(e.target.value)}>
        {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
    </label>
  );
}
function BouncePredictor() {
  const [mode, setMode] = useState<Mode>("basic");
  const [source, setSource] = useState("form");
  const [age, setAge] = useState("recent");
  const [unverified, setUnverified] = useState("100");
  const [sinceClean, setSinceClean] = useState("6");
  const [show, setShow] = useState(false);
  const src = SOURCES.find((s) => s.id === source)!;
  const ag = AGES.find((a) => a.id === age)!;
  let predicted = src.base + ag.add;
  if (mode === "advanced") predicted += (n(unverified) / 100) * 1.5 + n(sinceClean) * 0.4;
  predicted = Math.min(60, predicted);
  const low = Math.max(0, predicted * 0.7), high = predicted * 1.4;
  const tone: Tone = predicted < 2 ? "valid" : predicted < 5 ? "warn" : "invalid";
  const verdict = predicted < 2 ? "Likely safe — under the ~2% threshold." : predicted < 5 ? "Elevated — verify before sending." : "High risk — clean this list before you send.";
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Select label="List source" value={source} set={setSource} options={SOURCES} />
        <Select label="List age" value={age} set={setAge} options={AGES} />
        {mode === "advanced" && <>
          <NumField label="% unverified" value={unverified} set={setUnverified} placeholder="100" suffix="%" />
          <NumField label="Months since cleaned" value={sinceClean} set={setSinceClean} placeholder="6" />
        </>}
      </div>
      <button className={`${btnCls} mt-4`} type="button" onClick={() => setShow(true)}>Predict bounce rate</button>
      {show && (
        <Stats headline={`Predicted bounce rate: ${low.toFixed(1)}–${high.toFixed(1)}%`} tone={tone}
          items={[
            { label: "Most likely", value: pct(predicted) },
            { label: "Verdict", value: tone === "valid" ? "Safe" : tone === "warn" ? "Elevated" : "High risk" },
          ]}
          note={`${verdict} This is an estimate from list signals, not a guarantee.`} />
      )}
    </Shell>
  );
}

// ── 8. List hygiene score ────────────────────────────────────────────────────
function HygieneScore() {
  const [mode, setMode] = useState<Mode>("basic");
  const [value, setValue] = useState("");
  const [bounce, setBounce] = useState("");
  const [sinceVerified, setSinceVerified] = useState("");
  const [out, setOut] = useState<{ score: number; items: { label: string; value: string }[] } | null>(null);
  function run() {
    const raw = value.split(/[\s,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean);
    const total = raw.length;
    if (!total) { setOut(null); return; }
    const seen = new Set<string>();
    let invalid = 0, dupes = 0, role = 0, disposable = 0;
    for (const e of raw) {
      if (!emailRe.test(e)) { invalid++; continue; }
      if (seen.has(e)) { dupes++; continue; }
      seen.add(e);
      const [local, domain] = e.split("@");
      if (DISPOSABLE.has(domain)) { disposable++; continue; }
      if (ROLE_PREFIXES.has(local.replace(/[._-]?\d+$/, "").split(/[._-]/)[0])) role++;
    }
    let score = 100
      - (invalid / total) * 40
      - (dupes / total) * 20
      - (disposable / total) * 25
      - (role / total) * 15;
    if (mode === "advanced") score -= Math.min(30, n(bounce) * 2) + Math.min(20, n(sinceVerified) * 2);
    score = Math.max(0, Math.round(score));
    setOut({
      score,
      items: [
        { label: "Total", value: fmt(total) },
        { label: "Invalid syntax", value: `${invalid} (${pct((invalid / total) * 100)})` },
        { label: "Duplicates", value: `${dupes} (${pct((dupes / total) * 100)})` },
        { label: "Disposable", value: `${disposable} (${pct((disposable / total) * 100)})` },
        { label: "Role accounts", value: `${role} (${pct((role / total) * 100)})` },
      ],
    });
  }
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <textarea className={`${inputCls} min-h-[120px] font-mono text-[13px]`} placeholder={"alice@company.com\nbob@company.com\ninfo@temp-mail.org"} value={value} onChange={(e) => setValue(e.target.value)} />
      {mode === "advanced" && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <NumField label="Recent bounce rate" value={bounce} set={setBounce} placeholder="3" suffix="%" />
          <NumField label="Months since verified" value={sinceVerified} set={setSinceVerified} placeholder="6" />
        </div>
      )}
      <button className={`${btnCls} mt-3`} type="button" onClick={run} disabled={!value.trim()}>Score my list</button>
      {out && (
        <Stats headline={`Hygiene score: ${out.score}/100 — grade ${grade(out.score)}`} tone={gradeTone(out.score)}
          items={out.items}
          note="Runs entirely in your browser. For live mailbox + catch-all checks, upload to BounceBlock." />
      )}
    </Shell>
  );
}

// ── DNS-based checkers ───────────────────────────────────────────────────────
function mailProvider(host: string) {
  const h = host.toLowerCase();
  if (h.includes("google")) return "Google Workspace";
  if (h.includes("outlook") || h.includes("microsoft")) return "Microsoft 365";
  if (h.includes("zoho")) return "Zoho Mail";
  if (h.includes("amazonaws") || h.includes("amazonses")) return "Amazon SES / WorkMail";
  if (h.includes("proofpoint") || h.includes("pphosted")) return "Proofpoint";
  if (h.includes("mimecast")) return "Mimecast";
  if (h.includes("messagingengine")) return "Fastmail";
  if (h.includes("secureserver")) return "GoDaddy";
  if (h.includes("yandex")) return "Yandex";
  if (h.includes("mailgun") || h.includes("sendgrid") || h.includes("mandrill")) return "ESP relay";
  return "Custom / self-hosted";
}
async function blacklistCount(ip: string): Promise<{ listed: number; checked: number }> {
  const reversed = ip.split(".").reverse().join(".");
  const results = await Promise.all(DNSBLS.map(async (zone) => {
    try {
      const r = await fetch(`https://dns.google/resolve?name=${reversed}.${zone}&type=A`);
      const dd = await r.json();
      if (Array.isArray(dd.Answer) && dd.Answer.length) return "listed";
      if (dd.Status === 3) return "clean";
      return "unknown";
    } catch { return "unknown"; }
  }));
  return { listed: results.filter((x) => x === "listed").length, checked: results.filter((x) => x !== "unknown").length };
}

// ── 9. Email server tester ───────────────────────────────────────────────────
function EmailServer() {
  const [mode, setMode] = useState<Mode>("basic");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ label: string; tone: Tone; detail: string }[] | null>(null);
  async function run() {
    const domain = cleanDomain(value);
    if (!domainRe.test(domain)) { setRows([{ label: "Domain", tone: "invalid", detail: "Enter a valid domain, e.g. yourcompany.com" }]); return; }
    setLoading(true); setRows(null);
    const out: { label: string; tone: Tone; detail: string }[] = [];
    try {
      const mx = (await dnsResolve(domain, "MX")).sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));
      if (!mx.length) { out.push({ label: "MX", tone: "invalid", detail: "No mail servers — this domain can't receive email." }); }
      else {
        const hosts = mx.map((m) => m.split(/\s+/).pop()!).filter(Boolean);
        out.push({ label: "Provider", tone: "valid", detail: mailProvider(hosts[0]) });
        out.push({ label: `MX records (${mx.length})`, tone: "valid", detail: hosts.slice(0, 4).join(", ") });
        if (mode === "advanced") {
          for (const host of hosts.slice(0, 3)) {
            const a = (await dnsResolve(host, "A")).filter((x) => ipv4Re.test(x));
            const ip = a[0] ?? "";
            let ptr = "";
            if (ip) ptr = (await dnsResolve(`${ip.split(".").reverse().join(".")}.in-addr.arpa`, "PTR").catch(() => []))[0] ?? "";
            out.push({ label: host, tone: ip ? "valid" : "warn", detail: ip ? `${ip}${ptr ? ` · PTR ${ptr}` : " · no PTR"}` : "no A record" });
          }
        }
      }
    } catch { out.push({ label: "DNS", tone: "neutral", detail: "Couldn't reach the resolver. Try again." }); }
    setRows(out); setLoading(false);
  }
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="yourcompany.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} type="button" onClick={run} disabled={loading || !value.trim()}>{loading ? "Testing…" : "Test server"}</button>
      </div>
      {rows && <RowList rows={rows} />}
    </Shell>
  );
}

function RowList({ rows }: { rows: { label: string; tone: Tone; detail: string }[] }) {
  return (
    <div className="mt-4 grid gap-2.5">
      {rows.map((r, i) => (
        <div key={i} className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-[13.5px] ${toneCls[r.tone]}`}>
          <span className="font-semibold">{r.label}</span>
          <span className="break-all text-right opacity-90">{r.detail}</span>
        </div>
      ))}
    </div>
  );
}

// ── 10. Inbox placement estimator ────────────────────────────────────────────
function InboxPlacement() {
  const [mode, setMode] = useState<Mode>("basic");
  const [c, setC] = useState<Record<string, boolean>>({ spf: false, dkim: false, dmarc: false, verified: false });
  const [engagement, setEngagement] = useState("");
  const [complaints, setComplaints] = useState("low");
  const toggle = (k: string) => setC((p) => ({ ...p, [k]: !p[k] }));
  const checks = [
    { key: "spf", label: "SPF is set up", w: mode === "basic" ? 25 : 15 },
    { key: "dkim", label: "DKIM is signing your mail", w: mode === "basic" ? 25 : 15 },
    { key: "dmarc", label: "DMARC is published", w: mode === "basic" ? 25 : 20 },
    { key: "verified", label: "List is verified / clean", w: mode === "basic" ? 25 : 25 },
  ];
  let score = checks.reduce((s, ch) => s + (c[ch.key] ? ch.w : 0), 0);
  if (mode === "advanced") {
    score += Math.min(15, (n(engagement) / 100) * 15);
    score += complaints === "low" ? 10 : complaints === "med" ? 5 : 0;
  }
  score = Math.round(score);
  const weakest = checks.find((ch) => !c[ch.key]);
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-2.5">
        {checks.map((ch) => (
          <label key={ch.key} className="flex items-center gap-2.5 rounded-xl border border-hair bg-sunk/30 px-4 py-3 text-[14px] text-ink-2">
            <input type="checkbox" checked={!!c[ch.key]} onChange={() => toggle(ch.key)} className="accent-brand" />
            {ch.label}
          </label>
        ))}
        {mode === "advanced" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <NumField label="Avg engagement (open) rate" value={engagement} set={setEngagement} placeholder="22" suffix="%" />
            <Select label="Complaint history" value={complaints} set={setComplaints} options={[{ id: "low", label: "Low (< 0.1%)" }, { id: "med", label: "Medium (0.1–0.3%)" }, { id: "high", label: "High (> 0.3%)" }]} />
          </div>
        )}
      </div>
      <Stats headline={`Estimated placement score: ${score}/100 — grade ${grade(score)}`} tone={gradeTone(score)}
        items={[
          { label: "Authentication", value: `${[c.spf, c.dkim, c.dmarc].filter(Boolean).length}/3 set` },
          { label: "Biggest gap", value: weakest ? weakest.label.replace(/ is.*| is| set up/i, "") : "None — solid" },
        ]}
        note="An estimate from your reported signals, not a seed-list test — fix the biggest gap first." />
    </Shell>
  );
}

// ── 11. Email warmup calculator ──────────────────────────────────────────────
function Warmup() {
  const [mode, setMode] = useState<Mode>("basic");
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [increase, setIncrease] = useState("30");
  const cur = Math.max(1, n(current)), tgt = n(target);
  const step = 1 + (mode === "advanced" ? n(increase) : 30) / 100;
  let days = 0, vol = cur;
  const schedule: { day: number; volume: number }[] = [];
  if (tgt > cur && step > 1) {
    while (vol < tgt && days < 120) {
      days++;
      vol = Math.min(tgt, Math.round(vol * step));
      if (schedule.length < 30) schedule.push({ day: days, volume: vol });
    }
  }
  const ready = tgt > cur;
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <NumField label="Current daily volume" value={current} set={setCurrent} placeholder="50" />
        <NumField label="Target daily volume" value={target} set={setTarget} placeholder="5000" />
        {mode === "advanced" && <NumField label="Daily increase" value={increase} set={setIncrease} placeholder="30" suffix="%" />}
      </div>
      {ready ? (
        <>
          <Stats headline={`~${days} days to reach ${fmt(tgt)}/day`} tone="valid"
            items={[
              { label: "Daily increase", value: `${mode === "advanced" ? n(increase) : 30}%` },
              { label: "Ramp from", value: `${fmt(cur)} → ${fmt(tgt)}` },
            ]}
            note="Send to your most engaged, verified contacts during warmup and keep bounces/complaints low." />
          {mode === "advanced" && schedule.length > 0 && (
            <div className="mt-3 max-h-56 overflow-auto rounded-xl border border-hair">
              <table className="w-full text-[13px]">
                <thead className="sticky top-0 bg-sunk/60 text-ink-2"><tr><th className="px-4 py-2 text-left font-medium">Day</th><th className="px-4 py-2 text-right font-medium">Max sends</th></tr></thead>
                <tbody>
                  {schedule.map((s) => (
                    <tr key={s.day} className="border-t border-hair"><td className="px-4 py-1.5">{s.day}</td><td className="px-4 py-1.5 text-right font-mono">{fmt(s.volume)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (n(target) > 0 && <Result tone="warn" title="Target should be higher than current volume" />)}
    </Shell>
  );
}

// ── 12. CIDR ↔ IP range converter ────────────────────────────────────────────
function ipToInt(ip: string) { return ip.split(".").reduce((a, o) => (a << 8) + (parseInt(o, 10) & 255), 0) >>> 0; }
function intToIp(x: number) { return [(x >>> 24) & 255, (x >>> 16) & 255, (x >>> 8) & 255, x & 255].join("."); }
function validIp(ip: string) { return ipv4Re.test(ip) && ip.split(".").every((o) => +o >= 0 && +o <= 255); }
function trailingZeros(x: number) {
  if (x === 0) return 32;
  let count = 0;
  while ((x & 1) === 0) { x >>>= 1; count++; }
  return count;
}
function rangeToCidrs(start: number, end: number) {
  const cidrs: string[] = [];
  let s = start;
  while (s <= end && cidrs.length < 80) {
    const alignBits = trailingZeros(s);              // biggest block that can start at s
    const rangeBits = Math.floor(Math.log2(end - s + 1)); // biggest block that fits in remaining range
    const bits = Math.min(alignBits, rangeBits);
    cidrs.push(`${intToIp(s)}/${32 - bits}`);
    s += Math.pow(2, bits);
  }
  return cidrs;
}
function Cidr() {
  const [mode, setMode] = useState<Mode>("basic");
  const [cidr, setCidr] = useState("");
  const [startIp, setStartIp] = useState("");
  const [endIp, setEndIp] = useState("");
  const [out, setOut] = useState<{ headline: string; tone: Tone; items: { label: string; value: string }[]; codes?: { label: string; value: string }[] } | null>(null);
  function runCidr() {
    const m = cidr.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
    if (!m || !validIp(m[1]) || +m[2] > 32) { setOut({ headline: "Enter a valid CIDR block, e.g. 203.0.113.0/24", tone: "invalid", items: [] }); return; }
    const prefix = +m[2];
    const mask = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const network = (ipToInt(m[1]) & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const totalCount = Math.pow(2, 32 - prefix);
    const usable = prefix >= 31 ? totalCount : totalCount - 2;
    const items = [
      { label: "Network address", value: intToIp(network) },
      { label: "Broadcast address", value: intToIp(broadcast) },
      { label: "Usable host range", value: prefix >= 31 ? `${intToIp(network)} – ${intToIp(broadcast)}` : `${intToIp((network + 1) >>> 0)} – ${intToIp((broadcast - 1) >>> 0)}` },
      { label: "Total addresses", value: fmt(totalCount) },
      { label: "Usable hosts", value: fmt(usable) },
      { label: "Subnet mask", value: intToIp(mask) },
    ];
    if (mode === "advanced") {
      items.push({ label: "Wildcard mask", value: intToIp(~mask >>> 0) });
      items.push({ label: "Mask (binary)", value: (mask >>> 0).toString(2).padStart(32, "0").replace(/(.{8})(?=.)/g, "$1.") });
    }
    setOut({ headline: `${cidr.trim()} → ${fmt(totalCount)} addresses`, tone: "valid", items });
  }
  function runRange() {
    if (!validIp(startIp.trim()) || !validIp(endIp.trim())) { setOut({ headline: "Enter a valid start and end IP", tone: "invalid", items: [] }); return; }
    const s = ipToInt(startIp.trim()), e = ipToInt(endIp.trim());
    if (s > e) { setOut({ headline: "Start IP must be ≤ end IP", tone: "invalid", items: [] }); return; }
    const cidrs = rangeToCidrs(s, e);
    setOut({ headline: `${startIp.trim()} – ${endIp.trim()} → ${cidrs.length} CIDR block(s)`, tone: "valid", items: [{ label: "Total addresses", value: fmt(e - s + 1) }], codes: cidrs.map((c) => ({ label: "", value: c })) });
  }
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="203.0.113.0/24" value={cidr} onChange={(e) => setCidr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runCidr()} />
        <button className={btnCls} type="button" onClick={runCidr} disabled={!cidr.trim()}>Convert CIDR</button>
      </div>
      {mode === "advanced" && (
        <div className="mt-4 border-t border-hair pt-4">
          <div className="mb-2 text-[12.5px] font-medium text-ink-2">Or convert an IP range back to CIDR</div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input className={inputCls} placeholder="203.0.113.10" value={startIp} onChange={(e) => setStartIp(e.target.value)} />
            <input className={inputCls} placeholder="203.0.113.130" value={endIp} onChange={(e) => setEndIp(e.target.value)} />
            <button className={btnCls} type="button" onClick={runRange} disabled={!startIp.trim() || !endIp.trim()}>Range → CIDR</button>
          </div>
        </div>
      )}
      {out && (
        <Stats headline={out.headline} tone={out.tone} items={out.items}
          note={out.tone === "valid" ? "Handy for SPF includes and IP allowlists." : undefined} />
      )}
      {out?.codes && out.codes.map((c, i) => <CodeOut key={i} label={i === 0 ? "CIDR blocks" : ""} value={c.value} />)}
    </Shell>
  );
}

// ── 13. Send time optimizer ──────────────────────────────────────────────────
const SEND_TIMES: Record<string, { window: string; note: string }[]> = {
  b2b: [
    { window: "Tue–Thu, 9–11 AM", note: "Start-of-day inbox triage — strongest for B2B" },
    { window: "Tue–Thu, 1–3 PM", note: "Post-lunch lull, good open rates" },
    { window: "Wed, 8 AM", note: "Mid-week peak attention" },
  ],
  b2c: [
    { window: "Weekdays, 6–9 PM", note: "After-work personal email time" },
    { window: "Sat–Sun, 9–11 AM", note: "Relaxed weekend browsing" },
    { window: "Mon, 8–10 PM", note: "Week-planning window" },
  ],
};
const INDUSTRY_HINT: Record<string, string> = {
  general: "Test ±1 hour around each window.",
  ecommerce: "Evenings and weekends convert best; sync sends to promotions.",
  saas: "Mid-week mornings; avoid Mondays and Fridays.",
  media: "Early mornings — readers check before work.",
  nonprofit: "Sunday evenings and end-of-month drive donations.",
};
function SendTime() {
  const [mode, setMode] = useState<Mode>("basic");
  const [aud, setAud] = useState("b2b");
  const [tz, setTz] = useState("");
  const [industry, setIndustry] = useState("general");
  const [spread, setSpread] = useState("single");
  const windows = SEND_TIMES[aud];
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Select label="Audience type" value={aud} set={setAud} options={[{ id: "b2b", label: "B2B (work inboxes)" }, { id: "b2c", label: "B2C (personal inboxes)" }]} />
        <label className="grid gap-1.5 text-[13px] font-medium text-ink-2">Primary time zone
          <input className={inputCls} placeholder="e.g. US Eastern" value={tz} onChange={(e) => setTz(e.target.value)} /></label>
        {mode === "advanced" && <>
          <Select label="Industry" value={industry} set={setIndustry} options={[{ id: "general", label: "General" }, { id: "ecommerce", label: "E-commerce" }, { id: "saas", label: "SaaS" }, { id: "media", label: "Media / publishing" }, { id: "nonprofit", label: "Nonprofit" }]} />
          <Select label="Time-zone spread" value={spread} set={setSpread} options={[{ id: "single", label: "Mostly one zone" }, { id: "regional", label: "A few zones" }, { id: "global", label: "Global" }]} />
        </>}
      </div>
      <div className="mt-5 grid gap-2.5">
        {windows.map((w, i) => (
          <div key={w.window} className="flex items-start gap-3 rounded-xl border border-hair bg-sunk/30 px-4 py-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-wash text-[12px] font-semibold text-brand-deep">{i + 1}</span>
            <div>
              <div className="text-[14.5px] font-semibold text-ink">{w.window}{tz ? ` (${tz})` : ""}</div>
              <div className="text-[12.5px] text-ink-3">{w.note}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-ink-3">
        {mode === "advanced"
          ? `${INDUSTRY_HINT[industry]}${spread === "global" ? " With a global audience, send in batches per region or use send-time optimization." : spread === "regional" ? " Stagger sends across your main zones." : ""}`
          : "Research-backed starting windows — always A/B test against your own audience."}
      </p>
    </Shell>
  );
}

// ── 14. Domain reputation checker ────────────────────────────────────────────
function DomainReputation() {
  const [mode, setMode] = useState<Mode>("basic");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<{ score: number; rows: { label: string; tone: Tone; detail: string }[] } | null>(null);
  async function run() {
    const domain = cleanDomain(value);
    if (!domainRe.test(domain)) { setOut({ score: 0, rows: [{ label: "Domain", tone: "invalid", detail: "Enter a valid domain." }] }); return; }
    setLoading(true); setOut(null);
    const rows: { label: string; tone: Tone; detail: string }[] = [];
    let score = 0;
    try {
      const mx = await dnsResolve(domain, "MX");
      const hasMx = mx.length > 0;
      if (hasMx) score += 20;
      rows.push({ label: "MX (mail servers)", tone: hasMx ? "valid" : "invalid", detail: hasMx ? `${mx.length} found` : "None" });

      const txt = await dnsResolve(domain, "TXT");
      const spf = txt.find((t) => /^v=spf1/i.test(t));
      if (spf) score += 20;
      rows.push({ label: "SPF", tone: spf ? "valid" : "invalid", detail: spf ? "Published" : "Missing" });

      const dmTxt = await dnsResolve(`_dmarc.${domain}`, "TXT");
      const policy = dmTxt.find((t) => /^v=DMARC1/i.test(t))?.match(/p=(none|quarantine|reject)/i)?.[1]?.toLowerCase();
      if (policy === "reject" || policy === "quarantine") score += 25; else if (policy === "none") score += 10;
      rows.push({ label: "DMARC", tone: policy && policy !== "none" ? "valid" : policy ? "warn" : "invalid", detail: policy ? `p=${policy}` : "Missing" });

      const a = (await dnsResolve(domain, "A")).find((x) => ipv4Re.test(x));
      if (a) {
        const bl = await blacklistCount(a);
        if (bl.listed === 0) score += 35; else score += Math.max(0, 35 - bl.listed * 20);
        rows.push({ label: "Blacklists", tone: bl.listed ? "invalid" : "valid", detail: bl.listed ? `Listed on ${bl.listed}` : `Clean (${bl.checked} checked)` });
        if (mode === "advanced") {
          const ptr = (await dnsResolve(`${a.split(".").reverse().join(".")}.in-addr.arpa`, "PTR").catch(() => []))[0];
          rows.push({ label: "Reverse DNS (PTR)", tone: ptr ? "valid" : "warn", detail: ptr ?? "No PTR record" });
        }
      } else {
        score += 20; // no web A record isn't a sending penalty
        rows.push({ label: "Blacklists", tone: "neutral", detail: "No A record to check" });
      }

      if (mode === "advanced") {
        const selectors = ["google", "default", "selector1", "selector2", "s1", "k1", "dkim"];
        const hits = await Promise.all(selectors.map(async (s) => {
          try { const r = await dnsResolve(`${s}._domainkey.${domain}`, "TXT"); return r.some((t) => /DKIM1|p=[A-Za-z0-9]/i.test(t)) ? s : null; } catch { return null; }
        }));
        const dkim = hits.filter(Boolean)[0];
        rows.push({ label: "DKIM", tone: dkim ? "valid" : "warn", detail: dkim ? `Found at "${dkim}"` : "Not at common selectors" });
      }
    } catch { rows.push({ label: "DNS", tone: "neutral", detail: "Couldn't reach the resolver." }); }
    setOut({ score: Math.min(100, score), rows }); setLoading(false);
  }
  return (
    <Shell>
      <ModeTabs mode={mode} setMode={setMode} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className={inputCls} placeholder="yourcompany.com" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
        <button className={btnCls} type="button" onClick={run} disabled={loading || !value.trim()}>{loading ? "Checking…" : "Check reputation"}</button>
      </div>
      {out && (
        <>
          {out.rows.length > 1 && (
            <div className={`mt-4 rounded-xl border px-4 py-3 text-[15px] font-semibold ${toneCls[gradeTone(out.score)]}`}>
              Reputation grade: {grade(out.score)} ({out.score}/100)
            </div>
          )}
          <RowList rows={out.rows} />
        </>
      )}
    </Shell>
  );
}

// ── router ───────────────────────────────────────────────────────────────────
export function MoreToolWidget({ widget }: { widget: WidgetKey }) {
  switch (widget) {
    case "open-rate": return <OpenRate />;
    case "list-growth": return <ListGrowth />;
    case "email-roi": return <EmailRoi />;
    case "complaint-rate": return <ComplaintRate />;
    case "freemail-revenue": return <FreemailRevenue />;
    case "verify-calc": return <VerifyCalc />;
    case "bounce-predictor": return <BouncePredictor />;
    case "hygiene-score": return <HygieneScore />;
    case "email-server": return <EmailServer />;
    case "inbox-placement": return <InboxPlacement />;
    case "warmup": return <Warmup />;
    case "cidr": return <Cidr />;
    case "send-time": return <SendTime />;
    case "domain-reputation": return <DomainReputation />;
    default: return null;
  }
}
