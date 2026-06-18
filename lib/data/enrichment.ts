import type { LessonEnrichment } from "@/lib/types";
import { tokenAndContext } from "./enrichment/token-and-context";
import { skillsAndAgents } from "./enrichment/skills-and-agents";
import { mcp } from "./enrichment/mcp";
import { promptEngineering } from "./enrichment/prompt-engineering";

// Authored teaching layer keyed by lesson slug. Kept separate from the sourced
// `lessons.json` because this content is written to teach, not extracted.
export const ENRICHMENT: Record<string, LessonEnrichment> = {
  ...tokenAndContext,
  ...skillsAndAgents,
  ...mcp,
  ...promptEngineering,
};

export function getEnrichment(slug: string): LessonEnrichment | undefined {
  return ENRICHMENT[slug];
}
