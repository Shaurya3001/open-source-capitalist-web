import Link from "next/link";
import { trackSummaries, featuredLessons, totalLessons } from "@/lib/data";
import { TrackCard } from "@/components/TrackCard";
import { LessonCard } from "@/components/LessonCard";

export default function HomePage() {
  const tracks = trackSummaries();
  const featured = featuredLessons(6);
  const official = tracks.reduce((n, t) => n + t.officialCount, 0);

  return (
    <div className="container-page flex flex-col gap-16 py-12">
      {/* Hero */}
      <section className="flex flex-col gap-5">
        <p className="eyebrow">Open Source Capitalist · AI Lessons</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          The best AI talks, distilled into lessons you can actually use.
        </h1>
        <p className="max-w-2xl text-[16px] leading-relaxed text-ink-muted">
          I asked my group what they wanted to get better at with AI. Building your own skills and
          stretching your usage limits won. So I parsed {totalLessons} of the most credible talks
          and tutorials into plain-English, cross-linked lessons — every one citing its source, and
          flagged as a primary or creator source. No slop.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn" className="btn">
            Browse lessons
          </Link>
          <Link href="/tools/token-budget" className="btn-ghost">
            Try the token calculator
          </Link>
        </div>
        <p className="font-mono text-xs text-ink-faint">
          {totalLessons} lessons · {official} from primary sources · 4 tracks
        </p>
      </section>

      {/* Tracks */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Four tracks</h2>
          <Link href="/learn" className="text-sm text-ink-muted hover:text-accent-deep">
            All lessons →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map((t) => (
            <TrackCard key={t.slug} track={t} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Start with these</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <LessonCard key={l.slug} lesson={l} />
          ))}
        </div>
      </section>

      {/* Token budget teaser */}
      <section className="card flex flex-col gap-4 bg-paper-panel/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="eyebrow">Interactive</p>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            How much is that prompt costing you?
          </h2>
          <p className="max-w-xl text-sm text-ink-muted">
            Pick a model, set your input/output tokens and turns, toggle prompt caching — see the
            cost, how much of the context window you&apos;re using, and where to save.
          </p>
        </div>
        <Link href="/tools/token-budget" className="btn w-fit whitespace-nowrap">
          Open calculator →
        </Link>
      </section>

      {/* How this is made */}
      <section className="flex flex-col gap-4 border-t border-line pt-8">
        <p className="eyebrow">How this is made</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["1 · Parse", "Credible talks (Anthropic, AI Engineer, IBM, DeepLearning.AI, Karpathy, Chroma…) become notes in an Obsidian vault."],
            ["2 · Verify", "Every note is audited and corroborated against the real video (title + channel via YouTube), then tagged official or creator."],
            ["3 · Connect", "Notes are cross-linked by topic and published here as lessons — each one links back to its source."],
          ].map(([h, b]) => (
            <div key={h} className="flex flex-col gap-1">
              <p className="font-mono text-xs uppercase tracking-wide text-accent-deep">{h}</p>
              <p className="text-sm leading-relaxed text-ink-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
