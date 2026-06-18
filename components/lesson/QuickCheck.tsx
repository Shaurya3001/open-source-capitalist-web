"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import type { QuizItem } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";

export function QuickCheck({ quiz, slug }: { quiz: QuizItem[]; slug: string }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const { markDone } = useProgress();
  if (!quiz?.length) return null;

  const answered = Object.keys(picked).length;
  const correct = quiz.filter((q, i) => picked[i] === q.answer).length;

  function pick(qi: number, oi: number) {
    setPicked((prev) => {
      if (prev[qi] !== undefined) return prev; // lock after first answer
      const next = { ...prev, [qi]: oi };
      if (Object.keys(next).length === quiz.length) {
        markDone(slug);
        const score = quiz.filter((qq, i) => next[i] === qq.answer).length;
        track("quiz_completed", { score, total: quiz.length });
      }
      return next;
    });
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-line bg-paper-panel/40 p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold">Quick check</h2>
        {answered > 0 && (
          <span className="font-mono text-xs text-ink-faint">
            {correct}/{quiz.length} correct
          </span>
        )}
      </div>

      {quiz.map((q, qi) => {
        const chosen = picked[qi];
        const done = chosen !== undefined;
        return (
          <div key={qi} className="flex flex-col gap-2">
            <p className="text-sm font-medium text-ink">
              {qi + 1}. {q.q}
            </p>
            <div className="flex flex-col gap-1.5">
              {q.options.map((opt, oi) => {
                const isAnswer = oi === q.answer;
                const isChosen = oi === chosen;
                let cls = "border-line bg-paper hover:border-accent";
                if (done && isAnswer) cls = "border-verified/50 bg-verified-soft text-verified";
                else if (done && isChosen) cls = "border-red-300 bg-red-50 text-red-700";
                else if (done) cls = "border-line bg-paper opacity-60";
                return (
                  <button
                    key={oi}
                    onClick={() => pick(qi, oi)}
                    disabled={done}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${cls}`}
                  >
                    <span className="font-mono text-xs">{String.fromCharCode(65 + oi)}</span>
                    <span>{opt}</span>
                    {done && isAnswer && <span className="ml-auto">✓</span>}
                    {done && isChosen && !isAnswer && <span className="ml-auto">✗</span>}
                  </button>
                );
              })}
            </div>
            {done && <p className="rounded-lg bg-paper px-3 py-2 text-xs leading-relaxed text-ink-muted">{q.explain}</p>}
          </div>
        );
      })}
    </section>
  );
}
