import type { ExamplePair } from "@/lib/types";

// Static (no client JS) — bad vs good worked examples. Stacks on mobile.
export function ExampleContrast({ examples }: { examples?: ExamplePair[] }) {
  if (!examples?.length) return null;
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-lg font-semibold">Bad vs good</h2>
      {examples.map((ex, i) => (
        <div key={i} className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">{ex.label}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper p-3">
              <span className="badge badge-creator w-fit">✗ Weak</span>
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-ink-muted">{ex.bad}</pre>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-verified/40 bg-verified-soft/40 p-3">
              <span className="badge badge-official w-fit">✓ Better</span>
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-ink">{ex.good}</pre>
            </div>
          </div>
          <p className="rounded-lg bg-paper-panel/50 px-3 py-2 text-sm text-ink-muted">
            <span className="font-medium text-ink">Why:</span> {ex.why}
          </p>
        </div>
      ))}
    </section>
  );
}
