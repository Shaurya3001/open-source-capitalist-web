"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/lib/useProgress";

interface OutlineLesson {
  slug: string;
  title: string;
  track: string;
}
interface OutlinePhase {
  phase: string;
  lessons: OutlineLesson[];
}

export function LessonOutline({
  phases,
  activeSlug,
  trackLabel,
  accent,
}: {
  phases: OutlinePhase[];
  activeSlug: string;
  trackLabel: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const { isDone, hydrated } = useProgress();
  const flat = phases.flatMap((p) => p.lessons);
  const total = flat.length;
  const activeIndex = flat.findIndex((l) => l.slug === activeSlug);
  const doneCount = hydrated ? flat.filter((l) => isDone(l.slug)).length : 0;

  let n = 0;
  return (
    <aside className="lg:sticky lg:top-20 lg:h-fit">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-line bg-paper-panel/60 px-3 py-2 text-sm font-medium lg:hidden"
      >
        <span>On this track · Lesson {activeIndex + 1} of {total}</span>
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>

      <div className={`${open ? "block" : "hidden"} mt-2 lg:mt-0 lg:block`}>
        <div className="mb-3 flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">{trackLabel}</span>
          <div className="flex items-center justify-between text-[11px] text-ink-faint">
            <span>Lesson {activeIndex + 1} of {total}</span>
            {hydrated && <span>{doneCount} done</span>}
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-paper-panel">
            <div
              className="h-full rounded-full"
              style={{ width: `${total ? ((activeIndex + 1) / total) * 100 : 0}%`, background: accent }}
            />
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          {phases.map((p) => (
            <div key={p.phase} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-deep">{p.phase}</span>
              <ul className="flex flex-col">
                {p.lessons.map((l) => {
                  n += 1;
                  const active = l.slug === activeSlug;
                  const complete = hydrated && isDone(l.slug);
                  return (
                    <li key={l.slug} className="relative">
                      {active && (
                        <motion.span
                          layoutId="outline-active"
                          className="absolute inset-0 rounded-md bg-paper-panel"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          aria-hidden
                        />
                      )}
                      <Link
                        href={`/learn/${l.track}/${l.slug}`}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex items-start gap-2 rounded-md px-2 py-1.5 text-[13px] leading-snug transition-colors ${
                          active ? "text-ink" : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        <span className={`mt-px font-mono text-[10px] ${complete ? "text-verified" : "text-ink-faint"}`}>
                          {complete ? "✓" : String(n).padStart(2, "0")}
                        </span>
                        <span className={active ? "font-medium" : ""}>{l.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
