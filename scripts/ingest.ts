/**
 * Ingestion: AI Lessons Obsidian vault -> data/lessons.json
 *
 *   npm run ingest                  # default vault path
 *   npm run ingest -- --vault <p>   # override path
 *
 * Vault path resolution: --vault <path>  >  $VAULT_PATH  >  bundled default.
 * The generated data/lessons.json is COMMITTED so deploys don't need the vault.
 *
 * Reuses the structural approach from podcast-knowledge-app/scripts/ingest.ts
 * (gray-matter + walk + slugify), but reads the clean `track`/`credibility`
 * front-matter directly and resolves the notes' `## Related` wikilinks to slugs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import type { Credibility, Lesson, TrackSlug } from "../lib/types";
import { TRACKS } from "../lib/tracks";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "data", "lessons.json");
const DEFAULT_VAULT =
  "C:\\Users\\shaur\\Desktop\\Shaurya's Second Brain\\Mumbai Tech Week Podcasts\\AI Lessons";

const args = process.argv.slice(2);
const vaultArg = args[args.indexOf("--vault") + 1];
const VAULT =
  (args.includes("--vault") && vaultArg) || process.env.VAULT_PATH || DEFAULT_VAULT;

const VALID_TRACKS = new Set<string>(TRACKS.map((t) => t.slug));

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70);
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "_NoteCompanion") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function firstYouTubeUrl(s: string): string {
  return s.match(/https?:\/\/[^\s)]*youtube\.com[^\s)]*/i)?.[0] ?? "";
}

/** Text of a `## Heading` section, until the next `## `, a `---` fence, or EOF. */
function section(content: string, heading: string): string {
  const re = new RegExp(
    `(?:^|\\n)##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|\\n---\\s*\\n|$)`,
    "i",
  );
  return (content.match(re)?.[1] ?? "").trim();
}

/** Wikilink targets (basenames) in the `## Related` section. */
function relatedTargets(content: string): string[] {
  const rel = section(content, "Related");
  const out: string[] = [];
  for (const m of rel.matchAll(/\[\[([^\]]+?)\]\]/g)) {
    const target = m[1].split("|")[0].trim();
    if (target.startsWith("_NoteCompanion") || target.includes("/")) continue;
    out.push(target);
  }
  return out;
}

function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

interface Parsed {
  base: string;
  data: Record<string, unknown>;
  content: string;
  title: string;
  slug: string;
  track: string;
}

function parse(file: string): Parsed | null {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const title = String(data.title ?? path.basename(file, ".md")).trim();
  const track = String(data.track ?? "").trim();
  if (!title || !VALID_TRACKS.has(track)) return null; // skips the MOC + anything untracked
  return {
    base: path.basename(file, ".md"),
    data: data as Record<string, unknown>,
    content,
    title,
    slug: slugify(title),
    track,
  };
}

function main(): void {
  const files = walk(VAULT);
  if (files.length === 0) {
    console.error(`No .md files under ${VAULT}. Set VAULT_PATH or pass --vault <path>.`);
    process.exit(1);
  }

  const parsed = files
    .map(parse)
    .filter((p): p is Parsed => p !== null);

  // Guarantee unique slugs, then map basename -> slug for related resolution.
  const seen = new Map<string, number>();
  for (const p of parsed) {
    const n = (seen.get(p.slug) ?? 0) + 1;
    seen.set(p.slug, n);
    if (n > 1) p.slug = `${p.slug}-${n}`;
  }
  const baseToSlug = new Map(parsed.map((p) => [p.base, p.slug]));

  const lessons: Lesson[] = parsed.map((p) => {
    const body = section(p.content, "Detailed Summary");
    const related = [
      ...new Set(
        relatedTargets(p.content)
          .map((b) => baseToSlug.get(b))
          .filter((s): s is string => Boolean(s)),
      ),
    ];
    const credibility: Credibility =
      String(p.data.credibility ?? "creator").trim() === "official" ? "official" : "creator";
    const summary = String(p.data.summary ?? "").trim();
    return {
      slug: p.slug,
      title: p.title,
      channel: String(p.data.channel ?? "").trim(),
      sourceUrl: String(p.data.source_url ?? "").trim() || firstYouTubeUrl(p.content),
      videoId: String(p.data.video_id ?? "").trim(),
      datePublished: String(p.data.date_published ?? "").trim(),
      track: p.track as TrackSlug,
      credibility,
      topics: strArr(p.data.topics),
      tags: strArr(p.data.tags),
      summary,
      body: body || summary,
      related,
    };
  });

  // Sort: track order, then official-first, then title.
  const order = new Map(TRACKS.map((t, i) => [t.slug, i]));
  lessons.sort((a, b) => {
    const t = (order.get(a.track) ?? 99) - (order.get(b.track) ?? 99);
    if (t) return t;
    if (a.credibility !== b.credibility) return a.credibility === "official" ? -1 : 1;
    return a.title.localeCompare(b.title);
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + "\n");

  const byTrack = TRACKS.map(
    (t) => `${t.slug}: ${lessons.filter((l) => l.track === t.slug).length}`,
  ).join(" · ");
  const unresolved = parsed.reduce(
    (n, p) => n + relatedTargets(p.content).filter((b) => !baseToSlug.has(b)).length,
    0,
  );
  console.log(`Vault: ${VAULT}`);
  console.log(`Ingested ${lessons.length} lessons  (${byTrack})`);
  console.log(`Unresolved related links: ${unresolved}`);
}

main();
