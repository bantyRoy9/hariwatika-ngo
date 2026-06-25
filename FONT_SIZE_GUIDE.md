# 📝 Font Size Customization Guide

## Current Font Sizes (Refined & Premium)

All font sizes are now **smaller and more refined** for a premium look. They're defined as CSS variables in `/src/app/globals.css`.

---

## 📐 Current Scale

```css
--font-size-xs: 0.6875rem;      /* 11px - tiny labels, badges */
--font-size-sm: 0.8125rem;      /* 13px - small text, captions */
--font-size-base: 0.9375rem;    /* 15px - body text (main) */
--font-size-md: 1rem;           /* 16px - emphasized body */
--font-size-lg: 1.125rem;       /* 18px - lead paragraphs */
--font-size-xl: 1.375rem;       /* 22px - small headings */
--font-size-2xl: 1.75rem;       /* 28px - section headings */
--font-size-3xl: 2.25rem;       /* 36px - page headings */
--font-size-4xl: 3rem;          /* 48px - hero headings */
--font-size-5xl: 3.75rem;       /* 60px - display text */
```

---

## 🎯 Where Each Size is Used

### XS (11px) — Micro Text
- Status badges
- Legal fine print
- Timestamps
- Icon labels

**Example:**
```tsx
<span style={{ fontSize: 'var(--font-size-xs)' }}>
  Updated 2 hours ago
</span>
```

### SM (13px) — Small Text
- Card descriptions
- Secondary information
- Helper text
- Form labels

**Example:**
```tsx
<p style={{ fontSize: 'var(--font-size-sm)' }}>
  Supporting families since 2000
</p>
```

### BASE (15px) — Body Text ⭐ Main Size
- Paragraphs
- Article content
- General text
- Default size

**Example:**
```tsx
<p style={{ fontSize: 'var(--font-size-base)' }}>
  This is the main body text for reading.
</p>
```

### MD (16px) — Emphasized Body
- Important paragraphs
- Lead text in sections
- Call-out text

**Example:**
```tsx
<p style={{ fontSize: 'var(--font-size-md)' }}>
  Join our mission to empower communities.
</p>
```

### LG (18px) — Lead Text
- Section introductions
- Hero subtitles
- Important statements

**Example:**
```tsx
<p style={{ fontSize: 'var(--font-size-lg)' }}>
  Over 5000 families served across West Champaran.
</p>
```

### XL (22px) — Small Headings
- Card titles
- Subsection headers
- Feature names

**Example:**
```tsx
<h4 style={{ fontSize: 'var(--font-size-xl)' }}>
  Our Mission
</h4>
```

### 2XL (28px) — Section Headings
- Section titles
- Page subsections
- Category headers

**Example:**
```tsx
<h3 style={{ fontSize: 'var(--font-size-2xl)' }}>
  What We Do
</h3>
```

### 3XL (36px) — Page Headings
- Page titles
- Main sections
- Feature headings

**Example:**
```tsx
<h2 style={{ fontSize: 'var(--font-size-3xl)' }}>
  About Our Organization
</h2>
```

### 4XL (48px) — Hero Headings
- Hero sections
- Landing page titles
- Major announcements

**Example:**
```tsx
<h1 style={{ fontSize: 'var(--font-size-4xl)' }}>
  Empowering Communities
</h1>
```

### 5XL (60px) — Display Text
- Hero display text
- Special headlines
- Major events

**Example:**
```tsx
<h1 style={{ fontSize: 'var(--font-size-5xl)' }}>
  25+ Years of Service
</h1>
```

---

## 🔧 How to Adjust Font Sizes

### Option 1: Global Change (Recommended)

Edit `/src/app/globals.css`:

```css
:root {
  /* Make everything SMALLER */
  --font-size-base: 0.875rem;    /* 14px instead of 15px */
  --font-size-3xl: 2rem;         /* 32px instead of 36px */
  
  /* Make everything LARGER */
  --font-size-base: 1rem;        /* 16px instead of 15px */
  --font-size-3xl: 2.5rem;       /* 40px instead of 36px */
}
```

### Option 2: Percentage Scale

Want to scale all sizes proportionally? Change the root `font-size`:

```css
html {
  font-size: 15px;  /* Current (default is 16px) */
  
  /* Smaller overall */
  font-size: 14px;  /* Everything 12.5% smaller */
  
  /* Larger overall */
  font-size: 17px;  /* Everything 6% larger */
}
```

---

## 📏 Preset Size Scales

### Scale 1: "Compact" (Current ✅)
**Best for: Premium, modern, lots of content**

```css
--font-size-xs: 0.6875rem;    /* 11px */
--font-size-sm: 0.8125rem;    /* 13px */
--font-size-base: 0.9375rem;  /* 15px */
--font-size-md: 1rem;         /* 16px */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.375rem;     /* 22px */
--font-size-2xl: 1.75rem;     /* 28px */
--font-size-3xl: 2.25rem;     /* 36px */
```

### Scale 2: "Standard"
**Best for: Traditional websites, older audiences**

```css
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-md: 1.125rem;     /* 18px */
--font-size-lg: 1.25rem;      /* 20px */
--font-size-xl: 1.5rem;       /* 24px */
--font-size-2xl: 1.875rem;    /* 30px */
--font-size-3xl: 2.5rem;      /* 40px */
```

### Scale 3: "Large" 
**Best for: Accessibility, older users, simple layouts**

```css
--font-size-xs: 0.8125rem;    /* 13px */
--font-size-sm: 0.9375rem;    /* 15px */
--font-size-base: 1.0625rem;  /* 17px */
--font-size-md: 1.1875rem;    /* 19px */
--font-size-lg: 1.375rem;     /* 22px */
--font-size-xl: 1.625rem;     /* 26px */
--font-size-2xl: 2rem;        /* 32px */
--font-size-3xl: 2.75rem;     /* 44px */
```

### Scale 4: "Extra Compact"
**Best for: Data-heavy, dashboards, dense content**

```css
--font-size-xs: 0.625rem;     /* 10px */
--font-size-sm: 0.75rem;      /* 12px */
--font-size-base: 0.875rem;   /* 14px */
--font-size-md: 0.9375rem;    /* 15px */
--font-size-lg: 1rem;         /* 16px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 2rem;        /* 32px */
```

---

## 🎨 Line Height & Letter Spacing

Font size alone isn't enough. These also matter:

### Line Heights

```css
--line-height-tight: 1.25;      /* Headings */
--line-height-snug: 1.375;      /* Short paragraphs */
--line-height-normal: 1.5;      /* Standard */
--line-height-relaxed: 1.625;   /* Body text (current) */
--line-height-loose: 1.75;      /* Large text blocks */
```

**Recommendation:** Body text should use `relaxed` (1.625) for comfortable reading.

### Letter Spacing

```css
--letter-spacing-tighter: -0.03em;  /* Large headings */
--letter-spacing-tight: -0.015em;   /* Regular headings */
--letter-spacing-normal: -0.011em;  /* Body text */
--letter-spacing-wide: 0.025em;     /* Buttons */
--letter-spacing-wider: 0.05em;     /* Caps */
--letter-spacing-widest: 0.1em;     /* Tags, labels */
```

**Recommendation:** 
- Headings: Tight (brings letters closer)
- Body: Normal
- Uppercase text: Wide or Widest

---

## 📱 Responsive Font Sizing

The website already uses responsive sizing for headings:

```css
h1 {
  font-size: clamp(2rem, 4vw + 1rem, var(--font-size-5xl));
}
```

This means:
- **Mobile**: Minimum 2rem (32px)
- **Tablet**: Scales with viewport
- **Desktop**: Maximum 3.75rem (60px)

---

## ✅ Best Practices

### DO:
✅ Use relative units (rem, em) instead of px
✅ Maintain consistent scale ratios
✅ Test on mobile and desktop
✅ Check readability in different lighting
✅ Use larger sizes for important content
✅ Keep body text between 15-18px for readability

### DON'T:
❌ Mix too many different sizes
❌ Go below 11px (accessibility issue)
❌ Use the same size for everything
❌ Ignore line height
❌ Forget to test on real devices

---

## 🧪 Testing Your Font Sizes

After changing sizes:

1. **Readability Test**
   - Can you read body text from 60cm away?
   - Are headings clearly distinct from body text?
   - Does the hierarchy make sense?

2. **Mobile Test**
   - Check on actual phone
   - Buttons should be tappable
   - Text shouldn't feel cramped

3. **Accessibility Test**
   - Use browser zoom (125%, 150%, 200%)
   - Text should remain readable
   - Layout shouldn't break

4. **Visual Balance**
   - White space around text
   - Comfortable line length (50-75 characters)
   - Sections are visually separated

---

## 🎯 Quick Fixes

### "Text Looks Too Big"
```css
html { font-size: 14px; }  /* Scales everything down */
```

### "Text Looks Too Small"
```css
html { font-size: 17px; }  /* Scales everything up */
```

### "Headings Too Bold"
```css
h1, h2, h3 {
  font-weight: var(--font-weight-medium);  /* Less heavy */
}
```

### "Body Text Hard to Read"
```css
body {
  font-size: var(--font-size-md);         /* Bump to 16px */
  line-height: var(--line-height-loose);  /* More space */
}
```

---

## 🐛 Troubleshooting

**Changes not showing?**
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Check for inline styles overriding

**Text overlapping?**
- Increase line-height
- Add margin-bottom to paragraphs
- Check container width

**Mobile text too small?**
- Increase base `html { font-size }`
- Check viewport meta tag
- Test on actual device

---

## 💡 Pro Tips

### Golden Ratio Scale
For harmonious sizing, each level should be ~1.25x the previous:
```
11px → 13px → 16px → 20px → 25px → 31px → 39px
```

### Type Scale Generator
Use these tools:
- [Type-Scale.com](https://type-scale.com/)
- [Modular Scale](https://www.modularscale.com/)

### Font Size = Content Hierarchy
```
Hero Title (60px)
  ↓
Section Heading (36px)
  ↓
Subsection (28px)
  ↓
Card Title (22px)
  ↓
Body Text (15px)
  ↓
Caption (13px)
  ↓
Label (11px)
```

---

Happy sizing! 📏✨
