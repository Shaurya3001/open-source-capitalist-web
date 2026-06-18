"use client";

import { useState } from "react";

const PARTS = [
  { key: "role", label: "Task & role", text: "You are a senior support analyst. Classify the support ticket below." },
  { key: "context", label: "Context", text: "Context: B2B SaaS. Tickets route to one of three queues — billing, technical, or churn-risk." },
  { key: "instructions", label: "Step-by-step instructions", text: "Steps:\n1. Read the ticket.\n2. Choose exactly one queue.\n3. Rate urgency 1–5." },
  { key: "examples", label: "Few-shot example", text: 'Example —\nTicket: "Charged twice this month." → billing, urgency 4' },
  { key: "reminders", label: "Reminders", text: 'Use only the three queues. If genuinely unsure, output "needs-human" — never guess.' },
  { key: "format", label: "Output format", text: 'Return JSON only: {"queue": string, "urgency": number}' },
];

export function PromptLab() {
  const [on, setOn] = useState<Record<string, boolean>>({ role: true });
  const active = PARTS.filter((p) => on[p.key]);
  const prompt = active.map((p) => p.text).join("\n\n") || "(empty — toggle parts on to build a prompt)";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-ink-faint">Toggle the building blocks of a strong prompt:</p>
        {PARTS.map((p) => (
          <label key={p.key} className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-sm">
            <input
              type="checkbox"
              checked={!!on[p.key]}
              onChange={(e) => setOn((s) => ({ ...s, [p.key]: e.target.checked }))}
              className="accent-accent"
            />
            <span>{p.label}</span>
          </label>
        ))}
        <div className="mt-1 flex items-center gap-2 text-xs text-ink-faint">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-panel">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(active.length / PARTS.length) * 100}%` }} />
          </div>
          <span className="font-mono">{active.length}/6 parts</span>
        </div>
      </div>
      <pre className="min-h-[200px] whitespace-pre-wrap rounded-xl border border-line bg-paper-panel/50 p-3 font-mono text-[12px] leading-relaxed text-ink">
        {prompt}
      </pre>
    </div>
  );
}
