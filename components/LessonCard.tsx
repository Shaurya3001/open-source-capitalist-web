import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { TRACK_BY_SLUG } from "@/lib/tracks";
import { CredibilityBadge } from "./CredibilityBadge";

const SHORT: Record<string, string> = {
  "skills-and-agents": "Skills",
  "token-and-context": "Tokens",
  mcp: "MCP",
  "prompt-engineering": "Prompts",
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const track = TRACK_BY_SLUG[lesson.track];
  return (
    <Link
      href={`/learn/${lesson.track}/${lesson.slug}`}
      className="card card-hover flex flex-col gap-3 p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="chip" style={{ color: track?.accent }}>
          {SHORT[lesson.track] ?? lesson.track}
        </span>
        <CredibilityBadge credibility={lesson.credibility} />
      </div>
      <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
        {lesson.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">{lesson.summary}</p>
      <span className="mt-auto font-mono text-xs text-ink-faint">{lesson.channel || "Unknown"}</span>
    </Link>
  );
}
