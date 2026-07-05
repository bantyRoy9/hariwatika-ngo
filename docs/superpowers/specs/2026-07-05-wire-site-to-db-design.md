# Wire public site to admin-managed DB content — Design

## Context

Client (Lalit) sent a long list of WhatsApp feedback about the site (translated
and organized below). Investigation found the root cause behind several of
the complaints at once: **the admin panel already has full CRUD for social
links, home stats, services, campaigns, and pillars — but the live public
site never reads any of it.** `src/app/page.tsx`, `Navbar.tsx`, and
`Footer.tsx` are hardcoded with static arrays/URLs, fully disconnected from
the database the admin panel writes to. Editing content in `/admin` has no
effect on the live site for these sections.

This spec covers **Phase 1 only**: wiring the public site to the DB. It is
the first of a larger roadmap (see "Full roadmap" below) built from the raw
client feedback.

### Translated client feedback (full list, for traceability)

1. Add "Vivah" (marriage) into the site name; pick a stable/permanent domain.
2. Donations: add ₹100 to preset amounts (currently `[500,1000,2000,5000,10000]`).
3. Make Hindi the primary/default language; English secondary.
4. Donation flow: popup form → redirect to a WhatsApp **group** (not the
   personal number currently linked).
5. Post-donation: show a thank-you/"wellness" message, then redirect to the
   WhatsApp group.
6. Bank details section exists; add required-documents info alongside it.
7. Wire up real Facebook/Instagram/YouTube URLs (currently placeholders) and
   add LinkedIn (missing).
8. Add mission & vision copy/section.
9. Re-theme the homepage hero slider around marriage/education/tree
   plantation/health, using existing real photos; admin should be able to
   add more later.
10. Update the stats section with real per-category numbers: Marriage — 20
    yrs / 3000+; Tree plantation — 7 yrs / 5000+; Education — 8 yrs; Medical —
    TBD; Volunteers — 2000+.
11. Future "Section 2" — campus/education/social photos, not ready yet but
    should be scaffolded for later launch.
12. Blog/stories manageable from admin with correct styling once published.
13. News & updates on the homepage should auto-pull from the blog data.
14. Every content section should be admin-editable (**this phase**).
15. "Bihar project" photo sorting/selection, manageable via admin.
16. "Get Involved" CTA should redirect to a WhatsApp **group** for
    volunteers (currently a personal number).
17. Replace stock/Unsplash photos with real NGO photos; no photo repeats.

### Full roadmap (sequencing agreed with user)

1. **Wire site to DB** (this spec) — stats, social links, services, nav
   links, campaigns, pillars, hero/about/quote text.
2. Hero slider re-theme + admin-editable.
3. Stats real numbers (trivial once #1 lands — just an admin edit).
4. Donation flow overhaul (₹100 preset, Hindi-first, WhatsApp group).
5. Volunteer WhatsApp group redirect.
6. Blog/news automation on homepage.
7. Mission & vision copy.
8. Bank details required-documents section.
9. Projects/"Bihar project" photo polish.
10. Section-2 scaffold (campus/edu/social photos, future launch).
11. Real photo replacement, dedup — blocked on client supplying photos.
12. Domain/naming decision — non-code, business decision.

Items 11 and 12 need assets/decisions from the client and aren't code tasks
until then.

## Phase 1 Design

### Architecture

`src/app/layout.tsx` is already an async server component (it calls
`getTranslations()` for `LanguageProvider`). Extend it to also fetch, in the
same `Promise.all`:

- `getNavLinks("navbar")`
- `getNavLinks("footer-quick")`
- `getNavLinks("footer-legal")`
- `getSocialLinks()`

All four helpers already exist in `src/lib/content.ts` and are currently
unused. Pass the results as props into `Navbar` and `Footer`, and render both
components from `layout.tsx`, wrapping `{children}` — the same place
`ScrollProgress` and `ParallaxProvider` already sit.

### Components

- `Navbar`/`Footer` remain `"use client"` (mobile menu state, active-link
  highlighting via `usePathname`, language toggle) but stop importing
  hardcoded link/URL arrays — those become props.
- Remove the duplicated `<Navbar/>`/`<Footer/>` JSX from every page that
  currently renders them directly: `page.tsx` (home), `contact/page.tsx`,
  `volunteer/page.tsx`, `internship/page.tsx`, `programs/page.tsx`,
  `registration/page.tsx`, `gallery/page.tsx`, `donate/page.tsx` (both its
  normal-state and `submitted`-state branches — currently rendered twice),
  and `AboutContent.tsx`, `ProjectsContent.tsx`, `BlogContent.tsx`,
  `TransparencyContent.tsx`. (`admin/(dash)/_legacy-page.tsx.bak` also
  matches but is a dead `.bak` file — leave untouched.)
- Home page splits into `src/app/page.tsx` (new async server component) +
  `src/app/HomeContent.tsx` (client, receives data as props) — mirroring the
  existing `about`/`projects`/`blog` pattern (`page.tsx` fetches, `*Content.tsx`
  renders).

### Data flow

- `layout.tsx`: fetches nav + social links once; single source of truth, no
  per-page refetching.
- Home `page.tsx`: `Promise.all([homeService.findMany, homeStat.findMany,
  homeCampaign.findMany, homePillar.findMany, getSettings(["home","image"])])`,
  each ordered by `sortOrder` where applicable, passed as typed props to
  `HomeContent`. This replaces the hardcoded `stats`/`content`/`IMG` objects
  currently baked into the client component — covering stats, services,
  campaigns, pillars, and hero/about/quote text in one pass (not just stats),
  since it's the identical fix applied to the same file.
- `SocialLink` seed data gets one additional row added for LinkedIn
  (placeholder URL) so the admin has something to edit — sourcing the real
  URL is a later/client task, not part of this phase.

### Error handling

Match the existing convention used by `about`/`projects`/`blog`:
`export const dynamic = "force-dynamic"`, no try/catch around the Prisma
calls (DB errors surface via Next's error boundary — consistent with the
rest of the app, not introducing a new pattern). Empty tables render as
empty arrays, not crashes (e.g., no social rows → no icons shown).

### Testing / verification

No test framework covers UI pages in this repo (one unrelated unit test
exists under `tests/`). Verification is manual:
1. Dev-server check that home hero/stats/services now render from DB, not
   hardcoded arrays.
2. Edit a stat value in `/admin/content/home` and confirm it appears live on
   the homepage without a code change.
3. Spot-check `contact`, `donate`, and `about` pages for correct nav/social
   links and confirm the donate success screen no longer double-renders
   `Navbar`.

### Out of scope for this phase

Hero slider re-theming, real social media URLs (beyond adding the LinkedIn
placeholder row), and photo replacement — these are later roadmap items
that depend on client-supplied content/decisions.
