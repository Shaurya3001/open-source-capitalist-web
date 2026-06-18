import type { Lesson } from "@/lib/types";
import { LessonCard } from "./LessonCard";

export function RelatedLessons({ lessons }: { lessons: Lesson[] }) {
  if (!lessons.length) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-semibold">Related lessons</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((l) => (
          <LessonCard key={l.slug} lesson={l} />
        ))}
      </div>
    </section>
  );
}
