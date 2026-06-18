"use client";

import { useState } from "react";

interface McpNode {
  id: string;
  label: string;
  sub: string;
  note: string;
}

const NODES: McpNode[] = [
  { id: "client", label: "MCP client", sub: "your app / Claude", note: "Lives inside the AI app (Claude Desktop, Cursor, your agent). Speaks MCP to one or more servers." },
  { id: "server", label: "MCP server", sub: "the integration", note: "A small program that wraps a system (GitHub, Slack, a database) and exposes its capabilities over the protocol." },
  { id: "tools", label: "Tools", sub: "model-driven", note: "Actions the model can call on its own (query the DB, send a message). The model decides when." },
  { id: "resources", label: "Resources", sub: "app-driven", note: "Data the app pulls into context (files, schemas). The application decides when to attach them." },
  { id: "prompts", label: "Prompts", sub: "user-driven", note: 'Reusable templates the user invokes, e.g. "/summarize this thread".' },
];

function Node({ n, sel, onSelect }: { n: McpNode; sel: string; onSelect: (id: string) => void }) {
  const on = sel === n.id;
  return (
    <button
      onClick={() => onSelect(n.id)}
      className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
        on ? "border-accent bg-accent/10" : "border-line bg-paper-panel/50 hover:border-accent/50"
      }`}
    >
      <div className="font-medium text-ink">{n.label}</div>
      <div className="font-mono text-[10px] text-ink-faint">{n.sub}</div>
    </button>
  );
}

export function McpFlow() {
  const [sel, setSel] = useState("server");
  const active = NODES.find((n) => n.id === sel) ?? NODES[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Node n={NODES[0]} sel={sel} onSelect={setSel} />
        <span className="text-ink-faint" aria-hidden>↔</span>
        <Node n={NODES[1]} sel={sel} onSelect={setSel} />
        <span className="text-ink-faint" aria-hidden>→</span>
        <div className="flex flex-wrap gap-2">
          {NODES.slice(2).map((n) => (
            <Node key={n.id} n={n} sel={sel} onSelect={setSel} />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-line bg-paper p-3">
        <span className="font-mono text-xs uppercase tracking-wide text-accent-deep">
          {active.label} · {active.sub}
        </span>
        <p className="mt-1 text-sm text-ink-muted">{active.note}</p>
      </div>
    </div>
  );
}
