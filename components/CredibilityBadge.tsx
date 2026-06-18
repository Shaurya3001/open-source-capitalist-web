import type { Credibility } from "@/lib/types";

export function CredibilityBadge({ credibility }: { credibility: Credibility }) {
  if (credibility === "official") {
    return (
      <span className="badge badge-official" title="Primary / authoritative source">
        ★ Official
      </span>
    );
  }
  return (
    <span className="badge badge-creator" title="Independent creator (secondary source)">
      ▷ Creator
    </span>
  );
}
