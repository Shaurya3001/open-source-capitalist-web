import type { Metadata } from "next";
import { trackSummaries, totalLessons } from "@/lib/data";
import { TrackCard } from "@/components/TrackCard";

export const metadata: Metadata = {
  title: "Lessons — Open Source Capitalist",
  description: "AI lessons across four tracks: skills & agents, token/context, MCP, and prompt engineering.",
};

export default function LearnPage() {
  const tracks = trackSummaries();
  return (
    <div className="container-page flex flex-col gap-8 py-10">
      <header className="flex flex-col gap-2">
        <p className="eyebrow">AI Lessons</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {totalLessons} lessons, four tracks
        </h1>
        <p className="max-w-2xl text-[15px] text-ink-muted">
          Distilled from credible talks and tutorials. Every lesson links its source and flags
          whether it&apos;s a primary or a creator source.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {tracks.map((t) => (
          <TrackCard key={t.slug} track={t} />
        ))}
      </div>
    </div>
  );
}
