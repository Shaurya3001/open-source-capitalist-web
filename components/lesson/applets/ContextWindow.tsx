"use client";

import { useState } from "react";

export function ContextWindow() {
  const [pct, setPct] = useState(35);
  const zone = pct < 55 ? "healthy" : pct < 85 ? "degrading" : "rotting";
  const color = zone === "healthy" ? "#2F6B4F" : zone === "degrading" ? "#B5832E" : "#b4453a";
  const msg =
    zone === "healthy"
      ? "Plenty of attention to spare — the model reliably tracks everything in context."
      : zone === "degrading"
        ? "Recall starts slipping, especially for facts buried in the middle (lost-in-the-middle)."
        : "Context rot: accuracy drops sharply, the model 'forgets' early details and rushes to finish.";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-panel/40 p-4">
      <p className="text-xs text-ink-faint">Drag to fill the context window and watch quality change:</p>
      <input
        type="range"
        min={5}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="accent-accent"
        aria-label="Context window used"
      />
      <div className="h-6 w-full overflow-hidden rounded-lg bg-paper">
        <div className="h-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="flex items-center justify-between font-mono text-xs">
        <span>{pct}% full</span>
        <span style={{ color }}>{zone}</span>
      </div>
      <p className="text-sm text-ink-muted">{msg}</p>
    </div>
  );
}
