# Admin Inline Content Editing System — LLM Implementation Guide

> **For AI Assistants:** This document explains the complete admin inline editing system for the Hariwatika NGO website. Use this to understand the current implementation and extend it to other pages.

---

## 🎯 Feature Overview

**What it does:**  
Allows admin users to edit website content directly on the public-facing pages by double-clicking text or clicking edit icons on images. All changes persist to a SQLite database and render immediately without code deployments.

**Current status:**  
✅ Fully implemented for **home page only** (72 editable content keys)  
⏳ Needs extension to other pages: About, Blog, Projects, Donate, Volunteer, Contact, etc.

---

## 🏗️ System Architecture (Quick Reference)

### Component Stack

```
Public Page (e.g., /)
  ↓
Server Component (page.tsx)
  ↓ fetches settings from DB via getSettings()
  ↓
Client Component (HomePageClient.tsx)
  ↓ wrapped in <AdminEditProvider>
  ↓
AdminEditProvider
  ↓ calls isAdminUser() server action on mount
  ↓ provides AdminEditContext with edit state
  ↓
EditableText / EditableImage components
  ↓ show edit UI when isAdmin=true
  ↓ trigger edit modal on user interaction
  ↓
InlineEditPopover / ImageEditorModal
  ↓ user edits content
  ↓ calls saveSettings() server action
  ↓
Database (SiteSetting table)
  ↓ content persisted
  ↓ optimistic update in React context
  ↓
UI updates immediately (no page reload)
```

### Database Schema

```prisma
model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique  // e.g. "home.hero.line1.0"
  en    String          // English content
  hi    String          // Hindi content
  group String?         // e.g. "home", "about", "blog"
}
```

---

## 📂 Core Files (DO NOT MODIFY)

These files are complete and working. Reference them when extending to other pages:

### 1. Context & Providers

**`src/context/AdminEditContext.tsx`**
- Exports: `AdminEditContextProvider`, `useAdminEdit()` hook
- Manages edit state (`editing`, `isAdmin`, `liveValues`)
- Provides `startEdit()`, `closeEdit()`, `commitEdit()` methods

**`src/components/AdminEditProvider.tsx`**
- Client component wrapper
- Calls `isAdminUser()` on mount to check admin status
- Renders `InlineEditPopover` and floating admin toolbar
- **Usage:** Wrap page content with `<AdminEditProvider initialValues={settings}>`

### 2. Editable Components

**`src/components/EditableText.tsx`**
- Drop-in replacement for any text element
- Shows yellow dashed outline + pencil badge on hover when admin
- Opens edit modal on double-click
- **Props:**
  ```typescript
  {
    settingKey: string;     // e.g. "home.hero.line1"
    en: string;             // English fallback
    hi: string;             // Hindi fallback
    label?: string;         // Human-readable label for modal
    multiline?: boolean;    // Force textarea in modal
    as?: keyof JSX.IntrinsicElements; // HTML tag (default: "span")
    className?: string;
    style?: React.CSSProperties;
  }
  ```

**`src/components/EditableImage.tsx`**
- Image wrapper with pencil icon on hover
- Opens image editor modal with URL/Upload tabs + position controls
- **Props:**
  ```typescript
  {
    settingKey: string;     // e.g. "home.img.portrait1"
    src: string;            // Image URL
    alt: string;            // Alt text
    aspectRatio?: string;   // e.g. "16/9"
    className?: string;
  }
  ```

### 3. Edit Modals

**`src/components/InlineEditPopover.tsx`**
- Dark mode modal for text editing
- Shows EN + HI input fields side-by-side
- Calls `saveSettings()` on Save button click
- Portaled to `document.body` (never clipped)

**`src/components/EditableImage.tsx` (ImageEditorModal)**
- Tabbed interface: URL paste or file upload
- Live preview with object-position controls
- X/Y sliders (0-100%) + 9 preset focal point buttons
- Saves URL to `settingKey` and position to `settingKey.pos`

### 4. Server Actions

**`src/app/actions/auth.ts`**
- `isAdminUser()`: Returns `true` in dev, checks cookie in prod
- `requireAdmin()`: Throws error if not admin (used in mutations)

**`src/app/actions/content.ts`**
- `getSettings(groups: string[])`: Fetches settings by group from DB
- `saveSettings(updates: SettingUpdate[])`: Upserts settings (requires admin)

### 5. Hero Slider (Refactored for Editing)

**`src/components/HeroSlider.tsx`**
- Accepts `overrides` prop: `Record<number, SlideOverride>`
- `SlideOverride` type allows passing ReactNode for each field:
  ```typescript
  {
    image?: ReactNode;
    eyebrow?: ReactNode;
    line1?: ReactNode;
    line2?: ReactNode;
    tagline?: ReactNode;
    description?: ReactNode;
    cta1?: ReactNode;
    cta2?: ReactNode;
  }
  ```
- Internal `node()` helper resolves override or falls back to translation
- **Backward compatible:** No overrides = same behavior as before

---

## 📋 Extending to Other Pages — Step-by-Step

### Example: Making the About Page Editable

#### Step 1: Create Client Component

**File:** `src/app/about/AboutPageClient.tsx`

```typescript
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import EditableImage from "@/components/EditableImage";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF } from "@/theme/lenity";

export type AboutSettings = Record<string, { en: string; hi: string }>;

// Helper to resolve setting with fallback
function s(settings: AboutSettings, key: string, fallbackEn: string, fallbackHi: string) {
  const row = settings[key];
  return { en: row?.en || fallbackEn, hi: row?.hi || fallbackHi };
}

export default function AboutPageClient({ settings }: { settings: AboutSettings }) {
  const { t } = useLang();

  return (
    <AdminEditProvider initialValues={settings}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ background: LENITY.soft, padding: "80px 20px" }}>
        <div className="max-w-4xl mx-auto text-center">
          <EditableText
            as="h1"
            settingKey="about.hero.h1"
            label="About Hero — Heading"
            en={s(settings, "about.hero.h1", "About Hariwatika", "हरिवाटिका के बारे में").en}
            hi={s(settings, "about.hero.h1", "About Hariwatika", "हरिवाटिका के बारे में").hi}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: SERIF, color: LENITY.ink }}
          />
          <EditableText
            as="p"
            settingKey="about.hero.lead"
            label="About Hero — Lead"
            multiline
            en={s(settings, "about.hero.lead", "25 years of service to families across West Champaran.", "25 वर्षों की सेवा।").en}
            hi={s(settings, "about.hero.lead", "25 years of service to families across West Champaran.", "25 वर्षों की सेवा।").hi}
            className="text-lg text-gray-600"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <EditableText
          as="h2"
          settingKey="about.story.h2"
          label="Story Section — Heading"
          en={s(settings, "about.story.h2", "Our Story", "हमारी कहानी").en}
          hi={s(settings, "about.story.h2", "Our Story", "हमारी कहानी").hi}
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: SERIF, color: LENITY.ink }}
        />
        <EditableText
          as="p"
          settingKey="about.story.p1"
          label="Story Section — Paragraph 1"
          multiline
          en={s(settings, "about.story.p1", "Founded in 1999...", "1999 में स्थापित...").en}
          hi={s(settings, "about.story.p1", "Founded in 1999...", "1999 में स्थापित...").hi}
          className="text-gray-700 mb-4"
        />
        {/* Add more paragraphs as needed */}
      </section>

      {/* Image Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <EditableImage
          settingKey="about.img.team"
          src={settings["about.img.team"]?.en || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8"}
          alt="Team photo"
          aspectRatio="16/9"
          className="w-full rounded-xl shadow-lg"
        />
      </section>

      <Footer />
    </AdminEditProvider>
  );
}
```

#### Step 2: Update Server Component

**File:** `src/app/about/page.tsx`

```typescript
import { getSettings } from "@/lib/content";
import AboutPageClient from "./AboutPageClient";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Fetch all "about" group settings from DB
  const raw = await getSettings(["about", "image"]);

  // Convert to simple {en, hi} map
  const settings: Record<string, { en: string; hi: string }> = {};
  for (const [key, val] of Object.entries(raw)) {
    settings[key] = { en: val.en, hi: val.hi };
  }

  return <AboutPageClient settings={settings} />;
}
```

#### Step 3: Create Seed Script

**File:** `prisma/seed-about-settings.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ABOUT_SETTINGS = [
  // Hero
  { key: "about.hero.h1",   en: "About Hariwatika",                  hi: "हरिवाटिका के बारे में" },
  { key: "about.hero.lead", en: "25 years of service to families across West Champaran.", hi: "25 वर्षों की सेवा।" },

  // Story
  { key: "about.story.h2", en: "Our Story",                          hi: "हमारी कहानी" },
  { key: "about.story.p1", en: "Founded in 1999, Hariwatika Sewa Samiti began as a small group of volunteers...", hi: "1999 में स्थापित..." },
  { key: "about.story.p2", en: "Over the decades, we have grown into a trusted organization...", hi: "दशकों से..." },

  // Images
  { key: "about.img.team", en: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8", hi: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8" },

  // Add more keys as needed...
];

async function main() {
  console.log(`Upserting ${ABOUT_SETTINGS.length} about SiteSettings…`);

  for (const row of ABOUT_SETTINGS) {
    await prisma.siteSetting.upsert({
      where:  { key: row.key },
      update: {},  // Don't overwrite existing edits
      create: { key: row.key, en: row.en, hi: row.hi, group: "about" },
    });
  }

  console.log("Done. All about settings are now in the database.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

#### Step 4: Add npm Script (Optional)

**File:** `package.json`

```json
{
  "scripts": {
    "db:seed-about": "tsx prisma/seed-about-settings.ts"
  }
}
```

#### Step 5: Run Seed & Test

```bash
# Seed about page settings
node --import tsx prisma/seed-about-settings.ts

# Start dev server
npm run dev

# Navigate to:
# http://localhost:3000/admin/page-editor/about
# (Note: You need to add "about" to the PAGE_MAP in page-editor/[page]/page.tsx)
```

---

## 🔑 Key Naming Convention

Follow this pattern for all setting keys:

```
{page}.{section}.{field}.{index}?

Examples:
home.hero.line1.0        → Home page, hero, line1, slide 0
about.story.p1           → About page, story section, paragraph 1
blog.post.title          → Blog page, post, title field
about.img.team           → About page, images, team photo
donate.campaign.h2       → Donate page, campaign section, heading
```

**Rules:**
1. Start with page name (`home`, `about`, `blog`, etc.)
2. Follow with section name (`hero`, `story`, `mission`, etc.)
3. Follow with field name (`h1`, `p1`, `img`, `btn`, etc.)
4. Add index for repeating items (`.0`, `.1`, `.2`, etc.)
5. Use lowercase, dot-separated
6. Keep it short but descriptive

---

## 🎨 Styling Guidelines

### Use LENITY Design Tokens

```typescript
import { LENITY, SERIF } from "@/theme/lenity";

// Text colors
color: LENITY.ink      // Dark text (public site)
color: LENITY.adminInk // Bright text (admin UI)

// Backgrounds
background: LENITY.soft      // Light gray background
background: LENITY.adminBg   // Dark admin background

// Accents
color: LENITY.yellow   // CTA yellow (#fcdb02)
color: LENITY.green    // Success green
color: LENITY.red      // Error red

// Fonts
fontFamily: SERIF      // 'Playfair Display' for headings
```

### EditableText Styling

```typescript
// Headings
<EditableText
  as="h1"
  className="text-4xl font-bold"
  style={{ fontFamily: SERIF, color: LENITY.ink }}
  // ... other props
/>

// Body text
<EditableText
  as="p"
  className="text-lg text-gray-700"
  // ... other props
/>

// Small text
<EditableText
  as="span"
  className="text-sm text-gray-500"
  // ... other props
/>
```

---

## 🛠️ Common Patterns

### Pattern 1: Simple Text Section

```typescript
<section className="py-16">
  <EditableText
    as="h2"
    settingKey="page.section.h2"
    label="Section Heading"
    en="Default English"
    hi="डिफ़ॉल्ट हिंदी"
    className="text-3xl font-bold"
  />
  <EditableText
    as="p"
    settingKey="page.section.p1"
    label="Section Paragraph"
    multiline
    en="Default paragraph text..."
    hi="डिफ़ॉल्ट पैराग्राफ..."
    className="text-lg"
  />
</section>
```

### Pattern 2: Image with Caption

```typescript
<div>
  <EditableImage
    settingKey="page.section.img"
    src={settings["page.section.img"]?.en || fallbackURL}
    alt="Description"
    aspectRatio="16/9"
    className="w-full rounded-lg"
  />
  <EditableText
    as="p"
    settingKey="page.section.caption"
    label="Image Caption"
    en="Photo caption here"
    hi="फोटो कैप्शन"
    className="text-sm text-gray-500 mt-2"
  />
</div>
```

### Pattern 3: Card Grid

```typescript
const cards = [
  { id: 0, iconEn: "🌱", iconHi: "🌱" },
  { id: 1, iconEn: "💧", iconHi: "💧" },
  { id: 2, iconEn: "📚", iconHi: "📚" },
];

<div className="grid md:grid-cols-3 gap-6">
  {cards.map((card) => (
    <div key={card.id} className="border rounded-lg p-6">
      <EditableText
        as="h3"
        settingKey={`page.cards.title.${card.id}`}
        label={`Card ${card.id + 1} — Title`}
        en={`Card ${card.id + 1} Title`}
        hi={`कार्ड ${card.id + 1} शीर्षक`}
        className="text-xl font-bold"
      />
      <EditableText
        as="p"
        settingKey={`page.cards.desc.${card.id}`}
        label={`Card ${card.id + 1} — Description`}
        multiline
        en="Card description..."
        hi="कार्ड विवरण..."
        className="text-gray-600"
      />
    </div>
  ))}
</div>
```

### Pattern 4: Hero Section with Override

If you have a custom hero component like `HeroSlider`, refactor it to accept an `overrides` prop:

```typescript
// In parent component
const heroOverrides = {
  0: {
    title: <EditableText settingKey="page.hero.title.0" ... />,
    subtitle: <EditableText settingKey="page.hero.subtitle.0" ... />,
    image: <EditableImage settingKey="page.hero.img.0" ... />,
  },
};

<CustomHero overrides={heroOverrides} />

// In CustomHero component
function CustomHero({ overrides }) {
  const defaultTitle = t("page.hero.title");
  const title = overrides?.[0]?.title ?? defaultTitle;
  
  return <h1>{title}</h1>;
}
```

---

## 🐛 Troubleshooting Guide

### Issue: Edit mode not activating

**Symptom:** No yellow outline on hover, double-click doesn't work  
**Cause:** `isAdminUser()` returning false  
**Fix:**
1. Check `src/app/actions/auth.ts` line ~26:
   ```typescript
   if (process.env.NODE_ENV !== "production") return true;
   ```
2. Restart dev server: `npm run dev`

### Issue: Text not visible in edit modal

**Symptom:** Input fields appear empty or text is dark on dark background  
**Cause:** Color palette issue (already fixed in InlineEditPopover)  
**Fix:** Verify `InlineEditPopover.tsx` uses this palette:
```typescript
const C = {
  text: "#e2e8f0",  // Bright text
  input: "#0d1229", // Dark input background
};
```

### Issue: Changes not persisting

**Symptom:** After refresh, old content appears  
**Cause:** Database write failed  
**Fix:**
1. Check browser console for errors
2. Verify `saveSettings()` is being called (add `console.log`)
3. Check database exists: `ls prisma/dev.db`
4. Run migrations: `npx prisma db push`
5. View data: `npx prisma studio` → SiteSetting table

### Issue: Hero slider not editable

**Symptom:** Hero content doesn't show edit UI  
**Cause:** Missing database keys  
**Fix:**
```bash
node --import tsx prisma/seed-home-settings.ts
```

### Issue: Image upload fails

**Symptom:** File select works but image doesn't save  
**Cause:** File too large or invalid format  
**Fix:**
- Max size: 5MB (hardcoded in `EditableImage.tsx`)
- Formats: jpg, jpeg, png, gif, webp
- Prefer URL tab for external images (avoids base64 bloat)

---

## 📊 Current Implementation Status

### ✅ Completed (Home Page Only)

| Feature | Status | Files |
|---------|--------|-------|
| Text editing | ✅ Complete | EditableText.tsx, InlineEditPopover.tsx |
| Image editing | ✅ Complete | EditableImage.tsx |
| Hero slider | ✅ Complete | HeroSlider.tsx refactored with overrides |
| Dark mode UI | ✅ Fixed | InlineEditPopover.tsx with C palette |
| Database persistence | ✅ Complete | saveSettings() with upsert |
| Dev admin bypass | ✅ Complete | isAdminUser() returns true in dev |
| Seed script | ✅ Complete | seed-home-settings.ts (72 keys) |
| Page editor frame | ✅ Complete | page-editor/[page]/page.tsx |

### ⏳ TODO (Other Pages)

| Page | Status | Priority |
|------|--------|----------|
| About | ❌ Not started | High |
| Blog | ❌ Not started | High |
| Projects | ❌ Not started | Medium |
| Donate | ❌ Not started | Medium |
| Volunteer | ❌ Not started | Medium |
| Contact | ❌ Not started | Low |
| Transparency | ❌ Not started | Low |
| Internship | ❌ Not started | Low |
| Registration | ❌ Not started | Low |

---

## 🚀 Quick Start for LLMs

### To understand the current system:

1. Read `src/app/HomePageClient.tsx` — see EditableText/EditableImage usage
2. Read `src/components/EditableText.tsx` — understand text editing component
3. Read `src/components/AdminEditProvider.tsx` — understand context setup
4. Read `prisma/seed-home-settings.ts` — understand setting key structure

### To extend to a new page:

1. **Study the home page pattern** in `src/app/HomePageClient.tsx`
2. **Create client component** `src/app/{page}/{Page}Client.tsx`
   - Import AdminEditProvider, EditableText, EditableImage
   - Wrap content with `<AdminEditProvider initialValues={settings}>`
   - Replace all text with `<EditableText settingKey="..." en="..." hi="..." />`
   - Replace all images with `<EditableImage settingKey="..." src="..." />`
3. **Update server component** `src/app/{page}/page.tsx`
   - Fetch settings: `const raw = await getSettings(["{page}"])`
   - Pass to client: `<PageClient settings={raw} />`
4. **Create seed script** `prisma/seed-{page}-settings.ts`
   - Define all setting keys with fallback values
   - Use upsert pattern (safe to run multiple times)
5. **Run seed**: `node --import tsx prisma/seed-{page}-settings.ts`
6. **Test**: Navigate to `/admin/page-editor/{page}` and verify editing works

---

## 📚 Additional Resources

- **Full implementation guide:** `ADMIN_INLINE_EDIT_GUIDE.md`
- **Quick reference:** `QUICK_EDIT_REFERENCE.md`
- **Architecture diagrams:** `ADMIN_EDIT_ARCHITECTURE.md`
- **Status & roadmap:** `IMPLEMENTATION_STATUS.md`

---

## 🎯 LLM Task Checklist Template

When asked to extend this feature to a new page, follow this checklist:

```markdown
## Task: Make {PAGE_NAME} Page Editable

### Planning
- [ ] Read current {page}/page.tsx to understand structure
- [ ] Identify all text content that should be editable
- [ ] Identify all images that should be editable
- [ ] Define setting key naming pattern

### Implementation
- [ ] Create {page}/{Page}Client.tsx with AdminEditProvider wrapper
- [ ] Wrap all text nodes with EditableText
- [ ] Wrap all images with EditableImage
- [ ] Update {page}/page.tsx to fetch settings and pass to client
- [ ] Create prisma/seed-{page}-settings.ts with all keys
- [ ] Add npm script: "db:seed-{page}": "tsx prisma/seed-{page}-settings.ts"

### Testing
- [ ] Run seed script: node --import tsx prisma/seed-{page}-settings.ts
- [ ] Start dev server: npm run dev
- [ ] Navigate to /admin/page-editor/{page}
- [ ] Verify all text shows yellow outline on hover
- [ ] Verify double-click opens edit modal
- [ ] Verify EN + HI fields editable
- [ ] Verify Save button persists to DB
- [ ] Verify Refresh shows persisted content
- [ ] Verify images show pencil icon on hover
- [ ] Verify image editor modal opens and works
- [ ] Verify language switcher works (EN ↔ HI)

### Documentation
- [ ] Add {page} to IMPLEMENTATION_STATUS.md checklist
- [ ] Document any new patterns or edge cases
- [ ] Update seed script count in stats
```

---

## ⚠️ Important Notes for LLMs

1. **DO NOT MODIFY** these core files unless fixing a bug:
   - `src/context/AdminEditContext.tsx`
   - `src/components/AdminEditProvider.tsx`
   - `src/components/EditableText.tsx`
   - `src/components/EditableImage.tsx`
   - `src/components/InlineEditPopover.tsx`
   - `src/app/actions/auth.ts`
   - `src/app/actions/content.ts`

2. **ALWAYS** follow the key naming convention: `{page}.{section}.{field}.{index}?`

3. **ALWAYS** wrap page content with `<AdminEditProvider initialValues={settings}>`

4. **ALWAYS** use the `s()` helper function to resolve settings with fallbacks

5. **ALWAYS** create a seed script for new pages (safe upsert pattern)

6. **TEST** thoroughly — hover, double-click, edit, save, refresh, verify persistence

7. **PRESERVE** the existing home page implementation — it's the reference

8. **DOCUMENT** any deviations from the standard pattern

---

## 🎉 Success Criteria

A page is considered "fully editable" when:

✅ All text content wrapped with `<EditableText>`  
✅ All images wrapped with `<EditableImage>`  
✅ AdminEditProvider wraps the entire page  
✅ Server component fetches settings via `getSettings()`  
✅ Seed script created with all keys  
✅ Yellow outlines appear on hover  
✅ Double-click opens dark mode edit modal  
✅ Both EN + HI fields editable in modal  
✅ Save button persists to database  
✅ Refresh shows persisted content  
✅ Image pencil icon appears and editor works  
✅ No TypeScript errors  
✅ No runtime errors in browser console  

---

**Ready to extend this feature to other pages!** 🚀

Use this README as your complete reference for understanding and continuing the implementation.
