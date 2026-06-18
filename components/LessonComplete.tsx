"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@/lib/useProgress";

/** Marks the lesson complete when its end scrolls into view, and shows a pill. */
export function LessonComplete({ slug }: { slug: string }) {
  const { markDone, isDone, hydrated } = useProgress();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          markDone(slug);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slug, markDone]);

  const complete = hydrated && isDone(slug);
  return (
    <div ref={ref} className="flex justify-center pt-2">
      <span
        className={`badge font-mono transition-colors ${
          complete ? "badge-official" : "badge-creator opacity-60"
        }`}
      >
        {complete ? "✓ Completed" : "Read to the end to complete"}
      </span>
    </div>
  );
}
