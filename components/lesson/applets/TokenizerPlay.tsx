"use client";

import { useState } from "react";

const SAMPLE = "Prompt caching makes repeated requests far cheaper.";

// Rough token-ish split: keep word boundaries, then ~4-char pieces. A real
// tokenizer learns subwords (BPE); this is only a visual stand-in.
function chunk(s: string): string[] {
  const out: string[] = [];
  for (const w of s.split(/(\s+)/)) {
    if (!w) continue;
    for (let i = 0; i < w.length; i += 4) out.push(w.slice(i, i + 4));
  }
  return out;
}

export function TokenizerPlay() {
  const [text, setText] = useState(SAMPLE);
  const tokens = chunk(text);
  const est = text.length ? Math.max(1, Math.ceil(text.length / 4)) : 0;

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Text to tokenize"
        className="h-20 resize-none rounded-lg border border-line bg-paper p-3 text-sm"
      />
      <div className="flex flex-wrap gap-1 rounded-xl border border-line bg-paper-panel/40 p-3">
        {tokens.map((t, i) => (
          <span
            key={i}
            className="rounded px-1 py-0.5 font-mono text-[12px] text-ink"
            style={{ background: i % 2 ? "#f4ead2" : "#e2efe7" }}
          >
            {t.replace(/ /g, "·")}
          </span>
        ))}
      </div>
      <p className="font-mono text-xs text-ink-faint">
        ≈ {est} tokens ({text.length} chars). Real tokenizers split by learned subwords (BPE) — this is a rough ~4-chars/token stand-in.
      </p>
    </div>
  );
}
