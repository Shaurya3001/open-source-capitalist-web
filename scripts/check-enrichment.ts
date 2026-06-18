/**
 * Coverage check: every lesson should have an enrichment entry with >=1
 * takeaway and >=2 quiz questions. Run: tsx scripts/check-enrichment.ts
 * (type-only `@/` imports in the data files are erased by tsx, so this needs
 * no path-alias resolution at runtime.)
 */
import { ENRICHMENT } from "../lib/data/enrichment";
import lessonsJson from "../data/lessons.json";

const lessons = lessonsJson as { slug: string; track: string }[];
let enriched = 0;
const missing: string[] = [];

for (const l of lessons) {
  const e = ENRICHMENT[l.slug];
  if (e && (e.takeaways?.length ?? 0) >= 1 && (e.quiz?.length ?? 0) >= 2) enriched += 1;
  else missing.push(`${l.track}/${l.slug}`);
}

console.log(`Enriched: ${enriched}/${lessons.length}`);
if (missing.length) {
  console.log("Missing / incomplete:");
  for (const m of missing) console.log("  - " + m);
}
