import { lessons } from "./data";

export interface Source {
  n: number;
  slug: string;
  track: string;
  title: string;
}

const BODY_CAP = 2500;

/** The full corpus as labelled [L1]…[Ln] blocks for grounded, cited answers. */
export function buildCorpus(): string {
  return lessons
    .map((l, i) => {
      const body = l.body.length > BODY_CAP ? `${l.body.slice(0, BODY_CAP)} …` : l.body;
      return (
        `[L${i + 1}] ${l.title}\n` +
        `Track: ${l.track} · Source: ${l.channel || "Unknown"} (${l.credibility})\n` +
        `Summary: ${l.summary}\n` +
        `Notes:\n${body}`
      );
    })
    .join("\n\n---\n\n");
}

const STOP = new Set(
  "the a an and or of to in for on with how what why is are be do does this that you your it as at from can".split(" "),
);

/** Tiny lexical scorer for the keyless fallback (no LLM needed). */
export function scoreLessons(query: string, limit = 5): Source[] {
  const terms = (query.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (t) => t.length > 2 && !STOP.has(t),
  );
  if (terms.length === 0) return [];
  return lessons
    .map((l) => {
      const title = l.title.toLowerCase();
      const summary = l.summary.toLowerCase();
      const hay = `${title} ${summary} ${l.topics.join(" ")} ${l.tags.join(" ")} ${l.body}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 3;
        if (summary.includes(t)) score += 2;
        if (hay.includes(t)) score += 1;
      }
      return { l, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s, i) => ({ n: i + 1, slug: s.l.slug, track: s.l.track, title: s.l.title }));
}

/** Parse [Ln] citations, renumber to [1],[2]… in order of appearance, resolve to lessons. */
export function resolveCitations(answer: string): { answer: string; sources: Source[] } {
  const order: number[] = [];
  for (const m of answer.matchAll(/\[L(\d+)\]/g)) {
    const idx = Number(m[1]) - 1;
    if (idx >= 0 && idx < lessons.length && !order.includes(idx)) order.push(idx);
  }
  const numByIdx = new Map<number, number>();
  order.forEach((idx, i) => numByIdx.set(idx, i + 1));
  const rewritten = answer.replace(/\[L(\d+)\]/g, (full, d) => {
    const n = numByIdx.get(Number(d) - 1);
    return n ? `[${n}]` : full;
  });
  const sources: Source[] = order.map((idx, i) => {
    const l = lessons[idx];
    return { n: i + 1, slug: l.slug, track: l.track, title: l.title };
  });
  return { answer: rewritten, sources };
}
