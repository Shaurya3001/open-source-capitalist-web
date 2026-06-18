// Canonical data model. `data/lessons.json` is an array of Lesson, produced by
// scripts/ingest.ts from the AI Lessons Obsidian vault.

export type TrackSlug =
  | "skills-and-agents"
  | "token-and-context"
  | "mcp"
  | "prompt-engineering";

export type Credibility = "official" | "creator";

export interface Lesson {
  /** url-safe slug derived from the title. */
  slug: string;
  title: string;
  /** Uploading channel (e.g. "Anthropic", "AI Engineer"). */
  channel: string;
  /** YouTube watch URL. */
  sourceUrl: string;
  videoId: string;
  /** ISO date or "" when unknown. */
  datePublished: string;
  track: TrackSlug;
  /** official = primary/authoritative source; creator = independent. */
  credibility: Credibility;
  topics: string[];
  tags: string[];
  /** One-line editorial summary. */
  summary: string;
  /** The note's "Detailed Summary" section, as markdown. */
  body: string;
  /** Slugs of related lessons (resolved from the note's wikilinks). */
  related: string[];
}

export interface TrackMeta {
  slug: TrackSlug;
  label: string;
  /** One-line description shown on cards and track headers. */
  blurb: string;
  /** Hex accent for the track. */
  accent: string;
}

// --- Authored teaching layer (NOT from the source video — written to teach). ---

export interface ExamplePair {
  /** Short label for what's being contrasted. */
  label: string;
  bad: string;
  good: string;
  /** Why the good version wins. */
  why: string;
}

export interface QuizItem {
  q: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  /** Shown after answering. */
  explain: string;
}

export type AppletId =
  | "prompt-lab"
  | "tokenizer-play"
  | "caching-cost"
  | "context-window"
  | "skill-anatomy"
  | "mcp-flow";

export interface LessonEnrichment {
  /** 3 things to remember (flip-card recall). */
  takeaways: string[];
  quiz: QuizItem[];
  /** Bad-vs-good worked examples, where a concept has a concrete artifact. */
  examples?: ExamplePair[];
  /** An interactive concept applet to embed. */
  applet?: AppletId;
}
