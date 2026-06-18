import { ReadingProgress } from "@/components/ReadingProgress";
import { LessonOutline } from "@/components/LessonOutline";
import { lessonPhases } from "@/lib/data";
import { TRACK_BY_SLUG } from "@/lib/tracks";

// Persistent reader shell: the sticky outline survives lesson-to-lesson
// navigation (only the page content swaps), so the active highlight slides
// instead of a hard reload.
export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { track: string; lesson: string };
}) {
  const track = TRACK_BY_SLUG[params.track];
  const phases = lessonPhases(params.track).map((g) => ({
    phase: g.phase,
    lessons: g.lessons.map((l) => ({ slug: l.slug, title: l.title, track: l.track })),
  }));

  return (
    <>
      <ReadingProgress />
      <div className="container-page grid gap-8 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <LessonOutline
          phases={phases}
          activeSlug={params.lesson}
          trackLabel={track?.label ?? "Lessons"}
          accent={track?.accent ?? "#B5832E"}
        />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
