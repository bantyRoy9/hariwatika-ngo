# Plan: Add HTML / rich-text formatting to the Hariwatika NGO CRM

## Context

The repo already is a near-complete bilingual NGO website + admin CRM (Next.js 16, Prisma/SQLite):

- **Bilingual EN+HI** — `BilingualField`, `en/hi` columns on every model, `LanguageContext` (`t(en,hi)`).
- **Image upload + Media Library** — `POST /api/upload` → `/public/uploads`, `MediaAsset`, `ImageField`.
- **Full admin CRUD** — generic `CrudManager` drives every content page; `SettingsEditor` for key/value `SiteSetting`/`Translation`; auth via `lib/auth.ts`.

The **one missing capability** from the request is **HTML formatting**: today every field renders as plain text (zero `dangerouslySetInnerHTML`, no `richtext` field type), and blog posts have only a short `excerpt` — no formatted body.

**Goal:** admins enter rich, formatted content (bold/italic/headings/lists/links) in a WYSIWYG editor, in both EN and HI, and it renders formatted on the public site. Per the user: WYSIWYG toolbar · applied to all long-form fields · plus a real blog body + detail page.

## Approach

A reusable `richtext` field type. Admin edits via a no-dependency `contenteditable` toolbar editor; HTML is **sanitized server-side on save** (one battle-tested dep) and rendered through a shared `<RichText>` component with hand-written prose CSS.

### 1. Rich-text editor (admin) — `src/app/admin/_components/RichTextEditor.tsx` (new)
- `contenteditable` div + small toolbar: **Bold, Italic, Underline, H2, H3, Paragraph, Bullet list, Numbered list, Link, Clear**.
- Use `document.execCommand` (deprecated but universally supported, zero deps). `// ponytail: execCommand — swap to Selection API only if a browser drops it`.
- Set `innerHTML` from `value` **on mount / record-switch only** (keyed by record id) to avoid caret jumps; `onInput` emits `el.innerHTML` via `onChange`.
- Style to match admin (LENITY tokens), reuse `Btn`/`Label` from `ui.tsx`.

### 2. Wire `richtext` into the generic CRUD — `src/app/admin/_components/CrudManager.tsx`
- Add `"richtext"` to the `FieldType` union and a `case "richtext"` in `FieldEditor` that renders **two** `RichTextEditor`s side-by-side (EN = `field.name`, HI = `field.nameHi`), mirroring `BilingualField`. `emptyDraft` already seeds `name`+`nameHi`, so no change there.

### 3. Sanitize on save (security — required) — `src/lib/sanitize.ts` (new) + `actions/content.ts`
- Add **`sanitize-html`** (one dependency). Rationale: XSS sanitization is a hard rule (cannot hand-roll a security path with regex); `sanitize-html` is pure-JS, Node-compatible, runs inside server actions. Threat model is low (single trusted auth-gated admin → self-XSS only), so this is defense-in-depth, but the rule stands.
- Allowlist: tags `p br strong b em i u h2 h3 ul ol li a blockquote span`; attrs `a[href|target|rel]`; schemes `http https mailto` + relative; drop everything else.
- In `createRecord`/`updateRecord` (and `saveSettings`), sanitize any field whose key is registered as rich. Keep a per-model set of rich field names (e.g. `RICH_FIELDS: Record<string,string[]>`) so only those keys are sanitized; pass-through everything else unchanged (immutably build the cleaned `data`).

### 4. Public render component — `src/components/RichText.tsx` (new)
- Client component: props `en`, `hi`; picks via `useLang().t`; renders `<div className="rich-text" dangerouslySetInnerHTML={{ __html: chosen }} />`.
- Content is already sanitized at save time → DB is trusted; no client-side sanitizer bundle needed.
- **Prose CSS**: no `@tailwindcss/typography` installed → add ~30 lines of `.rich-text h2/h3/p/ul/ol/li/a/blockquote/strong` rules in `src/app/globals.css` using LENITY tokens.

### 5. Convert long-form fields to `richtext` (admin pages)
Change `type: "bilingual-area"` → `type: "richtext"` for the description fields in these `(dash)/content/*` pages:
- `projects` (Project `descEn/descHi`, FuturePlan `descEn/descHi`)
- `about` (LegalDoc `descEn/descHi`)
- `internships` (`descEn/descHi`)
- `volunteer` (VolunteerBenefit `descEn/descHi`)
- `home` (HomeService `descEn/descHi`, HomePillar `descEn/descHi`)
- `blog` — keep `excerpt` as a plain teaser; **add** `body` (richtext) — see §7.
Short fields (stat labels, timeline year/event, dates) stay plain.

### 6. Convert public renders to `<RichText>`
Replace `{t(descEn, descHi)}` (plain) with `<RichText en={...} hi={...} />` in:
- `src/app/projects/ProjectsContent.tsx`, `src/app/about/AboutContent.tsx`, `src/app/transparency/TransparencyContent.tsx`, `src/app/internship/page.tsx`, `src/app/volunteer/page.tsx`, `src/app/page.tsx` (home services/pillars).
- Blog excerpt stays plain text on the card.

### 7. Blog full body + detail page
- **Schema** (`prisma/schema.prisma`): add `bodyEn String @default("")` and `bodyHi String @default("")` to `BlogPost`. Run `npx prisma migrate dev`. `seed.ts` needs no change (defaults).
- **Admin** (`content/blog/page.tsx`): add `{ name: "bodyEn", nameHi: "bodyHi", label: "Body", type: "richtext" }`.
- **Detail page** `src/app/blog/[id]/page.tsx` (new): server component, fetch post by id (Next 16 → `params` is a Promise, `const { id } = await params`), render Navbar + hero (title/img) + `<RichText en={bodyEn} hi={bodyHi}/>` + Footer. 404 if missing/unpublished. Pass `body` through `BlogPage`'s mapper into `BlogPostData`.
- **Card link** (`BlogContent.tsx`): "Read more" → `<Link href={/blog/${id}}>` (replace/keep inline excerpt expand).

### 8. SiteSetting long-form (secondary)
- `SettingsEditor.tsx`: add optional `richKeys?: (key:string)=>boolean`; render `RichTextEditor` (EN+HI) instead of `BilingualField` for those keys. Designate long-form keys on the `home`/`about` settings pages (e.g. `*.body`, `*.mission`, `*.story`). `saveSettings` sanitizes those keys (§3).
- Render those keys with `<RichText>` where the public pages consume them.

### 9. New database tables (Prisma models) + admin + public

All new content models follow the **existing pattern** so they cost little: a Prisma model with `*En/*Hi` columns + `sortOrder`, a one-line entry in `REVALIDATE`/`MODELS` in `actions/content.ts`, a `(dash)/content/*` admin page reusing `CrudManager` (description fields = `richtext`, images = `image`), a `Sidebar.tsx` nav link, and a public renderer. One combined `prisma migrate dev` covers these + the blog body (§7).

**a. Generic Page builder**
- `Page` — `slug @unique`, `titleEn/Hi`, `published`, `sortOrder`.
- `ContentBlock` — `pageId` (FK → `Page`, `onDelete: Cascade`), `kind` (`richtext | image | heading`), `bodyEn/bodyHi` (richtext), `img`, `sortOrder`.
- Admin: `/admin/content/pages` lists Pages; editing a page manages its `ContentBlock`s (CrudManager scoped by `pageId`; add a `where`/`parentId` option to the page or a dedicated nested editor).
- Public route **`/p/[slug]/page.tsx`** (new) — prefix avoids colliding with built-in routes like `/about`; renders blocks in `sortOrder` via `<RichText>` / `<img>`. 404 if unpublished. `params` is a Promise (Next 16) → `await params`.

**b. Events + Gallery**
- `Event` — `titleEn/Hi`, `date`, `location`, `descEn/descHi` (richtext), `img`, `published`, `sortOrder`. Public `/events/page.tsx`.
- `GalleryImage` — `album`, `captionEn/captionHi`, `img`, `sortOrder`. Public `/gallery/page.tsx` (grid).

**c. Testimonials + Partners + FAQ**
- `Testimonial` — `quoteEn/quoteHi` (richtext), `author`, `role`, `photo`, `sortOrder`.
- `Partner` — `name`, `logo`, `url`, `sortOrder`.
- `Faq` — `questionEn/questionHi`, `answerEn/answerHi` (richtext), `category`, `sortOrder`. Render as accordion (FAQ + testimonials/partners can surface on home/about or own pages — confirm placement during build).

**d. Newsletter + Donors**
- `NewsletterSubscriber` — `email @unique`, `createdAt`. This is a **submission**, not CRUD content: add a public signup form (e.g. in `Footer.tsx`) + a `subscribeNewsletter` action in `actions/submissions.ts` (zod-validated, dedupe on unique email); admin view at `/admin/submissions/newsletter` reusing `SubmissionTable` + the existing xlsx export.
- `Donor` — `name`, `email`, `phone`, `totalGiven Int`, `recurring Boolean`, `notes`, `sortOrder`. Admin-only CRUD at `/admin/donors` (no public render).

## Critical files
- New: `src/app/admin/_components/RichTextEditor.tsx`, `src/components/RichText.tsx`, `src/lib/sanitize.ts`, `src/app/blog/[id]/page.tsx`
- New (§9): models in `prisma/schema.prisma`; admin pages `(dash)/content/{pages,events,gallery,testimonials,partners,faq}/page.tsx`, `(dash)/donors/page.tsx`, `(dash)/submissions/newsletter/page.tsx`; public routes `src/app/p/[slug]/page.tsx`, `events/page.tsx`, `gallery/page.tsx`; `subscribeNewsletter` in `actions/submissions.ts`; newsletter form in `components/Footer.tsx`.
- Edit: `src/app/admin/_components/CrudManager.tsx`, `src/app/admin/_components/SettingsEditor.tsx`, `src/app/actions/content.ts`, `src/app/globals.css`, `prisma/schema.prisma`, `src/app/blog/BlogContent.tsx` + `blog/page.tsx`, and the `(dash)/content/*` admin pages + matching public `*Content.tsx` renderers in §5/§6.
- Reuse: `BilingualField`/`Btn`/`Label` (`ui.tsx`), `ImageField`, `useLang` (`LanguageContext`), `LENITY` tokens, existing `createRecord`/`updateRecord`/`revalidatePath` pipeline.

## Verification
1. `npx prisma migrate dev` succeeds; `npm run dev` boots.
2. Admin → `/admin/content/blog`: create a post, use the toolbar to bold/add a heading/bulleted list/link in the Body (EN and HI), Save.
3. Public `/blog` shows the card; "Read more" → `/blog/[id]` renders the formatted body; toggle language → HI body renders formatted.
4. Repeat spot-check on a Project description (`/projects`) and a home pillar.
5. **XSS check**: paste `<script>alert(1)</script><img src=x onerror=alert(1)>` into a richtext field, Save, view public page → script/handler stripped, no alert.
6. `npm run build` passes (lint/types).
7. **New tables (§9)**: migration applies; each new admin CRUD page lists/creates a record with rich-text + image; a Page with blocks renders at `/p/[slug]`; `/events` and `/gallery` render seeded rows; newsletter footer form submits and the email appears under `/admin/submissions/newsletter`.

## Notes (out of scope, flag for the user)
- `lib/auth.ts` `requireAdmin()` is **bypassed in dev** (`return;`, "remove before deploying"). Must be re-enabled before this CRM goes live, else the admin + content actions are public.
- One new dependency: `sanitize-html` (+ `@types/sanitize-html`). AGENTS.md's Next-16 caveat doesn't affect it (runs in a plain server action).
