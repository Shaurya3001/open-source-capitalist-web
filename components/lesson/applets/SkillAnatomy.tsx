"use client";

import { useState } from "react";

const PARTS = [
  {
    id: "name",
    label: "name",
    code: "name: pdf-form-filler",
    note: "A short, unique id — how the skill is referenced. Lowercase, kebab-case.",
  },
  {
    id: "desc",
    label: "description",
    code: "description: Fills PDF forms from a data file. Use when the user asks to populate, complete, or fill a PDF.",
    note: "The trigger. Claude reads ONLY this by default and uses it to decide WHEN to load the skill. Be specific about the trigger condition — vague descriptions don't fire.",
  },
  {
    id: "body",
    label: "body (SKILL.md)",
    code: "## Steps\n1. Read the PDF's form fields.\n2. Map the data file → fields.\n3. Write output.pdf.\n\n## Notes\n- Flatten the form when done.",
    note: "The full instructions. Loaded only once the description matches the task (progressive disclosure) — so it can be long without bloating every prompt.",
  },
];

export function SkillAnatomy() {
  const [sel, setSel] = useState("desc");
  const active = PARTS.find((p) => p.id === sel) ?? PARTS[0];

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-xl border border-line bg-paper-panel/50 p-3 font-mono text-[12px] leading-relaxed">
        <div className="text-ink-faint">---</div>
        {PARTS.slice(0, 2).map((p) => (
          <button
            key={p.id}
            onClick={() => setSel(p.id)}
            className={`block w-full whitespace-pre-wrap rounded px-1 text-left transition-colors ${
              sel === p.id ? "bg-accent/15 text-ink" : "text-ink-muted hover:bg-paper-panel"
            }`}
          >
            {p.code}
          </button>
        ))}
        <div className="text-ink-faint">---</div>
        <button
          onClick={() => setSel("body")}
          className={`mt-1 block w-full whitespace-pre-wrap rounded px-1 text-left transition-colors ${
            sel === "body" ? "bg-accent/15 text-ink" : "text-ink-muted hover:bg-paper-panel"
          }`}
        >
          {PARTS[2].code}
        </button>
      </div>
      <div className="flex flex-col gap-1.5 rounded-xl border border-line bg-paper p-3 lg:sticky lg:top-24 lg:h-fit">
        <span className="font-mono text-xs uppercase tracking-wide text-accent-deep">{active.label}</span>
        <p className="text-sm text-ink-muted">{active.note}</p>
        <p className="pt-1 text-xs text-ink-faint">Click a part of the SKILL.md ←</p>
      </div>
    </div>
  );
}
