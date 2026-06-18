# Lessons

- Source content is the cleaned **AI Lessons** Obsidian vault, not hand-authored data. The
  ingest step must stay tolerant of NoteCompanion quirks (blank-line YAML, callouts, the
  `## Channel` / `## Related` sections, trailing backup wikilinks).
- NoteCompanion can hallucinate whole notes when a transcript fetch fails — the vault was
  audited + corroborated (oEmbed) before this site was built. Re-audit before re-ingesting new batches.
- Lesson pages link out to the source video (no YouTube iframe) to honor offline-first.
- **Never run `next build` while `next dev` is live against the same `.next`.** The prod build
  clobbers the dev server's webpack chunks → `Cannot find module './NNN.js'` (MODULE_NOT_FOUND)
  on every page. Recover: stop the dev server, `Remove-Item .next -Recurse -Force`, restart dev.
  Run `build` only after stopping the preview server (or it'd need a separate dist dir).
- Chat (`/api/chat`) keeps the corpus server-side. Do NOT import `lib/data`/`lessons.json` into a
  client component — it'd ship the whole corpus to the browser. The widget gets sources from the
  route response only.
