"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface PagerLink {
  href: string;
  title: string;
  eyebrow: string;
}

export function LessonPager({ prev, next }: { prev?: PagerLink; next?: PagerLink }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "ArrowLeft" && prev) router.push(prev.href);
      if (e.key === "ArrowRight" && next) router.push(next.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  return (
    <nav className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Lesson navigation">
      {prev ? (
        <Link href={prev.href} className="card card-hover flex flex-col gap-1 p-4">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">← {prev.eyebrow}</span>
          <span className="font-display text-sm font-semibold text-ink">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link href={next.href} className="card card-hover flex flex-col items-end gap-1 p-4 text-right">
          <span className="font-mono text-[11px] uppercase tracking-wide text-accent-deep">{next.eyebrow} →</span>
          <span className="font-display text-sm font-semibold text-ink">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
