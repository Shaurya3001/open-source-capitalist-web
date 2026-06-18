import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lessonPhases } from "@/lib/data";
import { TRACKS, TRACK_BY_SLUG } from "@/lib/tracks";
import { Syllabus } from "@/components/Syllabus";

export function generateStaticParams() {
  return TRACKS.map((t) => ({ track: t.slug }));
}

export function generateMetadata({ params }: { params: { track: string } }): Metadata {
  const t = TRACK_BY_SLUG[params.track];
  return {
    title: t ? `${t.label} — Open Source Capitalist` : "Track",
    description: t?.blurb,
  };
}

export default function TrackPage({ params }: { params: { track: string } }) {
  const track = TRACK_BY_SLUG[params.track];
  if (!track) notFound();

  const phases = lessonPhases(track.slug).map((g) => ({
    phase: g.phase,
    lessons: g.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      track: l.track,
      credibility: l.credibility,
      channel: l.channel,
      summary: l.summary,
    })),
  }));

  return (
    <div className="container-page py-10">
      <Syllabus
        phases={phases}
        label={track.label}
        blurb={track.blurb}
        accent={track.accent}
        trackSlug={track.slug}
      />
    </div>
  );
}
