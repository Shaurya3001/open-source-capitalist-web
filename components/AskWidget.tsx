"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSessionKey } from "@/lib/useSessionKey";
import { AskKey } from "./AskKey";

interface Source {
  n: number;
  slug: string;
  track: string;
  title: string;
}
interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

const SUGGESTIONS = [
  "What's the difference between Skills and MCP?",
  "How do I cut my token costs?",
  "What is context rot?",
];

export function AskWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const { key, setKey, clear, hydrated } = useSessionKey("anthropic_key");
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(q: string) {
    const question = q.trim();
    if (!question || loading) return;
    setInput("");
    const history = msgs.map((m) => ({ role: m.role, content: m.content }));
    setMsgs((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) headers["x-anthropic-key"] = key;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ question, history }),
      });
      const data = await res.json();
      setMsgs((prev) => [
        ...prev,
        { role: "assistant", content: data.answer ?? "Something went wrong.", sources: data.sources },
      ]);
    } catch {
      setMsgs((prev) => [...prev, { role: "assistant", content: "Couldn't reach the server. Try again." }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight));
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask the lessons a question"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-ink bg-ink px-4 py-3 text-sm font-medium text-paper shadow-pop transition hover:bg-ink/90"
      >
        Ask the lessons
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex h-[70vh] max-h-[560px] w-[min(92vw,400px)] flex-col rounded-xl border border-line bg-paper shadow-pop">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex flex-col">
          <span className="font-display text-sm font-semibold">Ask the lessons</span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            grounded in the notes · cite-or-cut
          </span>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-ink-faint hover:text-ink">
          ✕
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
        {msgs.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-ink-muted">
              Ask anything across the lessons. Answers come only from the notes and link their sources.
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="card card-hover px-3 py-2 text-left text-sm text-ink">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="ml-auto w-fit max-w-[85%] rounded-lg bg-paper-panel px-3 py-2 text-sm">
                  {m.content}
                </p>
              ) : (
                <div key={i} className="flex flex-col gap-2">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{m.content}</p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.sources.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/learn/${s.track}/${s.slug}`}
                          onClick={() => setOpen(false)}
                          className="chip hover:border-accent"
                        >
                          [{s.n}] {s.title.length > 32 ? `${s.title.slice(0, 32)}…` : s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
            {loading && <p className="text-sm text-ink-faint">Thinking…</p>}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-4 py-3">
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            aria-label="Your question"
            className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button type="submit" disabled={loading || !input.trim()} className="btn text-sm disabled:opacity-50">
            Ask
          </button>
        </form>
        <AskKey keyValue={key} setKey={setKey} clear={clear} hydrated={hydrated} />
      </div>
    </div>
  );
}
