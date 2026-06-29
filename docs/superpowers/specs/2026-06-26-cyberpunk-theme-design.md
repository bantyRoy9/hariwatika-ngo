# Design: Cyberpunk Dark Theme (omiedutrack look) for Hariwatika NGO

**Date:** 2026-06-26
**Branch:** theme/marriage
**Goal:** Restyle the existing NGO site with omiedutrack.html's full dark cyberpunk visual language. Content and page structure stay; only the visual layer changes.

## Decisions (from brainstorming)

- **Scope:** Borrow visual style only. No content/page rebuild.
- **Vibe:** Full dark cyberpunk — near-black bg, neon cyan/purple accents, animated grid, glowing orbs, monospace accents.
- **Fonts:** Adopt omiedutrack fonts — Exo 2 (display), Rajdhani (UI), JetBrains Mono (mono). Drop Literata/Cormorant/Plus Jakarta.
- **Effects:** All signature effects — animated grid background, floating glow orbs, clip-path neon buttons, glowing-border cards, neon dividers.

## Architecture: how theming flows today

Two token layers drive nearly all color/typography:

1. **`src/app/globals.css` `:root`** — CSS custom properties (`--color-*`, `--font-*`). Body bg, text, headings, scrollbars, focus rings all reference these.
2. **`src/theme/lenity.ts` `LENITY` object** — hardcoded hex tokens (`accent`, `ink`, `bg`, `muted`, `soft`, `line`, `yellow`, `pink`...) consumed inline via `style={{...}}` across ~20 page/component files. Plus `SERIF` constant and `CONTACT`/`IMG`.

Because pages consume tokens rather than literal hex, **remapping the token values recolors the whole site**. This is the intended design ("existing pages recolor for free" per the file comment).

## Approach: Token swap + effect layer + cleanup sweep (Approach A)

Three coordinated changes, no per-page rewrites of content.

### 1. Palette + font swap (the master switch)

**`globals.css` `:root`:**
- Import omiedutrack Google Fonts (Exo 2, Rajdhani, JetBrains Mono); remove Literata/Cormorant/Plus Jakarta import.
- `--font-sans` → Rajdhani; `--font-display` → Exo 2; `--font-serif` → Exo 2 (fallback, since serif no longer wanted); add `--font-mono` → JetBrains Mono.
- Surface colors → dark: `--color-surface: #050818`, `--color-surface-soft: #090d1f`, `--color-surface-elevated: #0d1229`, `--color-surface-muted: #111630`.
- Text colors → light: `--color-on-surface: #e8f4ff`, variants → `#7a8fad` muted family.
- Primary/accent → neon: `--color-primary: #63d2ff` (cyan), `--color-accent: #b57bff` (purple), `--color-accent-bright: #ff6eb4` (pink), greens → `#00e5a0`.
- Borders → translucent cyan: `--color-outline: rgba(99,210,255,0.12)` family.
- Shadow color RGB → cyan glow base.
- Recolor the watercolor/PAI helpers already in globals.css (`.pai-number` stroke → cyan; `.watercolor::before` blob default → translucent cyan/purple).

**`src/theme/lenity.ts` `LENITY` object — remap every token to dark/neon:**
- `accent` #63d2ff, `accentHover` #00b4d8, `accentSoft` rgba(99,210,255,0.12)
- `ink` #e8f4ff (now light — flips all `color: LENITY.ink` text correctly)
- `muted` #7a8fad
- `bg` #050818, `soft` #090d1f, `line` rgba(99,210,255,0.12)
- `yellow` #63d2ff, `yellowSoft` rgba(99,210,255,0.15), `pink` #b57bff, `pinkSoft` rgba(181,123,255,0.15)
- `amber` #ffcc44, `red` #ff5555, `blue` #63d2ff
- `dark` #050818 (utility bar bg stays dark — already correct)
- `SERIF` → `'Exo 2', sans-serif` (keeps the constant name; every consumer recolors without renaming imports).

Keeping token *names* identical means zero import churn across the 20 consumer files.

### 2. Effect layer (new global CSS classes in globals.css)

Port omiedutrack's signature effects as reusable classes, lifted near-verbatim from the source:
- `.cyber-grid` — animated translucent grid background (`gridMove` keyframe).
- `.cyber-orbs` / `.orb` (orb1/2/3) — floating blurred radial-gradient orbs (`orbFloat` keyframe).
- `.btn-future`, `.btn-cyan`, `.btn-purple`, `.btn-outline-cyber` — clip-path neon buttons with sheen sweep.
- `.glow-card` — translucent dark card with cyan top-border accent + glow-on-hover (mirrors `.s-stat-card`/`.s-card`).
- `.glow-line` — neon gradient divider.
- Neon glow utilities: drop-shadow/box-shadow helpers.

These are additive. We retire conflicting light effects by recoloring (watercolor blobs become faint cyan washes rather than yellow — handled in step 1).

**Where the bg effects mount:** add `.cyber-grid` + `.cyber-orbs` to the root layout body wrapper (or a thin background component) so every page sits on the animated dark canvas. The hero on `page.tsx` keeps its existing structure but its wash divs recolor via tokens.

### 3. Cleanup sweep (targeted, only what tokens can't reach)

After the token swap, hunt residual light-mode artifacts that use literal light values rather than tokens:
- Hardcoded `#fff` / `#ffffff` / `white` backgrounds on cards/sections.
- Light gradients (`rgba(255,255,255,...)` fills meant for light bg).
- Any `bg-white` / `bg-[#fff]` Tailwind utilities.
- Navbar (`src/components/Navbar.tsx`) — verify it reads tokens; fix any literal light surfaces.
- Admin pages (`src/app/admin/...`) — these are a separate functional area; recolor via tokens but they are lower priority than public pages. Confirm they don't break (white form inputs on dark bg → restyle inputs to dark).

Sweep is grep-driven: `rg "#fff|#ffffff|\bwhite\b|rgba(255,255,255" src` → fix each hit that visually breaks on dark.

## What is explicitly out of scope (YAGNI)

- No `data-theme` toggle / light-mode parity. Full dark, single theme.
- No content, copy, routing, or component-structure changes.
- No new dependencies — fonts via existing Google Fonts `@import`, effects via plain CSS.
- No rebuild of pages into dashboard layouts.

## Risks & mitigations

- **Contrast inversions:** A token used as text *and* as a light fill elsewhere could break one of the two. Mitigation: cleanup sweep + visual check of each public page.
- **Watercolor/PAI editorial motifs** read as "warm charity," clash with cyberpunk. Mitigation: recolor to cyan/purple washes; they become subtle ambient glow rather than removed (keeps layout intact).
- **Admin form inputs** assume white bg. Mitigation: restyle `.t-input`-equivalent / form fields to dark in the sweep.
- **Reduced-motion:** existing `prefers-reduced-motion` block must also disable new grid/orb animations. Add the new classes to that block.

## Verification

- Manual: run dev server, visit each public route (/, about, blog, donate, volunteer, projects, contact, registration, internship, transparency) — confirm dark bg, neon accents, readable text, working effects, no white flashes.
- Check `prefers-reduced-motion` disables grid/orbs.
- Admin login + dashboard render usable on dark.

## Files touched

- `src/app/globals.css` — palette vars, font import, effect classes, reduced-motion (primary).
- `src/theme/lenity.ts` — token remap, SERIF (primary).
- Cleanup-sweep hits — TBD by grep, expected: `Navbar.tsx`, hero washes in `page.tsx`, admin form components. Surgical edits only.
- `src/app/layout.tsx` — mount `.cyber-grid` / `.cyber-orbs` background.
