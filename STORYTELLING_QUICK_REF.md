# Premium Storytelling Section - Quick Reference

## 🚀 Quick Start

```tsx
import PremiumStorySection from "@/components/PremiumStorySection";

<PremiumStorySection
  eyebrow="Impact Stories"
  heading="Your Heading Here"
  description="Your description here"
  cards={[
    { id: "1", number: "01", title: "...", description: "...", image: "...", stat: "500+", statLabel: "..." },
    { id: "2", number: "02", title: "...", description: "...", image: "..." },
    { id: "3", number: "03", title: "...", description: "...", image: "..." },
  ]}
  ctaText="Learn More"
  ctaLink="/page"
  theme="light" // or "dark"
/>
```

---

## 📋 Props Cheat Sheet

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `eyebrow` | string | ✅ Yes | - | Small label above heading |
| `heading` | string | ✅ Yes | - | Main section heading |
| `description` | string | ✅ Yes | - | Section description |
| `cards` | StoryCard[] | ✅ Yes | - | Array of 3 story cards |
| `ctaText` | string | ❌ No | "Learn More" | CTA button text |
| `ctaLink` | string | ❌ No | "#" | CTA button link |
| `theme` | "light" \| "dark" | ❌ No | "light" | Theme variant |

---

## 🎨 StoryCard Interface

```typescript
interface StoryCard {
  id: string;           // Unique identifier
  number: string;       // "01", "02", "03"
  title: string;        // Card heading
  description: string;  // Card description (2-3 sentences)
  image: string;        // Image URL (min 800px width)
  stat?: string;        // Optional: "500+", "10K+"
  statLabel?: string;   // Optional: "Students", "Trees"
}
```

---

## 🎬 Animation Timeline

```
0ms    → Eyebrow
100ms  → Heading
200ms  → Description
300ms  → Card 1 (large)
400ms  → Card 2 (stacked)
500ms  → Card 3 (stacked)
600ms  → CTA button
```

---

## 🎨 Theme Colors

### Light (default)
```javascript
bg: "#fafaf9"      cards: "#ffffff"
text: "#1a1a1a"    muted: "#6b7280"
```

### Dark
```javascript
bg: "#0a0a0a"      cards: "#111111"
text: "#ffffff"    muted: "#a1a1a1"
```

---

## 📱 Layout Grid

```
Desktop (> 1024px):
├─ Featured Card: 7 columns (left)
└─ Stacked Cards: 5 columns (right)

Mobile (< 768px):
└─ All cards: Full width stack
```

---

## 🎯 Hover Effects

| Element | Effect |
|---------|--------|
| Featured Card | Lift 8px + shadow + image zoom 105% |
| Stacked Cards | Lift 4px + shadow increase |
| CTA Button | Lift 2px + scale 102% + shadow |
| All Transitions | 500ms smooth |

---

## 🌐 Bilingual Usage

```tsx
import { useLang } from "@/context/LanguageContext";
const { t } = useLang();

eyebrow={t("English Text", "हिंदी पाठ")}
```

---

## 📐 Image Guidelines

- **Size**: Min 800px width
- **Ratio**: 16:9 or 4:3
- **Format**: JPG, PNG, WebP
- **Source**: Unsplash, Pexels, custom
- **Loading**: Lazy load ready

---

## 💡 Content Tips

### Eyebrow (2-3 words)
✅ "Impact Stories"  
✅ "Our Journey"  
❌ "This is a very long eyebrow label"

### Heading (5-10 words)
✅ "Transforming Lives, One Story at a Time"  
✅ "Building a Better Tomorrow Together"  
❌ "Here is our heading"

### Description (1-2 sentences)
✅ Clear, concise, contextual  
❌ Long paragraphs

### Card Titles (4-7 words)
✅ "Education Transforms Communities"  
❌ "Our Education Program"

---

## 🚀 Where to Use

| Page | Section | Purpose |
|------|---------|---------|
| Home | Impact Stories | Showcase results |
| About | Journey | Share milestones |
| Programs | Success Stories | Highlight programs |
| Impact | Case Studies | Prove impact |
| Projects | Featured Work | Display projects |

---

## 🛠️ Common Patterns

### Homepage Pattern
```tsx
// After Mission & Vision section
<PremiumStorySection
  eyebrow="Impact Stories"
  heading="Transforming Lives..."
  cards={impactStories}
  ctaLink="/programs"
/>
```

### About Page Pattern
```tsx
// After history section
<PremiumStorySection
  eyebrow="Our Journey"
  heading="25 Years of Service..."
  cards={milestones}
  ctaLink="/about"
/>
```

### Dark Theme Pattern
```tsx
// On dark background sections
<PremiumStorySection
  theme="dark"
  {...props}
/>
```

---

## ⚡ Performance Tips

1. ✅ Optimize images (use CDN with query params)
2. ✅ Limit to 3 cards (design optimized for this)
3. ✅ Use `loading="lazy"` on images
4. ✅ Keep descriptions concise (2-3 sentences)
5. ✅ Avoid heavy images (> 500KB)

---

## 🐛 Troubleshooting

### Animations not working
→ Check `data-reveal` attributes exist

### Layout broken on mobile
→ Verify responsive grid classes

### Images not loading
→ Check image URLs are accessible

### Performance issues
→ Reduce image sizes, check blur values

---

## 📚 Documentation Files

1. `PREMIUM_STORYTELLING_GUIDE.md` - Complete guide
2. `STORYTELLING_VISUAL_DEMO.md` - Visual examples
3. `PREMIUM_STORYTELLING_IMPLEMENTATION.md` - Implementation details
4. `TASK_COMPLETE_SUMMARY.md` - Project summary

---

## 🎯 Success Checklist

- [ ] Import component
- [ ] Prepare 3 story cards
- [ ] Add bilingual content
- [ ] Optimize images
- [ ] Choose theme (light/dark)
- [ ] Set CTA link
- [ ] Test on mobile
- [ ] Verify animations
- [ ] Check accessibility
- [ ] Deploy to production

---

## 🔗 Component Location

```
src/components/PremiumStorySection.tsx
```

---

## 🌟 Quality Standards

| Metric | Standard |
|--------|----------|
| Design | ⭐⭐⭐⭐⭐ Apple-level |
| Animation | 60fps smooth |
| Responsive | Mobile-first |
| Performance | Lighthouse 95+ |
| Accessibility | WCAG AA |

---

**Quick Tip**: Copy the "Quick Start" example, replace content, and you're ready to go! 🚀
