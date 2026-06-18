import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Open Source Capitalist",
  description: "Why this exists and how it's built: sourced, audited, cite-or-cut.",
};

export default function AboutPage() {
  return (
    <div className="container-page flex max-w-2xl flex-col gap-6 py-12">
      <p className="eyebrow">About</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Open-sourcing how I actually use AI.
      </h1>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
        <p>
          Open Source Capitalist is built on one idea: show your work. The investing side publishes
          daily takes against a public scorecard that tracks the misses. This side applies the same
          rule to learning — every lesson here cites the talk it came from, and tells you whether
          that source is a primary one (Anthropic, AI Engineer, IBM, DeepLearning.AI, Karpathy,
          Chroma) or an independent creator.
        </p>
        <p>
          The lessons start as notes in an Obsidian vault. Each note is audited against its real
          source — title and channel corroborated against the actual video — before it ships.
          Where the underlying generator produced something wrong, the note says so. Cite-or-cut:
          an unsourced claim is softened or struck.
        </p>
        <p>
          It started as a poll to my group: what do you actually want to get better at with AI?
          Building your own skills and stretching usage limits led, so those two tracks came first.
          MCP and prompt engineering followed; foundations and big-picture talks are next.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/learn" className="btn">
          Browse lessons
        </Link>
        <Link href="/tools/token-budget" className="btn-ghost">
          Token calculator
        </Link>
      </div>

      <div className="flex flex-col gap-2 border-t border-line pt-6">
        <p className="text-sm text-ink-muted">
          Built by <span className="font-medium text-ink">Shaurya Gulati</span>.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/shaurya-gulati/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Shaurya3001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep hover:underline"
          >
            GitHub
          </a>
          <a href="mailto:shauryagulati3001@gmail.com" className="text-accent-deep hover:underline">
            shauryagulati3001@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
