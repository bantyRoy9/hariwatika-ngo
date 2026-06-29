# 🎠 Hero Slider & QR Donate - Implementation Guide

## ✅ What's New

### 1. **Hero Slider** (Homepage)
- ✅ Automatic sliding carousel with 4 slides
- ✅ Smooth image transitions (left side)
- ✅ Content transitions (right side)
- ✅ Navigation arrows on images
- ✅ Dot indicators at bottom
- ✅ Auto-advance every 6 seconds
- ✅ Pauses on hover
- ✅ Responsive on all devices

### 2. **Sticky QR Donate** (All Pages)
- ✅ Fixed QR code button on right side of screen
- ✅ Expands to show QR code when clicked
- ✅ Scans to redirect to /donate page
- ✅ Pulse animation to grab attention
- ✅ Tooltip on hover
- ✅ Mobile responsive

---

## 🎨 Hero Slider Features

### **4 Slides Content:**

**Slide 1: Marriage Assistance**
- Image: Community wedding ceremony
- Title: "Empowering Communities"
- Subtitle: "Through Marriage Assistance"
- Focus: Vivah Seva program

**Slide 2: Tree Plantation**
- Image: Tree planting activity
- Title: "Planting Tomorrow"
- Subtitle: "10,000+ Trees Planted"
- Focus: Vrikshaaropan initiative

**Slide 3: Relief Work**
- Image: Community support
- Title: "Supporting Families"
- Subtitle: "5000+ Families Helped"
- Focus: Garib Sahayata program

**Slide 4: Healthcare**
- Image: Medical camp
- Title: "Free Medical Care"
- Subtitle: "Health Camps for All"
- Focus: Swasthya Seva

---

## 🎯 User Experience Features

### **Slider Interaction:**
- ⏱️ **Auto-advance:** Changes every 6 seconds
- 🖱️ **Pause on hover:** Stops auto-advance when mouse over
- ⬅️➡️ **Arrow navigation:** Click arrows on image
- ⚪ **Dot indicators:** Click to jump to specific slide
- 📱 **Touch-friendly:** Swipe works on mobile (native behavior)

### **Animations:**
- 🎭 **Image transition:** Smooth fade + scale (1 second)
- 📝 **Content transition:** Slide-in from right (0.7 seconds)
- ✨ **Badge pulse:** Animated dot indicator
- 🌊 **Background blobs:** Floating gradient animations

---

## 🔘 Sticky QR Code Features

### **Location:**
- Fixed to right side of screen
- Centered vertically
- Always visible (z-index: 50)
- Responsive position on mobile

### **Behavior:**
- Click button → QR code popup appears
- QR code links to: `/donate` page
- Close button (X) to dismiss
- Tooltip shows on hover

### **Visual Effects:**
- Pulse ring animation
- Scale on hover
- Smooth expand/collapse
- White/orange color scheme

---

## 📱 Mobile Responsiveness

### **Slider:**
- Images stack above content on mobile
- Text sizes adjust for smaller screens
- Touch-friendly navigation arrows
- Swipe gesture support

### **QR Button:**
- Stays on right side
- Slightly smaller on mobile
- QR popup positioned for mobile view
- No overlap with content

---

## 🎨 Customization

### **Change Slider Images:**

Edit `/src/components/HeroSlider.tsx`:

```typescript
const slides: Slide[] = [
  {
    id: 1,
    image: "YOUR_IMAGE_URL_HERE", // Change this
    badge: { en: "Badge Text", hi: "बैज टेक्स्ट" },
    title: { en: "Main Title", hi: "मुख्य शीर्षक" },
    // ... rest of content
  },
  // Add more slides...
];
```

### **Change Auto-Advance Speed:**

In `/src/components/HeroSlider.tsx`:

```typescript
const timer = setInterval(nextSlide, 6000); // Change 6000 to your value (milliseconds)
```

Options:
- 3000 = 3 seconds (faster)
- 6000 = 6 seconds (current)
- 10000 = 10 seconds (slower)

### **Change QR Position:**

Edit `/src/components/StickyQRDonate.tsx`:

```typescript
// Current: Right side, centered
className="fixed right-6 top-1/2 -translate-y-1/2"

// Options:
// Left side: left-6 top-1/2 -translate-y-1/2
// Top right: right-6 top-6
// Bottom right: right-6 bottom-6
```

### **Change QR Button Color:**

In `/src/components/StickyQRDonate.tsx`:

```typescript
// Current: Orange
bg-[#E84523] text-white

// Options:
// Green: bg-green-600 text-white
// Blue: bg-blue-600 text-white
// Custom: bg-[#YOUR_COLOR] text-white
```

---

## 🛠️ Add More Slides

### **Step 1:** Open `/src/components/HeroSlider.tsx`

### **Step 2:** Add new slide to array:

```typescript
const slides: Slide[] = [
  // ... existing slides ...
  {
    id: 5, // Increment ID
    image: "https://your-image-url.com/image.jpg",
    badge: { en: "Your Badge", hi: "आपका बैज" },
    title: { en: "Your Title", hi: "आपका शीर्षक" },
    subtitle: { en: "Your Subtitle", hi: "आपका उपशीर्षक" },
    description: {
      en: "Your description in English.",
      hi: "हिंदी में आपका विवरण।",
    },
  },
];
```

### **Step 3:** Save and refresh browser!

---

## 🎯 How QR Code Works

### **QR Generation:**
- Uses free API: `qrserver.com`
- Dynamically generates QR from current URL + `/donate`
- Example: `https://yoursite.com/donate`

### **Change QR Destination:**

Edit `/src/components/StickyQRDonate.tsx`:

```typescript
// Current: /donate page
data=${encodeURIComponent(
  `${window.location.origin}/donate`
)}

// Change to any URL:
data=${encodeURIComponent("https://your-custom-url.com")}

// Or different page:
data=${encodeURIComponent(
  `${window.location.origin}/contact`
)}
```

### **Use Custom QR Image:**

Replace the `<img>` src with your own QR code image:

```typescript
<img
  src="/path/to/your-qr-code.png"
  alt="Donation QR Code"
  className="w-full h-auto"
/>
```

---

## 🎨 Styling Customization

### **Slider Gradient Background:**

In `/src/components/HeroSlider.tsx`:

```typescript
// Current: Dark gradient
className="bg-gradient-to-br from-[#0a0e1a] via-[#0d1229] to-[#0a0e1a]"

// Change to:
// Light gradient:
className="bg-gradient-to-br from-white via-gray-50 to-gray-100"

// Your brand colors:
className="bg-gradient-to-br from-[#YOUR_COLOR] via-[#YOUR_COLOR] to-[#YOUR_COLOR]"
```

### **Button Styles:**

Change donation button color in `/src/components/HeroSlider.tsx`:

```typescript
// Current: Orange
className="bg-[#E84523] text-white hover:bg-[#c93b1d]"

// Options:
// Green: bg-green-600 text-white hover:bg-green-700
// Blue: bg-blue-600 text-white hover:bg-blue-700
```

---

## 📊 Performance

### **Optimizations Included:**
- ✅ Lazy loading for non-visible slide images
- ✅ CSS transitions (GPU accelerated)
- ✅ Eager loading for first slide only
- ✅ Pause auto-advance on hover (saves resources)
- ✅ Clean interval cleanup on unmount

### **Image Optimization:**
- Use optimized images (WebP format)
- Recommended size: 1600x2000px
- Compress images before upload
- Use CDN for faster loading

---

## 🐛 Troubleshooting

### **Slider not showing?**
- Check browser console (F12) for errors
- Verify image URLs are accessible
- Clear browser cache (Ctrl+Shift+R)

### **QR code not generating?**
- Check internet connection (uses external API)
- Verify `/donate` page exists
- Try custom QR image instead

### **Animations not smooth?**
- Check browser performance
- Disable other animations temporarily
- Reduce auto-advance speed

### **QR button overlapping content?**
- Adjust z-index in StickyQRDonate.tsx
- Change position (left side instead)
- Make smaller on mobile

---

## 🎓 Technical Details

### **Files Created:**
```
src/
├── components/
│   ├── HeroSlider.tsx       (New: Hero carousel)
│   └── StickyQRDonate.tsx   (New: QR button)
└── app/
    ├── page.tsx             (Modified: Uses slider)
    └── globals.css          (Modified: New animations)
```

### **Dependencies:**
- ✅ React hooks (useState, useEffect, useCallback)
- ✅ Lucide React icons
- ✅ useLang context (bilingual support)
- ✅ CSS animations (no external libraries)

### **Browser Support:**
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 📱 Test Checklist

### **Desktop:**
- [ ] Slider auto-advances every 6 seconds
- [ ] Hover pauses auto-advance
- [ ] Arrow navigation works
- [ ] Dot indicators work
- [ ] Content transitions smoothly
- [ ] QR button shows on right side
- [ ] QR popup opens/closes
- [ ] Tooltip shows on hover

### **Mobile:**
- [ ] Slider is responsive
- [ ] Images display correctly
- [ ] Text is readable
- [ ] Navigation arrows work
- [ ] QR button is visible
- [ ] QR popup doesn't overlap
- [ ] All buttons are tappable

---

## 🎉 You're All Set!

Your homepage now has:
- ✅ Professional auto-sliding hero section
- ✅ 4 engaging slides showcasing your work
- ✅ Smooth animations and transitions
- ✅ Sticky QR code for easy donations
- ✅ Fully responsive design
- ✅ Bilingual support (English/Hindi)

**Need help?** Check the code comments in each component!

---

**Made with ♥ for Hariwatika Shiv Mandir Vivah Sewa Samiti**

