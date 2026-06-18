# Progress

## 2026-06-18
- Scaffolded `open-source-capitalist-web` (Next 14 / React 18 / TS strict / Tailwind 3).
- Data model: `lib/types.ts` (Lesson, TrackSlug, Credibility), `lib/tracks.ts` (4 tracks, poll-winners first).
- `scripts/ingest.ts`: parses the AI Lessons vault → `data/lessons.json`; resolves `## Related` wikilinks to slugs; reads `track`/`credibility` directly.
- Design system in `tailwind.config.ts` + `globals.css`: "open ledger" palette (ink/paper/ochre + verified-green for official badges).
- Next: install deps, run ingest, build UI.

## 2026-06-18 (cont.)
- Built the full site: ingest → `data/lessons.json` (34 lessons), data layer, layout + 11 components, landing/learn/track/lesson/about/not-found pages, and the Token Budget calculator.
- Pricing from the `claude-api` skill (Opus 4.8 $5/$25 etc., dated 2026-05-26), cache write 1.25× / read 0.1×.
- Verified: `tsc` + `next build` clean (45 static pages); dev server on :3271; screenshots of landing, a lesson (★ Official + source + 62 body points + 4 related), and the calculator (live, math checks out). No console errors.
- NOT deployed. Fast-follows: Foundations + Big-picture tracks, Vercel deploy.

## 2026-06-18 (chat feature)
- Added "chat with the contents": floating site-wide `AskWidget` + `/api/chat` route grounded in
  the whole corpus (cached), Haiku 4.5 default, BYO-key or server key, keyless extractive fallback.
  Files: `app/api/chat/route.ts`, `lib/chat.ts`, `lib/useSessionKey.ts`, `components/AskWidget.tsx`
  + `AskKey.tsx`, `app/layout.tsx`, `.env.example`. No new npm deps (raw fetch).
- Verified: typecheck + build pass; keyless path returns correct relevant sources (200); widget
  opens/sends/renders numbered Source chips linking to lessons; no console errors. First Load JS
  unchanged (corpus stays server-side). LLM answer path wired per the reference but needs a real
  key to demo a live answer.
- Gotcha hit + fixed: ran `next build` while `next dev` was live → corrupted `.next`; cleared and
  restarted (see lessons.md).

## 2026-06-18 (deployed)
- Added Shaurya's identifiers (name + LinkedIn/GitHub/email) to Footer + About; `vercel --prod --yes`.
- LIVE + verified: https://open-source-capitalist-web.vercel.app (public, indexable). Build 36s on
  Vercel; readyState READY. Footer identifiers confirmed via fetch. No server ANTHROPIC_API_KEY set
  (chat is keyless/BYO-key).

## 2026-06-18 (interactive teaching layer)
- Added an authored Practice & reinforce layer to every lesson: bad/good `ExampleContrast`,
  `QuickCheck` quizzes (instant feedback + ties into ✓ progress), `KeyTakeaways` flip cards, and
  6 concept applets (PromptLab, TokenizerPlay, CachingCost, ContextWindow, SkillAnatomy, McpFlow).
- Authored content lives in `lib/data/enrichment/<track>.ts` (separate from the sourced
  lessons.json). `scripts/check-enrichment.ts` reports 34/34 enriched. NO new deps.
- Verified: typecheck + build pass; quiz interactivity works (correct→✓, explanation, "1/3
  correct" tally); applets compute (caching $1.00→$0.22); no console errors. Token + prompt-eng
  tracks spot-checked live; pattern identical across tracks.
- ⚠️ REVIEW NEEDED: the authored quiz/example accuracy in `lib/data/enrichment/*` should be skimmed
  before deploy — a wrong quiz answer would undercut credibility.

## 2026-06-18 (guided course redesign)
- Reworked /learn from a card dump into a guided, animated course. Added `lib/curriculum.ts`
  (curated phased order per track), `lib/useProgress.ts` (localStorage ✓), `adjacentLessons` /
  `lessonPhases` / `nextTrack` in `lib/data.ts`.
- New reader shell: `app/learn/[track]/[lesson]/layout.tsx` (persistent sticky `LessonOutline`)
  + `template.tsx` (Framer enter-animation). New components: `LessonOutline` (phase headers,
  sliding active highlight, ✓), `LessonPager` (prev/next + ←/→ keys + cross-track "Up next"),
  `ReadingProgress`, `LessonComplete` (scroll-to-end ✓ sentinel), `Syllabus` (track page).
  Added `framer-motion` (a listed project dep).
- Verified: typecheck + build pass (track page 139kB / lesson 97kB First Load with Framer);
  syllabus + lesson outline render; user previewing live. Stopped preview before building (per
  lessons.md). Did NOT re-run ingest (unchanged).
