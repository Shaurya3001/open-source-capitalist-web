import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lessons, getLesson, relatedLessons, adjacentLessons, nextTrack, lessonsByTrack } from "@/lib/data";
import { getEnrichment } from "@/lib/data/enrichment";
import { CredibilityBadge } from "@/components/CredibilityBadge";
import { SourceLink } from "@/components/SourceLink";
import { LessonBody } from "@/components/LessonBody";
import { RelatedLessons } from "@/components/RelatedLessons";
import { LessonComplete } from "@/components/LessonComplete";
import { LessonPager, type PagerLink } from "@/components/LessonPager";
import { ExampleContrast } from "@/components/lesson/ExampleContrast";
import { LessonApplet } from "@/components/lesson/LessonApplet";
import { KeyTakeaways } from "@/components/lesson/KeyTakeaways";
import { QuickCheck } from "@/components/lesson/QuickCheck";

export function generateStaticParams() {
  return lessons.map((l) => ({ track: l.track, lesson: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { track: string; lesson: string };
}): Metadata {
  const l = getLesson(params.lesson);
  return {
    title: l ? `${l.title} — Open Source Capitalist` : "Lesson",
    description: l?.summary,
  };
}

export default function LessonPage({ params }: { params: { track: string; lesson: string } }) {
  const lesson = getLesson(params.lesson);
  if (!lesson || lesson.track !== params.track) notFound();

  const adj = adjacentLessons(lesson.slug);
  const related = relatedLessons(lesson.slug);
  const enrichment = getEnrichment(lesson.slug);

  const prev: PagerLink | undefined = adj.prev
    ? { href: `/learn/${adj.prev.track}/${adj.prev.slug}`, title: adj.prev.title, eyebrow: "Previous" }
    : undefined;

  let next: PagerLink | undefined;
  if (adj.next) {
    next = { href: `/learn/${adj.next.track}/${adj.next.slug}`, title: adj.next.title, eyebrow: "Next" };
  } else {
    const nt = nextTrack(lesson.track);
    const first = nt ? lessonsByTrack(nt.slug)[0] : undefined;
    if (nt && first) {
      next = { href: `/learn/${nt.slug}/${first.slug}`, title: nt.label, eyebrow: "Up next — new track" };
    }
  }

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-wide text-accent-deep">
          Lesson {adj.index + 1} of {adj.total}
        </span>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <CredibilityBadge credibility={lesson.credibility} />
          <span className="font-mono text-xs">{lesson.channel || "Unknown"}</span>
          {lesson.datePublished && (
            <span className="font-mono text-xs text-ink-faint">· {lesson.datePublished}</span>
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight">{lesson.title}</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">{lesson.summary}</p>
        <SourceLink url={lesson.sourceUrl} channel={lesson.channel} />
      </header>

      <hr className="border-line" />

      <LessonBody body={lesson.body} />

      {lesson.topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {lesson.topics.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}

      {enrichment && (
        <>
          <hr className="border-line" />
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Practice &amp; reinforce</p>
            <p className="text-xs text-ink-faint">Authored teaching aids — written to teach, not pulled from the source video.</p>
          </div>
          <ExampleContrast examples={enrichment.examples} />
          {enrichment.applet && <LessonApplet id={enrichment.applet} />}
          <KeyTakeaways takeaways={enrichment.takeaways} />
          <QuickCheck quiz={enrichment.quiz} slug={lesson.slug} />
        </>
      )}

      <LessonComplete slug={lesson.slug} />
      <RelatedLessons lessons={related} />
      <LessonPager prev={prev} next={next} />
    </article>
  );
}
