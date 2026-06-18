"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Credibility } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import { CredibilityBadge } from "./CredibilityBadge";

interface Row {
  slug: string;
  title: string;
  track: string;
  credibility: Credibility;
  channel: string;
  summary: string;
}
interface Phase {
  phase: string;
  lessons: Row[];
}

export function Syllabus({
  phases,
  label,
  blurb,
  accent,
  trackSlug,
}: {
  phases: Phase[];
  label: string;
  blurb: string;
  accent: string;
  trackSlug: string;
}) {
  const { isDone, hydrated } = useProgress();
  const all = phases.flatMap((p) => p.lessons);
  const total = all.length;
  const doneCount = hydrated ? all.filter((l) => isDone(l.slug)).length : 0;
  const cta = (hydrated ? all.find((l) => !isDone(l.slug)) : undefined) ?? all[0];
  const ctaLabel =
    doneCount === 0 ? "Start the track" : doneCount < total ? "Continue" : "Review from start";

  let n = 0;
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Link href="/learn" className="font-mono text-xs text-ink-faint hover:text-accent-deep">
          ← All tracks
        </Link>
        <span className="h-1.5 w-12 rounded-full" style={{ background: accent }} aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight">{label}</h1>
        <p className="max-w-2xl text-[15px] text-ink-muted">{blurb}</p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          {cta && (
            <Link href={`/learn/${trackSlug}/${cta.slug}`} className="btn">
              {ctaLabel} →
            </Link>
          )}
          <div className="flex items-center gap-2 text-xs text-ink-faint">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-paper-panel">
              <div
                className="h-full rounded-full"
                style={{ width: `${total ? (doneCount / total) * 100 : 0}%`, background: accent }}
              />
            </div>
            <span className="font-mono">{hydrated ? `${doneCount}/${total} done` : `${total} lessons`}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {phases.map((p) => (
          <section key={p.phase} className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-deep">{p.phase}</span>
            <ul className="flex flex-col gap-2">
              {p.lessons.map((l) => {
                n += 1;
                const complete = hydrated && isDone(l.slug);
                return (
                  <motion.li
                    key={l.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(n * 0.03, 0.4) }}
                  >
                    <Link href={`/learn/${l.track}/${l.slug}`} className="card card-hover flex items-start gap-3 p-4">
                      <span className={`mt-0.5 font-mono text-sm ${complete ? "text-verified" : "text-ink-faint"}`}>
                        {complete ? "✓" : String(n).padStart(2, "0")}
                      </span>
                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">{l.title}</h3>
                          <CredibilityBadge credibility={l.credibility} />
                        </div>
                        <p className="line-clamp-2 text-sm text-ink-muted">{l.summary}</p>
                        <span className="font-mono text-[11px] text-ink-faint">{l.channel || "Unknown"}</span>
                      </div>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
