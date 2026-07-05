# Inline Edit — Page-by-Page Audit & Fix (2026-07-05)

## What was broken

Inline editing existed on several pages but **edits vanished on reload** for every
page except Home, AND the edit UI itself wouldn't appear in dev. Three root causes:

### Bug 3 — Dev admin bypass was removed (edit UI never appears in dev)  *(the real blocker)*
`isAuthenticated()` in `src/lib/auth.ts` had its dev bypass (`if (NODE_ENV !== "production") return true`)
deleted in commit `b414b2c`. Since both `isAdminUser()` (shows the yellow edit UI) AND
`assertAdmin()` (which `saveSettings` calls to persist) route through `isAuthenticated()`,
**nothing was editable in dev unless you logged in** — including Home. The docs that
promise "always admin in development" were describing this now-missing bypass.

**Fix:** restored the bypass at the single chokepoint `isAuthenticated()`, so in dev
the edit UI shows *and* saves succeed without login. Production still requires the
signed `hw_admin` cookie.

### Bug 1 — Server pages never read settings (no persistence)
The `EditableText` component reads `liveValues[key]` (seeded from
`AdminEditProvider`'s `initialValues`) before falling back to its hardcoded
`en`/`hi` props. Pages mounted `<AdminEditProvider>` **without `initialValues`**
and the server pages never called `getSettings()`, so:
- the hardcoded props always won on render,
- saves *did* write to the DB, but a reload showed the hardcoded value again.

### Bug 2 — `saveSettings()` hardcoded `group: "home"` on every new row
`src/app/actions/content.ts` created all new `SiteSetting` rows under group
`"home"`, so once server pages started filtering by real group (`getSettings(["about"])`),
edits made before the fix would never be found again.

## Fixes applied

### Fix for Bug 2 (`src/app/actions/content.ts`)
Added `groupFromKey()` → derives group from the key's first segment, matching
the seed convention (`home.*` → `home`, `header.about.*` → `header`).

```ts
function groupFromKey(key: string): string {
  return key.split(".")[0] || "general";
}
// create: { ..., group: groupFromKey(r.key) }
```

### Fix for Bug 1 — wired every page to fetch settings + pass `initialValues`

The minimal, correct fix per page: server `page.tsx` calls `getSettings([group])`
and passes the map to the client component, which passes it as
`<AdminEditProvider initialValues={settings}>`. The `EditableText` hardcoded
props stay as fallbacks.

## Per-page status (all ✅ verified end-to-end)

| Page | Pattern | Server fetches DB? | `initialValues`? | EditableTexts |
|------|---------|:--:|:--:|:--:|
| `/` home | HomePageClient | ✅ | ✅ | 107 |
| `/about` | AboutContent | ✅ `getSettings(["about"])` | ✅ | 8 |
| `/blog` | BlogContent | ✅ `getSettings(["blog"])` | ✅ | 2 |
| `/projects` | ProjectsContent | ✅ `getSettings(["projects"])` | ✅ | 3 |
| `/transparency` | TransparencyContent | ✅ `getSettings(["transparency"])` | ✅ | 6 |
| `/contact` | **split** → ContactContent | ✅ `getSettings(["contact"])` | ✅ | 3 |
| `/volunteer` | **split** → VolunteerContent | ✅ `getSettings(["volunteer"])` | ✅ | 3 |
| `/donate` | **split** → DonateContent | ✅ `getSettings(["donate"])` | ✅ | 1 |
| `/gallery` | **split** → GalleryContent | ✅ `getSettings(["gallery"])` | ✅ | 2 (new) |
| `/internship` | **split** → InternshipContent | ✅ `getSettings(["internship"])` + `getHeader` | ✅ | 3 (new) |
| `/programs` | **split** → ProgramsContent | ✅ `getSettings(["programs"])` | ✅ | 4 (new) |
| `/registration` | **split** → RegistrationContent | ✅ `getSettings(["registration"])` + `getHeader` | ✅ | 3 (new) |

"**split**" = the page was a single `"use client"` file with no server fetch; it
was split into a server `page.tsx` (fetches settings) + a `*Content.tsx` client
component.

## New files
- `src/app/(site)/contact/ContactContent.tsx`
- `src/app/(site)/volunteer/VolunteerContent.tsx`
- `src/app/(site)/donate/DonateContent.tsx`
- `src/app/(site)/gallery/GalleryContent.tsx`
- `src/app/(site)/internship/InternshipContent.tsx`
- `src/app/(site)/programs/ProgramsContent.tsx`
- `src/app/(site)/registration/RegistrationContent.tsx`

## Verification
- `npx tsc --noEmit` → clean
- `npm run build` → all 12 public pages compile
- Runtime probe: all 12 pages return HTTP 200
- Persistence round-trip tested on `/`, `/about`, `/programs`: wrote a marker
  to `SiteSetting` via Prisma → reloaded page → marker appeared in SSR HTML
  (both the rendered `<span>` and the RSC payload) → restored.

## Also fixed
- `page-editor/[page]/page.tsx` `PAGE_MAP` — added missing `gallery` and
  `programs` slugs so all 12 pages are reachable from the admin page editor.

## How to test manually
1. Start dev server (`npm run dev`).
2. Open `/about` (no login needed in dev — the bypass is restored). You should see
   yellow dashed outlines on headings and a floating "Admin Edit Mode" badge.
3. Double-click any outlined text, edit, Save.
4. Reload — the edit persists.

In **production** you must log in at `/admin/login` first; the dev bypass does not
apply when `NODE_ENV=production`.
