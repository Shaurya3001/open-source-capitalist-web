export function SourceLink({ url, channel }: { url: string; channel?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-ghost w-fit"
      aria-label={`Watch the source video on YouTube${channel ? ` (${channel})` : ""}`}
    >
      Watch source{channel ? ` · ${channel}` : ""} ↗
    </a>
  );
}
