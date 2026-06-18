import lessonsJson from "@/data/lessons.json";
import type { Lesson, TrackMeta } from "./types";
import { TRACKS } from "./tracks";
import { curriculumRank, phaseOrder } from "./curriculum";

// Single source of truth, produced by scripts/ingest.ts.
export const lessons: Lesson[] = lessonsJson as Lesson[];

export const lessonBySlug: Record<string, Lesson> = Object.fromEntries(
  lessons.map((l) => [l.slug, l]),
);

export const totalLessons = lessons.length;

export function getLesson(slug: string): Lesson | undefined {
  return lessonBySlug[slug];
}

/** A track's lessons in curated curriculum order (foundations → advanced). */
export function lessonsByTrack(track: string): Lesson[] {
  return lessons
    .filter((l) => l.track === track)
    .map((l, i) => ({ l, i, order: curriculumRank(track, l.slug).order }))
    .sort((a, b) => a.order - b.order || a.i - b.i)
    .map((x) => x.l);
}

export interface PhaseGroup {
  phase: string;
  lessons: Lesson[];
}

/** A track's lessons grouped by curriculum phase, in order. */
export function lessonPhases(track: string): PhaseGroup[] {
  const order = phaseOrder(track);
  const groups = new Map<string, Lesson[]>();
  for (const l of lessonsByTrack(track)) {
    const { phase } = curriculumRank(track, l.slug);
    (groups.get(phase) ?? groups.set(phase, []).get(phase)!).push(l);
  }
  return order.filter((p) => groups.has(p)).map((phase) => ({ phase, lessons: groups.get(phase)! }));
}

export interface Adjacent {
  prev?: Lesson;
  next?: Lesson;
  index: number;
  total: number;
}

/** Prev/next lesson within the track's curriculum sequence. */
export function adjacentLessons(slug: string): Adjacent {
  const lesson = getLesson(slug);
  if (!lesson) return { index: 0, total: 0 };
  const seq = lessonsByTrack(lesson.track);
  const index = seq.findIndex((l) => l.slug === slug);
  return { prev: seq[index - 1], next: seq[index + 1], index, total: seq.length };
}

/** The next track in the curriculum (wraps), for cross-track "up next". */
export function nextTrack(track: string): TrackMeta | undefined {
  const i = TRACKS.findIndex((t) => t.slug === track);
  return i === -1 ? undefined : TRACKS[(i + 1) % TRACKS.length];
}

export interface TrackSummary extends TrackMeta {
  count: number;
  officialCount: number;
}

export function trackSummaries(): TrackSummary[] {
  return TRACKS.map((t) => {
    const ls = lessonsByTrack(t.slug);
    return {
      ...t,
      count: ls.length,
      officialCount: ls.filter((l) => l.credibility === "official").length,
    };
  });
}

export function relatedLessons(slug: string): Lesson[] {
  const lesson = getLesson(slug);
  if (!lesson) return [];
  return lesson.related
    .map((s) => lessonBySlug[s])
    .filter((l): l is Lesson => Boolean(l));
}

/** Official lessons, interleaved across tracks for variety. */
export function featuredLessons(limit = 6): Lesson[] {
  const buckets = TRACKS.map((t) =>
    lessonsByTrack(t.slug).filter((l) => l.credibility === "official"),
  );
  const picks: Lesson[] = [];
  let guard = 0;
  while (picks.length < limit && buckets.some((b) => b.length) && guard++ < 50) {
    for (const b of buckets) {
      const next = b.shift();
      if (next) picks.push(next);
      if (picks.length >= limit) break;
    }
  }
  return picks;
}
