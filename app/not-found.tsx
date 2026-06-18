import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-start justify-center gap-4 py-20">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-ink-muted">That lesson or page doesn&apos;t exist.</p>
      <Link href="/learn" className="btn-ghost">
        Browse lessons
      </Link>
    </div>
  );
}
