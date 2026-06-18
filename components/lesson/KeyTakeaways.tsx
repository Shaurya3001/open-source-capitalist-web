"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function FlipCard({ n, text }: { n: number; text: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      aria-label={`Takeaway ${n}, tap to reveal`}
      className="relative h-32 [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-line bg-paper-panel/60 p-3 text-center [backface-visibility:hidden]">
          <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">Recall #{n} →</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-accent/40 bg-paper p-3 text-center text-[13px] leading-snug text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {text}
        </div>
      </motion.div>
    </button>
  );
}

export function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
  if (!takeaways?.length) return null;
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <h2 className="font-display text-lg font-semibold">Remember this</h2>
        <span className="font-mono text-[11px] text-ink-faint">recall before you flip</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {takeaways.map((t, i) => (
          <FlipCard key={i} n={i + 1} text={t} />
        ))}
      </div>
    </section>
  );
}
