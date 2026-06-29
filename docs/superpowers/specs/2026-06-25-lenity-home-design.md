# Lenity-Clone Home Page — Design

**Date:** 2026-06-25
**Scope:** Rebuild `src/app/page.tsx` only. Light "Lenity" charity theme.

## Goal

Transform the home page from the current dark cinematic 3D look into the light "Lenity"
charity layout (white background, orange accent, real photos). Other pages, Navbar, Footer,
DonationModal, and LanguageContext are unchanged.

## Constraints

- Edit **only** `src/app/page.tsx`. Navbar/Footer/DonationModal/LanguageContext untouched.
- Preserve bilingual content via existing `t(en, hi)` and `useLang()`.
- Reuse existing data arrays (services, campaigns, pillars, blogPosts, stats) and content strings.
- Images: Unsplash **hotlinks** via plain `<img>` (no `next.config` image-domain change, no `next/image`).
- No global theme-token changes; colors scoped to this file.

## Theme tokens (file-local `LENITY` const)

| Token | Value | Use |
|-------|-------|-----|
| accent | `#F97316` | buttons, eyebrows, icons |
| accentHover | `#ea670c` | hover |
| ink | `#1b1c19` | headings/body dark |
| muted | `#6b6b6b` | secondary text |
| soft | `#f7f7f5` | section bg alt |
| line | `#ececea` | card borders |

Fonts unchanged: Literata (headings), Plus Jakarta Sans (body).

## Sections (top → bottom)

1. **Hero** — full-bleed Unsplash photo with dark left-to-transparent overlay (keeps white
   Navbar text readable at top). Eyebrow "WELCOME OUR CHARITY", Literata headline with orange
   "Empower change" span, sub, orange **Donate Now** pill (opens DonationModal) + ghost **Our Work**
   link to `/projects`, two checkmark feature rows from pillars/services. Min height ~88vh.
   **Removes** Hero3DCanvas, typed effect, particles, dark gradient.
2. **About split** — 2 stacked photos left + orange "We've Funded 75k" badge + round avatar with
   "75,958 Helped Fund". Right: "ABOUT US" eyebrow, headline, paragraph, one mini support row
   (Healthcare), orange About Us link to `/about`.
3. **Services** — centered "SERVICES" / "Our comprehensive services". 3 white cards (first 3
   services), each: title, desc, circular Unsplash photo, orange "Read More →" link.
4. **What We Do split** — "WHAT WE DO" / "Building hope creating lasting change", paragraph +
   checklist from pillars, vertical orange Donate tab, photo on right.
5. **Stats band** — light strip, reuse `Counter` for the 4 stats.
6. **Campaigns** — keep section, restyle to white cards + orange progress bars.
7. **CTA + Blog** — light restyle, orange accents, white cards.

## Helpers

- Keep `Counter`, `Fade`/`useFadeIn`. Keep `TiltCard` but soften tilt (light theme = subtle).
- Drop `HeroSection`, `useMouseParallax`/`useTyped` imports, `Hero3DCanvas` lazy import.

## Image set (Unsplash hotlinks, `?w=...&q=80&auto=format`)

Charity/community/India-themed photos for: hero, 2 about photos, 1 avatar, 3 service circles,
1 what-we-do photo. Picked from Unsplash stable photo IDs.

## Error handling

- `<img>` get `loading="lazy"` (except hero `eager`) and `alt`. Broken hotlink degrades to alt
  text — acceptable for placeholders.

## Testing

- Manual: `npm run dev`, verify home renders, Donate opens modal, links resolve, EN/HI toggle,
  responsive (mobile stacks). No unit tests for a presentational page restyle.

## Out of scope

Other pages, Navbar/Footer, global tokens, real photo asset pipeline.
