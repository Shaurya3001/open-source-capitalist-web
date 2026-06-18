"use client";

import { useState } from "react";
import { MODELS, CACHE_WRITE_MULT, CACHE_READ_MULT } from "@/lib/data/pricing";

function fmt(n: number): string {
  return n > 0 && n < 0.01
    ? `$${n.toFixed(4)}`
    : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function CachingCost() {
  const [turns, setTurns] = useState(10);
  const model = MODELS[0]; // Opus 4.8
  const input = 20000;
  const inP = model.inputPerM / 1e6;

  const noCache = turns * input * inP;
  const withCache = input * inP * CACHE_WRITE_MULT + Math.max(0, turns - 1) * input * inP * CACHE_READ_MULT;
  const saved = noCache - withCache;
  const pct = noCache ? (saved / noCache) * 100 : 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-panel/40 p-4">
      <p className="text-xs text-ink-faint">
        A 20K-token system prompt reused across a conversation on {model.label}:
      </p>
      <label className="flex items-center gap-3 text-sm">
        <span className="w-12">Turns</span>
        <input
          type="range"
          min={1}
          max={50}
          value={turns}
          onChange={(e) => setTurns(Number(e.target.value))}
          className="flex-1 accent-accent"
          aria-label="Turns"
        />
        <span className="w-8 text-right font-mono text-xs">{turns}</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-line bg-paper p-3">
          <span className="font-mono text-xs text-ink-faint">No caching</span>
          <div className="font-display text-xl">{fmt(noCache)}</div>
        </div>
        <div className="rounded-lg border border-verified/40 bg-verified-soft/40 p-3">
          <span className="font-mono text-xs text-ink-faint">With caching</span>
          <div className="font-display text-xl text-verified">{fmt(withCache)}</div>
        </div>
      </div>
      <p className="text-sm text-ink-muted">
        <span className="font-medium text-verified">Saves {fmt(saved)} ({pct.toFixed(0)}%)</span> — cached
        reads cost ~10% of the input price; only the first turn pays the write.
      </p>
    </div>
  );
}
