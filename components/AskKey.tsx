"use client";

import { useState } from "react";

interface AskKeyProps {
  keyValue: string;
  setKey: (v: string) => void;
  clear: () => void;
  hydrated: boolean;
}

export function AskKey({ keyValue, setKey, clear, hydrated }: AskKeyProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  if (!hydrated) return null;

  function save() {
    setKey(draft);
    setDraft("");
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-line bg-paper-panel/60 p-2.5">
        <input
          type="password"
          autoComplete="off"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
          placeholder="sk-ant-…  (your Anthropic key)"
          aria-label="Anthropic API key"
          className="rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-xs outline-none focus:border-accent"
          autoFocus
        />
        <div className="flex items-center gap-2">
          <button onClick={save} disabled={!draft.trim()} className="btn-ghost text-xs disabled:opacity-50">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="text-xs text-ink-faint hover:text-ink">
            Cancel
          </button>
        </div>
        <p className="text-[11px] leading-relaxed text-ink-faint">
          Kept only in this browser tab, erased when you close it. Sent over HTTPS to call Claude —
          never stored or logged. Get one at{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep underline"
          >
            console.anthropic.com
          </a>
          .
        </p>
      </div>
    );
  }

  if (keyValue) {
    return (
      <div className="flex items-center gap-2 text-[11px] text-ink-muted">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-verified-soft px-2 py-0.5 font-mono text-verified">
          <span className="h-1.5 w-1.5 rounded-full bg-verified" /> Claude connected
        </span>
        <button onClick={() => { setDraft(""); setEditing(true); }} className="underline hover:text-ink">
          replace
        </button>
        <button onClick={clear} className="underline hover:text-ink">
          clear
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => { setDraft(""); setEditing(true); }}
      className="w-fit text-[11px] text-accent-deep underline underline-offset-2 hover:text-accent"
    >
      🔑 Add your Claude key for AI answers →
    </button>
  );
}
