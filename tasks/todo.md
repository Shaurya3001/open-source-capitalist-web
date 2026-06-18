# TODO — Open Source Capitalist: AI Lessons site

Plan: `~/.claude/plans/lively-yawning-map.md`. Content source: the cleaned AI Lessons vault.

## Phase 1 — Scaffold & data  ✅ done
- [x] Config (package, tsconfig strict, tailwind, postcss, next, globals)
- [x] `lib/types.ts`, `lib/tracks.ts`
- [x] `scripts/ingest.ts`
- [x] `npm install` + `npm run ingest` → 34 lessons / 4 tracks / 0 unresolved related
- [x] `lib/data.ts` accessors + `lib/data/pricing.ts`

## Phase 2 — UI shell & lessons  ✅ done
- [x] layout + Navbar/Footer/Brand (Space Grotesk + Inter + IBM Plex Mono)
- [x] Lesson pages (★/▷ badge + source link + rendered body + related)
- [x] Track + /learn pages

## Phase 3 — Landing, about, applet  ✅ done
- [x] Landing (`/`) + `/about`
- [x] Token Budget calculator (`/tools/token-budget`) — live, accurate, aria-labeled

## Phase 4 — Verify  ✅ done
- [x] `tsc --noEmit` passes
- [x] `next build` passes (45 static pages)
- [x] Screenshots: landing, lesson page (★ Official badge + source + body + related), calculator
- [x] No console errors; calculator math verified live; no browser external calls (no YouTube iframe)

## Fast-follows (not started)
- [ ] Foundations + Big-picture tracks (sections E & F of the 50-link list)
- [ ] Deploy to Vercel (only claim deployed once a live URL is confirmed)
- [ ] Search / ⌘K · dark mode · Framer motion polish
