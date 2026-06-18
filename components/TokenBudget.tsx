"use client";

import { useMemo, useState } from "react";
import { MODELS, CACHE_WRITE_MULT, CACHE_READ_MULT, PRICING_AS_OF } from "@/lib/data/pricing";

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtUSD = (n: number) =>
  n > 0 && n < 0.01
    ? `$${n.toFixed(4)}`
    : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function NumberField(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink">{props.label}</span>
        <span className="font-mono text-xs text-ink-faint">{fmtInt(props.value)}</span>
      </span>
      <input
        type="range"
        aria-label={props.label}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

export function TokenBudget() {
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [input, setInput] = useState(12000);
  const [output, setOutput] = useState(1500);
  const [turns, setTurns] = useState(5);
  const [caching, setCaching] = useState(true);
  const [paste, setPaste] = useState("");

  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  const calc = useMemo(() => {
    const inP = model.inputPerM / 1e6;
    const outP = model.outputPerM / 1e6;
    const noCacheInput = turns * input * inP;
    const cacheInput =
      input * inP * CACHE_WRITE_MULT + Math.max(0, turns - 1) * input * inP * CACHE_READ_MULT;
    const outputCost = turns * output * outP;
    const cacheable = input >= model.minCacheTokens;
    const useCache = caching && cacheable;
    const total = (useCache ? cacheInput : noCacheInput) + outputCost;
    const savings = noCacheInput - cacheInput;
    const ctxPct = ((input + output) / model.contextTokens) * 100;
    return { total, outputCost, noCacheInput, cacheInput, savings, cacheable, useCache, ctxPct };
  }, [model, input, output, turns, caching]);

  const tips: string[] = [];
  if (!caching && turns > 1 && calc.savings > 0.001)
    tips.push(`Turn on prompt caching to save ~${fmtUSD(calc.savings)} across ${turns} turns.`);
  if (caching && !calc.cacheable)
    tips.push(`This prompt (${fmtInt(input)} tokens) is below ${model.label}'s ~${fmtInt(model.minCacheTokens)}-token caching minimum — caching won't apply.`);
  if (calc.ctxPct > 100)
    tips.push(`Input + output exceed ${model.label}'s ${fmtInt(model.contextTokens)}-token context window.`);
  else if (calc.ctxPct > 55)
    tips.push(`You're using ${calc.ctxPct.toFixed(0)}% of the context window — long context can degrade quality, not just cost.`);
  if (tips.length === 0)
    tips.push(`Estimated across ${turns} turn${turns > 1 ? "s" : ""} on ${model.label}.`);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Controls */}
      <div className="card flex flex-col gap-5 p-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Model</span>
          <select
            aria-label="Model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="rounded-lg border border-line bg-paper px-3 py-2 text-sm"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — ${m.inputPerM}/${m.outputPerM} per 1M
              </option>
            ))}
          </select>
        </label>

        <NumberField label="Input tokens / turn" value={input} min={0} max={200000} step={500} onChange={setInput} />
        <NumberField label="Output tokens / turn" value={output} min={0} max={32000} step={250} onChange={setOutput} />
        <NumberField label="Turns" value={turns} min={1} max={50} step={1} onChange={setTurns} />

        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            aria-label="Prompt caching enabled"
            checked={caching}
            onChange={(e) => setCaching(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          <span className="text-sm font-medium text-ink">Prompt caching (reuse the stable prefix)</span>
        </label>

        <label className="flex flex-col gap-1.5 border-t border-line pt-4">
          <span className="text-sm font-medium text-ink">
            Estimate from text <span className="font-normal text-ink-faint">(~4 chars/token)</span>
          </span>
          <textarea
            aria-label="Paste text to estimate tokens"
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder="Paste a prompt to estimate its token count…"
            className="h-20 resize-none rounded-lg border border-line bg-paper px-3 py-2 text-sm"
          />
          {paste.length > 0 && (
            <button
              type="button"
              onClick={() => setInput(Math.ceil(paste.length / 4))}
              className="btn-ghost w-fit text-xs"
            >
              Use ≈ {fmtInt(Math.ceil(paste.length / 4))} tokens as input ↑
            </button>
          )}
        </label>
      </div>

      {/* Results */}
      <div className="card flex flex-col gap-5 bg-paper-panel/50 p-5">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Estimated cost</span>
          <span className="font-display text-4xl font-semibold tracking-tight">{fmtUSD(calc.total)}</span>
          <span className="font-mono text-xs text-ink-faint">
            {calc.useCache ? "with prompt caching" : "no caching"} · {turns} turn{turns > 1 ? "s" : ""}
          </span>
        </div>

        <dl className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Input{calc.useCache ? " (cached)" : ""}</dt>
            <dd className="font-mono">{fmtUSD(calc.useCache ? calc.cacheInput : calc.noCacheInput)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Output</dt>
            <dd className="font-mono">{fmtUSD(calc.outputCost)}</dd>
          </div>
          {calc.savings > 0.001 && (
            <div className="flex justify-between text-verified">
              <dt>Caching saves</dt>
              <dd className="font-mono">{fmtUSD(calc.savings)}</dd>
            </div>
          )}
        </dl>

        <div className="flex flex-col gap-1.5 border-t border-line pt-4">
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Context window used</span>
            <span className="font-mono">{calc.ctxPct.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-paper-panel">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.min(100, calc.ctxPct)}%` }}
            />
          </div>
        </div>

        <ul className="flex flex-col gap-2 border-t border-line pt-4">
          {tips.map((t) => (
            <li key={t} className="flex gap-2 text-sm text-ink-muted">
              <span className="text-accent-deep">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[11px] text-ink-faint">
          Pricing approximate, as of {PRICING_AS_OF}. Token estimate is a rough ~4 chars/token heuristic.
        </p>
      </div>
    </div>
  );
}
