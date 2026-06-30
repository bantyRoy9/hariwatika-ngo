# 📋 Programs Page & Animated Partners - Implementation Guide

## 🎯 Overview
This document covers the new Programs page and animated Partners & Sponsors section with bidirectional logo carousels.

---

## ✨ New Components Created

### 1. **LogoCarousel Component**
**Location**: `src/components/LogoCarousel.tsx`

**Purpose**: Infinite scrolling logo carousel with configurable direction

**Features**:
- Smooth infinite scroll animation using requestAnimationFrame
- Configurable direction (left/right)
- Grayscale effect with color on hover
- Automatic content duplication for seamless loop
- Performance optimized with will-change property

**Props**:
```typescript
{
  logos: Logo[];              // Array of logo objects
  direction?: "left" | "right"; // Scroll direction (default: "left")
  speed?: number;             // Animation speed (default: 30)
}

interface Logo {
  id: number;
  name: string;
  image: string;              // Logo image URL
}
```

**Usage Example**:
```jsx
<LogoCarousel
  logos={[
    { id: 1, name: "Tata Trust", image: "url-to-logo.png" },
    { id: 2, name: "Rotary", image: "url-to-logo.png" },
  ]}
  direction="left"
  speed={30}
/>
```

---

### 2. **HoverExpandCard Component**
**Location**: `src/components/HoverExpandCard.tsx`

**Purpose**: Interactive card that reveals description on hover

**Features**:
- Image background with overlay gradient
- Large numbered label (always visible)
- Title always visible
- Description and navigation button appear on hover
- Smooth transitions with staggered timing
- Responsive design

**Props**:
```typescript
{
  number: string;              // Large number overlay (e.g., "01")
  title: string;               // Card title
  description: string;         // Hidden description (shows on hover)
  image: string;               // Background image URL
  link?: string;               // Navigation link (default: "#")
  linkText?: string;           // Button text (default: "Read More")
}
```

---

### 3. **ProgramsGrid Component**
**Location**: `src/components/ProgramsGrid.tsx`

**Purpose**: Grid of hover-expand cards for programs showcase

**Features**:
- 2-column responsive grid (4 cards)
- Bilingual support
- Section header with eyebrow label
- Uses HoverExpandCard for each program

**Programs Included**:
1. Hariwatika Campus
2. Hariwatika Education
3. Hariwatika Social Service
4. Hariwatika Environment

---

## 🏠 Homepage Updates

### Partners & Sponsors Section
**Location**: `src/app/page.tsx` (line ~408)

**Changes**:
1. **Associate Partners** - Scrolls RIGHT to LEFT
   - 8 prominent NGO/organization logos
   - Tata Trust, Rotary, United Way, World Vision, etc.

2. **Medicine Sponsors** - Scrolls LEFT to RIGHT
   - 6 pharmaceutical company logos
   - Cipla, Sun Pharma, Dr. Reddy's, Lupin, etc.

**Animation Details**:
- Continuous smooth scrolling
- Automatic content duplication for seamless loop
- Hover to see color (grayscale by default)
- No manual controls (fully automatic)

---

## 📄 New Programs Page

**Location**: `src/app/programs/page.tsx`

**Structure**:

### 1. **Hero Section**
- Gradient background (orange to dark)
- Page title and subtitle
- Bilingual content

### 2. **Stats Overview**
- Yellow band with 4 key statistics
- Active Programs, Beneficiaries, Years of Service, Villages Covered

### 3. **Programs List** (8 Programs)

Each program card includes:
- **Program Number Badge** (01, 02, 03, etc.)
- **Icon** - Visual representation
- **Title** (Bilingual)
- **Short Description** (Italic lead text)
- **Full Description**
- **Statistics** (3 metrics per program)
- **Key Objectives** (Collapsible list)
- **Support Button** (Opens donation modal)

**Layout**: Alternating image left/right for visual interest

#### Programs Covered:

1. **Shiksha Seva (Education Service)**
   - 500+ beneficiaries
   - Scholarships, books, tutoring
   - Career guidance

2. **Vrikshaaropan (Tree Plantation)**
   - 10,000+ trees planted
   - Climate awareness
   - 50+ villages

3. **Garib Sahayata (Poverty Relief)**
   - 3,000+ families supported
   - Food, clothing, essentials
   - Monthly distribution

4. **Swasthya Seva (Healthcare Service)**
   - 5,000+ patients treated
   - 100+ health camps
   - Free medicines

5. **Vivah Sahayata (Marriage Assistance)**
   - 200+ marriages supported
   - Widow remarriage support
   - Prevent child marriage

6. **Aapada Prabandhan (Disaster Management)**
   - 2,000+ flood relief recipients
   - Emergency response team
   - Rehabilitation programs

7. **Mahila Bal Kalyan (Women & Child Welfare)**
   - 1,500+ women empowered
   - 40+ self-help groups
   - Nutrition programs

8. **Rojgar Sahayata (Employment Assistance)**
   - 800+ counseled
   - 400+ job placements
   - Skill workshops

### 4. **Our Approach Section**
4 cards explaining methodology:
- Community-Led
- Dignity First
- Inclusive
- Sustainable

### 5. **Get Involved CTA**
- Yellow background section
- 3 action buttons:
  - Donate Now (primary)
  - Become a Volunteer
  - Partner With Us

---

## 🎨 Design Consistency

### Colors
- **Primary**: #E84523 (Orange-red)
- **Accent**: #f59e0b (Warm amber)
- **Background**: Warm cream tones
- **Typography**: Exo 2 (Serif), Rajdhani (Sans)

### Animations
- Smooth transitions (0.3-0.5s)
- Hover effects with scale and shadow
- Staggered reveal for descriptions
- RequestAnimationFrame for logo scrolling

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔗 Navigation Integration

The programs page is automatically linked from:
1. Navbar "Programs" menu item
2. Homepage "Read More" buttons
3. ProgramsGrid cards

---

## 📱 Mobile Optimization

### Logo Carousel
- Smaller logos on mobile
- Maintained scroll speed
- Touch-friendly (no interaction needed)

### Programs Page
- Single column layout on mobile
- Stack image above content
- Larger touch targets for buttons
- Collapsible objectives save space

### Hover Cards
- Tap to expand on mobile
- No hover state (always show description)
- Optimized card heights

---

## 🚀 Performance Optimizations

1. **Logo Carousel**
   - RequestAnimationFrame for smooth 60fps
   - will-change: transform
   - No expensive calculations in loop

2. **Images**
   - Lazy loading
   - Optimized URLs with quality parameters
   - Proper sizing

3. **Animations**
   - Hardware-accelerated transforms
   - Reduced motion support
   - No layout thrashing

---

## 📊 SEO & Accessibility

### SEO
- Semantic HTML structure
- Descriptive alt texts
- Meta descriptions ready
- Proper heading hierarchy

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Color contrast ratios met
- Screen reader friendly

---

## 🛠️ Customization

### Adding New Programs
Edit `src/app/programs/page.tsx`:

```typescript
{
  id: "new-program",
  icon: YourIcon,
  titleEn: "Program Title",
  titleHi: "कार्यक्रम शीर्षक",
  // ... rest of fields
}
```

### Changing Logo Scroll Speed
In `src/app/page.tsx`:

```jsx
<LogoCarousel
  logos={...}
  direction="left"
  speed={40}  // Increase for faster scroll
/>
```

### Updating Partner Logos
Replace logo objects in the Partners section with actual logo URLs.

---

## 📝 Future Enhancements

Potential additions:
1. **Individual Program Pages** - Detailed pages per program
2. **Success Stories** - Real beneficiary testimonials
3. **Photo Galleries** - Program activity images
4. **Impact Reports** - Downloadable annual reports
5. **Donation Goal Tracking** - Per-program fundraising
6. **Volunteer Signup** - Dedicated registration forms

---

## ✅ Testing Checklist

- [ ] Logo carousels scroll smoothly in both directions
- [ ] Hover cards reveal description smoothly
- [ ] All programs display correctly
- [ ] Objectives expand/collapse properly
- [ ] Donate modal opens on button clicks
- [ ] Responsive on mobile/tablet/desktop
- [ ] Bilingual content switches correctly
- [ ] All links work properly
- [ ] Images load correctly
- [ ] Animations perform well (60fps)

---

**Last Updated**: June 30, 2026  
**Version**: 1.0.0  
**Status**: ✅ Implemented and Ready
