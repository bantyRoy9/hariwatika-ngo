# Admin Inline Content Editing — Complete Guide

## Overview

Your NGO website now has a **complete inline editing system** that allows admin users to double-click on any text or click on images to edit them directly on the public-facing pages. All changes are saved to the database and rendered immediately without requiring code deployments.

---

## 🎯 Key Features

✅ **Double-click text editing** — Click any text twice to open an edit popover  
✅ **Image editing with positioning** — Click pencil icon on images to upload/reposition  
✅ **Dark mode admin UI** — All edit controls use a dark theme with visible text  
✅ **Hero slider fully editable** — All 4 slides with 7 fields each (eyebrow, headlines, tagline, description, CTAs, image)  
✅ **Entire home page editable** — Mission, vision, stats, campaigns, blog, testimonials, partners, etc.  
✅ **Live preview** — Changes update optimistically without page reload  
✅ **Database persistence** — All edits saved to `SiteSetting` table in SQLite  
✅ **Bilingual support** — Edit both English and Hindi content in one popover  

---

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Navigate to the Page Editor

Open your browser and go to:

```
http://localhost:3000/admin/page-editor/home
```

**Login credentials** (from `ADMIN_CREDENTIALS.md`):
- Email: `admin@hariwatika.org`
- Password: `admin123`

### 3. Edit Content

**For Text:**
1. Hover over any text — you'll see a **yellow dashed outline** and a **pencil badge**
2. **Double-click** the text to open the edit popover
3. Edit English and Hindi content in the dark modal
4. Click **Save** (yellow button) to persist changes
5. Click **Refresh Preview** to see server-rendered result

**For Images:**
1. Hover over any image — you'll see a **pencil icon** in the top-right corner
2. Click the pencil to open the image editor modal
3. Choose **URL** tab to paste an image URL or **Upload** tab to upload a file
4. Use the **position sliders** (X/Y 0-100%) to adjust focal point
5. Or click one of the **9 preset buttons** (Top-Left, Center, Bottom-Right, etc.)
6. Click **Save** to persist

---

## 📁 File Structure

### Core Components

```
src/
├── components/
│   ├── AdminEditProvider.tsx       # Wraps pages, checks admin status, shows floating toolbar
│   ├── EditableText.tsx            # Drop-in replacement for text nodes (shows edit UI when admin)
│   ├── EditableImage.tsx           # Image wrapper with pencil icon + position editor modal
│   ├── InlineEditPopover.tsx       # Dark mode popover for editing text (EN + HI fields)
│   └── HeroSlider.tsx              # Refactored to accept `overrides` prop for editable slides
│
├── context/
│   └── AdminEditContext.tsx        # React context managing edit state + live values
│
├── app/
│   ├── page.tsx                    # Server component — fetches settings from DB
│   ├── HomePageClient.tsx          # Client component — all content wrapped in EditableText
│   ├── actions/
│   │   ├── auth.ts                 # isAdminUser() — dev bypass (always true in dev)
│   │   └── content.ts              # saveSettings() — upserts SiteSetting rows
│   └── admin/(dash)/page-editor/
│       └── [page]/
│           ├── page.tsx            # Maps slug to public URL (e.g. home → /)
│           └── PageEditorFrame.tsx # iframe wrapper with device switcher + toolbar
│
└── prisma/
    ├── schema.prisma               # SiteSetting model (key, en, hi, group)
    ├── seed.ts                     # Main seed (creates admin user + initial data)
    └── seed-home-settings.ts       # Home page settings seed (run this!)
```

---

## 🗄️ Database Schema

All editable content is stored in the `SiteSetting` table:

```prisma
model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique  // e.g. "home.hero.line1.0"
  en    String          // English text
  hi    String          // Hindi text
  group String?         // e.g. "home", "about", "blog"
}
```

---

## 🔧 Seeding the Database

Before editing, populate the database with default content:

```bash
node --import tsx prisma/seed-home-settings.ts
```

**What this does:**
- Inserts **72 SiteSetting rows** for the home page
- Includes all hero slides (4 slides × 7 fields = 28 keys)
- Includes marquee text, mission/vision, stats labels, campaign headings, etc.
- **Safe to run multiple times** — uses `upsert` so existing edits are preserved

---

## 🎨 Home Page Content Map

All editable sections on the home page:

### Hero Slider (4 slides, 8 fields each)
- `home.hero.img.{0-3}` — Background image URL
- `home.hero.eyebrow.{0-3}` — Small text above headline
- `home.hero.line1.{0-3}` — First headline word
- `home.hero.line2.{0-3}` — Second headline word
- `home.hero.tagline.{0-3}` — Tagline below headline
- `home.hero.desc.{0-3}` — Description paragraph
- `home.hero.cta1.{0-3}` — Primary CTA button text
- `home.hero.cta2.{0-3}` — Secondary CTA button text

### Marquee
- `home.marquee.{0-3}` — Scrolling text segments

### About Section
- `home.about.h2` — Heading
- `home.about.lead` — Lead text
- `home.about.p1` — First paragraph
- `home.about.p2` — Second paragraph
- `home.about.more` — Read more link text

### Mission & Vision
- `home.mission.eyebrow` — Section eyebrow
- `home.mission.h2` — Section heading
- `home.mission.card.h3` — Mission card title
- `home.mission.text` — Mission card body
- `home.vision.card.h3` — Vision card title
- `home.vision.text` — Vision card body

### Pull Quote
- `home.quote.text` — Quote text
- `home.quote.who` — Attribution
- `home.quote.donate` — Donate button text

### Services
- `home.services.h2` — Heading
- `home.services.lead` — Lead text
- `home.services.more` — Read more link

### Campaigns
- `home.campaigns.h2` — Heading
- `home.campaigns.lead` — Lead text
- `home.campaigns.btn` — Campaign button text

### Blog
- `home.blog.h2` — Heading
- `home.blog.lead` — Lead text
- `home.blog.all` — View all link
- `home.blog.more` — Read more link

### Help Section
- `home.help.h2` — Heading
- `home.help.lead` — Lead text

### Partners
- `home.partners.h2` — Heading

### Testimonials
- `home.testimonials.h2` — Heading

### Stats
- `home.stat.{0-3}` — Stat labels (values are hardcoded counters)

### Images
- `home.img.portrait1` — Portrait image URL
- `home.img.quote` — Quote section background

---

## 🎯 How It Works (Technical Flow)

### 1. Admin Detection (Server → Client)

**Server side** (`src/app/page.tsx`):
```typescript
const raw = await getSettings(["home", "image"]);
return <HomePageClient settings={raw} />;
```

**Client side** (`AdminEditProvider.tsx`):
```typescript
useEffect(() => {
  isAdminUser().then(setIsAdmin); // Calls server action
}, []);
```

**Dev bypass** (`src/app/actions/auth.ts`):
```typescript
export async function isAdminUser(): Promise<boolean> {
  if (process.env.NODE_ENV !== "production") return true; // ← Always admin in dev
  // ... production checks cookie
}
```

### 2. Text Editing Flow

**Hover → Outline + Badge:**
```typescript
<EditableText
  settingKey="home.hero.line1.0"
  en="A Relentless"
  hi="अटूट"
/>
// ↓ When isAdmin=true, renders with:
// - Yellow dashed outline on hover
// - Pencil badge top-right
```

**Double-click → Popover:**
```typescript
startEdit({ settingKey, en, hi, label, multiline });
// ↓ Opens InlineEditPopover via React.createPortal
```

**Save → Database:**
```typescript
await saveSettings([{ key: "home.hero.line1.0", en: "New Text", hi: "नया पाठ" }]);
// ↓ Upserts to SiteSetting table
// ↓ Calls commitEdit() for optimistic update
```

### 3. Image Editing Flow

**Hover → Pencil Icon:**
```typescript
<EditableImage
  settingKey="home.hero.img.0"
  src={settings["home.hero.img.0"]?.en || fallbackURL}
  alt="Hero slide 1"
/>
// ↓ Shows pencil button top-right on hover
```

**Click → Modal:**
```typescript
// Opens ImageEditorModal with:
// - URL input tab (paste external URL)
// - Upload tab (local file → base64)
// - Live preview with object-position
// - X/Y sliders (0-100%)
// - 9 preset focal point buttons
```

**Save → Database:**
```typescript
await saveSettings([
  { key: "home.hero.img.0", en: imageURL, hi: imageURL },
  { key: "home.hero.img.0.pos", en: "50% 25%", hi: "50% 25%" }
]);
```

### 4. Hero Slider Override Pattern

**Before refactor** (hardcoded):
```typescript
<HeroSlider onDonate={openDonate} />
// ↓ All slide content baked into HeroSlider component
```

**After refactor** (prop-based overrides):
```typescript
const heroOverrides: Record<number, SlideOverride> = {
  0: {
    image: <EditableImage settingKey="home.hero.img.0" ... />,
    eyebrow: <EditableText settingKey="home.hero.eyebrow.0" ... />,
    line1: <EditableText settingKey="home.hero.line1.0" ... />,
    // ... 5 more fields
  },
  // ... slides 1, 2, 3
};

<HeroSlider onDonate={openDonate} overrides={heroOverrides} />
```

**Inside HeroSlider.tsx:**
```typescript
// Helper function to resolve override or fallback to translation
function node(override: ReactNode | undefined, tKey: string): ReactNode {
  return override ?? t(tKey);
}

// Usage in JSX:
<h1>{node(overrides[index]?.line1, "home.hero.line1")}</h1>
```

---

## 🐛 Troubleshooting

### Issue: Double-click doesn't open edit popover

**Cause:** `isAdminUser()` returning false  
**Fix:** In development, `isAdminUser()` is hardcoded to return `true`. If it's not working:
1. Check `src/app/actions/auth.ts` — line should be:
   ```typescript
   if (process.env.NODE_ENV !== "production") return true;
   ```
2. Restart dev server (`npm run dev`)

### Issue: Text color not visible in edit popover

**Cause:** Dark mode text color bug (fixed)  
**Fix:** Already fixed in `InlineEditPopover.tsx`. All inputs use:
```typescript
color: "#e2e8f0" // Bright text on dark background
```

### Issue: Hero slides not editable

**Cause:** Missing database keys  
**Fix:** Run the seed script:
```bash
node --import tsx prisma/seed-home-settings.ts
```

### Issue: Image upload not working

**Cause:** File size too large or invalid format  
**Fix:**
- Max file size: 5MB (enforced in `EditableImage.tsx`)
- Supported formats: jpg, jpeg, png, gif, webp
- Base64 encoding may cause large payloads — prefer URL tab for external images

### Issue: Changes not persisting after refresh

**Cause:** Database write failed  
**Fix:**
1. Check browser console for errors
2. Verify `saveSettings()` server action is being called
3. Check `prisma/dev.db` exists and has correct schema:
   ```bash
   npx prisma studio
   ```

---

## 🎨 Design Tokens (Dark Mode Admin UI)

All admin UI components use the LENITY admin palette:

```typescript
const C = {
  bg:      "#111630",          // Card background (dark navy)
  input:   "#0d1229",          // Input background (darker)
  border:  "rgba(255,255,255,0.10)", // Subtle borders
  text:    "#e2e8f0",          // Bright text (readable on dark)
  muted:   "#64748b",          // Secondary text
  label:   "#94a3b8",          // Field labels
  yellow:  LENITY.yellow,      // Primary action (#fcdb02)
  red:     "#f87171",          // Error states
};
```

---

## 🔒 Security Notes

1. **Dev bypass:** `isAdminUser()` always returns `true` in development  
2. **Production:** Checks `httpOnly` cookie set by `/admin/login`  
3. **Server actions:** All mutations (`saveSettings`) use `requireAdmin()` to verify admin status  
4. **No client-side auth bypass:** Even if a user manipulates React context, server actions reject non-admin requests  

---

## 📸 Screenshots

### 1. Home Page Editor View
![Page Editor](https://via.placeholder.com/800x500?text=Page+Editor+with+iframe)

- Top toolbar: device switcher, refresh, open-in-tab
- Yellow banner: "Admin Edit Mode" hint
- iframe: renders public home page with edit UI
- Footer: Refresh Preview + View Live buttons

### 2. Text Edit Popover (Dark Mode)
![Text Popover](https://via.placeholder.com/500x400?text=Text+Edit+Popover)

- Dark background with bright text
- English + Hindi fields stacked
- Cancel (transparent) + Save (yellow) buttons
- Keyboard shortcut: Esc to close

### 3. Image Edit Modal
![Image Modal](https://via.placeholder.com/600x450?text=Image+Editor+Modal)

- URL tab: paste external image URL
- Upload tab: drag-drop or select file
- Live preview with crosshair overlay
- X/Y position sliders (0-100%)
- 9 preset focal point buttons
- Save button applies object-position CSS

---

## 🚀 Next Steps

### 1. Extend to Other Pages

The current implementation is **home page only**. To make other pages editable:

**Step 1:** Create client wrapper (e.g. `AboutPageClient.tsx`):
```typescript
export default function AboutPageClient({ settings }: { settings: AboutSettings }) {
  return (
    <AdminEditProvider initialValues={settings}>
      <Navbar />
      <EditableText settingKey="about.hero.h1" en="About Us" hi="हमारे बारे में" />
      {/* ... rest of page */}
    </AdminEditProvider>
  );
}
```

**Step 2:** Update server component (`src/app/about/page.tsx`):
```typescript
export default async function AboutPage() {
  const raw = await getSettings(["about"]);
  return <AboutPageClient settings={raw} />;
}
```

**Step 3:** Seed about settings:
```typescript
// prisma/seed-about-settings.ts
const ABOUT_SETTINGS = [
  { key: "about.hero.h1", en: "About Us", hi: "हमारे बारे में" },
  // ... more keys
];
```

**Step 4:** Run seed:
```bash
node --import tsx prisma/seed-about-settings.ts
```

### 2. Add Revert/History

Track edits in a separate `SettingHistory` table:

```prisma
model SettingHistory {
  id        String   @id @default(cuid())
  key       String
  en        String
  hi        String
  changedBy String   // admin email
  changedAt DateTime @default(now())
}
```

### 3. Add Bulk Operations

Create admin UI for:
- **Find & replace** across all settings
- **Export** all settings as JSON
- **Import** settings from JSON backup

### 4. Add Preview Mode

Allow admins to preview changes before publishing:

- Add `published` boolean field to `SiteSetting`
- Render draft content in preview, published content on public site
- Add "Publish" button in admin UI

---

## 📚 Additional Resources

- **Admin credentials:** See `ADMIN_CREDENTIALS.md`
- **Design system:** See `DESIGN_SYSTEM.md`
- **Database guide:** See `DATABASE_GUIDE.md`
- **Prisma docs:** https://www.prisma.io/docs
- **Next.js server actions:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

---

## ✅ System Status

| Feature | Status | Notes |
|---------|--------|-------|
| Text editing | ✅ Complete | Double-click to edit |
| Image editing | ✅ Complete | Pencil icon + position modal |
| Dark mode UI | ✅ Fixed | All text visible on dark bg |
| Hero slider editable | ✅ Complete | All 4 slides, 7 fields each |
| Entire home page editable | ✅ Complete | 72 SiteSetting keys |
| Database persistence | ✅ Complete | SQLite + Prisma upsert |
| Dev bypass | ✅ Complete | Always admin in development |
| Bilingual support | ✅ Complete | EN + HI in same popover |
| Live preview | ✅ Complete | Optimistic update + refresh |
| Mobile responsive | ✅ Complete | Device switcher in iframe |

---

**🎉 Your admin inline editing system is now fully operational!**

Navigate to `http://localhost:3000/admin/page-editor/home` and start editing content directly on the page.
