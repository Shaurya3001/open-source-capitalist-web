import type { TrackSlug } from "./types";

// Curated learning path per track: ordered phases of slug tokens (foundations →
// advanced). A lesson's order = the index of the first token its slug includes;
// its phase = that token's group. Tokens are verified unique within each track.
export interface CurriculumPhase {
  phase: string;
  tokens: string[];
}

export const CURRICULUM: Record<TrackSlug, CurriculumPhase[]> = {
  "skills-and-agents": [
    {
      phase: "Foundations",
      tokens: ["building-effective-llm-agents", "how-we-build-effective-agents", "don-t-build-agents"],
    },
    {
      phase: "Build your own skills",
      tokens: ["agent-skills-explained", "full-claude-skills-guide", "skills-sh", "claude-agent-sdk"],
    },
    {
      phase: "In practice",
      tokens: ["how-i-use-claude-code", "ultimate-claude-code-guide", "run-for-hours"],
    },
  ],
  "token-and-context": [
    {
      phase: "Foundations",
      tokens: ["gpt-tokenizer", "context-engineering-vs-prompt", "effective-context-engineering"],
    },
    {
      phase: "The research",
      tokens: ["behind-the-research", "context-rot-how-increasing", "a-deep-discussion"],
    },
    { phase: "Optimize", tokens: ["7-strategies", "prompt-caching-10x", "the-secret-to-faster"] },
  ],
  mcp: [
    {
      phase: "Start here",
      tokens: ["mcp-201", "mcp-and-the-claude-api", "building-agents-with-model-context-protocol"],
    },
    { phase: "Connect & compare", tokens: ["mcp-vs-rag", "mcp-dev-days", "world-s-fair"] },
    { phase: "Build with it", tokens: ["supporting-multi-agent", "build-a-claude-mcp-agent"] },
  ],
  "prompt-engineering": [
    { phase: "Foundations", tokens: ["prompting-101", "for-developers", "full-ai-prompting-course"] },
    { phase: "Go deeper", tokens: ["a-deep-dive", "27-min"] },
    { phase: "Applied", tokens: ["actually-prompt", "new-rules"] },
  ],
};

interface FlatToken {
  token: string;
  phase: string;
}

function flat(track: string): FlatToken[] {
  const phases = CURRICULUM[track as TrackSlug];
  if (!phases) return [];
  return phases.flatMap((p) => p.tokens.map((token) => ({ token, phase: p.phase })));
}

/** order = flattened token index the slug matches first; phase = its group. */
export function curriculumRank(track: string, slug: string): { order: number; phase: string } {
  const list = flat(track);
  for (let i = 0; i < list.length; i++) {
    if (slug.includes(list[i].token)) return { order: i, phase: list[i].phase };
  }
  return { order: 999, phase: "More" };
}

export function phaseOrder(track: string): string[] {
  const phases = CURRICULUM[track as TrackSlug];
  return [...(phases ? phases.map((p) => p.phase) : []), "More"];
}
