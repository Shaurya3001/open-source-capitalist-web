import type { TrackMeta } from "./types";

// Ordered for the site: the two poll-winning tracks lead.
export const TRACKS: TrackMeta[] = [
  {
    slug: "skills-and-agents",
    label: "Build Your Own Skills & Agents",
    blurb: "SKILL.md, subagents, agent design — the building blocks for making AI do real work.",
    accent: "#2F6B4F",
  },
  {
    slug: "token-and-context",
    label: "Token & Context Optimization",
    blurb: "Context is working memory, tokens are budget. How to spend both well.",
    accent: "#B5832E",
  },
  {
    slug: "mcp",
    label: "MCP — Connect AI to Your Tools",
    blurb: "The protocol that plugs models into your real data and actions.",
    accent: "#3B6CA8",
  },
  {
    slug: "prompt-engineering",
    label: "Prompt Engineering",
    blurb: "How to ask so the model actually delivers what you need.",
    accent: "#9A4A2E",
  },
];

export const TRACK_BY_SLUG: Record<string, TrackMeta> = Object.fromEntries(
  TRACKS.map((t) => [t.slug, t]),
);
