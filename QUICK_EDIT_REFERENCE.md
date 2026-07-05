# Quick Edit Reference Card

## 🚀 Getting Started (30 seconds)

```bash
# 1. Seed the database
node --import tsx prisma/seed-home-settings.ts

# 2. Start dev server
npm run dev

# 3. Open page editor
# Browser: http://localhost:3000/admin/page-editor/home
```

---

## ✏️ Edit Text (3 steps)

1. **Hover** over text → yellow dashed outline appears
2. **Double-click** → dark edit modal opens
3. **Edit** EN + HI fields → **Click Save** (yellow button)

---

## 🖼️ Edit Images (4 steps)

1. **Hover** over image → pencil icon appears (top-right)
2. **Click pencil** → image editor modal opens
3. **URL tab:** paste image URL **or** **Upload tab:** select file
4. **Adjust position** with sliders or preset buttons → **Save**

---

## 🔄 Refresh Preview

After saving, click **Refresh Preview** in footer to see server-rendered result.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close edit popover without saving |
| `Enter` | Save (when focused on single-line input) |

---

## 📋 Common Tasks

### Change Hero Slide Headline

1. Double-click on "A Relentless" or "Pursuit."
2. Edit English: `"A Relentless"` → `"An Unwavering"`
3. Edit Hindi: `"अटूट"` → `"अडिग"`
4. Click **Save**

### Change Hero Slide Image

1. Hover over hero background → click **pencil icon**
2. **URL tab** → paste: `https://images.unsplash.com/...`
3. Adjust position with **Y slider** → move to 30% for top focus
4. Click **Save**

### Change Mission Text

1. Scroll to Mission & Vision cards
2. Double-click mission paragraph
3. Edit long-form text in textarea
4. Click **Save**

### Change Stats Label

1. Scroll to stats section (25+ Years of Service)
2. Double-click "Years of Service"
3. Edit to "Years Serving" / "सेवा के वर्ष"
4. Click **Save**

---

## 🗄️ Database Quick Reference

All content lives in `SiteSetting` table:

```typescript
{
  key: "home.hero.line1.0",  // Unique identifier
  en:  "A Relentless",       // English text
  hi:  "अटूट",               // Hindi text
  group: "home"              // Logical grouping
}
```

**View in Prisma Studio:**
```bash
npx prisma studio
# Opens localhost:5555 — browse SiteSetting table
```

---

## 🐛 Quick Fixes

### Edit mode not activating?
```typescript
// Check src/app/actions/auth.ts line 26:
if (process.env.NODE_ENV !== "production") return true;
```

### Text not visible in popover?
Already fixed — text color is `#e2e8f0` (bright on dark)

### Changes not saving?
1. Check browser console for errors
2. Verify database exists: `ls prisma/dev.db`
3. Re-run migrations: `npx prisma db push`

### Hero slides not editable?
Run seed script:
```bash
node --import tsx prisma/seed-home-settings.ts
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/app/HomePageClient.tsx` | Main home page with all EditableText/EditableImage |
| `src/components/EditableText.tsx` | Text wrapper with double-click edit |
| `src/components/EditableImage.tsx` | Image wrapper with position editor |
| `src/components/InlineEditPopover.tsx` | Dark mode edit modal (EN + HI fields) |
| `src/app/actions/content.ts` | `saveSettings()` server action |
| `prisma/seed-home-settings.ts` | Seeds 72 home page settings |

---

## 🎯 Setting Key Patterns

### Hero Slides (4 slides × 8 fields)
```
home.hero.img.{0-3}      → Image URL
home.hero.eyebrow.{0-3}  → Small text above headline
home.hero.line1.{0-3}    → First headline word
home.hero.line2.{0-3}    → Second headline word
home.hero.tagline.{0-3}  → Tagline below headline
home.hero.desc.{0-3}     → Description paragraph
home.hero.cta1.{0-3}     → Primary CTA button
home.hero.cta2.{0-3}     → Secondary CTA button
```

### Sections
```
home.about.h2           → About section heading
home.mission.text       → Mission card body
home.vision.text        → Vision card body
home.quote.text         → Pull quote text
home.services.h2        → Services heading
home.campaigns.h2       → Campaigns heading
home.blog.h2            → Blog heading
home.testimonials.h2    → Testimonials heading
home.partners.h2        → Partners heading
```

### Stats
```
home.stat.0  → "Years of Service"
home.stat.1  → "Families Helped"
home.stat.2  → "Trees Planted"
home.stat.3  → "Volunteers Trained"
```

### Images
```
home.img.portrait1  → Portrait image URL
home.img.quote      → Quote section background
home.hero.img.{0-3} → Hero slide backgrounds
```

---

## 🔒 Admin Access

**Dev mode:** Always admin (no login required)  
**Production:** Login at `/admin/login`

**Credentials** (dev/test only):
- Email: `admin@hariwatika.org`
- Password: `admin123`

---

## 📊 Content Statistics

| Metric | Count |
|--------|-------|
| Total SiteSettings | 72 |
| Hero slides | 4 |
| Fields per slide | 8 |
| Editable sections | 12+ |
| Languages | 2 (EN + HI) |

---

## 🎨 Admin UI Colors (Dark Mode)

```typescript
Background:   #111630  (dark navy)
Input BG:     #0d1229  (darker)
Text:         #e2e8f0  (bright)
Accent:       #fcdb02  (yellow)
Border:       rgba(255,255,255,0.10)
```

---

## 🚀 Performance Tips

1. **Image URLs:** Use external CDN (Unsplash, Cloudinary) instead of base64
2. **Refresh sparingly:** Optimistic updates show changes instantly
3. **Batch edits:** Edit multiple fields, then refresh once at the end

---

## 📞 Support

**Documentation:**
- Full guide: `ADMIN_INLINE_EDIT_GUIDE.md`
- Design system: `DESIGN_SYSTEM.md`
- Database: `DATABASE_GUIDE.md`

**Troubleshooting:**
- Check browser console for errors
- Verify database with `npx prisma studio`
- Re-seed with `node --import tsx prisma/seed-home-settings.ts`

---

**✨ Happy editing!**
