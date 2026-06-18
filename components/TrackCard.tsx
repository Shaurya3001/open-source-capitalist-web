import Link from "next/link";
import type { TrackSummary } from "@/lib/data";

export function TrackCard({ track }: { track: TrackSummary }) {
  return (
    <Link href={`/learn/${track.slug}`} className="card card-hover flex flex-col gap-3 p-5">
      <span className="h-1.5 w-10 rounded-full" style={{ background: track.accent }} aria-hidden />
      <h3 className="font-display text-lg font-semibold text-ink">{track.label}</h3>
      <p className="text-sm leading-relaxed text-ink-muted">{track.blurb}</p>
      <span className="mt-auto font-mono text-xs text-ink-faint">
        {track.count} lessons · {track.officialCount} official
      </span>
    </Link>
  );
}
