# 🎨 Hexagonal Gallery Implementation Guide

## ✅ What's Been Created

I've implemented a beautiful **honeycomb/hexagonal photo grid** inspired by the Dr. India Charitable Trust design. This creates a stunning visual impact perfect for showcasing your NGO's work.

---

## 📁 Files Created

### 1. **HexagonalGallery Component**
- **Location:** `/src/components/HexagonalGallery.tsx`
- **Purpose:** Reusable hexagonal grid component
- **Features:**
  - Responsive honeycomb layout
  - Click to view in lightbox
  - Hover effects with orange overlay
  - Auto-adjusts for mobile/tablet/desktop
  - Smooth animations

### 2. **Gallery Page**
- **Location:** `/src/app/gallery/page.tsx`
- **URL:** `/gallery`
- **Purpose:** Dedicated page showcasing all your impact photos
- **Sections:**
  - Hero section with stats
  - Hexagonal photo grid
  - CTA section for donations/volunteering

### 3. **Updated Navbar**
- Added "Gallery" link in navigation
- Available in both English and Hindi

---

## 🎨 Design Features

### Hexagonal Layout
```
    ⬡ ⬡ ⬡ ⬡ ⬡
  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡ ⬡ ⬡
  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
```

- **Honeycomb pattern** - Every other row offset
- **CSS clip-path** - Creates perfect hexagon shapes
- **Responsive grid** - Adjusts columns based on screen size

### Hover Effects
- Image zooms in (scale 1.2)
- Orange overlay appears (#E84523 at 80% opacity)
- "VIEW" text displays
- Hexagon lifts up slightly

### Lightbox
- Click any image to view fullscreen
- Dark overlay background
- Close button (X) in top-right
- Click outside to close
- Responsive sizing

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Hexagons: 140px × 140px
- Grid columns: Auto-fit
- Smaller gaps (8px)
- Offset: 70px

### Tablet (640px - 1024px)
- Hexagons: 160px × 160px
- Medium gaps (10px)
- Offset: 80px

### Desktop (> 1024px)
- Hexagons: 180px × 180px
- Larger gaps (12px)
- Offset: 90px
- Max width: 1400px container

---

## 🖼️ How to Add Your Own Images

### Option 1: Edit Gallery Page Directly

Open `/src/app/gallery/page.tsx` and replace the `galleryImages` array:

```typescript
const galleryImages = [
  { 
    src: "/images/gallery/event1.jpg", 
    alt: "Tree plantation drive at Village X" 
  },
  { 
    src: "/images/gallery/event2.jpg", 
    alt: "Healthcare camp 2024" 
  },
  // Add more images...
];
```

### Option 2: Use the Component Anywhere

```tsx
import HexagonalGallery from "@/components/HexagonalGallery";

const myImages = [
  { src: "/path/to/image.jpg", alt: "Description" },
  // ...
];

<HexagonalGallery
  images={myImages}
  title="Our Impact"
  description="Click to view details"
/>
```

---

## 🎯 Where to Use This Gallery

### ✅ **Created Pages:**
1. **Gallery Page** (`/gallery`) - ✅ DONE
   - Dedicated showcase page
   - Full hexagonal grid
   - Stats and CTAs

### 🆕 **Recommended Additional Placements:**

2. **About Page** - Add at bottom
   ```tsx
   // At end of About page
   <section className="py-16">
     <HexagonalGallery
       images={impactImages.slice(0, 18)}
       title="Our Journey in Pictures"
     />
   </section>
   ```

3. **Projects Page** - Show project photos
   ```tsx
   // In each project detail
   <HexagonalGallery
     images={projectSpecificImages}
     title="Project Highlights"
   />
   ```

4. **Home Page** - Small preview (optional)
   ```tsx
   // Add before footer
   <section className="py-16">
     <HexagonalGallery
       images={featuredImages.slice(0, 12)}
       title="Recent Activities"
     />
     <Link href="/gallery">View All →</Link>
   </section>
   ```

---

## 📊 Gallery Page Structure

```
┌──────────────────────────────────────────┐
│  Hero Section                            │
│  - Title: "Gallery of Change"           │
│  - Description                           │
│  - 3 Stats boxes (Events, Villages,     │
│    Lives Touched)                        │
└──────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────┐
│  Hexagonal Gallery Grid                  │
│  - "Moments That Matter" title           │
│  - 36 placeholder images                 │
│  - Click to view in lightbox             │
│  - Hover effects                         │
└──────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────┐
│  CTA Section (Yellow Background)         │
│  - "Be Part of Our Story"                │
│  - Donate + Volunteer buttons            │
└──────────────────────────────────────────┘
```

---

## 🎨 Customization Options

### Change Hexagon Size
Edit in `HexagonalGallery.tsx`:
```css
.hexagon-item {
  width: 200px;  /* Change this */
  height: 200px; /* And this */
}
```

### Change Hover Color
```css
.hexagon-overlay {
  background: rgba(232, 69, 35, 0.8); /* Your LENITY.accent */
}
```

### Change Grid Spacing
```css
.hexagon-gallery {
  gap: 15px; /* Adjust gap */
}
```

### Add Categories/Filters
You can extend the component to filter by category:
```typescript
interface GalleryImage {
  src: string;
  alt: string;
  category?: string; // 'education', 'healthcare', 'environment'
}
```

---

## 📷 Image Recommendations

### Best Practices:
1. **Size:** 400px × 400px minimum
2. **Format:** JPG or WebP
3. **Aspect Ratio:** Square (1:1) works best
4. **File Size:** < 200KB for web performance
5. **Quality:** 80% compression is sufficient

### Folder Structure:
```
/public
  /images
    /gallery
      /education
        - event1.jpg
        - event2.jpg
      /healthcare
        - camp1.jpg
        - camp2.jpg
      /environment
        - plantation1.jpg
        - plantation2.jpg
```

---

## 🚀 Next Steps

### Priority 1: Add Real Photos
1. Collect 30-50 photos from your events
2. Resize to 400×400px
3. Place in `/public/images/gallery/`
4. Update `galleryImages` array

### Priority 2: Add Descriptions
- Write meaningful alt text for SEO
- Include location and date in descriptions
- Use bilingual captions (EN + HI)

### Priority 3: Organize by Category
- Separate by program type
- Add filter buttons
- Create category pages

---

## 💡 Pro Tips

### Performance
```typescript
// Lazy load images
<img loading="lazy" ... />

// Use WebP format
src="/images/gallery/event1.webp"
```

### SEO
```typescript
// Good alt text
alt="Students receiving scholarships at Bettiah Government School, December 2024"

// Bad alt text
alt="Image 1"
```

### Accessibility
- All images have descriptive alt text ✅
- Lightbox can be closed with Escape key ✅
- Keyboard navigation supported ✅

---

## 🎯 URLs Added

New pages available:
- **Gallery:** `http://localhost:3000/gallery`
- **Navbar:** Updated with Gallery link

---

## 🎨 Color Scheme

Matches your LENITY theme:
- **Hexagon borders:** Gray (#f3f4f6)
- **Hover overlay:** Orange-red (#E84523 at 80%)
- **Lightbox background:** Black at 90%
- **Hero background:** Soft cream gradient
- **CTA section:** Warm yellow (#f59e0b)

---

## 📝 Content to Update

### Gallery Page Hero Stats:
Current (placeholder):
- 1000+ Events Organized
- 50+ Villages Covered
- 10K+ Lives Touched

**Update with real numbers in `/src/app/gallery/page.tsx`**

### Gallery Images:
Current: 36 placeholder Unsplash images

**Replace with actual event photos**

---

## 🐛 Troubleshooting

### Images not showing?
- Check file paths are correct
- Ensure images are in `/public/images/`
- Verify file extensions match (jpg vs jpeg)

### Hexagons misaligned?
- Check CSS clip-path browser support
- Verify container has proper width
- Test different screen sizes

### Lightbox not working?
- Check z-index (should be 50)
- Verify onClick handlers
- Test on different browsers

---

## 🌟 Future Enhancements

### Phase 1 (Quick Wins):
- [ ] Add real photos
- [ ] Update stats with real numbers
- [ ] Add category filters

### Phase 2 (Advanced):
- [ ] Infinite scroll loading
- [ ] Image zoom/pan in lightbox
- [ ] Share buttons for social media
- [ ] Download high-res option

### Phase 3 (Premium):
- [ ] Admin panel to upload images
- [ ] Auto-generate thumbnails
- [ ] Image compression pipeline
- [ ] CDN integration

---

## ✅ Testing Checklist

- [x] Component created
- [x] Gallery page created
- [x] Navbar link added
- [x] Responsive on mobile
- [x] Hover effects work
- [x] Lightbox functions
- [x] No TypeScript errors
- [ ] Add real images ⚠️
- [ ] Update stats ⚠️
- [ ] Test on production ⚠️

---

## 📞 Usage Example

```tsx
import HexagonalGallery from "@/components/HexagonalGallery";

const eventPhotos = [
  { src: "/gallery/event1.jpg", alt: "Medical camp" },
  { src: "/gallery/event2.jpg", alt: "Tree plantation" },
  // ... more images
];

export default function MyPage() {
  return (
    <HexagonalGallery
      images={eventPhotos}
      title="Our Impact Stories"
      description="25 years of service"
    />
  );
}
```

---

The hexagonal gallery is fully implemented and ready to showcase your amazing work! Just add your real photos and update the content. 🎉

Visit `/gallery` to see it in action!
